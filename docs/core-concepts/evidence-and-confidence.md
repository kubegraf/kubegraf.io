# Evidence & Confidence

Every diagnosis KubeGraf makes is backed by evidence. The strength of that evidence determines how confident KubeGraf is in its conclusion.

## What is Evidence?

Evidence is observable data from your cluster that supports a conclusion. It's not speculation or inference—it's facts you can verify yourself.

Examples of evidence:

- **Pod status** — "Pod status shows `waiting.reason: CrashLoopBackOff`"
- **Container termination** — "Container's last termination shows `reason: OOMKilled`, `exitCode: 137`"
- **Service endpoints** — "Service has 0 ready endpoints out of 3 total"
- **Events** — "Event at 10:15:23: 'Readiness probe failed: connection refused'"
- **Resource relationships** — "Service selector matches 3 pods, but 0 pods are ready"

Evidence is always specific and verifiable. You can check the same resources KubeGraf checked and see the same data.

## How Evidence Supports Conclusions

Evidence doesn't just support conclusions—it *is* the conclusion. KubeGraf doesn't say "the pod might be crashing" based on a hunch. It says "the pod is crashing" because the pod status shows `CrashLoopBackOff`, and it shows you that status as evidence.

Here's how evidence flows into a conclusion:

**Observation:** Pod status shows `waiting.reason: CrashLoopBackOff`

**Evidence collected:**
- Pod status: `waiting.reason: CrashLoopBackOff`
- Container restart count: 15
- Recent events: Multiple "Back-off restarting failed container" events
- Container state: Container exits immediately after starting

**Conclusion:** Pod is in CrashLoopBackOff because the container is crashing repeatedly.

**Confidence:** High — The evidence is clear and unambiguous.

## Confidence Levels

KubeGraf expresses confidence in its conclusions using a simple scale:

**High confidence** — The evidence is clear and unambiguous. The conclusion follows directly from the evidence with no alternative explanations.

Example: "Container was OOMKilled" with evidence showing `lastTerminationState.terminated.reason: OOMKilled`. There's no other explanation for this specific termination reason.

**Medium confidence** — The evidence points strongly to a conclusion, but there might be alternative explanations or missing context.

Example: "Service has no ready endpoints, likely due to pod readiness probe failures" with evidence showing 0 ready endpoints and pod conditions showing readiness probe failures. The conclusion is likely correct, but there could be other factors (network issues, timing, etc.).

**Low confidence** — The evidence suggests a conclusion, but it's not definitive. More investigation is needed.

Example: "High CPU usage might be causing performance issues" with evidence showing CPU usage at 80%. This could be normal for this workload, or it could indicate a problem.

KubeGraf always shows you the evidence, regardless of confidence level. Even with low confidence, you can see what KubeGraf observed and decide for yourself.

## The Proof Block

For every diagnosis, KubeGraf provides a "proof block"—a summary of the key evidence that led to the conclusion. This proof block is:

- **Copyable** — You can copy it to share with your team or include in incident reports
- **Self-contained** — It includes all the essential facts, not just references
- **Human-readable** — It's formatted for clarity, not as raw data

Example proof block:

```
Root Cause: Container killed due to memory limit

Evidence:
- Container: my-app
- Termination reason: OOMKilled
- Memory limit: 512Mi
- Memory usage before termination: ~600Mi
- Exit code: 137 (SIGKILL)
- Time: 2025-01-15 10:23:45
- Pod: my-app-deployment-abc123
- Namespace: production
```

This proof block tells you everything you need to understand the diagnosis. You can verify each piece of evidence by checking the pod's status and events.

## Why Evidence Matters

Evidence matters because it builds trust. When KubeGraf says "the pod is crashing because of a memory limit," you don't have to take its word for it. You can check the evidence yourself.

This is especially important when:

- **You're deciding whether to apply a fix** — You want to be sure the diagnosis is correct before making changes
- **You're explaining the problem to others** — You can show them the evidence, not just the conclusion
- **You're learning** — You can see how KubeGraf thinks about problems by following the evidence

Evidence also helps you catch mistakes. If KubeGraf's diagnosis doesn't match what you see in the cluster, the evidence will show you where the disconnect is.

## When Evidence Is Incomplete

Sometimes, KubeGraf doesn't have all the evidence it needs for a confident diagnosis. This happens when:

- **Resources are missing** — The pod was deleted, or events have been garbage collected
- **Information is unavailable** — Metrics aren't available, or logs aren't accessible
- **The problem is outside Kubernetes** — Application-level issues that don't show up in cluster state

When evidence is incomplete, KubeGraf:

- **States what it knows** — Shows the evidence it does have
- **Acknowledges uncertainty** — Expresses low confidence or says "insufficient evidence"
- **Suggests next steps** — Recommends what to check next to gather more evidence

It never guesses or makes up evidence. If it doesn't know, it says so.

## Building Your Own Evidence

KubeGraf's evidence is a starting point, not the end. You might need to gather additional evidence:

- **Application logs** — KubeGraf shows cluster-level evidence, but application logs might reveal more
- **Metrics from Prometheus** — Custom metrics might provide context KubeGraf doesn't have
- **Network traces** — Connection issues might not show up in pod status
- **External dependencies** — Problems with databases, APIs, or other services

KubeGraf's evidence helps you focus your investigation. If it says "readiness probe failing," you know to check why the application isn't responding to the probe, rather than starting from scratch.

---

**Next:** Learn about KubeGraf's [Safety Model](safety-model.md) and how it ensures fixes are safe by default.

