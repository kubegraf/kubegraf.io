# Runbooks & Remediation

**Audience:** This documentation is for engineers working on or extending KubeGraf's Incident Intelligence System. It provides deep technical details about the runbook-driven fix engine and auto-remediation system.

## Runbook-Driven Fix Engine

Fixes are driven by **runbooks** - predefined, tested remediation procedures. This ensures consistency, safety, and learnability.

## Runbook Model

```go
type Runbook struct {
    ID            string          // Unique runbook ID
    Name          string          // Human-readable name
    Description   string          // What this runbook does
    Pattern       FailurePattern  // Target failure pattern
    Preconditions []Check         // Must pass before execution
    Action        RunbookAction   // The actual fix action
    Verification  []Check         // Must pass after execution
    Rollback      *RunbookAction  // How to undo if verification fails
    Risk          RiskLevel       // low | medium | high | critical
    AutonomyLevel AutonomyLevel   // 0-3 (Observe/Recommend/Propose/Auto-Execute)
    SuccessRate   float64         // Historical success rate (0.0-1.0)
    BlastRadius   int             // Number of resources affected
}
```

### Runbook Components

**Preconditions:**
- Checks that must pass before execution
- Validates resource state
- Ensures safe execution context
- Example: "Pod must exist", "Deployment must have replicas > 0"

**Action:**
- The actual remediation step
- Can be: restart, scale, patch, delete, create
- Includes resource references
- Includes parameter values

**Verification:**
- Checks that must pass after execution
- Validates fix success
- Triggers rollback if fails
- Example: "Pod must be ready", "Service must have endpoints"

**Rollback:**
- How to undo the fix if verification fails
- Optional (required for auto-execute)
- Must restore previous state
- Example: "Restore previous replica count", "Revert patch"

## Built-in Runbooks

| Runbook | Pattern | Risk | Autonomy | Action |
|---------|---------|------|----------|--------|
| `restart-pod` | RESTART_STORM | Low | Auto-Execute (L3) | Delete pod to trigger recreation |
| `scale-up-deployment` | DEPLOYMENT_UNAVAILABLE | Low | Auto-Execute (L3) | Scale deployment +1 replica |
| `rolling-restart` | NO_READY_ENDPOINTS | Low | Auto-Execute (L3) | Rolling restart deployment |
| `increase-memory` | OOM_PRESSURE | Medium | Propose (L2) | Patch memory limits +50% |
| `retry-job` | APP_CRASH | Low | Propose (L2) | Delete failed job to retry |

### Runbook Registry

Runbooks are registered in a central registry (`runbooks.go`):

```go
type RunbookRegistry struct {
    runbooks map[string]*Runbook
    mutex    sync.RWMutex
}
```

**Registration:**
- Runbooks registered at startup
- Can be extended via plugins
- Registry provides lookup by ID or pattern

**Lookup:**
- Find runbooks by failure pattern
- Filter by risk level
- Filter by autonomy level
- Sort by success rate

## Runbook Execution

### Execution Flow

1. **Precondition Checks**
   - Run all precondition checks
   - Fail if any check fails
   - Log failure reason

2. **Action Execution**
   - Execute runbook action
   - Track execution status
   - Capture output/errors

3. **Verification Checks**
   - Wait for resource state to stabilize
   - Run all verification checks
   - Determine success/failure

4. **Rollback (if needed)**
   - If verification fails, execute rollback
   - Restore previous state
   - Log rollback reason

### Execution Modes

**Preview Mode:**
- Shows what would change
- Dry-run validation
- No actual changes
- Used in UI fix preview

**Dry-Run Mode:**
- Kubernetes server-side validation
- Admission controllers run
- Webhooks validate
- No changes made

**Apply Mode:**
- Actual execution
- Changes applied to cluster
- Verification runs
- Rollback on failure

## Auto-Remediation

Auto-remediation automatically executes runbooks when incidents are detected, subject to safety guards.

### Autonomy Levels

| Level | Name | Behavior |
|-------|------|----------|
| 0 | Observe | Only collect data, no recommendations |
| 1 | Recommend | Show suggestions to user |
| 2 | Propose | Show fix preview with diff, require user apply |
| 3 | Auto-Execute | Execute low-risk fixes automatically |

### Safety Guards

Auto-execute only allowed when **all** of these conditions are met:

- ✅ **Confidence ≥ 0.9** (configurable, default 0.9)
- ✅ **Success rate ≥ 0.95** (configurable, default 0.95)
- ✅ **Runbook risk level is Low**
- ✅ **Rollback defined** (required for auto-execute)
- ✅ **Resource not in blocked namespaces**
- ✅ **Runbook autonomy level ≥ 3** (Auto-Execute)

### Blocked Namespaces

These namespaces are never auto-remediated:

- `kube-system`
- `kube-public`
- `kube-node-lease`

### Auto-Remediation Engine

The auto-remediation engine (`autoremediation.go`) manages automatic fix execution:

```go
type AutoRemediationEngine struct {
    enabled     bool
    config      AutoRemediationConfig
    registry    *RunbookRegistry
    decisions   []RemediationDecision
    mutex       sync.RWMutex
}
```

**Decision Process:**
1. Incident detected
2. Find applicable runbooks
3. Check safety guards
4. Make decision: execute, skip, or blocked
5. Execute if approved
6. Track outcome

### Status Tracking

Auto-remediation tracks comprehensive statistics:

- **Total** - Total number of auto-remediation attempts
- **Success** - Successfully applied and verified fixes
- **Failed** - Fixes that failed verification
- **Rolled Back** - Fixes that were rolled back
- **Active** - Currently executing fixes
- **Queued** - Fixes waiting to execute
- **In Cooldown** - Resources in cooldown period (prevents rapid re-execution)

### Cooldown Period

Resources enter cooldown after auto-remediation:

- **Duration:** 5 minutes (configurable)
- **Purpose:** Prevents rapid re-execution on same resource
- **Scope:** Per-resource (not per-incident)
- **Reset:** On manual intervention or incident resolution

### Recent Decisions

The system tracks recent auto-remediation decisions:

```go
type RemediationDecision struct {
    IncidentID    string
    RunbookID     string
    Decision      string  // execute | skip | blocked
    Reason        string
    Confidence    float64
    SuccessRate   float64
    Timestamp     time.Time
}
```

**Decision Reasons:**
- `executed` - Fix was applied
- `skipped_low_confidence` - Confidence below threshold
- `skipped_low_success_rate` - Success rate below threshold
- `blocked_namespace` - Resource in blocked namespace
- `blocked_no_rollback` - No rollback defined
- `blocked_high_risk` - Risk level too high

## Fix Preview and Apply

### Preview API

```bash
POST /api/v2/incidents/{id}/fix-preview
{
  "fixId": "rb-restart-pod",
  "resourceNamespace": "default",
  "resourceKind": "Pod",
  "resourceName": "my-pod"
}
```

**Response:**
- Fix description
- YAML diff (for patches)
- Dry-run command
- Apply command
- Expected impact

### Apply API

```bash
POST /api/v2/incidents/{id}/fix-apply
{
  "fixId": "rb-restart-pod",
  "confirmed": true,
  "resourceNamespace": "default",
  "resourceKind": "Pod",
  "resourceName": "my-pod"
}
```

**Response:**
- Execution status
- Output/errors
- Verification results
- Rollback status (if needed)

### Execution Flow

1. **Validate Request**
   - Check incident exists
   - Check runbook exists
   - Check resource exists
   - Check permissions

2. **Run Preconditions**
   - Execute all precondition checks
   - Fail if any check fails

3. **Execute Action**
   - Run in preview/dry-run/apply mode
   - Capture output
   - Track execution status

4. **Run Verification**
   - Wait for stabilization
   - Execute verification checks
   - Determine success/failure

5. **Handle Rollback**
   - If verification fails, execute rollback
   - Restore previous state
   - Return error

6. **Update Incident**
   - Record fix application
   - Update incident status
   - Track outcome for learning

## Runbook Execution Engine

The runbook executor (`runbooks.go`) handles execution:

```go
type RunbookExecutor struct {
    registry    *RunbookRegistry
    k8sClient   kubernetes.Interface
    mutex       sync.Mutex
}
```

**Execution Methods:**
- `ExecutePreview()` - Preview mode
- `ExecuteDryRun()` - Dry-run mode
- `ExecuteApply()` - Apply mode
- `ExecuteRollback()` - Rollback execution

**Action Types:**
- `RestartPod` - Delete pod to trigger recreation
- `ScaleDeployment` - Change replica count
- `PatchResource` - Apply JSON patch
- `DeleteResource` - Delete resource
- `CreateResource` - Create resource

## Learning Integration

Runbook execution outcomes feed into the learning system:

- **Success Rate Tracking** - Updates runbook success rates
- **Pattern Correlation** - Links runbooks to patterns
- **Resource Correlation** - Tracks success by resource type
- **Feedback Integration** - Incorporates user feedback

This enables:
- Runbook ranking by success rate
- Pattern-specific runbook recommendations
- Continuous improvement of auto-remediation decisions

## API Endpoints

### Auto-Remediation APIs

```bash
# Get auto-remediation status
GET /api/v2/auto-remediation/status

# Response includes:
# {
#   "enabled": true/false,
#   "total": 0,
#   "success": 0,
#   "failed": 0,
#   "rolledBack": 0,
#   "active": 0,
#   "queued": 0,
#   "inCooldown": 0
# }

# Enable auto-remediation globally
POST /api/v2/auto-remediation/enable

# Disable auto-remediation globally
POST /api/v2/auto-remediation/disable

# Get recent decisions (last 20)
GET /api/v2/auto-remediation/decisions
```

### Fix APIs

```bash
# Preview a fix (shows diff, dry-run command)
POST /api/v2/incidents/{id}/fix-preview
{
  "fixId": "rb-restart-pod",
  "resourceNamespace": "default",
  "resourceKind": "Pod",
  "resourceName": "my-pod"
}

# Apply a fix
POST /api/v2/incidents/{id}/fix-apply
{
  "fixId": "rb-restart-pod",
  "confirmed": true,
  "resourceNamespace": "default",
  "resourceKind": "Pod",
  "resourceName": "my-pod"
}
```

---

**Next:** Learn about the [Learning Engine](learning-engine.md) that improves over time.

