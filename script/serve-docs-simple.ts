/**
 * Simple HTTP server for documentation
 * Serves HTML files with .html extension preserved
 */

import { createServer, Server } from "http";
import { readFile, existsSync, statSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const docsDir = join(rootDir, "docs");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".md": "text/markdown",
};

// Try to find an available port, starting from 3000
function findAvailablePort(startPort: number = 3000): Promise<number> {
  return new Promise((resolve, reject) => {
    const testServer = createServer();
    testServer.listen(startPort, () => {
      const port = (testServer.address() as any)?.port;
      testServer.close(() => resolve(port));
    });
    testServer.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        // Try next port
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

const server = createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end("Bad Request");
    return;
  }

  // Remove query string
  let urlPath = req.url.split("?")[0];

  // Default to index.html for root
  if (urlPath === "/" || urlPath === "/docs" || urlPath === "/docs/") {
    urlPath = "/docs/index.html";
  }

  // Remove leading slash and resolve path
  const cleanPath = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;
  const fullPath = join(rootDir, cleanPath);

  // Security check - ensure path is within docs directory
  if (!fullPath.startsWith(docsDir) && !fullPath.startsWith(join(rootDir, "docs"))) {
    // Allow assets from root if they exist
    if (!cleanPath.startsWith("assets/") && !cleanPath.startsWith("favicon")) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
  }

  // Check if file exists
  if (!existsSync(fullPath)) {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  // Check if it's a file (not directory)
  try {
    const stats = statSync(fullPath);
    if (!stats.isFile()) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }
  } catch (e) {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  // Read and serve file
  readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Internal Server Error");
      return;
    }

    const ext = extname(fullPath);
    const contentType = MIME_TYPES[ext] || "text/plain";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

// Start server on available port
const startPort = process.env.PORT ? parseInt(process.env.PORT) : 3000;
findAvailablePort(startPort).then((port) => {
  server.listen(port, () => {
    console.log(`📚 Documentation server running at http://localhost:${port}`);
    console.log(`   Serving from: ${docsDir}`);
    console.log(`\n   Try: http://localhost:${port}/docs/`);
    console.log(`   Or:  http://localhost:${port}/docs/core-concepts/incident-intelligence.html`);
    console.log(`\n   Press Ctrl+C to stop\n`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
