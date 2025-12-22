import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

const MOBILE_HOME_BTN_CSS = `
        .mobile-home-btn {
            left: 4.5rem;
        }

        .mobile-menu-btn:hover,
        .mobile-menu-btn:active,
        .mobile-home-btn:hover,
        .mobile-home-btn:active {
            background: var(--bg-tertiary);
            transform: scale(1.05);
        }`;

const MOBILE_HOME_BTN_HTML = `
        <a href="/" class="mobile-home-btn" aria-label="Go to home page">
            🏠
        </a>
        
`;

async function processFile(filePath: string) {
  try {
    let content = await readFile(filePath, "utf-8");
    
    // Skip if already has mobile home button
    if (content.includes("mobile-home-btn")) {
      console.log(`[skip] ${filePath} - already has mobile home button`);
      return;
    }
    
    let updated = content;
    
    // Update CSS - change .mobile-menu-btn to include .mobile-home-btn
    updated = updated.replace(
      /(\.mobile-menu-btn\s*\{[^}]*\})/,
      `/* Mobile Menu Buttons */\n        .mobile-menu-btn,\n        .mobile-home-btn$1`
    );
    
    // Add mobile-home-btn specific styles
    if (updated.includes(".mobile-menu-btn {")) {
      updated = updated.replace(
        /(\.mobile-menu-btn\s*\{[^}]*left:\s*1rem;[^}]*\})/,
        `$1\n\n        .mobile-menu-btn {\n            left: 1rem;\n        }\n\n        .mobile-home-btn$MOBILE_HOME_BTN_CSS`
      );
    }
    
    // Update hover styles
    updated = updated.replace(
      /(\.mobile-menu-btn:hover[^}]*\})/,
      `$1\n\n        .mobile-home-btn:hover,\n        .mobile-home-btn:active$1`
    );
    
    // Add mobile home button HTML
    updated = updated.replace(
      /(<button class="mobile-menu-btn"[^>]*>☰<\/button>)/,
      `$1${MOBILE_HOME_BTN_HTML}`
    );
    
    // Update @media query to show both buttons
    updated = updated.replace(
      /(@media[^}]*\.mobile-menu-btn\s*\{[^}]*display:\s*block[^}]*\})/,
      `$1\n            .mobile-home-btn {\n                display: block;\n            }`
    );
    
    if (updated !== content) {
      await writeFile(filePath, updated, "utf-8");
      console.log(`[ok] ${filePath}`);
    } else {
      console.log(`[skip] ${filePath} - no changes needed`);
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

