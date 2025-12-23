/**
 * Fix mobile wrapper styles in all pages
 */

import { readFile, writeFile, readdir } from "fs/promises";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const docsDir = join(rootDir, "docs");

const MOBILE_WRAPPER_STYLES = `            .docs-main-wrapper {
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

async function fixMobileWrapper(filePath: string): Promise<boolean> {
  try {
    let content = await readFile(filePath, "utf-8");
    let updated = false;

    // Check if mobile media query exists
    const mediaMatch = content.match(/@media\s*\(max-width:\s*900px\)\s*\{([^}]*)\}/s);
    if (mediaMatch) {
      const mediaContent = mediaMatch[1];
      
      // Check if docs-main-wrapper styles are missing
      if (!mediaContent.includes('.docs-main-wrapper')) {
        // Find where to insert (after sidebar styles, before docs-content)
        const sidebarMatch = mediaContent.match(/\.sidebar\.mobile-open[^}]*\}/);
        if (sidebarMatch) {
          const insertIndex = mediaContent.indexOf(sidebarMatch[0]) + sidebarMatch[0].length;
          const newMediaContent = mediaContent.slice(0, insertIndex) + '\n            \n' + MOBILE_WRAPPER_STYLES + '\n            ' + mediaContent.slice(insertIndex);
          content = content.replace(
            /@media\s*\(max-width:\s*900px\)\s*\{[^}]*\}/s,
            `@media (max-width: 900px) {${newMediaContent}\n        }`
          );
          updated = true;
          console.log(`  ✓ Added mobile wrapper styles to ${basename(filePath)}`);
        } else {
          // Insert at the beginning of media query
          content = content.replace(
            /(@media\s*\(max-width:\s*900px\)\s*\{)/,
            `$1\n            ${MOBILE_WRAPPER_STYLES}\n            `
          );
          updated = true;
          console.log(`  ✓ Added mobile wrapper styles to ${basename(filePath)}`);
        }
      }
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
  console.log("Fixing mobile wrapper styles...\n");
  const htmlFiles = await findHtmlFiles(docsDir);
  console.log(`Found ${htmlFiles.length} HTML files to check\n`);

  let updatedCount = 0;
  for (const file of htmlFiles) {
    const updated = await fixMobileWrapper(file);
    if (updated) {
      updatedCount++;
    }
  }

  console.log(`\n✓ Updated ${updatedCount} files`);
  console.log(`✓ ${htmlFiles.length - updatedCount} files already have mobile wrapper styles`);
}

main().catch(console.error);

