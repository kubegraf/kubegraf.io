import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

async function processFile(filePath: string) {
  try {
    let content = await readFile(filePath, "utf-8");
    let modified = false;
    
    // Check if theme-switcher.js is already in the body
    const hasThemeSwitcherInBody = /<script src="\/docs\/theme-switcher\.js"><\/script>/.test(content);
    const hasMobileMenu = /<script src="\/docs\/mobile-menu\.js"><\/script>/.test(content);
    
    // If mobile-menu.js exists but theme-switcher.js doesn't, add it
    if (hasMobileMenu && !hasThemeSwitcherInBody) {
      // Add theme-switcher.js right after mobile-menu.js
      content = content.replace(
        /(<script src="\/docs\/mobile-menu\.js"><\/script>)/,
        '$1\n    <script src="/docs/theme-switcher.js"></script>'
      );
      modified = true;
      console.log(`[ok] ${filePath} - added theme-switcher.js`);
    } else if (!hasMobileMenu && !hasThemeSwitcherInBody) {
      // If no mobile-menu.js, add theme-switcher.js before closing body tag
      const bodyEndPattern = /<\/body>/;
      if (bodyEndPattern.test(content)) {
        content = content.replace(
          /<\/body>/,
          '    <script src="/docs/theme-switcher.js"></script>\n</body>'
        );
        modified = true;
        console.log(`[ok] ${filePath} - added theme-switcher.js before </body>`);
      }
    } else if (hasThemeSwitcherInBody) {
      console.log(`[skip] ${filePath} - already has theme-switcher.js`);
    } else {
      console.log(`[skip] ${filePath} - no mobile-menu.js found, may need manual check`);
    }
    
    // Also ensure theme-styles.css is in head
    const hasThemeStyles = /<link rel="stylesheet" href="\/docs\/theme-styles\.css">/.test(content);
    if (!hasThemeStyles) {
      // Try to add it after other stylesheets
      const stylePattern = /(<link[^>]*stylesheet[^>]*>)/;
      if (stylePattern.test(content)) {
        content = content.replace(
          /(<link[^>]*stylesheet[^>]*>)/,
          '$1\n    <link rel="stylesheet" href="/docs/theme-styles.css">'
        );
        modified = true;
        console.log(`[ok] ${filePath} - added theme-styles.css`);
      }
    }
    
    if (modified) {
      await writeFile(filePath, content, "utf-8");
      return true;
    }
    return false;
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
  const docsDir = path.join(process.cwd(), "docs");
  const htmlFiles = await findHtmlFiles(docsDir);
  
  console.log(`Found ${htmlFiles.length} HTML files`);
  console.log("\nAdding theme-switcher.js to all docs pages...\n");
  
  let updated = 0;
  for (const file of htmlFiles) {
    const result = await processFile(file);
    if (result) updated++;
  }
  
  console.log(`\nDone! Updated ${updated} files. All pages now have theme switcher.`);
}

main().catch(console.error);

