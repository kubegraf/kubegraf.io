# Debugging Pods in CrashLoopBackOff

## Why this matters

CrashLoopBackOff means a container in your pod is repeatedly starting and crashing. It usually points to a real bug or a bad configuration.
Every restart wastes resources and delays user traffic; in production this often shows up as 5xx errors, timeouts, or failing background jobs.

## Symptoms

- `kubectl get pods` shows STATUS `CrashLoopBackOff` for one or more pods.
- Service or ingress in front of the workload is returning 5xx or timeouts.
- Containers start, run for a few seconds, then exit with a non-zero code.
- Logs show the same error pattern every time the pod restarts.

## Common root causes

- Application startup failures (missing env vars, invalid config, missing migrations).
- Crash on dependency connection (DB not reachable, message broker auth failure).
- Image mismatch vs expected config (new image expects different env / flags).
- Fatal probe configuration (liveness/readiness probe failing on a new path/port).
- Secrets or ConfigMaps missing, wrong key names, or wrong mount paths.

## How KubeGraf helps

- Highlights CrashLooping pods in the namespace so you don’t hunt through `kubectl` output.
- Shows restart counts, last state (e.g. `Error`, exit code), and recent events next to the pod.
- Lets you pivot quickly between pod logs, events, Deployment, ConfigMap, and Secret.
- Incident timeline view helps correlate: image deployed → config changed → probes failing → CrashLoopBackOff.

## Step-by-step using KubeGraf UI

1. **Confirm the problem in the right cluster/namespace**
   - In a terminal:
     - `kubectl config current-context` → confirm you are in the expected cluster.
     - `kubectl get pods -n <namespace>` to verify CrashLoopBackOff.
   - Start KubeGraf Terminal UI: `kubegraf`.
   - In KubeGraf, check the current context and namespace match what you saw with `kubectl`.

2. **Locate CrashLooping pods**
   - Open the **Pods** view for the affected namespace.
   - Use filters to show only unhealthy pods (status `CrashLoopBackOff` / `Error`).
   - Note:
     - Restart count.
     - Age of the pod.
     - Container name if there are multiple containers.

3. **Inspect recent events and reason**
   - From the pod details, open **Events**.
   - Look for messages like:
     - `Back-off restarting failed container`
     - Probe failures (HTTP 404/500, connection refused).
     - Image pull errors (if the pod never really started).

4. **Inspect logs around the crash**
   - From the same pod, open **Logs**.
   - Scroll to the last 50–100 lines before the container exits.
   - Capture:
     - The exact error message (e.g. `DB_CONNECTION_STRING not set`).
     - Stack traces or exit codes.

5. **Check configuration linked to the pod**
   - From pod details, jump to its **Deployment** (or StatefulSet/Job).
   - From there, review:
     - Container image tag (confirm it’s the version you expect).
     - Environment variables (especially those using ConfigMaps/Secrets).
     - Probes (paths, ports, initial delay, timeouts).
   - Follow links to **ConfigMaps** and **Secrets** referenced by the pod and compare with what the app expects.

6. **Use Incident Timeline / change history**
   - Open the Incident Timeline for this workload / namespace.
   - Look for events just before the CrashLoopBackOff started:
     - New Deployment rollout.
     - ConfigMap or Secret updates.
     - Node/cluster events that could affect scheduling.
   - This helps you decide whether to roll back or fix forward.

7. **Apply fix and watch recovery**
   - Typical fixes:
     - Revert a bad config or Secret value.
     - Fix missing env var or flag.
     - Correct probe path/port.
   - Apply the change using your usual GitOps/CI or `kubectl apply`.
   - In KubeGraf, watch:
     - New pods created.
     - Status transition from `CrashLoopBackOff` → `Running`.
     - Error rate dropping on any linked dashboards (if integrated).

## What to check next

- Are other pods in the same Deployment also impacted, or only one replica?
- Does the issue correlate with a specific node (node-local problem)?
- Is the CrashLoop only in one namespace or across multiple environments (dev/staging/prod)?

## Common mistakes

- Debugging the wrong cluster/namespace because the kubeconfig context was not checked.
- Only looking at logs and ignoring Events (probe misconfig is often obvious there).
- Fixing a single pod manually instead of changing the Deployment/ConfigMap/Secret.
- Rolling back an image without rolling back the config that was changed at the same time.

## Expected outcome

- You can quickly identify whether the CrashLoopBackOff is due to configuration, code, or environment.
- You understand which change introduced the failure and either roll back or roll forward safely.
- All pods for the workload return to `Running` and external symptoms (5xx, latency) disappear.

<!-- TODO: screenshot showing KubeGraf with a CrashLoopBackOff pod selected, logs + events visible. -->
