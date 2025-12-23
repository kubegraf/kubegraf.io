/**
 * Convert markdown documentation files to HTML
 * Uses marked library for proper markdown rendering
 */

import { readFile, writeFile, readdir, stat } from "fs/promises";
import { join, dirname, basename, extname } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const docsDir = join(rootDir, "docs");

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: true,
  mangle: false,
});

// Read an existing HTML file to get the template structure
async function getHtmlTemplate(): Promise<string> {
  try {
    const templateFile = join(docsDir, "index.html");
    const template = await readFile(templateFile, "utf-8");
    return template;
  } catch (e) {
    console.error("Could not read template file, using fallback");
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - KubeGraf Documentation</title>
  <link rel="stylesheet" href="/docs/theme-styles.css">
</head>
<body>
  <div class="container">
    <aside class="sidebar">
      <!-- Sidebar will be injected by reorganize-sidebar script -->
    </aside>
    <main class="content">
      {{CONTENT}}
    </main>
  </div>
  <script src="/docs/theme-switcher.js"></script>
</body>
</html>`;
  }
}

async function convertMarkdownFile(mdPath: string): Promise<void> {
  try {
    const content = await readFile(mdPath, "utf-8");
    
    // Extract title from first H1 or filename
    let title = content.split("\n")[0].replace(/^#\s+/, "") || basename(mdPath, ".md");
    if (!title || title.startsWith("#")) {
      title = basename(mdPath, ".md").replace(/-/g, " ");
      title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(content);
    
    // Get template
    const template = await getHtmlTemplate();
    
    // Extract just the main content area from template, or use full template
    let html = template;
    
    // Try to find content area in template - look for <main class="content">
    const contentMatch = template.match(/<main[^>]*class="content"[^>]*>([\s\S]*?)<\/main>/);
    if (contentMatch) {
      // Replace content in existing template, keeping the class="content" and adding docs-content class
      html = template.replace(
        /<main[^>]*class="content"[^>]*>[\s\S]*?<\/main>/,
        `<main class="content docs-content">${htmlContent}</main>`
      );
    } else {
      // Fallback: try any main tag
      const mainMatch = template.match(/<main[^>]*>([\s\S]*?)<\/main>/);
      if (mainMatch) {
        html = template.replace(
          /<main[^>]*>[\s\S]*?<\/main>/,
          `<main class="content docs-content">${htmlContent}</main>`
        );
      } else {
        // Use fallback replacement
        html = template
          .replace("{{TITLE}}", title)
          .replace("{{CONTENT}}", htmlContent);
      }
    }
    
    // Update title in head
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${title} - KubeGraf Documentation</title>`
    );
    
    const htmlPath = mdPath.replace(/\.md$/, ".html");
    await writeFile(htmlPath, html, "utf-8");
    console.log(`✓ Converted: ${basename(mdPath)} → ${basename(htmlPath)}`);
  } catch (error) {
    console.error(`✗ Error converting ${mdPath}:`, error);
  }
}

async function findMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules" && entry.name !== "_site") {
      const subFiles = await findMarkdownFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith(".md") && !entry.name.startsWith(".")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  console.log("Converting markdown files to HTML...\n");
  const mdFiles = await findMarkdownFiles(docsDir);
  console.log(`Found ${mdFiles.length} markdown files\n`);

  for (const file of mdFiles) {
    await convertMarkdownFile(file);
  }

  console.log(`\n✓ Converted ${mdFiles.length} files`);
  console.log("\nNext step: Update sidebar with new sections");
}

main().catch(console.error);
