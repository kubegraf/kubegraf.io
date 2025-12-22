import { readFile, writeFile } from "fs/promises";
import { readdir, stat } from "fs/promises";
import path from "path";

const MOBILE_MENU_CSS = `
        /* Mobile Menu Button */
        .mobile-menu-btn {
            display: none;
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1001;
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            color: var(--text);
            cursor: pointer;
            font-size: 1.5rem;
            line-height: 1;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            min-width: 48px;
            min-height: 48px;
        }

        .mobile-menu-btn:hover,
        .mobile-menu-btn:active {
            background: var(--bg-tertiary);
            transform: scale(1.05);
        }

        /* Mobile Sidebar Overlay */
        .mobile-sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 999;
        }

        .mobile-sidebar-overlay.active {
            display: block;
        }
`;

const MOBILE_MENU_MEDIA_QUERY = `
        @media (max-width: 900px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .sidebar {
                position: fixed !important;
                left: -280px !important;
                top: 0;
                z-index: 1000;
                transition: left 0.3s ease;
                box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
            }
            
            .sidebar.mobile-open {
                left: 0 !important;
            }
            
            .docs-content { 
                margin-left: 0; 
                padding: 2rem 1.5rem; 
                padding-top: 5rem !important;
            }`;

const MOBILE_MENU_HTML = `
        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle navigation menu">
            ☰
        </button>
        
        <!-- Mobile Sidebar Overlay -->
        <div class="mobile-sidebar-overlay" id="mobile-sidebar-overlay"></div>
        
`;

const MOBILE_MENU_SCRIPT = `
    <script src="/docs/mobile-menu.js"></script>`;

async function processFile(filePath: string) {
  try {
    const content = await readFile(filePath, "utf-8");
    
    // Skip if already has mobile menu
    if (content.includes("mobile-menu-btn")) {
      console.log(`[skip] ${filePath} - already has mobile menu`);
      return;
    }
    
    let updated = content;
    
    // Add mobile menu CSS before @media query
    if (updated.includes("@media (max-width: 900px)")) {
      const mediaQueryRegex = /(@media\s*\(max-width:\s*900px\)\s*\{[^}]*\.sidebar\s*\{[^}]*display:\s*none[^}]*\})/;
      const match = updated.match(mediaQueryRegex);
      if (match) {
        // Replace the old media query with new one
        updated = updated.replace(
          /@media\s*\(max-width:\s*900px\)\s*\{[^}]*\.sidebar\s*\{[^}]*display:\s*none[^}]*\}/,
          MOBILE_MENU_MEDIA_QUERY
        );
        // Add mobile menu CSS before media query
        updated = updated.replace(
          /(@media\s*\(max-width:\s*900px\))/,
          MOBILE_MENU_CSS + "$1"
        );
      }
    }
    
    // Add mobile menu HTML before sidebar
    updated = updated.replace(
      /(<div class="docs-layout">\s*)(<aside class="sidebar")/,
      `$1${MOBILE_MENU_HTML}$2`
    );
    
    // Add id to sidebar
    updated = updated.replace(
      /<aside class="sidebar">/,
      '<aside class="sidebar" id="sidebar">'
    );
    
    // Add script before closing body tag
    if (!updated.includes("mobile-menu.js")) {
      updated = updated.replace(
        /(\s*<\/body>)/,
        `${MOBILE_MENU_SCRIPT}$1`
      );
    }
    
    await writeFile(filePath, updated, "utf-8");
    console.log(`[ok] ${filePath}`);
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

