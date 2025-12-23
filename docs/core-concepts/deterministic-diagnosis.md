# Deterministic Diagnosis

KubeGraf diagnoses problems using deterministic rules, not guesswork. Every root cause conclusion is based on observable evidence and logical reasoning.

## What Does "Deterministic" Mean?

Deterministic means that given the same inputs, you'll always get the same output. If KubeGraf diagnoses a problem as "OOMKilled due to memory limit," that conclusion is based on specific, verifiable facts:

- The container's last termination state shows `reason: OOMKilled`
- The container's memory limit was set to a specific value
- The container's memory usage exceeded that limit

Anyone looking at the same evidence would reach the same conclusion. There's no randomness, no "maybe," no black box.

## Why Rules Over Guessing?

When something breaks in Kubernetes, you need to trust the diagnosis. If a tool guesses wrong, you might waste time fixing the wrong thing, or worse, make the problem worse.

KubeGraf uses rules instead of guessing because:

**Rules are verifiable** — You can check the evidence yourself. If KubeGraf says "Service has no ready endpoints," you can verify by checking the Service's endpoint list.

**Rules are explainable** — Every conclusion comes with a clear chain of reasoning. "Pod is not ready because readiness probe is failing" is more useful than "Pod might be having issues."

**Rules are consistent** — The same problem will always be diagnosed the same way, regardless of when it happens or what else is going on in the cluster.

## How Deterministic Diagnosis Works

KubeGraf's diagnosis process follows a structured approach:

### 1. Gather Evidence

First, KubeGraf collects all relevant information about the incident:

- **Resource states** — Current status of pods, services, deployments, nodes
- **Events** — Recent Kubernetes events related to the affected resources
- **Metrics** — Resource usage, restart counts, error rates
- **Relationships** — How resources connect to each other (service → endpoints → pods)

This evidence gathering is comprehensive but focused. KubeGraf doesn't collect everything—it collects what's relevant to understanding the problem.

### 2. Apply Rules

Next, KubeGraf applies a set of diagnostic rules in order of specificity. Each rule checks for a specific pattern in the evidence.

For example, consider a pod that's not ready:

**Rule 1: Check for CrashLoopBackOff**
- If pod status shows `waiting.reason: CrashLoopBackOff`, then root cause is "Container crashing repeatedly"
- Evidence: Pod status, container state, restart count

**Rule 2: Check for OOMKilled**
- If container's last termination shows `reason: OOMKilled`, then root cause is "Container killed due to memory limit"
- Evidence: Container termination state, memory limits, memory usage

**Rule 3: Check for ImagePullBackOff**
- If pod status shows `waiting.reason: ImagePullBackOff`, then root cause is "Cannot pull container image"
- Evidence: Pod status, image name, recent events

**Rule 4: Check readiness probe**
- If pod is not ready and readiness probe is failing, then root cause is "Readiness probe failing"
- Evidence: Pod conditions, probe configuration, recent events

These rules are evaluated in order. The first rule that matches provides the diagnosis. If no specific rule matches, KubeGraf provides a general diagnosis based on the available evidence.

### 3. Build the Chain of Reasoning

Once a rule matches, KubeGraf constructs a clear explanation:

- **What** — The root cause (e.g., "Container killed due to memory limit")
- **Why** — The evidence that supports this conclusion (e.g., "Container's last termination shows OOMKilled, memory limit was 512Mi, usage exceeded limit")
- **What it means** — The implications (e.g., "Container needs more memory or application has a memory leak")

This chain of reasoning is presented to you, so you can verify the diagnosis yourself.

## Example: Diagnosing a Service Failure

Imagine a service that's returning 5xx errors. Here's how KubeGraf diagnoses it deterministically:

**Step 1: Check service endpoints**
- Rule: If service has zero ready endpoints, then root cause is "No ready endpoints behind service"
- Evidence: Service endpoint list shows 0 addresses
- Conclusion: Service has no ready endpoints

**Step 2: Check why pods aren't ready**
- Rule: If pods selected by service are not ready, check their conditions
- Evidence: Pods show `Ready: False`, condition message: "Readiness probe failing"
- Conclusion: Pods are not ready because readiness probes are failing

**Step 3: Check why readiness probes are failing**
- Rule: If readiness probe is failing, check recent events and pod logs
- Evidence: Events show "Readiness probe failed: connection refused", pod logs show application not listening on probe port
- Conclusion: Application is not responding to readiness probe

**Final diagnosis:** Service has no ready endpoints because pods are not ready because the application is not responding to readiness probes.

Each step in this chain is based on observable evidence. You can verify each step yourself by checking the same resources KubeGraf checked.

## The Benefits of Deterministic Diagnosis

**Reliability** — You can trust the diagnosis because it's based on facts, not guesses.

**Reproducibility** — The same problem will always be diagnosed the same way.

**Transparency** — You can see exactly how KubeGraf reached its conclusion.

**Actionability** — Because the diagnosis is specific and evidence-backed, the recommended fixes are also specific and likely to work.

## What Deterministic Diagnosis Is Not

Deterministic diagnosis doesn't mean KubeGraf can diagnose every possible problem. Some issues require deeper investigation, application-level debugging, or domain-specific knowledge that KubeGraf doesn't have.

What it does mean is that when KubeGraf provides a diagnosis, that diagnosis is:

- Based on observable evidence from your cluster
- Explainable through a clear chain of reasoning
- Verifiable by checking the same resources KubeGraf checked

If KubeGraf can't determine the root cause with confidence, it will say so, rather than guessing.

---

**Next:** Learn how KubeGraf uses [Evidence & Confidence](evidence-and-confidence.md) to show you why it's confident in its conclusions.

