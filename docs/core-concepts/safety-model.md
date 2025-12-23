# Safety Model

KubeGraf is designed to be safe by default. Every action that could change your cluster requires explicit confirmation and provides a way to preview the impact before execution.

## The Safety Principle

The core principle is simple: **Never surprise the user with changes they didn't expect.**

This means:

- **Preview before apply** — You always see what will change before it changes
- **Dry-run by default** — Actions are validated without making changes first
- **Explicit confirmation** — You must explicitly choose to apply changes
- **Reversible operations** — Where possible, changes can be undone

## How Safety Works in Practice

### Preview Mode

Before applying any change, KubeGraf shows you a preview. This preview includes:

- **What will change** — Which resources will be created, updated, or deleted
- **The diff** — For updates, you see exactly what will change (old value → new value)
- **Impact assessment** — How many resources are affected, and what the likely impact is

For example, if you're applying a fix that increases a pod's memory limit, the preview shows:

```
Resource: Pod/my-app-deployment-abc123
Change: Update container memory limit
  memory.limit: 512Mi → 1024Mi
Impact: Container will be restarted, pod will be recreated
```

You can review this preview and decide whether to proceed.

### Dry-Run Validation

Before applying changes, KubeGraf validates them using Kubernetes' server-side dry-run. This means:

- **Kubernetes validates the change** — Admission controllers, webhooks, and policies all run
- **You see validation results** — Any errors or warnings appear before you apply
- **No changes are made** — The cluster state remains unchanged

Dry-run catches problems like:

- **Invalid YAML** — Syntax errors, missing required fields
- **Policy violations** — Pod security policies, network policies, resource quotas
- **Admission controller rejections** — Custom validations that prevent the change
- **Resource conflicts** — Names already in use, immutable fields that can't be changed

If dry-run fails, you see the error and can fix it before trying again. If it succeeds, you know the change is valid and safe to apply.

### Explicit Confirmation

Even after preview and dry-run, KubeGraf requires explicit confirmation before applying changes. This is a deliberate step that prevents accidental execution.

The confirmation step gives you one last chance to:

- **Review the preview** — Make sure you understand what will change
- **Check the context** — Verify you're applying the fix to the right resource
- **Consider alternatives** — Decide if this is really the right fix

Only when you explicitly confirm (by clicking "Apply" or equivalent) does KubeGraf execute the change.

### Execution Transparency

During execution, KubeGraf shows you:

- **What's happening** — Real-time output from the command
- **Progress** — Which resources have been updated, which are in progress
- **Errors** — Any failures that occur during execution
- **Final state** — What actually changed after execution completes

This transparency means you always know what KubeGraf is doing. There are no hidden operations, no silent failures, no surprises.

## Safety for Different Operation Types

### YAML Apply

When applying YAML changes:

1. **Parse and validate** — Check YAML syntax and structure
2. **Show diff** — Display what will change (create/update/delete)
3. **Dry-run** — Validate with Kubernetes server-side dry-run
4. **Show dry-run output** — Display validation results
5. **Request confirmation** — Wait for explicit "Apply" confirmation
6. **Execute** — Apply the changes with real-time output
7. **Show results** — Display what actually changed

At any point before step 6, you can cancel without making changes.

### Resource Scaling

When scaling a deployment:

1. **Show current state** — Current replica count
2. **Show target state** — Desired replica count
3. **Preview impact** — How many pods will be created or deleted
4. **Dry-run** — Validate the scale operation
5. **Request confirmation** — Wait for explicit "Scale" confirmation
6. **Execute** — Scale with real-time output
7. **Show results** — Final replica count and pod status

### Remediation Actions

When applying a recommended fix:

1. **Show the recommendation** — What fix is being suggested
2. **Show the evidence** — Why this fix is recommended
3. **Show the preview** — What will change if you apply the fix
4. **Dry-run** — Validate the fix
5. **Request confirmation** — Wait for explicit confirmation
6. **Execute** — Apply the fix
7. **Show results** — What changed and whether the fix worked

## What Safety Doesn't Mean

Safety doesn't mean KubeGraf will never make changes. It means:

- **You're always in control** — You decide when to apply changes
- **You're always informed** — You know what will change before it changes
- **You can always verify** — You can check the preview, dry-run results, and execution output

Safety also doesn't mean KubeGraf prevents all mistakes. If you apply a fix that's wrong for your situation, KubeGraf will apply it (after you confirm). Safety is about preventing *accidental* changes, not preventing *incorrect* changes.

## Reversibility

Some operations are reversible:

- **Scaling** — You can scale back down
- **Resource updates** — You can revert to previous values
- **YAML changes** — You can apply the previous version

KubeGraf doesn't automatically revert changes, but it makes it easy to do so by:

- **Showing previous values** — In diffs and history
- **Providing rollback options** — For deployments and similar resources
- **Maintaining change history** — So you can see what changed when

For operations that aren't easily reversible (like deleting resources), KubeGraf is extra cautious, requiring additional confirmation or showing clear warnings.

## The Trust Factor

KubeGraf's safety model is designed to build trust. When you know that:

- Changes are always previewed
- Validation happens before execution
- You have explicit control over when changes are applied
- You can see exactly what happened

You can use KubeGraf with confidence, even in production environments. The safety model ensures that KubeGraf helps you fix problems without creating new ones.

---

**Summary:** KubeGraf's safety model ensures that every change is previewed, validated, and explicitly confirmed before execution. This prevents accidental changes and builds trust through transparency and control.

