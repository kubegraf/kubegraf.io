# Kubernetes Deployment Rollout Stuck / ProgressDeadlineExceeded

## Why this matters

A stuck rollout means a new version of your application never becomes healthy.
If you don’t catch it quickly, traffic may be served by a half-updated fleet, or the rollout might silently stall during an incident.
> **Warning:** Do not delete pods manually to unblock a rollout; fix the Deployment spec or roll back instead.

## Symptoms

- `kubectl rollout status deployment/<name>` hangs or reports `progress deadline exceeded`.
- Some pods for the Deployment are `Pending`, `CrashLoopBackOff`, or failing probes.
- New pods are never marked `Ready`, or the number of `Ready` replicas never reaches the desired count.
- HPA or external traffic splits may still be routing to old replicas.

## Common root causes

- Broken image (app fails to start, missing dependency).
- Liveness/readiness probes misconfigured for the new version.
- Resource requests too high for available nodes → unschedulable pods.
- PodDisruptionBudget, affinity/anti-affinity, or node selectors preventing enough replicas from running.
- Networking/DNS issues preventing the app from reaching required backends.

## How KubeGraf helps

- Shows rollout status visually: desired vs updated vs available replicas.
- Highlights pods that are blocking progress (probe failures, CrashLoopBackOff, Pending with scheduling errors).
- Exposes Events attached to pods and the Deployment in one place.
- Lets you inspect the exact spec diff between the previous ReplicaSet and the new one.

## Step-by-step using KubeGraf UI

1. **Confirm the rollout is stuck**
   - In a terminal: `kubectl rollout status deployment/<name> -n <namespace>`.
   - Note any message like `progress deadline exceeded`.
   - Open KubeGraf and select the correct cluster and namespace.

2. **Open the Deployment view**
   - In KubeGraf, go to **Deployments** and select the affected Deployment.
   - Check the summary:
     - Desired replicas.
     - Updated replicas.
     - Available/Ready replicas.

3. **Identify blocking pods**
   - From the Deployment details, open the **ReplicaSets** and **Pods** linked to this rollout.
   - Look for:
     - Pods in `Pending` (scheduling issues).
     - Pods in `CrashLoopBackOff` or `Error`.
     - Pods with failing readiness probes.
   - Use filters to narrow down to non-Ready pods.

4. **Inspect Events for scheduling or probe issues**
   - On a problematic pod, open **Events**.
   - Look for messages like:
     - `0/3 nodes are available: 3 Insufficient cpu/memory`.
     - `Readiness probe failed: HTTP 500/404`.
     - `FailedScheduling` with taints, node selectors, or affinity diagnostics.

5. **Compare new vs previous spec**
   - In the Deployment view, open the history / ReplicaSets panel.
   - Compare the new ReplicaSet to the previous one:
     - Image tag.
     - Resource requests/limits.
     - Probes.
     - Env vars and config references.
   - This helps identify exactly what changed.

6. **Decide: roll back vs fix forward**
   - If the change is clearly broken and you need fast recovery:
     - Use your GitOps/CI pipeline or `kubectl rollout undo deployment/<name>`.
     - In KubeGraf, watch pods for the previous ReplicaSet return to `Ready`.
   - If you can fix forward (e.g. adjust probe or config):
     - Edit the Deployment spec in code.
     - Apply via CI/GitOps.
     - Confirm new pods converge to `Ready`.

7. **Verify impact at the service level**
   - In KubeGraf, move to the **Topology** / **Services** view (if available).
   - Confirm:
     - The Service endpoints are all `Ready`.
     - No backend endpoints are in `NotReady` state.
   - Validate external checks (synthetic probes, API health) if integrated.

## What to check next

- Are other Deployments rolling out at the same time on the same nodes (resource contention)?
- Is there a cluster-wide issue (node pressure, CNI problems) reflected in Events?
- Are there PDBs or policies that restrict how many pods can be unavailable during rollout?

## Common mistakes

- Focusing only on the Deployment object and ignoring pod-level Events.
- Forgetting to check node-level constraints (taints, capacity) when pods are Pending.
- Rolling back image but leaving an incompatible probe or config in place.
- Manually deleting pods to “unstick” rollout instead of fixing the spec.

## Related issues

- [CrashLoopBackOff Kubernetes debugging](/docs/troubleshooting/crashloopbackoff)
- [Pods restarting after ConfigMap or Secret change](/docs/troubleshooting/restarts-after-config-change)
- [Sudden CPU or memory spikes](/docs/troubleshooting/high-cpu-memory)

## Expected outcome

- You understand why the rollout is stalled (scheduling, crash, probes, or config).
- You either roll back safely or apply a corrected spec that converges to the desired `Ready` replicas.
- Future rollouts of this Deployment can be monitored via KubeGraf with clear visibility into progress.

<!-- TODO: screenshot showing KubeGraf Deployment view with rollout status and blocking pods highlighted. -->


