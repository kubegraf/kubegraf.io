# KubeGraf Documentation

KubeGraf is a local-first tool that helps SREs and platform engineers detect, diagnose, and respond to Kubernetes incidents with confidence.

## What Problem Does KubeGraf Solve?

When something breaks in Kubernetes, you need answers fast. Traditional tools show you resources and metrics, but they don't explain *why* pods are crashing, *what* caused a service outage, or *how* to fix it safely.

KubeGraf bridges that gap by:

- **Detecting incidents automatically** — Identifies crash loops, restart storms, resource exhaustion, and security misconfigurations
- **Providing evidence-backed root cause analysis** — Correlates pod states, events, logs, and metrics to explain what happened
- **Recommending safe fixes** — Suggests remediation steps with dry-run previews before execution

## When to Use KubeGraf

**During an incident:**
- A deployment starts failing after a recent change. KubeGraf shows the correlation between the rollout, pod restarts, and error events.
- Pods are crashing but logs are unclear. KubeGraf identifies patterns like OOMKilled, ImagePullBackOff, or readiness probe failures.
- A service shows 5xx errors. KubeGraf traces the issue to missing endpoints, upstream timeouts, or node pressure.

**For proactive monitoring:**
- Scheduled security posture scans detect misconfigurations before they become vulnerabilities.
- Health scoring surfaces risky patterns across namespaces.
- Incident Intelligence tracks reliability and security incidents over time.

**For safe operations:**
- Preview YAML changes with diffs before applying.
- Execute kubectl-equivalent commands with dry-run validation.
- Review evidence and recommendations before taking action.

## How KubeGraf Differs from Kubernetes IDEs

Kubernetes IDEs excel at resource management, editing manifests, and navigating cluster topology. KubeGraf focuses on a different problem: understanding *why* things fail and *how* to fix them.

**KubeGraf is purpose-built for:**
- Incident diagnosis with deterministic, evidence-backed root cause analysis
- Security posture assessment with actionable recommendations
- Safe remediation workflows with preview and validation
- Local-first operation that works offline with your kubeconfig

Think of it as a diagnostic assistant that complements your existing tools rather than replacing them.

## Core Trust Principles

**Deterministic analysis:**
Every root cause diagnosis is backed by concrete evidence: pod conditions, events, resource states, and metrics. No guessing, no black boxes.

**Evidence-backed recommendations:**
Each fix suggestion includes a proof block showing the signals that led to the diagnosis. You can verify the reasoning before acting.

**Local-first architecture:**
KubeGraf runs entirely on your machine. It connects directly to your cluster via kubeconfig. No cloud dependencies, no data leaving your environment.

**Safe execution:**
All remediation actions support dry-run mode. Preview changes, validate server-side, and review output before applying.

## Getting Started

- **[Quick Start](quickstart.html)** — Connect to your cluster in under a minute
- **[Installation](installation.html)** — Install KubeGraf on macOS, Linux, or Windows
- **[Web Dashboard](web-dashboard.html)** — Learn the modern SolidJS interface
- **[Terminal UI](terminal-ui.html)** — Master the keyboard-driven TUI

## Core Concepts

- **[What is KubeGraf?](introduction/what-is-kubegraf.html)** — Product overview and philosophy
- **[Resource Map](resource-map.html)** — Understanding cluster topology
- **[Security & Diagnostics](security.html)** — Posture scanning and health scoring
- **[Incident Intelligence](../workflows/crashloopbackoff.html)** — Detection, diagnosis, and remediation workflows

## Reference

- **[Commands](commands.html)** — CLI reference
- **[Configuration](configuration.html)** — Settings and customization
- **[Plugins](plugins.html)** — Extending KubeGraf

## Workflows

- **[Debugging CrashLoopBackOff](../workflows/crashloopbackoff.html)** — Step-by-step diagnosis
- **[High CPU/Memory Issues](../workflows/high-cpu-memory.html)** — Resource exhaustion troubleshooting
- **[Rollout Stuck](../workflows/rollout-stuck.html)** — Deployment failure analysis

---

**Ready to get started?** Begin with the [Quick Start guide](quickstart.html) or explore [workflows](../workflows/crashloopbackoff.html) for common scenarios.

