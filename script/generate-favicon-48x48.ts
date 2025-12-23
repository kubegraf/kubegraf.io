#!/usr/bin/env tsx
/**
 * Generate favicon-48x48.png from favicon-192x192.png
 * 
 * This script creates a 48x48 PNG favicon that Google Search prefers
 * for SERP (Search Engine Results Page) display.
 * 
 * Requirements:
 * - ImageMagick must be installed (brew install imagemagick)
 * - Source file: client/public/favicon-192x192.png
 * - Output: favicon-48x48.png (root and client/public/)
 */

import { execSync } from "child_process";
import { existsSync, copyFileSync } from "fs";
import { join } from "path";

const sourceFile = join(process.cwd(), "client", "public", "favicon-192x192.png");
const outputRoot = join(process.cwd(), "favicon-48x48.png");
const outputPublic = join(process.cwd(), "client", "public", "favicon-48x48.png");

function checkImageMagick() {
  try {
    execSync("magick -version", { stdio: "ignore" });
    return true;
  } catch {
    try {
      execSync("convert -version", { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  }
}

function generateFavicon() {
  if (!existsSync(sourceFile)) {
    throw new Error(`Source file not found: ${sourceFile}`);
  }

  const hasMagick = checkImageMagick();
  if (!hasMagick) {
    throw new Error(
      "ImageMagick not found. Install with: brew install imagemagick"
    );
  }

  console.log("Generating favicon-48x48.png from favicon-192x192.png...");

  // Use magick (IMv7) or convert (IMv6) command
  const command = execSync("which magick", { encoding: "utf-8" }).trim()
    ? "magick"
    : "convert";

  // Generate 48x48 PNG with transparent background, centered
  execSync(
    `${command} "${sourceFile}" -resize 48x48 -background none -gravity center -extent 48x48 "${outputRoot}"`,
    { stdio: "inherit" }
  );

  // Copy to client/public/ for build process
  copyFileSync(outputRoot, outputPublic);

  console.log(`✓ Generated: ${outputRoot}`);
  console.log(`✓ Copied to: ${outputPublic}`);
  console.log("✓ favicon-48x48.png is ready for Google SERP");
}

generateFavicon();

