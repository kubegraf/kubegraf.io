#!/usr/bin/env node

/**
 * Simple local documentation server
 * Serves markdown files with basic styling and navigation
 */

import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const docsDir = join(rootDir, 'docs');

// Simple markdown renderer with navigation
const renderPage = (content, title, sidebar) => {
  const html = marked.parse(content);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - KubeGraf Documentation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 2rem;
    }
    .sidebar {
      position: sticky;
      top: 2rem;
      height: fit-content;
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      font-size: 0.9rem;
    }
    .sidebar h3 {
      margin-bottom: 1rem;
      color: #06b6d4;
    }
    .sidebar ul {
      list-style: none;
    }
    .sidebar li {
      margin: 0.5rem 0;
    }
    .sidebar a {
      color: #555;
      text-decoration: none;
      display: block;
      padding: 0.25rem 0;
    }
    .sidebar a:hover {
      color: #06b6d4;
    }
    .content {
      background: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .content h1 {
      color: #06b6d4;
      margin-bottom: 1rem;
      border-bottom: 2px solid #06b6d4;
      padding-bottom: 0.5rem;
    }
    .content h2 {
      color: #333;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    .content h3 {
      color: #555;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
    .content p {
      margin-bottom: 1rem;
    }
    .content ul, .content ol {
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
    .content code {
      background: #f4f4f4;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
    }
    .content pre {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    .content pre code {
      background: none;
      padding: 0;
    }
    .content table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }
    .content table th,
    .content table td {
      border: 1px solid #ddd;
      padding: 0.5rem;
      text-align: left;
    }
    .content table th {
      background: #f8f9fa;
      font-weight: 600;
    }
    .breadcrumb {
      margin-bottom: 1rem;
      color: #666;
      font-size: 0.9rem;
    }
    .breadcrumb a {
      color: #06b6d4;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <nav class="sidebar">
      <h3>Documentation</h3>
      ${sidebar}
    </nav>
    <main class="content">
      <div class="breadcrumb">
        <a href="/">Home</a> / <a href="/docs/">Docs</a> / ${title}
      </div>
      ${html}
    </main>
  </div>
</body>
</html>`;
};

// Generate sidebar from sidebar.json
const generateSidebar = () => {
  try {
    const sidebarJson = JSON.parse(readFileSync(join(docsDir, 'sidebar.json'), 'utf-8'));
    let html = '<ul>';
    
    sidebarJson.sections.forEach(section => {
      html += `<li><strong>${section.label}</strong><ul>`;
      section.items.forEach(item => {
        const href = item.href.replace('/docs/', '');
        html += `<li><a href="/docs/${href}">${item.label}</a></li>`;
      });
      html += '</ul></li>';
    });
    
    html += '</ul>';
    return html;
  } catch (e) {
    return '<p>Navigation loading...</p>';
  }
};

const server = createServer((req, res) => {
  let filePath = req.url === '/' ? '/docs/index.md' : req.url;
  
  // Handle /docs/ root
  if (filePath === '/docs/' || filePath === '/docs') {
    filePath = '/docs/index.md';
  }
  
  // Remove leading slash and resolve path
  const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  const fullPath = join(rootDir, cleanPath);
  
  // Security check
  if (!fullPath.startsWith(docsDir) && !fullPath.startsWith(join(rootDir, 'docs'))) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  // Check if file exists
  if (!existsSync(fullPath)) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }
  
  // Check if it's a markdown file
  if (extname(fullPath) === '.md') {
    try {
      const content = readFileSync(fullPath, 'utf-8');
      const title = content.split('\n')[0].replace(/^#\s+/, '') || 'Documentation';
      const sidebar = generateSidebar();
      const html = renderPage(content, title, sidebar);
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (e) {
      res.writeHead(500);
      res.end('Error reading file');
    }
  } else {
    // Serve other files as-is
    try {
      const content = readFileSync(fullPath);
      const ext = extname(fullPath);
      let contentType = 'text/plain';
      
      if (ext === '.html') contentType = 'text/html';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.json') contentType = 'application/json';
      else if (ext === '.png') contentType = 'image/png';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (e) {
      res.writeHead(500);
      res.end('Error reading file');
    }
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`📚 Documentation server running at http://localhost:${PORT}`);
  console.log(`   Serving from: ${docsDir}`);
  console.log(`\n   Try: http://localhost:${PORT}/docs/index.md`);
  console.log(`   Or:  http://localhost:${PORT}/docs/core-concepts/incident-intelligence.md`);
});

