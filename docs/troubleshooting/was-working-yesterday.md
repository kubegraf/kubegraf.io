# "It Was Working Yesterday" Kubernetes Incident Playbook

## Why this matters

These incidents are common in shared clusters: something breaks today that was fine yesterday.
Without a structured approach, you can waste hours guessing which change or dependency is responsible.
> **Pro tip:** Treat the Incident Timeline as your single source of truth for "what actually changed".

## Symptoms

- A service that was healthy yesterday is now failing (5xx, timeouts, or incorrect behavior).
- No one is sure what changed: "no code change", "no infra change".
- Multiple teams share the cluster, and changes may have landed in infra, network, or dependencies.

## Common root causes

- A deployment, job, or config change merged by another team.
- Underlying dependency changes (database maintenance, certificate rotation, DNS update).
- Cluster-level upgrades (Kubernetes version, CNI, ingress controller).
- Capacity changes (nodes added/removed, spot interruptions).
- Time-based behavior (feature flags, cron jobs, certificates expiring).

## How KubeGraf helps

- Provides a timeline of changes for a service and its namespace (deploys, config changes, node events).
- Lets you quickly compare current state (pods, endpoints, config) with previous known-good state.
- Helps trace dependencies via topology so you can see what this service talks to.

## Step-by-step using KubeGraf UI

1. **Clarify the blast radius**
   - Identify which endpoint, namespace, or service is affected.
   - In KubeGraf, select the cluster and namespace where the service runs.
   - Use the **Topology** or **Services** view to confirm which workloads are involved.

2. **Open the Incident Timeline for the service/namespace**
   - Focus on the time window from "last known good" to now (e.g. last 24 hours).
   - Look for:
     - Deployments or rollouts.
     - ConfigMap/Secret updates.
     - Node-level events (drains, cordons, crashes).
     - Ingress or service changes.

3. **Correlate first failure with a specific change**
   - Align:
     - Time of first error (from logs/monitoring) with
     - Nearest change in the Incident Timeline.
   - Create a short list of candidate changes to investigate.

4. **Inspect current workload state**
   - For the primary service:
     - Check Deployment status, pod health, and restarts in KubeGraf.
     - Verify Service endpoints are all `Ready`.
   - Follow edges in the topology to key dependencies (DB, cache, other services) and check their health too.

5. **Compare config and environment**
   - From the workload, open linked ConfigMaps/Secrets in KubeGraf.
   - Confirm:
     - Expected keys and values are present.
     - No unexpected overrides landed recently.
   - If you have previous config snapshots (via Git), compare with the current version.

6. **Check cluster and node events**
   - Use KubeGraf’s node/cluster views to look for:
     - Node drains or terminations where your pods were running.
     - Warnings about CNI, storage, or kubelet issues.
   - If the service moved nodes recently, check behavior before/after the move.

7. **Narrow down and test hypotheses**
   - Based on the most likely change:
     - Roll back the suspect Deployment or config.
     - Or apply a targeted fix (probe config, resource limits, DNS settings, etc.).
   - Watch the service in KubeGraf and your external monitoring to see if it returns to healthy.

## What to check next

- Are other services in the same namespace or on the same nodes also degraded?
- Did any shared infra (ingress, gateway, database) change in the same time window?
- Are there time-based triggers (cron jobs, cert expiry) that align with the failure time?

## Common mistakes

- Anchoring on "nothing changed" instead of verifying change history.
- Investigating only the app code and ignoring infra and dependencies.
- Making manual changes in prod outside of the normal change pipeline, causing drift.
- Not documenting the final root cause, so the same incident pattern repeats.

## Related issues

- [CrashLoopBackOff Kubernetes debugging](/docs/troubleshooting/crashloopbackoff)
- [Deployment rollout stuck / ProgressDeadlineExceeded](/docs/troubleshooting/rollout-stuck)
- [Pods restarting after ConfigMap or Secret change](/docs/troubleshooting/restarts-after-config-change)

## Expected outcome

- You use KubeGraf to get a concrete list of recent changes instead of guessing.
- You identify the change (or external dependency) that broke the previously working system.
- You roll back or fix forward and restore the service to its previous healthy state.

<!-- TODO: screenshot showing KubeGraf Incident Timeline around a 24h window with multiple changes. -->


