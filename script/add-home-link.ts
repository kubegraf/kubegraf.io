import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

const HOME_LINK = `
      <div class="sidebar-section">
        <ul>
          <li><a href="/">🏠 Home</a></li>
        </ul>
      </div>

`;

async function processFile(filePath: string) {
  try {
    const content = await readFile(filePath, "utf-8");
    
    // Skip if already has Home link
    if (content.includes('🏠 Home') || content.includes('href="/">Home')) {
      console.log(`[skip] ${filePath} - already has Home link`);
      return;
    }
    
    // Add Home link after the logo, before the first sidebar-section
    const updated = content.replace(
      /(<\/a>\s*)(<div class="sidebar-section">)/,
      `$1${HOME_LINK}$2`
    );
    
    if (updated !== content) {
      await writeFile(filePath, updated, "utf-8");
      console.log(`[ok] ${filePath}`);
    } else {
      console.log(`[skip] ${filePath} - pattern not found`);
    }
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

