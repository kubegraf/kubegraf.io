/**
 * Center all documentation content properly
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

async function centerContent(filePath: string): Promise<boolean> {
  try {
    let content = await readFile(filePath, "utf-8");
    let updated = false;

    // Update .docs-content to add margin-right: auto and ensure proper width
    const docsContentPattern = /(\.docs-content\s*\{[^}]*max-width:\s*1400px;[^}]*)(width:\s*calc\(100%\s*-\s*280px\);[^}]*)(box-sizing:\s*border-box;[^}]*\})/s;
    if (docsContentPattern.test(content)) {
      content = content.replace(
        docsContentPattern,
        (match, p1, p2, p3) => {
          // Check if margin-right: auto is already there
          if (!match.includes('margin-right: auto')) {
            return `${p1}${p2}\n            margin-right: auto;${p3}`;
          }
          return match;
        }
      );
      updated = true;
    }

    // Also handle single-line format
    const singleLinePattern = /(\.docs-content\s*\{[^}]*max-width:\s*1400px;[^}]*width:\s*calc\(100%\s*-\s*280px\);[^}]*box-sizing:\s*border-box;[^}]*\})/s;
    if (singleLinePattern.test(content) && !content.includes('margin-right: auto')) {
      content = content.replace(
        singleLinePattern,
        (match) => {
          return match.replace('box-sizing: border-box;', 'box-sizing: border-box;\n            margin-right: auto;');
        }
      );
      updated = true;
    }

    // Update main.content.docs-content
    const mainContentPattern = /(main\.content\.docs-content\s*\{[^}]*margin-left:\s*280px;[^}]*width:\s*calc\(100%\s*-\s*280px\);[^}]*)(max-width:\s*1400px;[^}]*\})/s;
    if (mainContentPattern.test(content)) {
      if (!content.includes('margin-right: auto', content.indexOf('main.content.docs-content'))) {
        content = content.replace(
          mainContentPattern,
          '$1margin-right: auto;\n            $2'
        );
        updated = true;
      }
    }

    // Update .docs-main-wrapper to add flexbox centering
    const wrapperPattern = /(\.docs-main-wrapper\s*\{[^}]*width:\s*calc\(100%\s*-\s*280px\);[^}]*)(\})/s;
    if (wrapperPattern.test(content)) {
      if (!content.includes('display: flex', content.indexOf('.docs-main-wrapper')) || 
          !content.includes('justify-content: center', content.indexOf('.docs-main-wrapper'))) {
        content = content.replace(
          wrapperPattern,
          '$1\n            display: flex;\n            justify-content: center;$2'
        );
        updated = true;
      }
    }

    // Also handle single-line wrapper format
    const singleLineWrapper = /(\.docs-main-wrapper\s*\{[^}]*width:\s*calc\(100%\s*-\s*280px\);[^}]*\})/s;
    if (singleLineWrapper.test(content) && !content.includes('display: flex', content.indexOf('.docs-main-wrapper'))) {
      content = content.replace(
        singleLineWrapper,
        (match) => {
          return match.replace('}', '\n            display: flex;\n            justify-content: center;\n        }');
        }
      );
      updated = true;
    }

    if (updated) {
      await writeFile(filePath, content, "utf-8");
      console.log(`✓ Centered content in ${basename(filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error);
    return false;
  }
}

async function main() {
  console.log("Centering all documentation content...\n");
  const htmlFiles = await findHtmlFiles(docsDir);
  console.log(`Found ${htmlFiles.length} HTML files to check\n`);

  let updatedCount = 0;
  for (const file of htmlFiles) {
    const updated = await centerContent(file);
    if (updated) {
      updatedCount++;
    }
  }

  console.log(`\n✓ Updated ${updatedCount} files`);
  console.log(`✓ ${htmlFiles.length - updatedCount} files already centered`);
}

main().catch(console.error);

