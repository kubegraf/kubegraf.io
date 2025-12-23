# Fix Preview and Apply

This is the most important workflow in KubeGraf: safely previewing and applying fixes to resolve incidents. Every fix goes through a three-stage safety process: Preview, Dry Run, and Apply.

## Overview: The Safety Flow

Before any change touches your cluster, it goes through three stages:

1. **Preview** — See exactly what will change
2. **Dry Run** — Validate the change with Kubernetes (no changes made)
3. **Apply** — Execute the change with full transparency

You can stop at any stage. Nothing changes your cluster until you explicitly confirm the Apply stage.

## Starting the Fix Workflow

### From the Incident Detail View

1. Open an incident that has recommended fixes
2. In the **Recommendations** section, find the fix you want to apply
3. Click **Preview Fix**

This opens the Fix Preview modal, which shows you exactly what will change.

### From the Incidents Table

1. Find an incident with fixes available (the "Fixes" column shows a number)
2. Click the **Actions** menu
3. Select **Preview Fix**

## Stage 1: Preview

The Preview stage shows you what will change before anything happens.

### What You'll See

**Fix Summary** — A clear description of what the fix will do:
- Which resource will be changed
- What property will be updated
- The old value → new value

**YAML Diff** — A side-by-side or unified diff showing:
- Lines that will be added (green, +)
- Lines that will be removed (red, -)
- Lines that will be modified (highlighted)

**Impact Assessment** — What will happen when you apply:
- Which resources will be affected
- Whether pods will be restarted
- Whether services will be interrupted
- Estimated downtime (if any)

**Resource Details** — Information about the resource being changed:
- Resource name and namespace
- Current state
- Labels and annotations

### Understanding the Preview

The preview is your first safety checkpoint. Review it carefully:

- **Is this the right fix?** — Does it address the root cause?
- **Is this the right resource?** — Are you changing what you intend to change?
- **Is the change reasonable?** — Does the new value make sense?

If anything looks wrong, you can close the preview and investigate further. No changes have been made yet.

### Actions Available

- **View Full YAML** — See the complete YAML that will be applied
- **Cancel** — Close the preview without proceeding
- **Continue to Dry Run** — Proceed to validation

## Stage 2: Dry Run

The Dry Run stage validates your change with Kubernetes without making any changes.

### What Happens During Dry Run

KubeGraf sends your change to Kubernetes with the `--dry-run` flag. Kubernetes:

- **Validates the YAML** — Checks syntax and required fields
- **Runs admission controllers** — Applies policies and validations
- **Checks resource quotas** — Verifies you have capacity
- **Validates webhooks** — Runs any custom validation webhooks
- **Checks permissions** — Ensures you have the right to make the change

**Important:** No changes are made to your cluster during dry run. It's purely validation.

### What You'll See

**Dry Run Output** — Real-time output from Kubernetes showing:
- Validation results
- Any warnings
- Resource counts (e.g., "1 resource would be configured")
- Server-side validation messages

**Validation Status** — One of:
- ✅ **Valid** — The change passed all validations
- ⚠️ **Warnings** — The change is valid but has warnings
- ❌ **Invalid** — The change failed validation

**Error Messages** — If validation fails, you'll see:
- What went wrong
- Which validation failed
- How to fix it

### Understanding Dry Run Results

**If dry run succeeds:**
- The change is valid and safe to apply
- Kubernetes has confirmed it can accept the change
- You can proceed to Apply with confidence

**If dry run shows warnings:**
- The change is valid but may have side effects
- Review the warnings carefully
- Decide if the warnings are acceptable

**If dry run fails:**
- The change cannot be applied as-is
- Fix the errors before trying again
- Common issues: syntax errors, missing fields, policy violations

### Actions Available

- **View Full Output** — See complete dry run output
- **Cancel** — Stop here without applying
- **Retry Dry Run** — Run validation again (useful if something changed)
- **Continue to Apply** — Proceed to execution (only if dry run succeeded)

## Stage 3: Apply

The Apply stage executes the change on your cluster. This is the only stage that makes actual changes.

### Before Applying

KubeGraf shows you a final confirmation:

- **What will change** — Summary of the change
- **Dry run status** — Confirmation that validation passed
- **Risk level** — Reminder of the risk level
- **Expected impact** — What will happen

You must explicitly click **Apply** to proceed. This is your last chance to cancel.

### What Happens During Apply

Once you click Apply:

1. **Execution starts** — KubeGraf begins applying the change
2. **Real-time output** — You see live output from kubectl
3. **Progress updates** — Status updates as the change progresses
4. **Completion** — Final status when done

### What You'll See

**Execution Panel** — A panel in the bottom-right corner showing:

- **Status badge** — Running, Succeeded, or Failed
- **Mode badge** — Shows "APPLY" to indicate live execution
- **Step labels** — Visual indicators: Preview → Dry run → Apply
- **Resource summary** — Chips showing what changed:
  - Created: X
  - Updated: Y
  - Deleted: Z
- **Live output** — Real-time log output from the command
- **Timestamps** — When execution started and completed
- **Exit code** — 0 for success, non-zero for failure

**Live Output Stream** — Real-time output showing:
- Command execution progress
- Kubernetes API responses
- Any errors or warnings
- Final confirmation

The output is color-coded:
- **Green/white** — Normal output (stdout)
- **Red** — Errors (stderr)
- **Timestamps** — Each line shows when it occurred

### Understanding Apply Results

**If apply succeeds:**
- The change has been applied to your cluster
- The resource summary shows what changed
- You can verify the change in Kubernetes
- The incident may auto-resolve if the fix worked

**If apply fails:**
- The execution panel shows the error
- No partial changes were made (Kubernetes ensures atomicity)
- Review the error and try again or choose a different fix

### After Applying

**Verify the Fix:**
1. Check the incident detail view — Has the status changed?
2. Check the resource — Is it in the expected state?
3. Check pod logs — Are errors resolved?
4. Monitor metrics — Is the issue improving?

**If the fix worked:**
- The incident may show as "Resolved"
- Related resources should be healthy
- You can close the execution panel

**If the fix didn't work:**
- The incident may still be active
- Review the diagnosis — Was the root cause correct?
- Try a different fix or investigate further

## The Execution Panel

The execution panel is your window into what KubeGraf is doing. It shows:

- **What's happening** — Current stage and status
- **Progress** — Real-time output from commands
- **Results** — What actually changed
- **Errors** — Any failures that occurred

### Using the Execution Panel

**Expand/Collapse** — Click to expand and see full output, or collapse to save space

**Scroll** — The output auto-scrolls, but you can scroll up to review earlier messages

**Copy Output** — Select text to copy for sharing or documentation

**Close** — Click × to close when done (execution history is preserved)

**Retry** — If execution failed, you can retry from the panel

## Safety Features Throughout

At every stage, KubeGraf prioritizes safety:

- **Preview first** — You always see what will change
- **Dry run validation** — Kubernetes validates before execution
- **Explicit confirmation** — You must explicitly click Apply
- **Transparent execution** — You see everything that happens
- **Reversible operations** — Many changes can be undone

## Common Scenarios

### Scenario 1: Fixing a Memory Limit

1. **Preview** — See memory limit change from 512Mi → 1024Mi
2. **Dry Run** — Kubernetes validates the new limit
3. **Apply** — Update the deployment, pods restart with new limit
4. **Verify** — Check that pods are running and incident is resolved

### Scenario 2: Fixing a CrashLoop

1. **Preview** — See environment variable or configuration change
2. **Dry Run** — Validate the new configuration
3. **Apply** — Update the deployment, new pods start with fix
4. **Verify** — Check that pods are running and not crashing

### Scenario 3: Fixing Missing Endpoints

1. **Preview** — See pod selector or label change
2. **Dry Run** — Validate the selector matches pods
3. **Apply** — Update the service, endpoints populate
4. **Verify** — Check that service has ready endpoints

## Best Practices

**Always preview first** — Don't skip the preview stage. It's your first safety checkpoint.

**Review dry run output** — Even if it succeeds, review warnings and messages.

**Verify after applying** — Don't assume the fix worked. Check the resource and incident status.

**Start with low-risk fixes** — If multiple fixes are available, try low-risk ones first.

**Document what you did** — Copy the proof block and execution summary for your records.

**Don't rush** — Take time to understand each stage. Safety is more important than speed.

---

**Summary:** The fix workflow ensures you always know what will change, validates changes before execution, and provides full transparency during application. This three-stage process (Preview → Dry Run → Apply) is designed to prevent mistakes and build confidence.

