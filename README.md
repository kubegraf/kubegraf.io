# KubeGraf

**Intelligent Insight for Kubernetes Incidents**

KubeGraf is a local-first Kubernetes incident intelligence tool that detects incidents, explains why they happen using evidence, and safely previews fixes — without SaaS lock-in.

<div align="center">

[![Release](https://img.shields.io/badge/version-0.2.0--alpha-blue.svg)](https://github.com/kubegraf/kubegraf.io/releases)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

**[Visit Live Site](https://kubegraf.io)** · **[Main Repository](https://github.com/kubegraf/kubegraf)** · **[Report Issue](https://github.com/kubegraf/kubegraf.io/issues)**

</div>

---

## 📖 About

This repository contains the official website for KubeGraf—a local-first Kubernetes incident detection and analysis tool. The main KubeGraf application source code is maintained in the [kubegraf/kubegraf](https://github.com/kubegraf/kubegraf) repository, while this repo focuses on the marketing website, documentation, and deployment configuration.

## 🚀 KubeGraf Features

KubeGraf itself provides:

- **Incident Detection** - Automatically identifies problems in your Kubernetes environment
- **Root Cause Analysis** - Explains why incidents occur with supporting evidence
- **Safe Remediation Preview** - Shows what fixes would do before you apply them
- **Local-First Architecture** - Runs on your laptop or inside your environment
- **No SaaS Lock-in** - Full control, no mandatory cloud dependencies

## 🎨 Website Features

This repository's website includes modern design elements:

- **Animated Marquee Banner** - Wallarm-inspired scrolling announcement banner
- **Connection Lines Background** - Dynamic network visualization with pulsing nodes
- **Interactive Workflow Tabs** - DuploCloud-inspired tabbed showcase for three interfaces
- **Floating Orbs & Particles** - Ambient background animations
- **Number Counter Animations** - Scroll-triggered stat animations
- **Enhanced Navbar Effects** - Smooth scroll-based transitions
- **Skeleton Shimmer Loaders** - Loading state animations

### Responsive Design

- Mobile-first approach with optimized layouts
- Reduced animations on mobile for better performance
- Accessible with ARIA labels and reduced-motion support
- Fast loading with optimized assets

### SEO & Social

- Open Graph meta tags for social media sharing
- Twitter Card support
- JSON-LD structured data for search engines
- Semantic HTML with proper heading hierarchy
- Canonical URLs and meta descriptions

## 🛠️ Technology Stack

- **Framework**: Vite + React
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: GitHub Actions → GitHub Pages

## 📂 Project Structure

```
kubegraf.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Build and deploy workflow
├── client/                     # React source code
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       └── Navbar.tsx  # Main navigation with logo
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Entry point
│   ├── dist/public/            # Build output (gitignored)
│   └── public/                 # Static assets
├── docs/                       # Documentation pages (HTML)
├── assets/                     # Built assets from Vite (JS/CSS)
├── index.html                  # Main entry point (built)
├── kubegraf-logo.png          # Logo image
├── package.json                # NPM dependencies
├── vite.config.ts              # Vite build config
├── CNAME                       # Custom domain configuration
├── install.sh                  # Installation script
└── README.md                   # This file
```

## 🏃 Local Development

### Prerequisites

- Node.js 20+
- npm
- Python 3 (for local server)

### Build and Serve Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```
   This creates production-ready files in `dist/public/`

3. **Prepare _site directory:**
   ```bash
   rm -rf _site
   mkdir -p _site
   cp dist/public/index.html _site/
   cp -r dist/public/assets _site/
   cp dist/public/kubegraf-logo.png _site/
   cp -r docs _site/
   cp CNAME _site/ 2>/dev/null || true
   cp install.sh _site/ 2>/dev/null || true
   cp install.ps1 _site/ 2>/dev/null || true
   cp favicon.ico _site/ 2>/dev/null || true
   cp robots.txt _site/ 2>/dev/null || true
   cp sitemap.xml _site/ 2>/dev/null || true
   ```

4. **Serve locally:**
   ```bash
   cd _site
   python3 -m http.server 8081
   ```

5. **View the site:**
   Open [http://localhost:8081](http://localhost:8081) in your browser

### Quick Development Script

Create `build-and-serve.sh`:

```bash
#!/bin/bash
set -e

echo "Building from source..."
npm run build

echo "Preparing _site directory..."
rm -rf _site
mkdir -p _site
cp dist/public/index.html _site/
cp -r dist/public/assets _site/
cp dist/public/kubegraf-logo.png _site/
cp -r docs _site/
cp CNAME _site/ 2>/dev/null || true
cp install.sh _site/ 2>/dev/null || true
cp install.ps1 _site/ 2>/dev/null || true
cp favicon.ico _site/ 2>/dev/null || true
cp robots.txt _site/ 2>/dev/null || true
cp sitemap.xml _site/ 2>/dev/null || true

echo "Starting server on http://localhost:8081..."
cd _site
python3 -m http.server 8081
```

Make it executable and run:
```bash
chmod +x build-and-serve.sh
./build-and-serve.sh
```

## 🎨 Customization

### Color Scheme

The site uses CSS variables defined in the `:root` selector. Modify these in `index.html`:

```css
:root {
    --primary: #326ce5;        /* Kubernetes blue */
    --primary-dark: #2756b8;
    --secondary: #00d4aa;      /* Accent cyan */
    --dark: #0f172a;           /* Background dark */
    --darker: #020617;         /* Background darker */
    --light: #f8fafc;          /* Text light */
    --gray: #64748b;           /* Text muted */
}
```

### Animations

All animations support `prefers-reduced-motion` for accessibility. Users who prefer reduced motion will see static content without animations.

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)

The site automatically deploys when changes are pushed to the `main` branch.

**Workflow Process:**
1. Checkout kubegraf.io repository
2. Install Node.js 20 and dependencies
3. Build Vite application from `client/` directory
4. Copy built files + static assets to `_site/`
5. Deploy to GitHub Pages

**Manual Trigger:**
1. Go to Actions tab on GitHub
2. Select "Build and Deploy to GitHub Pages"
3. Click "Run workflow"

### Making Changes

**Update Landing Page:**
1. Edit files in `client/src/` directory
2. Build: `npm run build`
3. Test locally (see steps above)
4. Commit and push to deploy

**Update Logo:**
1. Place new logo at `client/public/kubegraf-logo.png`
2. Rebuild: `npm run build`
3. Test locally
4. Commit and push

**Update Documentation:**
1. Edit HTML files in `/docs` directory
2. Test locally
3. Commit and push

## 🐛 Troubleshooting

**Logo not updating:**
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Verify file was copied: `ls -lh _site/kubegraf-logo.png`

**Build fails:**
- Check Node.js version: `node --version` (should be 20+)
- Clear node_modules: `rm -rf node_modules && npm install`

**Local server not working:**
- Check port 8081: `lsof -ti:8081`
- Kill existing process: `lsof -ti:8081 | xargs kill -9`

## Build Configuration

**Monorepo Structure**: All source code in this repository
- Build command: `npm run build`
- Output directory: `dist/public/`

**Key Components:**
- Navbar: `client/src/components/layout/Navbar.tsx`
- Main App: `client/src/App.tsx`
- Build Config: `vite.config.ts`
- Build Script: `script/build.ts`

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-change`
3. Make your changes
4. Test locally
5. Commit: `git commit -m 'Add amazing change'`
6. Push: `git push origin feature/amazing-change`
7. Open a Pull Request

### Design Guidelines

- Maintain the Kubernetes blue (`#326ce5`) as primary color
- Use consistent spacing (multiples of 0.25rem)
- Ensure mobile responsiveness
- Test animations with `prefers-reduced-motion`
- Optimize images and assets

## 🐛 Reporting Issues

Found a bug or have a suggestion? Please [open an issue](https://github.com/kubegraf/kubegraf.io/issues) with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and OS information

## 📚 Related Links

- **Main Project**: [kubegraf/kubegraf](https://github.com/kubegraf/kubegraf)
- **Documentation**: [kubegraf.io/docs](https://kubegraf.io/docs/)
- **Releases**: [GitHub Releases](https://github.com/kubegraf/kubegraf/releases)
- **Community**: [GitHub Discussions](https://github.com/kubegraf/kubegraf/discussions)

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) for details

---

<div align="center">

**Built with ❤️ for the Kubernetes community**

[Website](https://kubegraf.io) · [GitHub](https://github.com/kubegraf/kubegraf) · [Issues](https://github.com/kubegraf/kubegraf.io/issues)

</div>
