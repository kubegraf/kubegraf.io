# Learning Engine

**Audience:** This documentation is for engineers working on or extending KubeGraf's Incident Intelligence System. It provides deep technical details about how the system learns from incidents to improve over time.

## Overview

The learning engine analyzes past incidents to improve pattern detection, runbook recommendations, and auto-remediation decisions. It operates entirely locally, using SQLite for storage and in-memory processing for real-time analysis.

## Core Components

### Incident Clusters

Similar incidents are grouped by fingerprint for pattern recognition:

```go
type IncidentCluster struct {
    Fingerprint    string        // Unique cluster identifier
    Pattern        FailurePattern // Common pattern
    Count          int           // Number of incidents in cluster
    FirstSeen      time.Time     // First occurrence
    LastSeen       time.Time     // Most recent occurrence
    Resources      []string      // Affected resources
    Resolutions    []Resolution  // How incidents were resolved
    SuccessRate    float64       // Overall success rate
}
```

**Clustering Logic:**
- Incidents with same pattern + similar symptoms = same cluster
- Fingerprint based on pattern + resource type + symptom signature
- Clusters updated as new incidents detected
- Used for similarity matching

### Pattern Statistics

Track per-pattern metrics:

```go
type PatternStats struct {
    Pattern         FailurePattern
    Occurrences     int           // Total occurrences
    Resolutions     int           // Number resolved
    MTTR            time.Duration // Mean time to resolve
    SuccessRate     float64       // Resolution success rate
    CommonCauses    []string      // Most common root causes
    CommonFixes     []string      // Most common fixes
}
```

**Tracked Metrics:**
- **Occurrences** - How many times pattern detected
- **Resolutions** - How many times resolved
- **MTTR** - Mean time to resolve (average resolution time)
- **Success Rate** - Percentage of successful resolutions
- **Common Causes** - Most frequent root causes
- **Common Fixes** - Most effective fixes

### Runbook Ranking

Runbooks are ranked by past success rate for each pattern:

```go
type RunbookRanking struct {
    RunbookID      string
    Pattern        FailurePattern
    SuccessRate    float64       // Historical success rate
    ExecutionCount int          // Number of times executed
    LastSuccess    time.Time     // Last successful execution
    Rank           int           // Ranking (1 = best)
}
```

**Ranking Criteria:**
1. Success rate (higher = better)
2. Execution count (more data = more reliable)
3. Recency (recent success = higher rank)

**Usage:**
- Recommend highest-ranked runbook first
- Filter runbooks by minimum success rate
- Improve auto-remediation decisions

### Anomaly Detection

New or unusual patterns are flagged for review:

```go
type Anomaly struct {
    IncidentID     string
    Pattern        FailurePattern
    AnomalyType    string        // new_pattern | unusual_symptoms | rare_combination
    Confidence     float64       // Anomaly confidence
    Explanation    string        // Why this is anomalous
    Timestamp      time.Time
}
```

**Anomaly Types:**
- **New Pattern** - Pattern never seen before
- **Unusual Symptoms** - Symptom combination not typical
- **Rare Combination** - Pattern + resource type rarely seen together
- **Temporal Anomaly** - Pattern at unusual time

**Detection Logic:**
- Compare against historical patterns
- Flag if below frequency threshold
- Flag if symptom combination unusual
- Flag if temporal pattern unexpected

## Storage

### SQLite Database

The learning engine uses SQLite for persistent storage:

**Tables:**
- `incident_clusters` - Incident cluster definitions
- `pattern_stats` - Per-pattern statistics
- `runbook_rankings` - Runbook success rates by pattern
- `anomalies` - Detected anomalies
- `feedback` - User feedback on incidents
- `outcomes` - Fix execution outcomes

**Location:** `~/.kubegraf/learning.db` (or configured path)

**Schema:**
- Optimized for read-heavy workloads
- Indexed on pattern, fingerprint, timestamp
- Automatic cleanup of old data

### In-Memory Processing

Real-time analysis uses in-memory data structures:

- **Cluster Map** - Fast lookup by fingerprint
- **Pattern Stats Cache** - Cached pattern statistics
- **Runbook Rankings Cache** - Cached runbook rankings
- **Anomaly Queue** - Recent anomalies for review

**Performance:**
- Sub-millisecond lookups
- No database queries for hot paths
- Periodic sync to database

## Learning Process

### Incident Analysis

When an incident is detected:

1. **Cluster Matching**
   - Find existing cluster by fingerprint
   - Create new cluster if not found
   - Update cluster statistics

2. **Pattern Stats Update**
   - Increment occurrence count
   - Update MTTR if resolved
   - Track resolution method

3. **Anomaly Check**
   - Compare against historical patterns
   - Flag if anomalous
   - Log for review

### Resolution Learning

When an incident is resolved:

1. **Outcome Recording**
   - Record resolution method
   - Record time to resolve
   - Record success/failure

2. **Runbook Ranking Update**
   - Update success rate if runbook used
   - Increment execution count
   - Update last success timestamp

3. **Pattern Stats Update**
   - Update resolution count
   - Update MTTR
   - Update success rate

### Feedback Integration

User feedback improves learning:

```go
type Feedback struct {
    IncidentID     string
    Outcome        string  // worked | not_worked | incorrect_cause
    AppliedFixID   string  // Optional: which fix was applied
    AppliedFixType string  // Optional: fix type
    Notes          string  // Optional: user notes
    Timestamp      time.Time
}
```

**Feedback Types:**
- `worked` - Applied fix was successful
- `not_worked` - Applied fix didn't work
- `incorrect_cause` - Root cause diagnosis was incorrect

**Learning Impact:**
- Update runbook success rates
- Adjust pattern statistics
- Improve diagnosis accuracy
- Refine recommendations

## Similar Incidents

Find similar past incidents for each current incident:

```go
type SimilarIncident struct {
    IncidentID     string
    Pattern        FailurePattern
    Similarity     float64       // 0.0-1.0 similarity score
    CommonSymptoms []string      // Shared symptoms
    Resolution     string        // How it was resolved
    Success        bool          // Was resolution successful
    Timestamp      time.Time     // When it occurred
}
```

**Similarity Matching:**
- Same failure pattern
- Similar resource types
- Comparable symptoms
- Similar symptom combinations

**Usage:**
- Show in Knowledge Bank section
- Suggest proven fixes
- Learn from past resolutions
- Improve recommendations

## API Endpoints

### Learning APIs

```bash
# Get incident clusters
GET /api/v2/learning/clusters

# Get learned patterns (including anomalies)
GET /api/v2/learning/patterns?anomalies=true

# Get pattern trends
GET /api/v2/learning/trends

# Find similar incidents
GET /api/v2/learning/similar?incidentId={id}
```

### Feedback API

```bash
# Submit feedback for an incident
POST /api/v2/incidents/{id}/feedback
{
  "outcome": "worked|not_worked|incorrect_cause",
  "appliedFixId": "rb-restart-pod",  # Optional
  "appliedFixType": "restart",        # Optional
  "notes": "Fixed by restarting pod"  # Optional
}

# Response includes learning status and outcome ID
# {
#   "status": "success",
#   "message": "Feedback recorded",
#   "outcomeId": 123,
#   "learningStatus": { ... }
# }
```

## Learning Engine Implementation

### Core Engine

```go
type LearningEngine struct {
    db            *sql.DB
    clusters      map[string]*IncidentCluster
    patternStats  map[FailurePattern]*PatternStats
    runbookRanks  map[string][]*RunbookRanking
    anomalies     []*Anomaly
    mutex         sync.RWMutex
}
```

**Operations:**
- `AnalyzeIncident()` - Analyze new incident
- `RecordResolution()` - Record incident resolution
- `ProcessFeedback()` - Integrate user feedback
- `FindSimilar()` - Find similar past incidents
- `DetectAnomalies()` - Flag anomalous patterns
- `UpdateRankings()` - Update runbook rankings

### Data Sync

**In-Memory → Database:**
- Periodic sync (every 5 minutes)
- On critical updates (resolution, feedback)
- On shutdown

**Database → In-Memory:**
- On startup
- On pattern stats request
- On cluster lookup

## Performance Characteristics

**Query Performance:**
- Similar incidents: <50ms (in-memory)
- Pattern stats: <10ms (cached)
- Runbook rankings: <20ms (cached)

**Storage:**
- SQLite database: ~1-10 MB (depends on history)
- In-memory cache: ~5-20 MB (depends on active clusters)

**Scalability:**
- Handles thousands of incidents
- Automatic cleanup of old data
- Efficient indexing for fast lookups

## Integration Points

### Incident Detection

Learning engine receives incidents from:
- Incident aggregator (new incidents)
- Incident manager (resolved incidents)
- User feedback (outcomes)

### Runbook Recommendations

Learning engine provides:
- Runbook rankings for pattern matching
- Success rate data for safety guards
- Historical context for recommendations

### Auto-Remediation

Learning engine influences:
- Auto-execute decisions (success rate threshold)
- Runbook selection (highest ranked)
- Cooldown periods (based on past failures)

## Future Enhancements

Potential improvements:

- **Machine Learning** - Pattern discovery via ML (local, opt-in)
- **Predictive Analytics** - Predict incidents before they occur
- **Trend Analysis** - Identify long-term patterns
- **Cross-Cluster Learning** - Learn from multiple clusters (opt-in)
- **Custom Rules** - User-defined learning rules

---

**Summary:** The learning engine continuously improves the system by analyzing past incidents, tracking success rates, and incorporating user feedback. It operates entirely locally and provides actionable insights for better incident resolution.

