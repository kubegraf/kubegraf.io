/**
 * Finalize mobile compatibility - fix any remaining issues
 */

import { readFile, writeFile, readdir } from "fs/promises";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const docsDir = join(rootDir, "docs");

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

async function finalizeMobile(filePath: string): Promise<boolean> {
  try {
    let content = await readFile(filePath, "utf-8");
    let updated = false;

    // Fix syntax errors
    if (content.includes('$MOBILE_HOME_BTN_CSS')) {
      content = content.replace(/\$MOBILE_HOME_BTN_CSS/g, '');
      updated = true;
      console.log(`  ✓ Fixed syntax error in ${basename(filePath)}`);
    }

    // Remove duplicate mobile styles in media query
    const mediaMatch = content.match(/@media\s*\(max-width:\s*900px\)\s*\{([^}]*)\}/s);
    if (mediaMatch) {
      const mediaContent = mediaMatch[1];
      // Count occurrences of .docs-main-wrapper
      const wrapperMatches = (mediaContent.match(/\.docs-main-wrapper/g) || []).length;
      if (wrapperMatches > 1) {
        // Remove duplicates, keep the last one
        const parts = mediaContent.split(/\.docs-main-wrapper[^}]*\}/);
        if (parts.length > 1) {
          const lastWrapper = mediaContent.match(/\.docs-main-wrapper[^}]*\}/g)?.pop() || '';
          const cleaned = parts.slice(0, -1).join('') + lastWrapper + parts[parts.length - 1];
          content = content.replace(
            /@media\s*\(max-width:\s*900px\)\s*\{[^}]*\}/s,
            `@media (max-width: 900px) {${cleaned}\n        }`
          );
          updated = true;
          console.log(`  ✓ Removed duplicate wrapper styles in ${basename(filePath)}`);
        }
      }
    }

    // Clean up extra spaces in CSS
    if (content.includes('position: fixed ;') || content.includes('left: -280px ;')) {
      content = content.replace(/\s+;/g, ';');
      updated = true;
      console.log(`  ✓ Cleaned up CSS spacing in ${basename(filePath)}`);
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
  console.log("Finalizing mobile compatibility...\n");
  const htmlFiles = await findHtmlFiles(docsDir);
  console.log(`Found ${htmlFiles.length} HTML files to check\n`);

  let updatedCount = 0;
  for (const file of htmlFiles) {
    const updated = await finalizeMobile(file);
    if (updated) {
      updatedCount++;
    }
  }

  console.log(`\n✓ Updated ${updatedCount} files`);
  console.log(`✓ ${htmlFiles.length - updatedCount} files already finalized`);
}

main().catch(console.error);

