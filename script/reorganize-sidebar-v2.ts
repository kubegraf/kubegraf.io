import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

// Industry-standard documentation structure
// Based on best practices from Stripe, Vercel, GitHub, Docker, Kubernetes
// Order: Quick Start (fastest path to value) → Installation → First cluster
const NEW_SIDEBAR = `
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
          <li><a href="/docs/core-concepts/incident-intelligence.html">Incident Intelligence</a></li>
          <li><a href="/docs/core-concepts/deterministic-diagnosis.html">Deterministic Diagnosis</a></li>
          <li><a href="/docs/core-concepts/evidence-and-confidence.html">Evidence & Confidence</a></li>
          <li><a href="/docs/core-concepts/safety-model.html">Safety Model</a></li>
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
      </div>`;

async function processFile(filePath: string) {
  try {
    let content = await readFile(filePath, "utf-8");
    
    // Find the sidebar section - it starts after the logo and ends before </aside>
    const sidebarRegex = /(<\/a>\s*)(<div class="sidebar-section">[\s\S]*?)(<\/aside>)/;
    const match = content.match(sidebarRegex);
    
    if (match) {
      // Replace the entire sidebar content (keeping the logo and aside tags)
      const updated = content.replace(
        sidebarRegex,
        `$1${NEW_SIDEBAR}\n    $3`
      );
      
      // Update active class based on current page
      const fileName = path.basename(filePath, '.html');
      const dirName = path.basename(path.dirname(filePath));
      
      let finalContent = updated;
      
      // Set active class for current page
      if (fileName === 'index' || filePath.includes('/docs/index.html')) {
        finalContent = finalContent.replace(
          '<a href="/docs/">Overview</a>',
          '<a href="/docs/" class="active">Overview</a>'
        );
      } else if (fileName === 'quickstart') {
        finalContent = finalContent.replace(
          '<a href="/docs/quickstart.html">Quick Start</a>',
          '<a href="/docs/quickstart.html" class="active">Quick Start</a>'
        );
      } else if (fileName === 'installation') {
        finalContent = finalContent.replace(
          '<a href="/docs/installation.html">Installation</a>',
          '<a href="/docs/installation.html" class="active">Installation</a>'
        );
      } else if (filePath.includes('getting-started/first-cluster')) {
        finalContent = finalContent.replace(
          '<a href="/docs/getting-started/first-cluster.html">First cluster</a>',
          '<a href="/docs/getting-started/first-cluster.html" class="active">First cluster</a>'
        );
      } else if (filePath.includes('introduction/what-is-kubegraf')) {
        finalContent = finalContent.replace(
          '<a href="/docs/introduction/what-is-kubegraf.html">What is KubeGraf</a>',
          '<a href="/docs/introduction/what-is-kubegraf.html" class="active">What is KubeGraf</a>'
        );
      } else if (fileName === 'terminal-ui') {
        finalContent = finalContent.replace(
          '<a href="/docs/terminal-ui.html">Terminal UI</a>',
          '<a href="/docs/terminal-ui.html" class="active">Terminal UI</a>'
        );
      } else if (fileName === 'web-dashboard') {
        finalContent = finalContent.replace(
          '<a href="/docs/web-dashboard.html">Web Dashboard</a>',
          '<a href="/docs/web-dashboard.html" class="active">Web Dashboard</a>'
        );
      } else if (fileName === 'commands') {
        finalContent = finalContent.replace(
          '<a href="/docs/commands.html">Commands</a>',
          '<a href="/docs/commands.html" class="active">Commands</a>'
        );
      } else if (fileName === 'configuration') {
        finalContent = finalContent.replace(
          '<a href="/docs/configuration.html">Configuration</a>',
          '<a href="/docs/configuration.html" class="active">Configuration</a>'
        );
      } else if (fileName === 'resource-map') {
        finalContent = finalContent.replace(
          '<a href="/docs/resource-map.html">Resource Map</a>',
          '<a href="/docs/resource-map.html" class="active">Resource Map</a>'
        );
      } else if (fileName === 'security') {
        finalContent = finalContent.replace(
          '<a href="/docs/security.html">Security Analysis</a>',
          '<a href="/docs/security.html" class="active">Security Analysis</a>'
        );
      } else if (fileName === 'plugins') {
        finalContent = finalContent.replace(
          '<a href="/docs/plugins.html">Plugins</a>',
          '<a href="/docs/plugins.html" class="active">Plugins</a>'
        );
      } else if (filePath.includes('troubleshooting/crashloopbackoff')) {
        finalContent = finalContent.replace(
          '<a href="/docs/troubleshooting/crashloopbackoff.html">CrashLoopBackOff</a>',
          '<a href="/docs/troubleshooting/crashloopbackoff.html" class="active">CrashLoopBackOff</a>'
        );
      } else if (filePath.includes('troubleshooting/rollout-stuck')) {
        finalContent = finalContent.replace(
          '<a href="/docs/troubleshooting/rollout-stuck.html">Rollout stuck</a>',
          '<a href="/docs/troubleshooting/rollout-stuck.html" class="active">Rollout stuck</a>'
        );
      } else if (filePath.includes('troubleshooting/high-cpu-memory')) {
        finalContent = finalContent.replace(
          '<a href="/docs/troubleshooting/high-cpu-memory.html">High CPU / memory</a>',
          '<a href="/docs/troubleshooting/high-cpu-memory.html" class="active">High CPU / memory</a>'
        );
      } else if (filePath.includes('troubleshooting/restarts-after-config-change')) {
        finalContent = finalContent.replace(
          '<a href="/docs/troubleshooting/restarts-after-config-change.html">Restarts after config change</a>',
          '<a href="/docs/troubleshooting/restarts-after-config-change.html" class="active">Restarts after config change</a>'
        );
      } else if (filePath.includes('workflows/debug-crashloop')) {
        finalContent = finalContent.replace(
          '<a href="/docs/workflows/debug-crashloop.html">Debug CrashLoopBackOff</a>',
          '<a href="/docs/workflows/debug-crashloop.html" class="active">Debug CrashLoopBackOff</a>'
        );
      }
      
      // Core Concepts active states
      if (filePath.includes('core-concepts/incident-intelligence')) {
        finalContent = finalContent.replace(
          '<a href="/docs/core-concepts/incident-intelligence.html">Incident Intelligence</a>',
          '<a href="/docs/core-concepts/incident-intelligence.html" class="active">Incident Intelligence</a>'
        );
      } else if (filePath.includes('core-concepts/deterministic-diagnosis')) {
        finalContent = finalContent.replace(
          '<a href="/docs/core-concepts/deterministic-diagnosis.html">Deterministic Diagnosis</a>',
          '<a href="/docs/core-concepts/deterministic-diagnosis.html" class="active">Deterministic Diagnosis</a>'
        );
      } else if (filePath.includes('core-concepts/evidence-and-confidence')) {
        finalContent = finalContent.replace(
          '<a href="/docs/core-concepts/evidence-and-confidence.html">Evidence & Confidence</a>',
          '<a href="/docs/core-concepts/evidence-and-confidence.html" class="active">Evidence & Confidence</a>'
        );
      } else if (filePath.includes('core-concepts/safety-model')) {
        finalContent = finalContent.replace(
          '<a href="/docs/core-concepts/safety-model.html">Safety Model</a>',
          '<a href="/docs/core-concepts/safety-model.html" class="active">Safety Model</a>'
        );
      }
      
      // User Guide active states
      if (filePath.includes('user-guide/incidents-overview')) {
        finalContent = finalContent.replace(
          '<a href="/docs/user-guide/incidents-overview.html">Incidents Overview</a>',
          '<a href="/docs/user-guide/incidents-overview.html" class="active">Incidents Overview</a>'
        );
      } else if (filePath.includes('user-guide/incident-detail-view')) {
        finalContent = finalContent.replace(
          '<a href="/docs/user-guide/incident-detail-view.html">Incident Detail View</a>',
          '<a href="/docs/user-guide/incident-detail-view.html" class="active">Incident Detail View</a>'
        );
      } else if (filePath.includes('user-guide/fix-preview-and-apply')) {
        finalContent = finalContent.replace(
          '<a href="/docs/user-guide/fix-preview-and-apply.html">Fix Preview and Apply</a>',
          '<a href="/docs/user-guide/fix-preview-and-apply.html" class="active">Fix Preview and Apply</a>'
        );
      } else if (filePath.includes('user-guide/knowledge-bank')) {
        finalContent = finalContent.replace(
          '<a href="/docs/user-guide/knowledge-bank.html">Knowledge Bank</a>',
          '<a href="/docs/user-guide/knowledge-bank.html" class="active">Knowledge Bank</a>'
        );
      }
      
      // Compare active states
      if (filePath.includes('compare/kubegraf-vs-lens')) {
        finalContent = finalContent.replace(
          '<a href="/docs/compare/kubegraf-vs-lens.html">KubeGraf vs Kubernetes IDEs</a>',
          '<a href="/docs/compare/kubegraf-vs-lens.html" class="active">KubeGraf vs Kubernetes IDEs</a>'
        );
      }
      
      // Architecture active states
      if (filePath.includes('architecture/system-overview')) {
        finalContent = finalContent.replace(
          '<a href="/docs/architecture/system-overview.html">System Overview</a>',
          '<a href="/docs/architecture/system-overview.html" class="active">System Overview</a>'
        );
      } else if (filePath.includes('architecture/intelligence-pipeline')) {
        finalContent = finalContent.replace(
          '<a href="/docs/architecture/intelligence-pipeline.html">Intelligence Pipeline</a>',
          '<a href="/docs/architecture/intelligence-pipeline.html" class="active">Intelligence Pipeline</a>'
        );
      } else if (filePath.includes('architecture/snapshot-architecture')) {
        finalContent = finalContent.replace(
          '<a href="/docs/architecture/snapshot-architecture.html">Snapshot Architecture</a>',
          '<a href="/docs/architecture/snapshot-architecture.html" class="active">Snapshot Architecture</a>'
        );
      } else if (filePath.includes('architecture/runbooks-and-remediation')) {
        finalContent = finalContent.replace(
          '<a href="/docs/architecture/runbooks-and-remediation.html">Runbooks & Remediation</a>',
          '<a href="/docs/architecture/runbooks-and-remediation.html" class="active">Runbooks & Remediation</a>'
        );
      } else if (filePath.includes('architecture/learning-engine')) {
        finalContent = finalContent.replace(
          '<a href="/docs/architecture/learning-engine.html">Learning Engine</a>',
          '<a href="/docs/architecture/learning-engine.html" class="active">Learning Engine</a>'
        );
      }
      
      await writeFile(filePath, finalContent, "utf-8");
      console.log(`[ok] ${filePath}`);
    } else {
      console.log(`[skip] ${filePath} - sidebar pattern not found`);
    }
  } catch (error) {
    console.error(`[error] ${filePath}:`, error);
  }
}

async function findHtmlFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await findHtmlFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function main() {
  const docsDir = path.join(process.cwd(), "docs");
  const htmlFiles = await findHtmlFiles(docsDir);
  
  console.log(`Found ${htmlFiles.length} HTML files`);
  console.log("\nReorganizing sidebar with industry-standard structure:");
  console.log("1. Getting Started: Overview → Quick Start → Installation → First cluster");
  console.log("2. Introduction");
  console.log("3. User Guide");
  console.log("4. Features");
  console.log("5. Troubleshooting");
  console.log("6. Workflows");
  console.log("7. Resources\n");
  
  for (const file of htmlFiles) {
    await processFile(file);
  }
  
  console.log("\nDone! Sidebar reorganized with Quick Start as 2nd item in Getting Started.");
}

main().catch(console.error);

