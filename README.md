# KubeGraf Website

<div align="center">

**Official website for KubeGraf - The Intelligent Kubernetes Control Center**

[![Release](https://img.shields.io/badge/version-0.2.0--alpha-blue.svg)](https://github.com/kubegraf/kubegraf.io/releases)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

**[Visit Live Site](https://kubegraf.io)** · **[Main Repository](https://github.com/kubegraf/kubegraf)** · **[Report Issue](https://github.com/kubegraf/kubegraf.io/issues)**

</div>

---

## 📖 About

This repository contains the official marketing website for [KubeGraf](https://github.com/kubegraf/kubegraf), a production-grade Kubernetes management platform. The website showcases KubeGraf's features, provides installation instructions, and serves as the central hub for project information.

## 🚀 Features

### Modern, Animated Landing Page

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

- **Pure HTML/CSS/JavaScript** - No build process required
- **CSS Variables** - Easy theming and customization
- **Intersection Observer API** - Scroll-triggered animations
- **WebSocket** - For potential live demos (future)
- **SVG Graphics** - Scalable vector icons and illustrations

## 📂 Project Structure

```
kubegraf.io/
├── index.html              # Main landing page
├── assets/
│   ├── icons/             # Favicons and app icons
│   │   ├── favicon.png
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── images/            # Images and graphics
│       └── og-image.png   # Open Graph image
├── install.sh             # Installation script
├── manifest.json          # PWA manifest
├── favicon.ico            # Browser favicon
└── README.md              # This file
```

## 🏃 Running Locally

The website is a static site and can be served with any web server:

### Option 1: Python HTTP Server

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: http://localhost:8000

### Option 2: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

Then open: http://localhost:8000

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

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

### GitHub Pages

This repository is configured to deploy automatically to GitHub Pages:

1. Push to `main` branch
2. GitHub Actions builds and deploys to `gh-pages` branch
3. Site is live at https://kubegraf.io

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file with your domain name
2. Configure DNS records:
   - `A` record pointing to GitHub Pages IPs
   - Or `CNAME` record pointing to `<username>.github.io`

### Netlify / Vercel

The site can also be deployed to Netlify or Vercel:

- Simply connect your repository
- No build command needed (static site)
- Set publish directory to `/` (root)

## 📝 Content Updates

### Installation Script

The installation script is served from `/install.sh`. To update:

1. Edit `install.sh`
2. Test locally: `bash install.sh`
3. Commit and push to GitHub

### Version Numbers

Update version numbers in:
- `index.html` - Meta tags and content
- `manifest.json` - PWA version
- This `README.md` - Badge at top

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
