# Favicon Requirements for Google SERP

## Overview

This document explains the favicon setup for kubegraf.io to ensure proper display in Google Search Engine Results Pages (SERP).

## Why 48x48 PNG?

Google Search prefers an explicit 48x48 PNG favicon for SERP display. While `favicon.ico` works for browsers, Google's crawler specifically looks for a 48x48 PNG file.

## Current Favicon Files

- `/favicon.ico` - Standard ICO format (works for browsers)
- `/favicon-48x48.png` - 48x48 PNG (required by Google SERP)
- `/favicon-32x32.png` - 32x32 PNG (standard browser size)
- `/favicon-192x192.png` - 192x192 PNG (high-res, PWA)
- `/apple-touch-icon.png` - 180x180 PNG (iOS home screen)

## HTML Head Tags

All pages should include these favicon links in the `<head>`:

```html
<!-- Favicons for browsers & Google Search site icon -->
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

## Generating favicon-48x48.png

If you need to regenerate the 48x48 favicon:

```bash
# Requires ImageMagick (brew install imagemagick)
npx tsx script/generate-favicon-48x48.ts
```

The script:
1. Reads `client/public/favicon-192x192.png` as source
2. Resizes to exactly 48x48 pixels
3. Preserves transparency
4. Outputs to both root and `client/public/` directories

## File Locations

- Source: `client/public/favicon-192x192.png`
- Generated: `favicon-48x48.png` (root) and `client/public/favicon-48x48.png`
- Build: Vite copies `client/public/` files to `dist/public/` during build

## Verification

After deployment, verify these URLs return 200:

```bash
curl -I https://kubegraf.io/favicon.ico
curl -I https://kubegraf.io/favicon-48x48.png
```

The second should show `content-type: image/png`.

## References

- [Google Search Central: Favicons](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [MDN: Favicon](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/icon)

