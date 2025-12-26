import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync, existsSync } from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

// Plugin to serve static docs files before React router
function serveStaticDocs() {
  return {
    name: "serve-static-docs",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Check if the request is for /docs/ or /docs
        if (req.url?.startsWith("/docs")) {
          // Try to serve the static file
          const publicPath = path.resolve(import.meta.dirname, "client", "public", req.url.slice(1));
          
          // If it's /docs/ or /docs, try to serve /docs/index.html
          if (req.url === "/docs/" || req.url === "/docs") {
            const indexPath = path.resolve(import.meta.dirname, "client", "public", "docs", "index.html");
            if (existsSync(indexPath)) {
              const content = readFileSync(indexPath, "utf-8");
              res.setHeader("Content-Type", "text/html");
              res.end(content);
              return;
            }
          }
          
          // Otherwise, check if the file exists
          if (existsSync(publicPath)) {
            const content = readFileSync(publicPath, "utf-8");
            const ext = path.extname(publicPath);
            if (ext === ".html") {
              res.setHeader("Content-Type", "text/html");
            } else if (ext === ".css") {
              res.setHeader("Content-Type", "text/css");
            } else if (ext === ".js") {
              res.setHeader("Content-Type", "application/javascript");
            }
            res.end(content);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    serveStaticDocs(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
