# Snapshot Architecture

**Audience:** This documentation is for engineers working on or extending KubeGraf's Incident Intelligence System. It provides deep technical details about the snapshot system that enables instant incident loading.

## Overview

The snapshot system provides instant loading of incident details by precomputing and caching frequently-accessed data. This enables the UI to display incident information in <100ms (cached) or <500ms (cache miss), creating a responsive user experience.

## Snapshot API

### Endpoint

```bash
GET /api/v2/incidents/{id}/snapshot
```

### Response Structure

The snapshot response includes all data needed for initial UI rendering:

```go
type IncidentSnapshot struct {
    IncidentID        string
    HotEvidence       HotEvidence
    Diagnosis         Diagnosis
    Impact            ImpactAssessment
    WhyNow            string
    RecommendedAction string
    CachedAt          time.Time
    TTL               time.Duration  // 5 minutes
}
```

### Hot Evidence

Hot evidence is precomputed during incident creation and included in the snapshot:

```go
type HotEvidence struct {
    RestartCounts    []RestartCount    // Container restart history
    ExitCodes        []ExitCode        // Container termination codes
    ErrorStrings     []ErrorString     // Key error messages
    ReadinessStatus  ReadinessStatus   // Pod readiness probe results
    RecentChanges    []Change          // Changes before incident
}
```

**Restart Counts:**
- Container name
- Current restart count
- Restart pattern (spike, steady, increasing)
- Time since last restart

**Exit Codes:**
- Container name
- Exit code (137 = OOMKilled, 0 = success, etc.)
- Termination reason
- Last termination timestamp

**Error Strings:**
- Extracted from logs
- Most frequent errors
- Error pattern signatures
- Sample log lines

**Readiness Status:**
- Pod readiness condition
- Probe failure reasons
- Last probe timestamp
- Probe configuration

**Recent Changes:**
- Deployment rollouts
- ConfigMap/Secret updates
- Resource changes
- Time delta from incident start

### Diagnosis

Precomputed diagnosis included in snapshot:

```go
type Diagnosis struct {
    Summary           string    // One-line root cause
    PrimaryCause      string    // Main root cause
    SecondaryCauses   []string  // Contributing factors
    Confidence        float64   // 0.0-1.0
    EvidenceSummary   []string  // Key evidence points
}
```

### Impact Assessment

Impact analysis included in snapshot:

```go
type ImpactAssessment struct {
    AffectedReplicas  int       // Number of affected pods
    ServiceExposure   string    // Ingress/service impact
    UserFacing        bool      // Likely user-facing
    BlastRadius       string    // critical | high | medium | low
}
```

### Why Now Explanation

Precomputed explanation of what triggered the incident:

- Recent changes that correlate
- Time-based triggers
- Resource state changes
- External factors

### Recommended Action

First suggested fix (if confidence ≥ 80%):

- Fix description
- Runbook ID
- Risk level
- Expected impact

## Caching Strategy

### Cache Implementation

The snapshot cache uses an LRU (Least Recently Used) cache:

```go
type SnapshotCache struct {
    cache    *lru.Cache  // LRU cache
    ttl      time.Duration  // 5 minutes
    mutex    sync.RWMutex
}
```

**Cache Key:** Incident ID (string)

**Cache Value:** `IncidentSnapshot` with `CachedAt` timestamp

**TTL:** 5 minutes (configurable)

### Cache Operations

**Get:**
1. Check cache for incident ID
2. If found, check TTL (current time - CachedAt < TTL)
3. If valid, return cached snapshot
4. If expired or missing, trigger rebuild

**Set:**
1. Build snapshot (or retrieve from cache if still valid)
2. Set `CachedAt` to current time
3. Store in LRU cache
4. Evict oldest entries if cache full

**Invalidation:**
- Automatic: TTL expiration
- Manual: On incident update
- On cluster switch: Clear all snapshots

### Performance Targets

**Cached Response:**
- Target: <100ms
- Includes: Cache lookup + JSON serialization
- No external API calls
- No database queries

**Cache Miss:**
- Target: <500ms
- Includes: Snapshot rebuild + cache store
- May include: Hot evidence extraction
- No cold evidence loading

## Snapshot Builder

### Build Process

The snapshot builder (`snapshot.go`) constructs snapshots:

1. **Load Incident** - Retrieve incident from storage
2. **Extract Hot Evidence** - Run hot evidence builder
3. **Generate Diagnosis** - Run diagnosis generator
4. **Assess Impact** - Calculate impact metrics
5. **Determine Why Now** - Analyze recent changes
6. **Select Recommended Action** - Choose first fix (if confidence ≥ 80%)
7. **Cache Snapshot** - Store in LRU cache with TTL

### Hot Evidence Builder

The hot evidence builder (`hot_evidence_builder.go`) extracts frequently-accessed evidence:

**Restart Counts:**
- Query pod status for container restart counts
- Analyze restart patterns
- Extract time-based trends

**Exit Codes:**
- Query container termination states
- Extract exit codes and reasons
- Identify OOMKilled (exit code 137)

**Error Strings:**
- Sample recent logs (last 20 lines)
- Extract error patterns
- Identify common error signatures

**Readiness Status:**
- Query pod conditions
- Extract readiness probe results
- Identify probe failure reasons

**Recent Changes:**
- Query deployment history (last 60 minutes)
- Query ConfigMap/Secret changes
- Calculate relevance scores
- Sort by time delta

### Diagnosis Generator Integration

The snapshot builder uses the diagnosis generator (`diagnosis.go`):

- Analyzes all symptoms and evidence
- Generates human-readable summary
- Calculates confidence score
- Includes evidence bullets

### Impact Calculator

Calculates impact metrics:

- **Affected Replicas:** Count of pods affected by incident
- **Service Exposure:** Whether incident affects user-facing services
- **User-Facing Likelihood:** Probability of user impact
- **Blast Radius:** Severity based on affected resources

## Cold Evidence (Lazy-Loaded)

Cold evidence is **not** included in snapshots. It's loaded on-demand when users expand sections in the UI.

### Cold Evidence Endpoints

**Logs:**
```bash
GET /api/v2/incidents/{id}/logs?tail=20
```
- Loads container logs on-demand
- Groups by error pattern
- Returns top error patterns

**Metrics:**
```bash
GET /api/v2/incidents/{id}/metrics
```
- Loads resource usage metrics
- Historical trends
- Anomaly detection data

**Changes:**
```bash
GET /api/v2/incidents/{id}/changes?lookback=60
```
- Loads change history
- Relevance scoring
- Time-based correlation

**Evidence Pack:**
```bash
GET /api/v2/incidents/{id}/evidence
```
- Structured evidence items
- Categorized by source
- Full evidence details

**Citations:**
```bash
GET /api/v2/incidents/{id}/citations
```
- Event references
- Log snippets
- Kubernetes documentation links

**Runbooks:**
```bash
GET /api/v2/incidents/{id}/runbooks
```
- Applicable runbooks
- Success rate history
- Risk assessments

**Similar Incidents:**
```bash
GET /api/v2/incidents/{id}/similar
```
- Past incidents with same pattern
- Previous resolutions
- Success rates

### Lazy Loading Strategy

**UI Trigger:**
- User expands section in incident detail view
- UI makes API call to cold evidence endpoint
- Response cached in-memory while modal open
- No cache persistence across modal closes

**Performance:**
- Cold evidence loading doesn't block initial render
- Snapshot loads instantly (<100ms)
- Cold evidence loads in background
- Progressive enhancement pattern

## Cache Invalidation

### Automatic Invalidation

**TTL Expiration:**
- Snapshots expire after 5 minutes
- Next request triggers rebuild
- Fresh snapshot cached

**Incident Updates:**
- When incident status changes
- When new occurrences detected
- When incident resolved
- Cache entry invalidated

### Manual Invalidation

**Cluster Switch:**
- All snapshots cleared
- Prevents showing stale data
- New snapshots built on demand

**User Action:**
- Refresh button in UI
- Forces snapshot rebuild
- Updates cache

## Memory Management

### Cache Size Limits

**LRU Cache:**
- Configurable maximum size (default: 1000 entries)
- Evicts oldest entries when full
- Prevents unbounded memory growth

**Memory Per Snapshot:**
- Hot evidence: ~5-10 KB
- Diagnosis: ~1-2 KB
- Impact: ~0.5 KB
- Total: ~10-15 KB per snapshot

**Total Memory:**
- 1000 snapshots × 15 KB = ~15 MB
- Acceptable for production use
- Configurable via cache size

### Cleanup Strategy

**Incident Cleanup:**
- Old incidents removed from storage
- Corresponding snapshots evicted
- Prevents memory leaks

**Cluster Context:**
- Snapshots filtered by cluster context
- Snapshots from other clusters not cached
- Reduces memory usage in multi-cluster setups

## Performance Monitoring

### Metrics

The snapshot system tracks:

- **Cache Hit Rate** - Percentage of requests served from cache
- **Cache Miss Rate** - Percentage requiring rebuild
- **Average Response Time** - Cached vs. cache miss
- **Cache Size** - Current number of cached snapshots
- **Memory Usage** - Total memory used by cache

### Optimization Opportunities

**Cache Warming:**
- Pre-build snapshots for active incidents
- Reduces cache miss rate
- Improves perceived performance

**Parallel Building:**
- Build multiple snapshots concurrently
- Reduces rebuild time on cache miss
- Improves throughput

**Compression:**
- Compress cached snapshots
- Reduces memory usage
- Trade-off: CPU for memory

---

**Next:** Learn about [Runbooks & Remediation](runbooks-and-remediation.md) for fixing incidents.

