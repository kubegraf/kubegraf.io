/**
 * Align all documentation pages to match system-overview.html styling
 * Updates CSS and main element structure
 */

import { readFile, writeFile, readdir } from "fs/promises";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const docsDir = join(rootDir, "docs");

// CSS updates to apply
const CSS_UPDATES = [
  {
    name: "main content",
    old: /\.docs-content\s*\{[^}]*flex:\s*1;[^}]*margin-left:\s*280px;[^}]*padding:[^}]*max-width:\s*960px[^}]*\}/s,
    new: `/* Main Content */
        .docs-content,
        main.content {
            flex: 1;
            margin-left: 280px;
            padding: 3rem 4rem;
            max-width: 1400px;
            width: calc(100% - 280px);
            box-sizing: border-box;
        }
        
        /* Ensure content doesn't overlap sidebar */
        main.content.docs-content {
            margin-left: 280px;
            width: calc(100% - 280px);
        }
        
        /* Ensure docs-main-wrapper also has proper spacing */
        .docs-main-wrapper {
            margin-left: 280px;
            width: calc(100% - 280px);
        }`,
  },
  {
    name: "h1 styles",
    old: /\.docs-content h1\s*\{[^}]*font-size:\s*2\.2rem[^}]*\}/s,
    new: `.docs-content h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        font-family: 'Space Grotesk', system-ui, sans-serif;
        letter-spacing: -0.03em;
    }`,
  },
  {
    name: "h2 styles",
    old: /\.docs-content h2\s*\{[^}]*font-size:\s*1\.4rem[^}]*\}/s,
    new: `.docs-content h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 2.5rem 0 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border);
        font-family: 'Space Grotesk', system-ui, sans-serif;
    }`,
  },
  {
    name: "h3 styles",
    old: /\.docs-content h3\s*\{[^}]*font-size:\s*1\.1rem[^}]*\}/s,
    new: `.docs-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 2rem 0 0.75rem;
        font-family: 'Space Grotesk', system-ui, sans-serif;
    }`,
  },
  {
    name: "pre code styles",
    old: /\.docs-content pre\s*\{[^}]*background:\s*rgba\(0,\s*0,\s*0,\s*0\.6\)[^}]*\}/s,
    new: `.docs-content pre {
        background: var(--bg-tertiary);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 1rem 1.25rem;
        overflow-x: auto;
        margin: 1rem 0;
    }

    .docs-content pre code {
        background: none;
        padding: 0;
        color: #e2e8f0;
    }`,
  },
];

// HTML structure updates
const HTML_UPDATES = [
  {
    name: "main element class",
    old: /<main\s+class="docs-content">/g,
    new: `<main class="content docs-content">`,
  },
];

async function findHtmlFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      const subFiles = await findHtmlFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith(".html") && entry.name !== "index.html") {
      files.push(fullPath);
    }
  }

  return files;
}

async function updateFile(filePath: string): Promise<boolean> {
  try {
    let content = await readFile(filePath, "utf-8");
    let updated = false;

    // Apply CSS updates
    for (const update of CSS_UPDATES) {
      if (update.old.test(content)) {
        content = content.replace(update.old, update.new);
        updated = true;
        console.log(`  ✓ Updated ${update.name} in ${basename(filePath)}`);
      }
    }

    // Apply HTML updates
    for (const update of HTML_UPDATES) {
      if (update.old.test(content)) {
        content = content.replace(update.old, update.new);
        updated = true;
        console.log(`  ✓ Updated ${update.name} in ${basename(filePath)}`);
      }
    }

    // Also check for simple patterns that need updating
    if (content.includes('max-width: 960px') && !content.includes('max-width: 1400px')) {
      content = content.replace(/max-width:\s*960px/g, 'max-width: 1400px');
      updated = true;
      console.log(`  ✓ Updated max-width in ${basename(filePath)}`);
    }

    if (content.includes('main class="docs-content"') && !content.includes('main class="content docs-content"')) {
      content = content.replace(/main class="docs-content"/g, 'main class="content docs-content"');
      updated = true;
      console.log(`  ✓ Updated main class in ${basename(filePath)}`);
    }

    // Add width calc if missing
    if (content.includes('margin-left: 280px') && !content.includes('width: calc(100% - 280px)')) {
      // Try to add it after margin-left in .docs-content
      content = content.replace(
        /(\.docs-content[^{]*\{[^}]*margin-left:\s*280px;)([^}]*padding:[^}]*)([^}]*max-width:[^}]*)([^}]*\})/s,
        (match, p1, p2, p3, p4) => {
          return `${p1}${p2}${p3}\n            width: calc(100% - 280px);\n            box-sizing: border-box;${p4}`;
        }
      );
      updated = true;
      console.log(`  ✓ Added width calc in ${basename(filePath)}`);
    }

    if (updated) {
      await writeFile(filePath, content, "utf-8");
      return true;
    }

    return false;
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error);
    return false;
  }
}

async function main() {
  console.log("Aligning all documentation pages...\n");
  const htmlFiles = await findHtmlFiles(docsDir);
  console.log(`Found ${htmlFiles.length} HTML files to check\n`);

  let updatedCount = 0;
  for (const file of htmlFiles) {
    const updated = await updateFile(file);
    if (updated) {
      updatedCount++;
    }
  }

  console.log(`\n✓ Updated ${updatedCount} files`);
  console.log(`✓ ${htmlFiles.length - updatedCount} files already aligned`);
}

main().catch(console.error);

