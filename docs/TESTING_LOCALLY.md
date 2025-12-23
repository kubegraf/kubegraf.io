# Testing Documentation Locally

This guide explains how to test the KubeGraf documentation locally before deploying.

## Quick Start

### Option 1: Simple Static Server (Recommended)

The easiest way to preview your documentation:

```bash
# Using npx serve (no installation needed)
npm run docs:serve

# Or install serve globally
npm install -g serve
serve docs -p 3000
```

Then open: http://localhost:3000

**Note:** This serves files as-is. Markdown files will show as plain text. For markdown rendering, use Option 2.

### Option 2: Python HTTP Server

If you have Python installed:

```bash
cd docs
python3 -m http.server 3000
```

Then open: http://localhost:3000

### Option 3: Using Vite Dev Server

If you want to test with the full site:

```bash
npm run dev:client
```

This starts the Vite dev server on port 5000. The docs are served from `client/public/docs/`.

### Option 4: Markdown Preview (VS Code)

If you use VS Code:

1. Install the "Markdown Preview Enhanced" extension
2. Open any `.md` file
3. Right-click → "Markdown Preview Enhanced: Open Preview to the Side"

This gives you a live preview with navigation.

## Testing Markdown Files

Since the new documentation is in Markdown format, here are ways to preview it:

### Using a Markdown Viewer

**Option A: Install a markdown server**

```bash
npm install -g markdown-serve
cd docs
markdown-serve
```

**Option B: Use a browser extension**

- Chrome: "Markdown Viewer" extension
- Firefox: "Markdown Viewer" add-on

Then open markdown files directly in the browser.

**Option C: Use GitHub**

1. Push your changes to a branch
2. View files on GitHub (they render markdown automatically)
3. Use GitHub's file viewer to check formatting

## Testing Navigation

To test the sidebar navigation:

1. Check `docs/sidebar.json` - ensure all links are correct
2. Verify file paths match the hrefs in sidebar.json
3. Test that all markdown files exist at their expected paths

### Quick Navigation Test

```bash
# Check if all sidebar links point to existing files
cd docs
node -e "
const sidebar = require('./sidebar.json');
sidebar.sections.forEach(section => {
  section.items.forEach(item => {
    const path = item.href.replace('/docs/', '') + '.md';
    const fs = require('fs');
    if (!fs.existsSync(path) && !fs.existsSync(path.replace('.md', '.html'))) {
      console.log('Missing:', path);
    }
  });
});
"
```

## Testing Links

### Check Internal Links

```bash
# Find all markdown files
find docs -name "*.md" -type f

# Check for broken internal links (basic check)
grep -r "\[.*\](" docs/ --include="*.md"
```

### Validate Cross-References

Make sure all cross-references in the documentation:
- Use relative paths correctly
- Point to existing files
- Use proper anchor links for sections

## Testing Structure

### Verify File Organization

```bash
# Check that all new docs are in the right place
ls -la docs/core-concepts/
ls -la docs/user-guide/
ls -la docs/architecture/
ls -la docs/compare/
```

### Check Sidebar Structure

```bash
# Validate sidebar.json syntax
node -e "JSON.parse(require('fs').readFileSync('docs/sidebar.json', 'utf-8')); console.log('✓ Valid JSON')"
```

## Testing on Different Devices

### Local Network Access

If you want to test on mobile devices:

```bash
# Find your local IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# Start server bound to all interfaces
python3 -m http.server 3000 --bind 0.0.0.0

# Or with serve
serve docs -p 3000 --listen 0.0.0.0
```

Then access from your phone: `http://YOUR_IP:3000`

## Pre-Deployment Checklist

Before deploying, verify:

- [ ] All markdown files render correctly
- [ ] Sidebar navigation works
- [ ] All internal links are valid
- [ ] Images and assets load correctly
- [ ] Code blocks format properly
- [ ] Tables render correctly
- [ ] Mobile responsiveness
- [ ] Search functionality (if applicable)

## Troubleshooting

### Markdown Not Rendering

If markdown shows as plain text:
- Use a markdown viewer (VS Code, browser extension, or GitHub)
- Or convert to HTML first using a tool like `pandoc`

### Links Not Working

- Check that paths are relative to the docs directory
- Ensure file extensions match (.md vs .html)
- Verify sidebar.json paths are correct

### Sidebar Not Showing

- Check that `sidebar.json` is valid JSON
- Verify the build system reads `sidebar.json`
- Check browser console for errors

## Next Steps

Once local testing is complete:

1. **Commit changes** - All new documentation files
2. **Update build system** - Ensure markdown → HTML conversion works
3. **Test in staging** - Deploy to a staging environment
4. **Verify production** - Check live site after deployment

---

**Quick Command Reference:**

```bash
# Simple serve (shows files as-is)
npm run docs:serve

# Python server
cd docs && python3 -m http.server 3000

# Vite dev server (full site)
npm run dev:client

# Check sidebar JSON
node -e "JSON.parse(require('fs').readFileSync('docs/sidebar.json', 'utf-8')); console.log('✓ Valid')"
```

