import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

async function processFile(filePath: string) {
  try {
    let content = await readFile(filePath, "utf-8");
    let modified = false;
    
    // Remove theme-switcher.js from head (if it exists there)
    const headPattern = /<link rel="stylesheet" href="\/docs\/theme-styles\.css">\s*<script src="\/docs\/theme-switcher\.js"><\/script>/;
    if (headPattern.test(content)) {
      content = content.replace(headPattern, '<link rel="stylesheet" href="/docs/theme-styles.css">');
      modified = true;
    }
    
    // Add theme-switcher.js before closing body tag (if not already there)
    const bodyEndPattern = /<script src="\/docs\/mobile-menu\.js"><\/script>/;
    const themeScriptPattern = /<script src="\/docs\/theme-switcher\.js"><\/script>/;
    
    if (bodyEndPattern.test(content) && !themeScriptPattern.test(content)) {
      // Add theme-switcher.js right after mobile-menu.js
      content = content.replace(
        /(<script src="\/docs\/mobile-menu\.js"><\/script>)/,
        '$1\n    <script src="/docs/theme-switcher.js"></script>'
      );
      modified = true;
    }
    
    if (modified) {
      await writeFile(filePath, content, "utf-8");
      console.log(`[ok] ${filePath}`);
      return true;
    } else {
      console.log(`[skip] ${filePath} - already correct or pattern not found`);
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
  const docsDir = path.join(process.cwd(), "docs");
  const htmlFiles = await findHtmlFiles(docsDir);
  
  console.log(`Found ${htmlFiles.length} HTML files`);
  console.log("\nFixing theme switcher script loading (move from head to body end)...\n");
  
  let updated = 0;
  for (const file of htmlFiles) {
    const result = await processFile(file);
    if (result) updated++;
  }
  
  console.log(`\nDone! Updated ${updated} files. Theme switcher now loads at end of body.`);
}

main().catch(console.error);

