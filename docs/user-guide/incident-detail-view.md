# Incident Detail View

The Incident Detail View is where you understand what's happening and decide how to fix it. It provides a complete picture of the incident, with evidence, diagnosis, and actionable recommendations.

## Opening the Detail View

You can open the detail view in two ways:

1. **From the incidents table** — Click anywhere on an incident row
2. **From the actions menu** — Click the Actions menu on an incident row and select "View Details"

The detail view opens as a modal overlay, so you can keep the incidents list visible in the background.

## What You'll See

### Header Section

At the top, you'll see:

**Incident Title** — A clear description of what's happening (e.g., "Pod my-app-abc123 in namespace production is experiencing frequent restarts")

**Badges** — Quick visual indicators:
- Pattern type (e.g., 🔄 CrashLoop)
- Severity (🔴 Critical, 🟠 High, etc.)
- Status (🟢 Active, ✅ Resolved, etc.)
- Confidence level (if available)

**Close Button** — Click × to close and return to the incidents list

### Diagnosis Section

This is the core of the detail view. It shows:

**Root Cause Summary** — A clear, one-sentence explanation of what's wrong (e.g., "Container is crashing repeatedly due to application error")

**Confidence Level** — How confident KubeGraf is in this diagnosis:
- **High** — Evidence is clear and unambiguous
- **Medium** — Evidence points strongly to this conclusion
- **Low** — Evidence suggests this, but more investigation may be needed

**Evidence List** — Expandable list of all evidence that supports the diagnosis:
- Pod status and conditions
- Container states and termination reasons
- Recent Kubernetes events
- Resource relationships (service → endpoints → pods)
- Metrics and resource usage

Each evidence item shows:
- **What** — The observation (e.g., "Pod status shows CrashLoopBackOff")
- **When** — Timestamp of the observation
- **Source** — Where the evidence came from (pod status, event, etc.)

You can expand each evidence item to see full details, including raw values and timestamps.

### Proof Block

Below the evidence, you'll see a **Proof Block** — a copyable summary of the key facts. This includes:

- Root cause statement
- Key evidence points
- Affected resources
- Time range
- Resource details

You can copy this proof block to:
- Share with your team
- Include in incident reports
- Document the issue for later reference

The proof block is formatted for clarity and is self-contained, so it makes sense even without the full detail view.

### Recommendations Section

If KubeGraf has identified fixes, you'll see a **Recommendations** section. Each recommendation shows:

**Fix Description** — What the fix will do (e.g., "Increase memory limit from 512Mi to 1024Mi")

**Risk Level** — How risky this fix is:
- **Low** — Safe to apply, minimal impact
- **Medium** — Some risk, review carefully
- **High** — Significant risk, requires careful consideration

**Expected Impact** — What will happen when you apply the fix (e.g., "Container will be restarted, pod will be recreated")

**Actions** — Buttons to:
- **Preview Fix** — See exactly what will change (opens fix preview)
- **View YAML** — See the YAML that will be applied

### Related Resources

The detail view also shows related Kubernetes resources:

- **Affected Pods** — Pods involved in the incident
- **Related Services** — Services that depend on or are affected by this incident
- **Recent Events** — Kubernetes events related to the incident
- **Deployments** — Deployments that manage the affected pods

Each resource is clickable, so you can navigate directly to it for more details.

### Timeline

If available, you'll see a timeline showing:
- When the incident was first detected
- Key events that occurred
- Status changes over time
- When fixes were applied (if any)

This helps you understand the progression of the incident and correlate it with other events in your cluster.

## Understanding the Diagnosis

The diagnosis is based on **deterministic rules**, not guessing. This means:

- Every conclusion is backed by observable evidence
- You can verify the evidence yourself
- The same problem will always be diagnosed the same way

If KubeGraf can't determine the root cause with confidence, it will say so rather than guessing. You'll see "Low confidence" or "Insufficient evidence" in these cases.

## Using the Detail View During an Incident

**Step 1: Read the root cause summary**
Start with the one-sentence summary at the top. This tells you what's wrong in plain language.

**Step 2: Review the evidence**
Expand the evidence list and review each item. This helps you understand how KubeGraf reached its conclusion and verify it yourself.

**Step 3: Check the proof block**
Copy the proof block if you need to share the diagnosis with others or document it.

**Step 4: Evaluate recommendations**
If fixes are available, review each recommendation:
- Does the fix address the root cause?
- Is the risk level acceptable?
- What's the expected impact?

**Step 5: Preview before applying**
Before applying any fix, always preview it first. This shows you exactly what will change.

## Navigating from the Detail View

The detail view provides several navigation options:

- **View Pod** — Opens the pod details page
- **View Logs** — Opens pod logs in a new view
- **View Events** — Shows related Kubernetes events
- **View YAML** — Shows the resource YAML

These links help you gather additional context before deciding on a fix.

## Closing the Detail View

Click the × button in the top-right corner, or click outside the modal, to close the detail view and return to the incidents list. Your filters and scroll position are preserved, so you can continue reviewing other incidents.

---

**Next:** Learn how to safely [Preview and Apply Fixes](fix-preview-and-apply.md) using KubeGraf's safety features.

