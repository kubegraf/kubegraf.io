# Quick Start: Test Next.js Locally

## Simple Steps

### 1. Navigate to Directory
```bash
cd /Users/itsmine/Documents/repos/kubegraf/kubegraf.io
```

### 2. Install Dependencies (First Time Only)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Browser
Open: **http://localhost:3000**

That's it! The page will auto-reload when you make changes.

---

## Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## What You'll See

- Development server running on `http://localhost:3000`
- Hot reload enabled (changes appear instantly)
- Error messages in browser and terminal
- Fast Refresh for React components

---

## Troubleshooting

**Port 3000 already in use?**
```bash
# Use different port
PORT=3001 npm run dev
```

**Need to fix TypeScript errors first?**
The build has some errors. You can still run dev mode, but you'll see warnings.

**Want to test production build?**
```bash
npm run build
npx serve out
```

---

## Current Status

⚠️ **Note:** The Next.js setup is incomplete (~30% done). You'll see:
- Basic Hero section
- Basic Navbar
- Basic Feature Grid
- Missing: Installation, Pricing, Full Features, etc.

The existing `index.html` is much more complete!

