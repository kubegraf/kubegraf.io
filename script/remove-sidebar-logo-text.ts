import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

async function processFile(filePath: string) {
  try {
    let content = await readFile(filePath, "utf-8");
    
    // Replace sidebar logo with text to just icon (more compact)
    // Option 1: Remove text, keep icon only
    const oldLogoPattern = /<a href="\/" class="sidebar-logo">\s*<img[^>]*class="sidebar-logo-icon"[^>]*>\s*KubeGraf\s*<\/a>/;
    const newLogo = `<a href="/" class="sidebar-logo" title="KubeGraf Home">
        <img src="/assets/logo/kubegraf_color_icon.png" alt="KubeGraf" class="sidebar-logo-icon">
      </a>`;
    
    if (oldLogoPattern.test(content)) {
      content = content.replace(oldLogoPattern, newLogo);
      await writeFile(filePath, content, "utf-8");
      console.log(`[ok] ${filePath}`);
      return true;
    } else {
      // Try alternative pattern (with different spacing)
      const altPattern = /<a href="\/" class="sidebar-logo">[\s\S]*?<img[^>]*class="sidebar-logo-icon"[^>]*>[\s\S]*?KubeGraf[\s\S]*?<\/a>/;
      if (altPattern.test(content)) {
        content = content.replace(altPattern, newLogo);
        await writeFile(filePath, content, "utf-8");
        console.log(`[ok] ${filePath}`);
        return true;
      }
      console.log(`[skip] ${filePath} - pattern not found`);
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
  console.log("\nRemoving text from sidebar logo (keeping icon only)...\n");
  
  let updated = 0;
  for (const file of htmlFiles) {
    const result = await processFile(file);
    if (result) updated++;
  }
  
  console.log(`\nDone! Updated ${updated} files. Sidebar now shows icon only.`);
}

main().catch(console.error);

