# OpenGraph Image Update - Deployment Checklist

## Summary of Changes

### Problem
- Google SERP showing old OpenGraph snippet with outdated text: "Orchestrate Kubernetes..."
- Old OG image (`opengraph.jpg`) contained incorrect messaging

### Solution
- ✅ Created new OpenGraph image (`opengraph-v2.jpg`) using actual website screenshot
- ✅ Updated all meta tags to reference new image with cache-busting filename
- ✅ Added proper OG image dimensions (1200x630) and alt text
- ✅ Updated descriptions to match new messaging
- ✅ Verified canonical URLs and HTTPS references

---

## Files Changed

### New Files
- `client/public/opengraph-v2.jpg` - New OG image (1200x630, 184KB)
- `opengraph-v2.jpg` - Root copy for build script
- `script/generate-og-image.py` - Image generation script (for reference)
- `script/update-og-tags.sh` - Batch update script
- `script/verify-og-tags.sh` - Verification script

### Modified Files
- `client/index.html` - Updated OG meta tags with new image URL and dimensions
- `vite-plugin-meta-images.ts` - Updated to reference opengraph-v2.jpg
- `script/prepare-site.ts` - Updated static file copy list
- All HTML files in `docs/` and `client/public/docs/` - Updated OG image references

### Key Meta Tag Updates
```html
<meta property="og:title" content="KubēGraf – Intelligent Insight for Kubernetes Incidents" />
<meta property="og:description" content="Local-first Kubernetes incident detection & diagnosis. Evidence-first root cause analysis and safe fix previews — runs on your machine." />
<meta property="og:image" content="https://kubegraf.io/opengraph-v2.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="KubēGraf – Local-first Kubernetes incident intelligence" />
<meta name="twitter:image" content="https://kubegraf.io/opengraph-v2.jpg" />
```

---

## Pre-Deployment Testing

### Local Verification
```bash
# Run verification script
bash script/verify-og-tags.sh

# Build the site
npm run build  # or your build command

# Check built files
ls -lh dist/opengraph-v2.jpg
ls -lh _site/opengraph-v2.jpg  # if using _site

# Verify meta tags in built HTML
grep "opengraph-v2.jpg" dist/index.html  # or _site/index.html
```

### Visual Verification
```bash
# View the new OG image
open client/public/opengraph-v2.jpg

# Expected: Shows KubeGraf landing page with
# - "Intelligent Kubernetes Incident Response" headline
# - NO "Orchestrate" text
# - Terminal UI screenshot
# - Clean, modern design
```

---

## Deployment Steps

### 1. Commit and Push Changes
```bash
# Review changes
git status
git diff client/index.html

# Stage files
git add client/public/opengraph-v2.jpg \
        opengraph-v2.jpg \
        client/index.html \
        vite-plugin-meta-images.ts \
        script/prepare-site.ts \
        docs/ \
        client/public/docs/ \
        script/*.sh \
        script/*.py

# Commit
git commit -m "fix: Update OpenGraph image and meta tags to remove outdated messaging

- Replace opengraph.jpg with opengraph-v2.jpg (cache-bust)
- Use actual website screenshot showing new 'Incident Intelligence' messaging
- Add og:image:width, og:image:height, og:image:alt tags
- Update og:description to match current product positioning
- Update all 48+ HTML files to reference new OG image
- Ensure absolute URLs (https://kubegraf.io/opengraph-v2.jpg)

This fixes Google SERP showing old 'Orchestrate Kubernetes' snippet."

# Push
git push origin main  # or your branch
```

### 2. Deploy to Production
```bash
# Deploy using your deployment method
# Examples:
# - Vercel: Automatic on push to main
# - Netlify: Automatic on push to main
# - GitHub Pages: Push to gh-pages branch
# - Manual: Run your deploy script

# Verify deployment
curl -I https://kubegraf.io/opengraph-v2.jpg
# Should return: HTTP/2 200
```

### 3. Clear CDN Cache (CRITICAL)
```bash
# If using Cloudflare
# Dashboard → Caching → Purge Everything
# OR purge specific URLs:
#   - https://kubegraf.io/opengraph-v2.jpg
#   - https://kubegraf.io/
#   - https://kubegraf.io/index.html

# If using Vercel
# No action needed (cache invalidated on deploy)

# If using Netlify
# Deploys automatically invalidate cache

# If using custom CDN
# Use your CDN's cache purge tool
```

### 4. Verify Live Site
```bash
# Check image is accessible
curl -I https://kubegraf.io/opengraph-v2.jpg

# Check HTML meta tags
curl -s https://kubegraf.io/ | grep "og:image"
# Should show: https://kubegraf.io/opengraph-v2.jpg

# View source in browser
open https://kubegraf.io/
# View Page Source → Search for "opengraph-v2.jpg"
```

---

## Post-Deployment Actions

### 5. Google Search Console - Request Indexing
1. Go to: https://search.google.com/search-console
2. Select property: kubegraf.io
3. Use **URL Inspection Tool**
   - Enter: `https://kubegraf.io/`
   - Click "Request Indexing"
   - Wait for confirmation
4. Repeat for key pages if needed

**Note:** Indexing can take 1-7 days. Google will re-crawl and update the snippet.

### 6. Test Social Media Debuggers
These tools show how your OG tags will appear when shared:

#### Facebook Sharing Debugger
- URL: https://developers.facebook.com/tools/debug/
- Enter: `https://kubegraf.io/`
- Click "Debug"
- Click "Scrape Again" to clear cache
- **Verify:** Image shows new screenshot, no "Orchestrate" text

#### Twitter Card Validator
- URL: https://cards-dev.twitter.com/validator
- Enter: `https://kubegraf.io/`
- Click "Preview card"
- **Verify:** Card shows new image and description

#### LinkedIn Post Inspector
- URL: https://www.linkedin.com/post-inspector/
- Enter: `https://kubegraf.io/`
- Click "Inspect"
- **Verify:** Preview shows new content

### 7. Monitor Google SERP
```bash
# Check current SERP snippet (may take days to update)
# Search: "kubegraf" or "kubegraf kubernetes"
# Expected: New description without "Orchestrate"

# Use site: operator to check indexing
# Search: site:kubegraf.io
```

---

## Verification Checklist

- [ ] New OG image deployed to https://kubegraf.io/opengraph-v2.jpg
- [ ] Image is 1200x630 pixels
- [ ] Image shows new messaging (no "Orchestrate" text)
- [ ] Homepage meta tags reference opengraph-v2.jpg
- [ ] All OG tags include absolute URLs (https://kubegraf.io/...)
- [ ] og:image:width and og:image:height tags present
- [ ] og:image:alt tag present
- [ ] Twitter card tags updated
- [ ] Canonical URL is https://kubegraf.io/ (with trailing slash)
- [ ] CDN cache cleared
- [ ] Google Search Console indexing requested
- [ ] Facebook debugger shows new image
- [ ] Twitter validator shows new card
- [ ] LinkedIn inspector shows new preview

---

## Troubleshooting

### Issue: Social platforms still show old image
**Solution:** Use each platform's cache clearing tool:
- Facebook: Click "Scrape Again" in debugger
- Twitter: No manual clear, may take 24-48h
- LinkedIn: Cache clears after ~7 days

### Issue: Google still shows old snippet
**Solution:**
- Verify meta tags in live HTML (view-source)
- Request re-indexing in Search Console
- Wait 3-7 days for Google to re-crawl
- Check robots.txt isn't blocking crawlers

### Issue: Image not loading (404)
**Solution:**
- Verify file exists: `curl -I https://kubegraf.io/opengraph-v2.jpg`
- Check CDN/server configuration
- Ensure build process copies opengraph-v2.jpg to output directory

### Issue: Wrong image dimensions in validators
**Solution:**
- Verify image is exactly 1200x630: `identify opengraph-v2.jpg`
- Clear browser cache and retry
- Check Content-Length header is correct

---

## Expected Results

### Before
- Google SERP: "Orchestrate the Impossible" with outdated messaging
- OG Image: Old dark design with "Orchestrate" text

### After
- Google SERP: "Local-first Kubernetes incident detection & diagnosis..."
- OG Image: Clean screenshot showing "Intelligent Kubernetes Incident Response"
- Social shares: Modern, accurate preview of the product

---

## Timeline

- **Immediate:** New image visible on site
- **1-24 hours:** Social media platforms pick up new image
- **1-7 days:** Google re-indexes and updates SERP snippet
- **Ongoing:** Monitor SERP appearance in Search Console

---

## Rollback Plan

If issues occur:

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or manually restore old file
cp client/public/opengraph.jpg client/public/opengraph-v2.jpg

# Clear CDN cache again
# Request re-indexing
```

---

## Contact & Support

- Verification script: `bash script/verify-og-tags.sh`
- Generated: 2026-01-06
- Changes tested: ✅ All checks passed
