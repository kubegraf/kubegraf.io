# Pods Restarting After ConfigMap or Secret Change

## Why this matters

ConfigMap or Secret changes are a common source of drift between expectations and reality.
If pods restart after a config change, you can end up with partial rollouts, inconsistent behavior, or downtime if the new config is invalid.

## Symptoms

- Shortly after applying a ConfigMap or Secret change, pods for a workload start restarting.
- `kubectl get pods` shows increasing restart counts for the same pods.
- Logs show new errors about missing keys, invalid values, or auth failures.
- Users report errors immediately after a configuration deployment.

## Common root causes

- ConfigMap keys renamed or removed but the application still expects them.
- Secrets rotated but pods are still using old value assumptions (e.g. certificate chain changes).
- Config syntax errors (YAML/JSON) that the application fails to parse on startup.
- Mismatch between mounted path and what the application expects.
- Sidecars referencing the same config but not updated properly.

## How KubeGraf helps

- Incident timeline shows exactly when ConfigMaps/Secrets changed relative to pod restarts.
- Pod details view surfaces restart counts, reasons, and timestamps.
- Easy navigation from a pod to its referenced ConfigMaps and Secrets.
- Lets you visualize which workloads share a given ConfigMap/Secret.

## Step-by-step using KubeGraf UI

1. **Confirm restarts and time window**
   - In a terminal:
     - `kubectl get pods -n <namespace>` and note which pods have rising restart counts.
   - Open KubeGraf, select cluster and namespace.
   - In the **Pods** view, sort by restart count or filter to pods with `> 0` restarts.

2. **Check recent Events and restart reasons**
   - For a restarting pod, open **Events** and **Status**.
   - Note:
     - `Last State` (e.g. `Terminated` with exit code).
     - Any probe failures or container exit reasons.

3. **Correlate with ConfigMap/Secret changes**
   - Open the Incident Timeline for the workload or namespace.
   - Look for entries like:
     - `ConfigMap <name> updated`.
     - `Secret <name> updated`.
   - Compare the time these changes were applied with the first observed restarts.

4. **Inspect current config content**
   - From the pod details, follow links to referenced ConfigMaps/Secrets.
   - For each relevant object:
     - Verify keys expected by the application are present.
     - Check for obvious typos, missing values, or wrong formats.
     - Confirm mounted paths (if using volume mounts) match the app’s configuration.

5. **Decide rollback vs fix**
   - If the new config is clearly wrong and breaking prod:
     - Roll back to the last known-good version via your config repo / GitOps.
     - Watch pods in KubeGraf to confirm restarts stop.
   - If you can fix forward quickly:
     - Correct the ConfigMap/Secret.
     - Apply via CI/GitOps.
     - Again, watch restart counts in KubeGraf.

6. **Verify behavior after change**
   - Confirm pods stop restarting and remain in `Running`.
   - Validate key paths in the application (e.g. endpoints that depend on the changed config).
   - If available, check downstream dependencies (DB, queues) for normal behavior.

## What to check next

- Do other workloads reference the same ConfigMap/Secret and show similar restarts?
- Did the change also modify probes, ports, or URLs indirectly (e.g. base URL config)?
- Are you rotating Secrets in a way that’s compatible with all workloads using them?

## Common mistakes

- Editing ConfigMaps/Secrets directly in the cluster and forgetting to update Git (drift).
- Assuming an application reloads config dynamically when it actually requires a restart.
- Changing config format without updating validation in the application.
- Overlooking sidecars or jobs that also depend on the same Secret.

## Expected outcome

- You can clearly attribute pod restarts to a specific ConfigMap or Secret change.
- You either roll back to a known-good config or apply a corrected version.
- Pods stabilize, restart counts stop increasing, and behavior matches expectations.

<!-- TODO: screenshot showing KubeGraf Incident Timeline with a ConfigMap change followed by pod restarts. -->
