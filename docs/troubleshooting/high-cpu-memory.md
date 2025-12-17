# Sudden CPU or Memory Spikes

## Why this matters

Unexpected CPU or memory spikes can degrade latency, trigger throttling, or cause OOM kills.
If left unchecked, noisy workloads can starve other services on shared nodes and cause cascading failures.

## Symptoms

- Monitoring shows a sharp increase in CPU or memory usage for a workload, namespace, or node.
- Pods are being OOMKilled (`Reason=OOMKilled` in container status).
- Requests are being throttled (`cpu` throttling observed, higher latency).
- HPA scales pods up aggressively, or can’t scale because of node limits.

## Common root causes

- Recent code change introducing heavier computation or inefficient queries.
- Increased traffic or new background jobs enabled.
- Resource requests/limits set too low or too high relative to real usage.
- Memory leaks or unbounded caches in the application.
- Noisy neighbor effect from another workload on the same node.

## How KubeGraf helps

- Surfaces per-workload and per-node resource usage in one place.
- Topology/resource views help you see which namespaces/workloads are generating load.
- Links pods to their nodes so you can spot noisy neighbors.
- Incident timeline can show correlation between deploys, config changes, and resource spikes.

## Step-by-step using KubeGraf UI

1. **Identify the scope of the spike**
   - Start from your external monitoring alert (service, namespace, or node).
   - Open KubeGraf and select the relevant cluster.
   - Use the **Topology** or **Resource Map** view to:
     - Find the namespace and workload with elevated CPU/memory.
     - Confirm whether it’s isolated to one service or widespread.

2. **Inspect workload-level metrics**
   - Select the suspect Deployment/StatefulSet.
   - Check resource usage panels (if available):
     - CPU requests vs actual usage.
     - Memory requests vs actual usage and OOM events.
   - Note whether HPA is scaling as expected.

3. **Drill into pods and nodes**
   - From the workload, list pods and their nodes.
   - Look for:
     - Pods with `Reason=OOMKilled` in container status.
     - Pods on the same node showing elevated usage.
   - If a single node is hot, inspect other workloads on that node.

4. **Correlate with recent changes**
   - Open the Incident Timeline for the workload/namespace.
   - Look for events near the start of the spike:
     - New Deployment rollout.
     - Config changes (feature flags, batch job schedule).
     - HPA or resource limit updates.

5. **Decide on immediate mitigation**
   - Short-term actions might include:
     - Temporarily scaling replicas horizontally if capacity exists.
     - Raising memory limits slightly to stop OOM churn (only if you have node headroom).
     - Reducing concurrency or disabling heavy background jobs via config.
   - Apply changes via your standard deployment process.

6. **Plan and apply a proper fix**
   - Based on what you see:
     - If usage jump aligns with a new release, work with devs to profile and fix the regression.
     - If limits are unrealistic, adjust requests/limits based on observed usage.
     - If a noisy neighbor is the issue, consider rebalancing workloads or adjusting node pools.
   - Use KubeGraf to watch resource graphs normalize after the change.

## What to check next

- Are any other workloads on the same node under pressure?
- Is the cluster close to overall capacity (node CPU/memory pressure)?
- Are HPA policies and target metrics configured sanely for this workload?

## Common mistakes

- Only raising limits without understanding the root cause (masking a memory leak).
- Ignoring node-level saturation, focusing only on one Deployment.
- Changing limits directly in the cluster rather than updating the declarative spec.
- Treating a one-off spike as normal and not checking if it repeats.

## Expected outcome

- You identify which workload(s) are responsible for the spike and on which nodes.
- You have an immediate mitigation (scaling or config change) and a plan for a longer-term fix.
- Resource usage returns to a stable baseline that matches limits and capacity.

<!-- TODO: screenshot showing KubeGraf resource map with a hot workload/node highlighted. -->
