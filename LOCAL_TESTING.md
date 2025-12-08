# Local Testing Guide for Next.js

## Quick Start

### 1. Install Dependencies (if not already done)
```bash
cd /Users/itsmine/Documents/repos/kubegraf/kubegraf.io
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The development server will start at: **http://localhost:3000**

### 3. Open in Browser
Open your browser and navigate to:
```
http://localhost:3000
```

---

## Available Scripts

### Development Mode
```bash
npm run dev
```
- Starts Next.js development server
- Hot reload enabled (changes auto-refresh)
- Runs on `http://localhost:3000`
- Includes error overlay and fast refresh

### Production Build
```bash
npm run build
```
- Creates optimized production build
- Outputs to `out/` directory (for static export)
- Checks for errors and optimizes assets

### Test Production Build Locally
```bash
npm run build
npx serve out
```
- Builds the static site
- Serves it locally to test production build
- Usually runs on `http://localhost:3000` or `http://localhost:5000`

### Linting
```bash
npm run lint
```
- Checks code for errors and warnings
- Uses ESLint with Next.js config

---

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Use a different port
PORT=3001 npm run dev
```

Or kill the process using port 3000:
```bash
# Find process
lsof -ti:3000

# Kill it
kill -9 $(lsof -ti:3000)
```

### Build Errors
If you get TypeScript errors:
```bash
# Check for missing types
npm install --save-dev @types/three

# Or skip type checking during build (not recommended)
# Edit next.config.js to add:
# typescript: { ignoreBuildErrors: true }
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Development Tips

1. **Hot Reload**: Changes to components auto-refresh in browser
2. **Error Overlay**: Errors show directly in browser
3. **Fast Refresh**: React components preserve state on updates
4. **Console Logs**: Check browser console and terminal for errors

---

## Testing Static Export

To test the static export (what GitHub Pages will use):

```bash
# Build static site
npm run build

# Serve the static files
npx serve out

# Or use Python
cd out
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

---

## File Structure

```
kubegraf.io/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   └── ...
├── out/                   # Static export output (after build)
└── package.json
```

---

## Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Install new package
npm install package-name

# Install dev dependency
npm install --save-dev package-name
```

---

## Next Steps

1. Run `npm run dev`
2. Open `http://localhost:3000`
3. Make changes to components in `components/` folder
4. See changes instantly in browser
5. Check terminal for errors

