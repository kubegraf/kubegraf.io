# System Overview

**Audience:** This documentation is for engineers working on or extending KubeGraf's Incident Intelligence System. It provides deep technical details about the system's architecture, data models, and internal mechanisms.

## Introduction

The KubeGraf Incident Intelligence System is a production-ready, deterministic incident detection and diagnosis system for Kubernetes clusters. It converts raw Kubernetes errors, events, logs, and pod states into structured incidents with human-readable summaries, evidence-backed diagnoses, and actionable recommendations.

The system is designed for **real production use** by senior SREs and provides:

- **Structured Incidents** - Not raw error spam, but properly aggregated, deduplicated incidents
- **Evidence-Backed Diagnoses** - Every conclusion is supported by actual signals from the cluster
- **Deterministic Rules** - No AI hallucinations or guessing; pure rule-based logic
- **Safe Recommendations** - Suggested fixes that never auto-execute (unless auto-remediation is enabled)
- **Offline-First** - Works completely locally with just kubeconfig
- **Multi-Cluster** - Strict cluster context filtering ensures incidents are cluster-specific

## Core Principles

1. **Think in Failure Patterns, not error codes** - A 502 error is a symptom, not the pattern
2. **Deterministic, rule-based logic only** - Reproducible and explainable
3. **Every conclusion must have evidence** - No "might be" language
4. **Never auto-apply fixes (by default)** - Always show preview + diff before apply (unless auto-remediation enabled)
5. **Namespace-scoped actions only** - Safe for production clusters
6. **Cluster context isolation** - Incidents are strictly filtered by active cluster

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Kubernetes Cluster                        │
├─────────────────────────────────────────────────────────────────┤
│  Events │ Pod Status │ Logs │ Restart Counts │ Probe Failures   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Signal Normalizer (signals.go)                │
│    Converts all inputs to NormalizedSignal format                │
│    Tags signals with ClusterContext                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Symptom Detector (symptoms.go)                 │
│    Identifies specific symptoms from signals                     │
│    • CrashLoopBackOff  • OOMKilled  • RestartSpike               │
│    • ImagePullError    • NoEndpoints  • ProbeFailure             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Pattern Matcher (matcher.go)                   │
│    Maps symptoms → failure patterns with confidence              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Incident Aggregator (aggregator.go)              │
│    Deduplicates via fingerprint, tracks occurrences              │
│    Filters by ClusterContext (strict matching)                   │
│    Clears incidents from inactive clusters                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                Diagnosis Generator (diagnosis.go)                │
│    Creates human-readable summary with evidence                  │
│    Avoids cross-layer assumptions                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Recommendation Engine (recommendations.go)          │
│    Suggests safe remediation steps                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Snapshot Builder (snapshot.go)                      │
│    Precomputes hot evidence, diagnosis, impact                   │
│    Caches with 5-minute TTL for performance                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API Handlers                              │
│    GET /snapshot (hot path) │  GET /logs │  GET /evidence        │
└─────────────────────────────────────────────────────────────────┘
```

## Incident Data Model

The core incident structure:

```go
type Incident struct {
    ID              string              // Unique incident ID
    Pattern         FailurePattern      // Detected failure pattern
    Severity        Severity            // critical, high, medium, low
    Status          IncidentStatus      // open, investigating, resolved
    Resource        KubeResourceRef     // Affected resource (pod, service, etc.)
    Namespace       string              // Kubernetes namespace
    Occurrences     int                 // Number of times detected
    FirstSeen       time.Time           // First occurrence
    LastSeen        time.Time           // Most recent occurrence
    ClusterContext  string              // Cluster context where detected
    Signals         IncidentSignals     // Categorized signals
    Symptoms        []*Symptom          // Detected symptoms
    Diagnosis       *Diagnosis          // Human-readable diagnosis
    Recommendations []*Recommendation   // Suggested actions
    Timeline        []TimelineEntry     // Event timeline
}
```

## Failure Patterns

The system detects these Kubernetes failure patterns:

| Pattern | Description | Example Triggers |
|---------|-------------|------------------|
| `APP_CRASH` | Application crash without restart loop | Single crash event |
| `CRASHLOOP` | CrashLoopBackOff restart cycles | Repeated container restarts |
| `OOM_PRESSURE` | Out of memory issues | ExitCode 137, OOMKilled |
| `RESTART_STORM` | Rapid restarts without crash | Many restarts in short time |
| `NO_READY_ENDPOINTS` | Service has no healthy endpoints | 0 endpoints in service |
| `IMAGE_PULL_FAILURE` | Container image issues | ErrImagePull, ImagePullBackOff |
| `CONFIG_ERROR` | ConfigMap/Secret issues | Missing mounts, invalid config |
| `UNSCHEDULABLE` | Pod scheduling failures | Resource constraints, node issues |
| `NODE_NOT_READY` | Node availability issues | Node conditions, NotReady status |
| `PVC_PENDING` | Persistent volume issues | Storage class issues, volume binding failures |
| `DEPLOYMENT_UNAVAILABLE` | Deployment replica health | Unavailable replicas, no ready replicas |

## Severity Calculation

Severity is calculated based on:

1. **Blast Radius** - How many resources are affected
2. **Pattern Type** - Some patterns (OOM, CrashLoop) are inherently critical
3. **Frequency** - More occurrences = higher severity
4. **Duration** - Longer incidents escalate

| Severity | Criteria |
|----------|----------|
| `critical` | Affects production traffic, data loss risk |
| `high` | Service degradation, user-facing impact |
| `medium` | Non-critical but needs attention |
| `low` | Informational, no immediate impact |

## Confidence Scores

Each incident has a confidence score (0.0 - 1.0):

- **1.0** - Definitive evidence (e.g., ExitCode 137 = OOM)
- **0.8+** - High confidence with multiple corroborating signals
- **0.5-0.8** - Moderate confidence, may need investigation
- **< 0.5** - Low confidence, preliminary detection

**UI Rule:** Fixes are only shown if confidence ≥ 0.8 (80%)

## Multi-Cluster Support

The system supports multiple clusters with strict context-aware filtering:

- **Cluster Context**: Each incident is tagged with the cluster context where it was detected
- **Strict Context Filtering**: Only incidents that exactly match the current cluster context are shown
- **Immediate Cleanup**: When switching clusters, all incidents from other clusters are immediately cleared
- **Empty Context Handling**: Incidents with empty cluster context (legacy) are excluded when a cluster is active
- **Memory Efficient**: Prevents unbounded memory growth across multiple clusters
- **Thread-Safe Updates**: Cluster context updates are thread-safe with proper mutex locking

### Cluster Context Flow

1. **On Cluster Switch**:
   - Manager's cluster context is updated
   - Aggregator's cluster context is updated (thread-safe)
   - All incidents from other clusters are immediately cleared
   - Only incidents matching the new context remain

2. **On Incident Creation**:
   - Incidents automatically get the current cluster context
   - Ensures correct tagging from the start

3. **On Incident Query**:
   - `GetAllIncidents()` and `GetActiveIncidents()` filter by exact cluster context match
   - Empty context incidents are excluded when a cluster is active

**API**: Cluster context is automatically managed when switching via `/api/contexts/switch`

## Production Readiness

The system is production-ready with:

- ✅ Works fully offline (no cloud dependencies)
- ✅ Deterministic rules (no AI guessing)
- ✅ Explainable output (every conclusion has evidence)
- ✅ No auto-mutation by default (user must approve all changes, unless auto-remediation enabled)
- ✅ Efficient (event-driven, not polling)
- ✅ Multi-cluster compatible with strict context filtering
- ✅ Safe for production use
- ✅ Thread-safe cluster context updates
- ✅ Memory-efficient incident management
- ✅ Fast snapshot API (<100ms cached)
- ✅ Lazy-loaded cold evidence

---

**Next:** Learn about the [Intelligence Pipeline](intelligence-pipeline.md) that processes signals into incidents.

