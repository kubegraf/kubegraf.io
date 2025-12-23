# Sidebar Navigation Preview

This shows exactly where the new documentation will appear in the sidebar navigation.

## Current Sidebar (What You See Now)

```
🏠 Home

Getting Started
  Overview
  Quick Start
  Installation
  First cluster

Introduction
  What is KubeGraf

User Guide
  Terminal UI
  Web Dashboard
  Commands
  Configuration

Features
  Resource Map
  Security Analysis
  Plugins

Troubleshooting
  CrashLoopBackOff
  Rollout stuck
  High CPU / memory
  Restarts after config change

Workflows
  Debug CrashLoopBackOff

Resources
  GitHub
  Releases
  Report Issue
```

## Updated Sidebar (With New Docs)

```
🏠 Home

Getting Started
  Overview
  Quick Start
  Installation
  First cluster

Introduction
  What is KubeGraf

Core Concepts ⭐ NEW SECTION
  Clusters & contexts
  Incident Intelligence ⭐ NEW
  Deterministic Diagnosis ⭐ NEW
  Evidence & Confidence ⭐ NEW
  Safety Model ⭐ NEW
  Topology graph
  Event timeline
  Local-first architecture

User Guide (EXPANDED)
  Terminal UI
  Web Dashboard
  Commands
  Configuration
  ──────────────────────
  Incidents Overview ⭐ NEW
  Incident Detail View ⭐ NEW
  Fix Preview and Apply ⭐ NEW
  Knowledge Bank ⭐ NEW

Features
  Resource Map
  Security Analysis
  Plugins

Troubleshooting
  CrashLoopBackOff
  Rollout stuck
  High CPU / memory
  Restarts after config change

Workflows
  Debug CrashLoopBackOff

Compare ⭐ NEW SECTION
  KubeGraf vs Kubernetes IDEs ⭐ NEW

Reference
  CLI
  Config
  Plugins
  API schema
  FAQ

Architecture & Internals ⭐ NEW SECTION
  System Overview ⭐ NEW
  Intelligence Pipeline ⭐ NEW
  Snapshot Architecture ⭐ NEW
  Runbooks & Remediation ⭐ NEW
  Learning Engine ⭐ NEW

Resources
  GitHub
  Releases
  Report Issue
```

## New Documentation Files

### Core Concepts (4 new files)
- `docs/core-concepts/incident-intelligence.md`
- `docs/core-concepts/deterministic-diagnosis.md`
- `docs/core-concepts/evidence-and-confidence.md`
- `docs/core-concepts/safety-model.md`

### User Guide (4 new files)
- `docs/user-guide/incidents-overview.md`
- `docs/user-guide/incident-detail-view.md`
- `docs/user-guide/fix-preview-and-apply.md`
- `docs/user-guide/knowledge-bank.md`

### Architecture (5 new files)
- `docs/architecture/system-overview.md`
- `docs/architecture/intelligence-pipeline.md`
- `docs/architecture/snapshot-architecture.md`
- `docs/architecture/runbooks-and-remediation.md`
- `docs/architecture/learning-engine.md`

### Compare (1 new file)
- `docs/compare/kubegraf-vs-lens.md`

## To See Them in the UI

**Right now (markdown files):**
- Access directly: http://localhost:62868/core-concepts/incident-intelligence.md
- Use VS Code preview for better rendering

**After integration (HTML files):**
- They'll appear in the sidebar navigation
- Links will work from the main docs page
- Active states will highlight current page

## Integration Required

The new docs are in **Markdown format**, but your site uses **HTML files**. To see them in the sidebar:

1. **Convert markdown to HTML** (see `INTEGRATION_GUIDE.md`)
2. **Update sidebar script** (see `script/reorganize-sidebar-v2.ts`)
3. **Run build process** to regenerate HTML files

Once converted and integrated, the new sections will appear in the sidebar as shown above.

