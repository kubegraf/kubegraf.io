import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

const footerStyles = `
    .docs-footer {
      border-top: 1px solid var(--border);
      padding: 2rem 4rem;
      margin-top: auto;
      background: var(--bg-secondary);
      margin-left: 280px;
      width: calc(100% - 280px);
      flex-shrink: 0;
    }

    .docs-footer-content {
      max-width: 900px;
      text-align: center;
    }

    .docs-footer-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 1rem 1.5rem;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .docs-footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;
    }

    .docs-footer-links a:hover {
      color: var(--primary);
      text-decoration: underline;
    }

    .docs-footer-links .theme-selector {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem;
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 6px;
      vertical-align: middle;
      margin-left: 0;
    }

    .docs-footer-links .theme-selector button {
      padding: 0.25rem 0.5rem;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 4px;
      font-size: 0.875rem;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      opacity: 0.4;
    }

    .docs-footer-links .theme-selector button:hover {
      opacity: 0.6;
      background: var(--bg-secondary);
    }

    .docs-footer-links .theme-selector button.active {
      opacity: 1;
      transform: scale(1.1);
    }

    .docs-footer-links .theme-selector button:not(.active):hover {
      opacity: 0.8;
    }

    @media (max-width: 900px) {
      .docs-footer {
        margin-left: 0;
        padding: 2rem 1.5rem;
      }

      .docs-footer-links {
        gap: 0.75rem 1rem;
      }
    }`;

async function processFile(filePath: string) {
  try {
    let content = await readFile(filePath, "utf-8");
    
    // Check if footer styles already exist
    if (content.includes('.docs-footer {')) {
      console.log(`[skip] ${filePath} - already has footer styles`);
      return false;
    }
    
    // Find the closing </style> tag and add footer styles before it
    const styleEndPattern = /<\/style>/;
    if (styleEndPattern.test(content)) {
      // Add footer styles before closing style tag
      content = content.replace(
        /<\/style>/,
        footerStyles + '\n  </style>'
      );
      
      await writeFile(filePath, content, "utf-8");
      console.log(`[ok] ${filePath} - added footer styles`);
      return true;
    } else {
      console.log(`[skip] ${filePath} - no </style> tag found`);
      return false;
    }
  } catch (error) {
    console.error(`[error] ${filePath}:`, error);
    return false;
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
  const troubleshootingDir = path.join(process.cwd(), "docs", "troubleshooting");
  const htmlFiles = await findHtmlFiles(troubleshootingDir);
  
  console.log(`Found ${htmlFiles.length} troubleshooting HTML files`);
  console.log("\nAdding footer styles to troubleshooting pages...\n");
  
  let updated = 0;
  for (const file of htmlFiles) {
    const result = await processFile(file);
    if (result) updated++;
  }
  
  console.log(`\nDone! Updated ${updated} files. Footer styles added.`);
}

main().catch(console.error);

