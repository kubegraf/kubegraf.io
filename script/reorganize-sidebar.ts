import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

// Production-ready sidebar structure
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
          <li><a href="/docs/installation.html">Installation</a></li>
          <li><a href="/docs/quickstart.html">Quick Start</a></li>
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
        <h3>User Guide</h3>
        <ul>
          <li><a href="/docs/terminal-ui.html">Terminal UI</a></li>
          <li><a href="/docs/web-dashboard.html">Web Dashboard</a></li>
          <li><a href="/docs/commands.html">Commands</a></li>
          <li><a href="/docs/configuration.html">Configuration</a></li>
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
    // Pattern: from </a> after logo to </aside>
    const sidebarRegex = /(<\/a>\s*)(<div class="sidebar-section">[\s\S]*?)(<\/aside>)/;
    const match = content.match(sidebarRegex);
    
    if (match) {
      // Replace the entire sidebar content (keeping the logo and aside tags)
      const updated = content.replace(
        sidebarRegex,
        `$1${NEW_SIDEBAR}\n    $3`
      );
      
      // Also update active class based on current page
      const fileName = path.basename(filePath, '.html');
      const dirName = path.basename(path.dirname(filePath));
      
      let finalContent = updated;
      
      // Set active class for current page
      if (fileName === 'index' || filePath.includes('/docs/index.html')) {
        finalContent = finalContent.replace(
          '<a href="/docs/">Overview</a>',
          '<a href="/docs/" class="active">Overview</a>'
        );
      } else if (fileName === 'installation') {
        finalContent = finalContent.replace(
          '<a href="/docs/installation.html">Installation</a>',
          '<a href="/docs/installation.html" class="active">Installation</a>'
        );
      } else if (fileName === 'quickstart') {
        finalContent = finalContent.replace(
          '<a href="/docs/quickstart.html">Quick Start</a>',
          '<a href="/docs/quickstart.html" class="active">Quick Start</a>'
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
  
  for (const file of htmlFiles) {
    await processFile(file);
  }
  
  console.log("Done!");
}

main().catch(console.error);

