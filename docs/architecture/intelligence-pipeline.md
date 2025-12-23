# Intelligence Pipeline

**Audience:** This documentation is for engineers working on or extending KubeGraf's Incident Intelligence System. It provides deep technical details about how signals flow through the system to become structured incidents.

## Pipeline Overview

The intelligence pipeline processes raw Kubernetes data through multiple layers, each adding structure and meaning:

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 1: SIGNAL INGESTION                                       │
│  Events → Logs → Pod Status → Metrics → Probes                  │
└────────────────────────────────┬────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 2: INCIDENT ENGINE                                        │
│  Pattern Detection → Confidence Scoring → Aggregation           │
└────────────────────────────────┬────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 3: HOT EVIDENCE BUILDER                                   │
│  RestartCounts + ExitCode + ErrorString + Readiness + Changes   │
└────────────────────────────────┬────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 4: SNAPSHOT BUILDER                                       │
│  Hot Evidence + Diagnosis + Impact + WhyNow + RecommendedAction │
└────────────────────────────────┬────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 5: COLD EVIDENCE (Lazy-Loaded)                           │
│  Logs + Metrics + Changes + Evidence + Citations                │
└─────────────────────────────────────────────────────────────────┘
```

## Layer 1: Signal Ingestion

The first layer normalizes all Kubernetes data sources into a unified signal format.

### Signal Normalizer (`signals.go`)

The signal normalizer converts heterogeneous inputs into `NormalizedSignal` format:

- **Kubernetes Events** - Event objects from the Kubernetes API
- **Pod Status** - Container states, conditions, restart counts
- **Container Logs** - Error messages, stack traces
- **Metrics** - CPU, memory, network usage
- **Probe Results** - Liveness and readiness probe outcomes

**Key Responsibilities:**
- Extract relevant fields from each source
- Normalize timestamps to a common format
- Tag signals with `ClusterContext` for multi-cluster support
- Preserve source attribution for evidence tracking

**Output:** Stream of `NormalizedSignal` objects with:
- Source type (event, log, status, metric, probe)
- Timestamp
- Resource reference (namespace, kind, name)
- Signal data (structured fields)
- Cluster context

## Layer 2: Incident Engine

The incident engine processes normalized signals to detect failure patterns.

### Symptom Detector (`symptoms.go`)

Identifies specific symptoms from signals:

- **CrashLoopBackOff** - Detected from pod status waiting state
- **OOMKilled** - Detected from container termination reason
- **RestartSpike** - Detected from rapid restart count increases
- **ImagePullError** - Detected from pod status and events
- **NoEndpoints** - Detected from service endpoint counts
- **ProbeFailure** - Detected from pod conditions and probe results

**Detection Rules:**
- Each symptom has specific detection criteria
- Rules are deterministic and rule-based
- Multiple signals can contribute to a single symptom
- Symptoms are tagged with confidence scores

### Pattern Matcher (`matcher.go`)

Maps symptoms to failure patterns with confidence:

- **Pattern Mapping** - Symptoms → Failure patterns (many-to-one)
- **Confidence Scoring** - Calculates confidence based on symptom strength
- **Pattern Aggregation** - Groups related symptoms into patterns

**Pattern Matching Logic:**
- Each pattern has required and optional symptoms
- Confidence increases with more corroborating symptoms
- Patterns can have multiple symptom combinations
- Low-confidence patterns are flagged for review

### Incident Aggregator (`aggregator.go`)

Deduplicates and aggregates incidents:

- **Fingerprinting** - Creates unique fingerprints from pattern + resource
- **Deduplication** - Merges incidents with same fingerprint
- **Occurrence Tracking** - Counts how many times pattern detected
- **Cluster Context Filtering** - Strict filtering by active cluster
- **Cleanup** - Removes incidents from inactive clusters

**Aggregation Strategy:**
- Same pattern + same resource = same incident
- Updates `LastSeen` timestamp on each occurrence
- Increments `Occurrences` counter
- Preserves `FirstSeen` timestamp

## Layer 3: Hot Evidence Builder

Hot evidence is precomputed data that loads instantly for UI performance.

### Hot Evidence Extraction (`hot_evidence_builder.go`)

Extracts frequently-accessed evidence during incident creation:

- **Restart Counts** - Container restart history
- **Exit Codes** - Container termination exit codes
- **Error Strings** - Key error messages from logs
- **Readiness Status** - Pod readiness probe results
- **Recent Changes** - Deployment/config changes before incident

**Performance Characteristics:**
- Extracted synchronously during incident creation
- Stored in incident snapshot
- Cached for fast UI loading
- No additional API calls needed

## Layer 4: Snapshot Builder

Snapshots provide instant loading with precomputed data.

### Snapshot Generation (`snapshot.go`)

Builds comprehensive incident snapshots:

- **Hot Evidence** - Precomputed evidence (from Layer 3)
- **Diagnosis** - Human-readable root cause summary
- **Impact Assessment** - Affected replicas, service exposure
- **Why Now Explanation** - What triggered this incident
- **Recommended Action** - First suggested fix

**Snapshot Structure:**
```go
type IncidentSnapshot struct {
    IncidentID        string
    HotEvidence        HotEvidence
    Diagnosis          Diagnosis
    Impact             ImpactAssessment
    WhyNow             string
    RecommendedAction  string
    CachedAt           time.Time
    TTL                time.Duration  // 5 minutes
}
```

**Caching Strategy:**
- LRU cache with 5-minute TTL
- Cache key: incident ID
- Cache miss triggers rebuild
- Designed for <100ms response (cached) or <500ms (cache miss)

## Layer 5: Cold Evidence (Lazy-Loaded)

Cold evidence is loaded on-demand when users expand sections in the UI.

### Cold Evidence Sources

**Logs** (`/api/v2/incidents/{id}/logs`):
- Container log streams
- Error pattern grouping
- Tail-based retrieval (default: last 20 lines)

**Metrics** (`/api/v2/incidents/{id}/metrics`):
- Resource usage metrics
- Historical trends
- Anomaly detection data

**Changes** (`/api/v2/incidents/{id}/changes`):
- Deployment rollouts
- ConfigMap/Secret updates
- Pod lifecycle changes
- Relevance scoring (0.0-1.0)

**Evidence Pack** (`/api/v2/incidents/{id}/evidence`):
- Structured evidence items
- Categorized by source type
- Full evidence details

**Citations** (`/api/v2/incidents/{id}/citations`):
- Event references
- Log snippets
- Kubernetes documentation links

**Runbooks** (`/api/v2/incidents/{id}/runbooks`):
- Applicable runbooks
- Success rate history
- Risk assessments

**Similar Incidents** (`/api/v2/incidents/{id}/similar`):
- Past incidents with same pattern
- Previous resolutions
- Success rates

## Evidence Pack Structure

Every incident has a structured evidence bundle:

```go
type EvidencePack struct {
    IncidentID    string         // Linked incident
    Events        []EvidenceItem // K8s events
    Logs          []EvidenceItem // Container logs
    StatusFacts   []EvidenceItem // Pod status snapshots
    MetricsFacts  []EvidenceItem // Metric observations
    ChangeHistory []EvidenceItem // Config/deployment changes
    ProbeResults  []EvidenceItem // Liveness/readiness results
}
```

**Evidence Item Structure:**
```go
type EvidenceItem struct {
    Source      string    // event | log | status | metric | change | probe
    Timestamp   time.Time
    Resource    string    // Resource reference
    Data        map[string]interface{}  // Structured data
    Attribution string    // Source attribution (e.g., "[Source: Pod status]")
}
```

## Citations

Every diagnosis includes citations to supporting evidence:

```go
type Citation struct {
    Source string  // event | log | status | doc
    Ref    string  // Exact reference (event ID, log line, URL)
    Text   string  // Cited snippet
    Link   string  // Optional URL for docs
}
```

**Citation Types:**
- **Event references** - Exact K8s event IDs
- **Log snippets** - Relevant log lines with line numbers
- **Kubernetes documentation** - Links to official docs (OOMKilled, CrashLoopBackOff, ImagePullBackOff, DNS failures, RBAC issues, etc.)

## Diagnosis Generation

The diagnosis generator (`diagnosis.go`) creates human-readable summaries:

**Process:**
1. Analyzes all symptoms and evidence
2. Identifies primary root cause
3. Identifies secondary contributing factors
4. Builds evidence-backed explanation
5. Calculates confidence score

**Output Format:**
- Single primary root cause statement
- Optional secondary factors
- Evidence bullets with source attribution
- Confidence level (high/medium/low)
- Deterministic language (no "might be")

## Performance Characteristics

**Hot Path (Snapshot API):**
- Target: <100ms (cached)
- Cache miss: <500ms
- Precomputed data only
- No external API calls

**Cold Path (Lazy-Loaded):**
- On-demand loading
- User-triggered (expand section)
- Cached in-memory while modal open
- No performance impact on initial load

**Memory Efficiency:**
- LRU cache for snapshots (configurable size)
- Cold evidence loaded on-demand
- Automatic cleanup of old incidents
- Cluster context filtering prevents memory bloat

---

**Next:** Learn about the [Snapshot Architecture](snapshot-architecture.md) in detail.

