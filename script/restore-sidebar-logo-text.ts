import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

async function processFile(filePath: string) {
  try {
    let content = await readFile(filePath, "utf-8");
    
    // Restore sidebar logo with text
    // Pattern 1: Icon only (what we just changed to)
    const iconOnlyPattern = /<a href="\/" class="sidebar-logo"[^>]*>\s*<img[^>]*class="sidebar-logo-icon"[^>]*>\s*<\/a>/;
    const logoWithText = `<a href="/" class="sidebar-logo">
        <img src="/assets/logo/kubegraf_color_icon.png" alt="KubeGraf logo" class="sidebar-logo-icon">
        KubeGraf
      </a>`;
    
    if (iconOnlyPattern.test(content)) {
      content = content.replace(iconOnlyPattern, logoWithText);
      await writeFile(filePath, content, "utf-8");
      console.log(`[ok] ${filePath}`);
      return true;
    } else {
      // Check if it already has text (multiline pattern)
      const multilinePattern = /<a href="\/" class="sidebar-logo"[^>]*>[\s\S]*?<img[^>]*class="sidebar-logo-icon"[^>]*>[\s\S]*?<\/a>/;
      if (multilinePattern.test(content) && !content.includes('KubeGraf</a>')) {
        // Has icon but no text, add text
        content = content.replace(
          /(<img[^>]*class="sidebar-logo-icon"[^>]*>)\s*(<\/a>)/,
          `$1\n        KubeGraf\n      $2`
        );
        await writeFile(filePath, content, "utf-8");
        console.log(`[ok] ${filePath} - added text`);
        return true;
      }
      console.log(`[skip] ${filePath} - already has text or pattern not found`);
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
  console.log("\nRestoring sidebar logo with text 'KubeGraf'...\n");
  
  let updated = 0;
  for (const file of htmlFiles) {
    const result = await processFile(file);
    if (result) updated++;
  }
  
  console.log(`\nDone! Updated ${updated} files. Sidebar now shows icon + text.`);
}

main().catch(console.error);

