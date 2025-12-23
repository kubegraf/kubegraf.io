import { readFile, writeFile } from "fs/promises";
import { readdir } from "fs/promises";
import path from "path";

async function processFile(filePath: string) {
  try {
    let content = await readFile(filePath, "utf-8");
    let modified = false;

    // Pattern 1: Has favicon links but missing 48x48
    const pattern1 = /(<link rel="icon" type="image\/png" sizes="32x32" href="\/favicon\.png">)/;
    const pattern2 = /(<link rel="icon" type="image\/png" sizes="192x192" href="\/favicon\.png">)/;
    const pattern3 = /(<link rel="shortcut icon" href="\/favicon\.ico">)/;

    // Check if 48x48 is already present
    if (content.includes('sizes="48x48"')) {
      return false; // Already has it
    }

    // Add 48x48 link after favicon.ico or before 32x32
    if (pattern3.test(content)) {
      // Add after favicon.ico
      content = content.replace(
        pattern3,
        '$1\n    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">'
      );
      modified = true;
    } else if (pattern1.test(content)) {
      // Add before 32x32
      content = content.replace(
        pattern1,
        '    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">\n$1'
      );
      modified = true;
    }

    if (modified) {
      await writeFile(filePath, content, "utf-8");
      console.log(`[ok] ${filePath}`);
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
  const docsDir = path.join(process.cwd(), "client", "public", "docs");
  const htmlFiles = await findHtmlFiles(docsDir);

  console.log(`Found ${htmlFiles.length} HTML files in docs`);
  console.log("\nAdding favicon-48x48.png link to all docs pages...\n");

  let updated = 0;
  for (const file of htmlFiles) {
    const result = await processFile(file);
    if (result) updated++;
  }

  console.log(`\nDone! Updated ${updated} files.`);
}

main().catch(console.error);

