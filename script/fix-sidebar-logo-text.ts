import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

async function processFile(filePath: string) {
  try {
    let content = await readFile(filePath, "utf-8");
    
    // Replace "KubeGraf" with "KubēGraf" in sidebar logo
    // Pattern: Look for sidebar-logo section and replace the text
    const oldPattern = /(<a href="\/" class="sidebar-logo">[\s\S]*?<img[^>]*class="sidebar-logo-icon"[^>]*>[\s\S]*?)KubeGraf([\s\S]*?<\/a>)/;
    const newText = '$1KubēGraf$2';
    
    if (oldPattern.test(content)) {
      content = content.replace(oldPattern, newText);
      await writeFile(filePath, content, "utf-8");
      console.log(`[ok] ${filePath}`);
      return true;
    } else {
      // Try alternative pattern (more flexible)
      const altPattern = /(sidebar-logo[^>]*>[\s\S]*?sidebar-logo-icon[^>]*>[\s\S]*?)KubeGraf([\s\S]*?<\/a>)/;
      if (altPattern.test(content)) {
        content = content.replace(altPattern, '$1KubēGraf$2');
        await writeFile(filePath, content, "utf-8");
        console.log(`[ok] ${filePath}`);
        return true;
      }
      // Try simple replace if it's just the text
      if (content.includes('KubeGraf</a>')) {
        content = content.replace(/KubeGraf<\/a>/g, 'KubēGraf</a>');
        await writeFile(filePath, content, "utf-8");
        console.log(`[ok] ${filePath} - simple replace`);
        return true;
      }
      console.log(`[skip] ${filePath} - pattern not found or already correct`);
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
  console.log("\nUpdating sidebar logo text to 'KubēGraf' (with macron)...\n");
  
  let updated = 0;
  for (const file of htmlFiles) {
    const result = await processFile(file);
    if (result) updated++;
  }
  
  console.log(`\nDone! Updated ${updated} files. Sidebar now shows 'KubēGraf'.`);
}

main().catch(console.error);

