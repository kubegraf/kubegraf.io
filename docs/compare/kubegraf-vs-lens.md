# KubeGraf vs Kubernetes IDEs (Lens)

This page compares KubeGraf with Kubernetes IDEs like Lens, focusing on workflows and use cases rather than feature lists. Both tools are valuable, and they serve different purposes in the Kubernetes ecosystem.

## Overview

**Kubernetes IDEs (like Lens)** excel at resource management, manifest editing, and cluster navigation. They provide a comprehensive view of your cluster's current state and make it easy to interact with resources.

**KubeGraf** focuses on a different problem: understanding *why* things fail and *how* to fix them. It's purpose-built for incident diagnosis, root cause analysis, and safe remediation.

These tools complement each other. Many teams use both: a Kubernetes IDE for day-to-day operations and KubeGraf when something goes wrong.

## Comparison Table

| Aspect | Kubernetes IDEs (Lens) | KubeGraf |
|--------|------------------------|----------|
| **Primary Purpose** | Resource management and cluster navigation | Incident detection and diagnosis |
| **Best For** | Editing manifests, viewing resources, cluster exploration | Understanding failures, root cause analysis, safe remediation |
| **Workflow Focus** | "What resources exist and how do I manage them?" | "Why did this fail and how do I fix it safely?" |
| **Resource Views** | Comprehensive resource browser with filtering | Incident-focused views with evidence and diagnosis |
| **Manifest Editing** | Full-featured YAML editor with validation | Preview and apply fixes with dry-run validation |
| **Topology Visualization** | Interactive resource graphs and relationships | Incident timeline and evidence correlation |
| **Root Cause Analysis** | Manual investigation through logs and events | Automatic, evidence-backed diagnosis |
| **Fix Recommendations** | Manual fix discovery | Deterministic, evidence-backed recommendations |
| **Safety Features** | Standard Kubernetes validation | Preview, dry-run, and explicit confirmation for all fixes |
| **Learning** | Manual pattern recognition | Automatic learning from past incidents |
| **Local-First** | Varies by tool | Fully local, no cloud dependencies |
| **Offline Operation** | Depends on cluster connectivity | Works offline with cached data |

## When to Use KubeGraf

KubeGraf is ideal when you need to:

**Understand why something failed:**
- Pods are crashing and you need to know why
- A service is returning errors and you need root cause analysis
- Resources are misbehaving and you need evidence-backed diagnosis

**Fix incidents safely:**
- You want to preview changes before applying them
- You need dry-run validation before making changes
- You want evidence-backed recommendations, not guesswork

**Learn from past incidents:**
- You want to see how similar incidents were resolved
- You need pattern recognition across incidents
- You want to improve incident response over time

**Work with incident intelligence:**
- You need automatic incident detection
- You want structured incident data, not raw error spam
- You need confidence scores and evidence for diagnoses

**Operate locally and securely:**
- You need a tool that works entirely offline
- You want no cloud dependencies
- You need data to stay in your environment

## When to Use a Kubernetes IDE (Lens)

Kubernetes IDEs like Lens are ideal when you need to:

**Manage resources:**
- Edit YAML manifests with syntax highlighting and validation
- Create, update, and delete resources through a UI
- Navigate complex cluster topologies visually

**Explore cluster state:**
- Browse all resources in your cluster
- View resource relationships and dependencies
- Understand cluster structure and organization

**Perform routine operations:**
- Scale deployments
- View logs and events
- Port-forward to services
- Execute kubectl commands through a UI

**Work with multiple clusters:**
- Switch between clusters easily
- Manage multiple cluster contexts
- Compare resources across clusters

**Use familiar IDE patterns:**
- File-tree navigation
- Tab-based resource views
- Integrated terminal access
- Extensible plugin system

## How They Work Together

KubeGraf and Kubernetes IDEs complement each other in real workflows:

### Typical Workflow: Incident Response

1. **Detection (KubeGraf)**
   - KubeGraf detects an incident automatically
   - Provides evidence-backed diagnosis
   - Suggests safe fixes with preview

2. **Investigation (Both)**
   - KubeGraf shows the root cause and evidence
   - Kubernetes IDE helps explore related resources
   - Both tools provide different perspectives

3. **Remediation (KubeGraf)**
   - KubeGraf previews the fix with dry-run
   - Shows exactly what will change
   - Applies fix with full transparency

4. **Verification (Kubernetes IDE)**
   - Kubernetes IDE shows updated resource state
   - Confirms the fix worked
   - Helps verify cluster health

### Typical Workflow: Resource Management

1. **Planning (Kubernetes IDE)**
   - Use Kubernetes IDE to explore cluster structure
   - Edit manifests with full IDE features
   - Validate YAML syntax and structure

2. **Application (KubeGraf)**
   - Use KubeGraf to preview changes safely
   - Validate with dry-run before applying
   - Apply with full execution transparency

3. **Monitoring (KubeGraf)**
   - KubeGraf detects any incidents from the change
   - Provides diagnosis if something goes wrong
   - Suggests fixes if needed

### Typical Workflow: Learning and Improvement

1. **Incident Analysis (KubeGraf)**
   - KubeGraf detects and diagnoses incidents
   - Learns from resolutions
   - Builds knowledge base

2. **Pattern Recognition (KubeGraf)**
   - Identifies recurring issues
   - Suggests preventive measures
   - Improves recommendations over time

3. **Resource Optimization (Kubernetes IDE)**
   - Use Kubernetes IDE to implement improvements
   - Edit configurations based on learnings
   - Apply changes through familiar interface

## Key Differences in Approach

### Resource Management vs. Incident Intelligence

**Kubernetes IDEs** approach Kubernetes from a resource management perspective:
- "What resources exist?"
- "How do I edit this manifest?"
- "What's the current state of my cluster?"

**KubeGraf** approaches Kubernetes from an incident intelligence perspective:
- "Why did this fail?"
- "What evidence supports this diagnosis?"
- "How do I fix this safely?"

### Manual Investigation vs. Automatic Diagnosis

**Kubernetes IDEs** require manual investigation:
- You browse resources to find issues
- You read logs and events to understand problems
- You determine fixes through experience and knowledge

**KubeGraf** provides automatic diagnosis:
- Incidents are detected automatically
- Root causes are identified with evidence
- Fixes are suggested based on deterministic rules

### General-Purpose vs. Specialized

**Kubernetes IDEs** are general-purpose tools:
- Handle all aspects of cluster management
- Provide broad functionality
- Suitable for many different workflows

**KubeGraf** is specialized for incidents:
- Focused on failure detection and diagnosis
- Optimized for incident response workflows
- Deep expertise in root cause analysis

## Choosing the Right Tool

**Use a Kubernetes IDE (Lens) if:**
- You primarily need to manage and edit resources
- You want a comprehensive cluster browser
- You prefer manual investigation and diagnosis
- You need manifest editing with IDE features
- You work with multiple clusters frequently

**Use KubeGraf if:**
- You need automatic incident detection
- You want evidence-backed root cause analysis
- You prefer safe, previewed fixes
- You want to learn from past incidents
- You need local-first, offline operation

**Use both if:**
- You want comprehensive cluster management (IDE) and incident intelligence (KubeGraf)
- You need different tools for different workflows
- You want the best of both approaches

## Conclusion

KubeGraf and Kubernetes IDEs like Lens serve different purposes and excel at different workflows. Kubernetes IDEs are excellent for resource management and cluster navigation. KubeGraf is purpose-built for incident detection, diagnosis, and safe remediation.

Many teams find value in using both tools: a Kubernetes IDE for day-to-day operations and KubeGraf when incidents occur. They complement each other rather than compete, each bringing unique strengths to Kubernetes operations.

The choice isn't "which tool is better" but "which tool fits this workflow." For resource management, choose a Kubernetes IDE. For incident intelligence, choose KubeGraf. For comprehensive coverage, use both.

---

**Next Steps:**
- [Get started with KubeGraf](../quickstart.html)
- [Learn about Incident Intelligence](../core-concepts/incident-intelligence.html)
- [Explore KubeGraf workflows](../workflows/crashloopbackoff.html)

