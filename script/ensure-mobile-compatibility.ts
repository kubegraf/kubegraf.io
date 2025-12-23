/**
 * Ensure all documentation pages are mobile-compatible
 * Adds mobile menu buttons, overlay, and responsive CSS
 */

import { readFile, writeFile, readdir } from "fs/promises";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const docsDir = join(rootDir, "docs");

// Mobile menu HTML elements
const MOBILE_MENU_HTML = `        <!-- Mobile Menu Buttons -->
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle navigation menu">
            ☰
        </button>
        <a href="/" class="mobile-home-btn" aria-label="Go to home page">
            🏠
        </a>
        
        <!-- Mobile Sidebar Overlay -->
        <div class="mobile-sidebar-overlay" id="mobile-sidebar-overlay"></div>`;

// Mobile responsive CSS
const MOBILE_CSS = `        /* Mobile Menu Buttons */
        .mobile-menu-btn,
        .mobile-home-btn {
            display: none;
            position: fixed;
            top: 1rem;
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
            text-decoration: none;
        }

        .mobile-menu-btn {
            left: 1rem;
        }

        .mobile-home-btn {
            left: 4.5rem;
        }

        .mobile-menu-btn:hover,
        .mobile-menu-btn:active,
        .mobile-home-btn:hover,
        .mobile-home-btn:active {
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

        /* Responsive */
        @media (max-width: 900px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .mobile-home-btn {
                display: block;
            }
            
            .sidebar {
                position: fixed;
                left: -280px;
                top: 0;
                z-index: 1000;
                transition: left 0.3s ease;
                box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
            }
            
            .sidebar.mobile-open {
                left: 0;
            }
            
            .docs-main-wrapper {
                margin-left: 0;
                width: 100%;
            }
            
            .docs-content {
                margin-left: 0;
                padding: 2rem 1.5rem;
                padding-top: 5rem;
                max-width: 100%;
            }
            
            main.content.docs-content {
                margin-left: 0;
                margin-right: 0;
                width: 100%;
                max-width: 100%;
            }
        }`;

async function findHtmlFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      const subFiles = await findHtmlFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function ensureMobileCompatibility(filePath: string): Promise<boolean> {
  try {
    let content = await readFile(filePath, "utf-8");
    let updated = false;

    // Check if mobile menu button exists
    if (!content.includes('id="mobile-menu-btn"')) {
      // Find the body tag and add mobile menu buttons after it
      const bodyMatch = content.match(/<body[^>]*>/);
      if (bodyMatch) {
        const bodyIndex = content.indexOf(bodyMatch[0]) + bodyMatch[0].length;
        // Find the docs-layout div
        const layoutMatch = content.substring(bodyIndex).match(/<div[^>]*class="docs-layout"[^>]*>/);
        if (layoutMatch) {
          const layoutIndex = bodyIndex + content.substring(bodyIndex).indexOf(layoutMatch[0]) + layoutMatch[0].length;
          content = content.slice(0, layoutIndex) + '\n' + MOBILE_MENU_HTML + '\n        ' + content.slice(layoutIndex);
          updated = true;
          console.log(`  ✓ Added mobile menu buttons to ${basename(filePath)}`);
        }
      }
    }

    // Check if mobile CSS exists
    if (!content.includes('mobile-menu-btn') || !content.includes('@media (max-width: 900px)')) {
      // Find the closing </style> tag and add mobile CSS before it
      const styleCloseIndex = content.lastIndexOf('</style>');
      if (styleCloseIndex > 0) {
        content = content.slice(0, styleCloseIndex) + '\n' + MOBILE_CSS + '\n    </style>';
        updated = true;
        console.log(`  ✓ Added mobile CSS to ${basename(filePath)}`);
      }
    }

    // Check if mobile-menu.js is included
    if (!content.includes('mobile-menu.js')) {
      // Find the closing </body> tag and add script before it
      const bodyCloseIndex = content.lastIndexOf('</body>');
      if (bodyCloseIndex > 0) {
        const scriptTag = '    <script src="/docs/mobile-menu.js"></script>\n';
        content = content.slice(0, bodyCloseIndex) + scriptTag + content.slice(bodyCloseIndex);
        updated = true;
        console.log(`  ✓ Added mobile-menu.js to ${basename(filePath)}`);
      }
    }

    // Ensure mobile responsive styles are correct (remove !important flags)
    if (content.includes('!important') && content.includes('@media (max-width: 900px)')) {
      content = content.replace(/!important/g, '');
      updated = true;
      console.log(`  ✓ Removed !important flags from ${basename(filePath)}`);
    }

    // Ensure docs-main-wrapper has proper mobile styles
    const mobileMediaMatch = content.match(/@media\s*\(max-width:\s*900px\)\s*\{([^}]*)\}/s);
    if (mobileMediaMatch && !mobileMediaMatch[1].includes('.docs-main-wrapper')) {
      content = content.replace(
        /(@media\s*\(max-width:\s*900px\)\s*\{[^}]*\.docs-content[^}]*\{[^}]*\})/s,
        (match) => {
          return match.replace(
            /(\.docs-content[^}]*\{[^}]*\})/s,
            '.docs-main-wrapper {\n                margin-left: 0;\n                width: 100%;\n            }\n            \n            $1'
          );
        }
      );
      updated = true;
      console.log(`  ✓ Added docs-main-wrapper mobile styles to ${basename(filePath)}`);
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
  console.log("Ensuring mobile compatibility for all documentation pages...\n");
  const htmlFiles = await findHtmlFiles(docsDir);
  console.log(`Found ${htmlFiles.length} HTML files to check\n`);

  let updatedCount = 0;
  for (const file of htmlFiles) {
    const updated = await ensureMobileCompatibility(file);
    if (updated) {
      updatedCount++;
    }
  }

  console.log(`\n✓ Updated ${updatedCount} files`);
  console.log(`✓ ${htmlFiles.length - updatedCount} files already mobile-compatible`);
}

main().catch(console.error);

