import { rm, mkdir, cp } from "fs/promises";
import { existsSync } from "fs";
import { execSync } from "child_process";
import path from "path";

async function prepareSite() {
  const projectRoot = process.cwd();
  const siteDir = path.join(projectRoot, "_site");
  const distPublicDir = path.join(projectRoot, "dist", "public");

  console.log("Preparing _site directory...");

  // Clean previous _site directory
  if (existsSync(siteDir)) {
    await rm(siteDir, { recursive: true, force: true });
  }
  await mkdir(siteDir, { recursive: true });

  // Copy built files from dist/public
  if (existsSync(distPublicDir)) {
    // Copy index.html
    if (existsSync(path.join(distPublicDir, "index.html"))) {
      await cp(
        path.join(distPublicDir, "index.html"),
        path.join(siteDir, "index.html")
      );
      console.log("✓ Copied index.html");
    }

    // Copy assets directory
    const assetsDir = path.join(distPublicDir, "assets");
    if (existsSync(assetsDir)) {
      await cp(assetsDir, path.join(siteDir, "assets"), { recursive: true });
      console.log("✓ Copied assets directory");
    }

    // Copy kubegraf-logo.png if it exists
    const logoPath = path.join(distPublicDir, "kubegraf-logo.png");
    if (existsSync(logoPath)) {
      await cp(logoPath, path.join(siteDir, "kubegraf-logo.png"));
      console.log("✓ Copied kubegraf-logo.png");
    }
  }

  // Copy docs directory
  const docsDir = path.join(projectRoot, "docs");
  if (existsSync(docsDir)) {
    await cp(docsDir, path.join(siteDir, "docs"), { recursive: true });
    console.log("✓ Copied docs directory");
  }

  // Copy static files
  const staticFiles = [
    "CNAME",
    "install.sh",
    "install.ps1",
    "favicon.ico",
    "favicon.png",
    "robots.txt",
    "sitemap.xml",
    "kubegraf-logo.png",
    "kubegraf-logo.svg",
    "kubegraf-logo-dark.png",
    "kubegraf-logo-light.png",
    "opengraph.jpg",
  ];

  for (const file of staticFiles) {
    const srcPath = path.join(projectRoot, file);
    if (existsSync(srcPath)) {
      await cp(srcPath, path.join(siteDir, file));
      console.log(`✓ Copied ${file}`);
    }
  }

  // Copy kubegraf directory if it exists
  const kubegrafDir = path.join(projectRoot, "kubegraf");
  if (existsSync(kubegrafDir)) {
    await cp(kubegrafDir, path.join(siteDir, "kubegraf"), { recursive: true });
    console.log("✓ Copied kubegraf directory");
  }

  console.log("✅ _site directory prepared successfully!");
}

prepareSite().catch((err) => {
  console.error("Error preparing _site directory:", err);
  process.exit(1);
});

