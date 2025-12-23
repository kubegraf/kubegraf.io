# Documentation Integration Guide

This guide explains how to integrate the new Markdown documentation into the existing HTML-based documentation site.

## Current Situation

**Existing docs:** HTML files with embedded sidebar navigation  
**New docs:** Markdown files (`.md`) in organized directories

## Where New Docs Will Appear in Sidebar

Here's how the sidebar will look with the new documentation integrated:

```
🏠 Home

Getting Started
  Overview
  Quick Start
  Installation
  First cluster

Introduction
  What is KubeGraf

Core Concepts (NEW)
  Clusters & contexts
  Incident Intelligence ⭐ NEW
  Deterministic Diagnosis ⭐ NEW
  Evidence & Confidence ⭐ NEW
  Safety Model ⭐ NEW
  Topology graph
  Event timeline
  Local-first architecture

User Guide (UPDATED)
  Terminal UI
  Web Dashboard
  Commands
  Configuration
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

Compare (NEW)
  KubeGraf vs Kubernetes IDEs ⭐ NEW

Reference
  CLI
  Config
  Plugins
  API schema
  FAQ

Architecture & Internals (NEW)
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

## Integration Steps

### Option 1: Convert Markdown to HTML (Recommended)

Convert the markdown files to HTML to match the existing site structure:

```bash
# Install a markdown converter (if not already installed)
npm install -g markdown-to-html

# Or use pandoc (more powerful)
brew install pandoc  # macOS
# or
sudo apt-get install pandoc  # Linux

# Convert all markdown files to HTML
find docs -name "*.md" -type f | while read file; do
  pandoc "$file" -o "${file%.md}.html" --standalone --template=docs-template.html
done
```

### Option 2: Set Up Markdown Rendering

If your build system supports it, configure markdown rendering:

1. **Update build script** to process markdown files
2. **Add markdown renderer** (marked, markdown-it, etc.)
3. **Generate HTML** from markdown during build
4. **Update sidebar script** to include new sections

### Option 3: Use a Static Site Generator

Consider migrating to a static site generator that handles markdown:

- **Docusaurus** - React-based, great for docs
- **VitePress** - Vite-powered, fast
- **MkDocs** - Python-based, simple
- **Hugo** - Go-based, very fast

## Updated Sidebar Structure

Here's the updated sidebar HTML structure that includes all new sections:

```html
<div class="sidebar-section">
  <ul>
    <li><a href="/">🏠 Home</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Getting Started</h3>
  <ul>
    <li><a href="/docs/">Overview</a></li>
    <li><a href="/docs/quickstart.html">Quick Start</a></li>
    <li><a href="/docs/installation.html">Installation</a></li>
    <li><a href="/docs/getting-started/first-cluster.html">First cluster</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Introduction</h3>
  <ul>
    <li><a href="/docs/introduction/what-is-kubegraf.html">What is KubeGraf</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Core Concepts</h3>
  <ul>
    <li><a href="/docs/core-concepts/clusters-and-contexts.html">Clusters & contexts</a></li>
    <li><a href="/docs/core-concepts/incident-intelligence.html">Incident Intelligence</a></li>
    <li><a href="/docs/core-concepts/deterministic-diagnosis.html">Deterministic Diagnosis</a></li>
    <li><a href="/docs/core-concepts/evidence-and-confidence.html">Evidence & Confidence</a></li>
    <li><a href="/docs/core-concepts/safety-model.html">Safety Model</a></li>
    <li><a href="/docs/core-concepts/topology-graph.html">Topology graph</a></li>
    <li><a href="/docs/core-concepts/event-timeline.html">Event timeline</a></li>
    <li><a href="/docs/core-concepts/local-first-architecture.html">Local-first architecture</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>User Guide</h3>
  <ul>
    <li><a href="/docs/terminal-ui.html">Terminal UI</a></li>
    <li><a href="/docs/web-dashboard.html">Web Dashboard</a></li>
    <li><a href="/docs/commands.html">Commands</a></li>
    <li><a href="/docs/configuration.html">Configuration</a></li>
    <li><a href="/docs/user-guide/incidents-overview.html">Incidents Overview</a></li>
    <li><a href="/docs/user-guide/incident-detail-view.html">Incident Detail View</a></li>
    <li><a href="/docs/user-guide/fix-preview-and-apply.html">Fix Preview and Apply</a></li>
    <li><a href="/docs/user-guide/knowledge-bank.html">Knowledge Bank</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Features</h3>
  <ul>
    <li><a href="/docs/resource-map.html">Resource Map</a></li>
    <li><a href="/docs/security.html">Security Analysis</a></li>
    <li><a href="/docs/plugins.html">Plugins</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Troubleshooting</h3>
  <ul>
    <li><a href="/docs/troubleshooting/crashloopbackoff.html">CrashLoopBackOff</a></li>
    <li><a href="/docs/troubleshooting/rollout-stuck.html">Rollout stuck</a></li>
    <li><a href="/docs/troubleshooting/high-cpu-memory.html">High CPU / memory</a></li>
    <li><a href="/docs/troubleshooting/restarts-after-config-change.html">Restarts after config change</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Workflows</h3>
  <ul>
    <li><a href="/docs/workflows/debug-crashloop.html">Debug CrashLoopBackOff</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Compare</h3>
  <ul>
    <li><a href="/docs/compare/kubegraf-vs-lens.html">KubeGraf vs Kubernetes IDEs</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Reference</h3>
  <ul>
    <li><a href="/docs/reference/cli.html">CLI</a></li>
    <li><a href="/docs/reference/config.html">Config</a></li>
    <li><a href="/docs/reference/plugins.html">Plugins</a></li>
    <li><a href="/docs/reference/api.html">API schema</a></li>
    <li><a href="/docs/reference/faq.html">FAQ</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Architecture & Internals</h3>
  <ul>
    <li><a href="/docs/architecture/system-overview.html">System Overview</a></li>
    <li><a href="/docs/architecture/intelligence-pipeline.html">Intelligence Pipeline</a></li>
    <li><a href="/docs/architecture/snapshot-architecture.html">Snapshot Architecture</a></li>
    <li><a href="/docs/architecture/runbooks-and-remediation.html">Runbooks & Remediation</a></li>
    <li><a href="/docs/architecture/learning-engine.html">Learning Engine</a></li>
  </ul>
</div>

<div class="sidebar-section">
  <h3>Resources</h3>
  <ul>
    <li><a href="https://github.com/kubegraf/kubegraf" target="_blank" rel="noopener noreferrer">GitHub</a></li>
    <li><a href="https://github.com/kubegraf/kubegraf/releases" target="_blank" rel="noopener noreferrer">Releases</a></li>
    <li><a href="https://github.com/kubegraf/kubegraf/issues" target="_blank" rel="noopener noreferrer">Report Issue</a></li>
  </ul>
</div>
```

## Quick Integration (Temporary)

For immediate testing, you can view the markdown files directly:

1. **Access via local server:**
   - http://localhost:62868/core-concepts/incident-intelligence.md
   - http://localhost:62868/user-guide/incidents-overview.md
   - etc.

2. **Use VS Code preview:**
   - Open any `.md` file
   - Press `Cmd+Shift+V` for preview

3. **View on GitHub:**
   - Push to a branch
   - GitHub renders markdown automatically

## Next Steps

1. **Decide on approach:**
   - Convert markdown → HTML (quick)
   - Set up markdown rendering (better long-term)
   - Migrate to static site generator (best long-term)

2. **Update sidebar script:**
   - Modify `script/reorganize-sidebar-v2.ts` with new structure
   - Run script to update all HTML files

3. **Test navigation:**
   - Verify all links work
   - Check active states
   - Test mobile responsiveness

4. **Deploy:**
   - Build HTML files
   - Deploy to production
   - Verify live site

---

**Current Status:** New markdown files are ready and organized. They need to be converted to HTML or the build system needs to render markdown to appear in the live site navigation.

