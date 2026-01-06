#!/bin/bash
# Verify OpenGraph meta tags are correctly configured

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================="
echo "OpenGraph Meta Tags Verification"
echo "=========================================="
echo ""

# Check if opengraph-v2.jpg exists
echo "1. Checking OpenGraph image files..."
if [ -f "client/public/opengraph-v2.jpg" ]; then
    SIZE=$(identify -format "%wx%h" client/public/opengraph-v2.jpg 2>/dev/null || echo "unknown")
    FILESIZE=$(ls -lh client/public/opengraph-v2.jpg | awk '{print $5}')
    echo "   ✓ client/public/opengraph-v2.jpg exists (${SIZE}, ${FILESIZE})"
else
    echo "   ✗ client/public/opengraph-v2.jpg NOT FOUND"
fi

if [ -f "opengraph-v2.jpg" ]; then
    echo "   ✓ opengraph-v2.jpg exists (root)"
else
    echo "   ✗ opengraph-v2.jpg NOT FOUND (root)"
fi
echo ""

# Check client/index.html
echo "2. Checking client/index.html meta tags..."
if grep -q "opengraph-v2.jpg" client/index.html; then
    echo "   ✓ References opengraph-v2.jpg"
else
    echo "   ✗ Still references old opengraph.jpg"
fi

if grep -q 'og:image:width.*1200' client/index.html; then
    echo "   ✓ Has og:image:width=\"1200\""
else
    echo "   ⚠ Missing og:image:width"
fi

if grep -q 'og:image:height.*630' client/index.html; then
    echo "   ✓ Has og:image:height=\"630\""
else
    echo "   ⚠ Missing og:image:height"
fi

if grep -q 'og:image:alt' client/index.html; then
    echo "   ✓ Has og:image:alt"
else
    echo "   ⚠ Missing og:image:alt"
fi

if grep -q 'https://kubegraf.io/opengraph-v2.jpg' client/index.html; then
    echo "   ✓ Uses absolute URL for og:image"
else
    echo "   ⚠ Uses relative URL (may cause issues)"
fi

if grep -q 'rel="canonical".*https://kubegraf.io' client/index.html; then
    echo "   ✓ Has canonical URL"
else
    echo "   ⚠ Missing or incorrect canonical URL"
fi
echo ""

# Check for old references
echo "3. Checking for old opengraph.jpg references..."
OLD_REFS=$(grep -r "opengraph\.jpg" client/index.html vite-plugin-meta-images.ts script/prepare-site.ts 2>/dev/null | wc -l)
if [ "$OLD_REFS" -eq 0 ]; then
    echo "   ✓ No old references found in key files"
else
    echo "   ✗ Found $OLD_REFS references to old opengraph.jpg:"
    grep -n "opengraph\.jpg" client/index.html vite-plugin-meta-images.ts script/prepare-site.ts 2>/dev/null || true
fi
echo ""

# Extract and display current meta tags
echo "4. Current OpenGraph configuration:"
echo ""
echo "   Title:"
grep -o 'og:title.*content="[^"]*"' client/index.html | head -1 | sed 's/.*content="\(.*\)"/     \1/'
echo ""
echo "   Description:"
grep -o 'og:description.*content="[^"]*"' client/index.html | head -1 | sed 's/.*content="\(.*\)"/     \1/'
echo ""
echo "   Image:"
grep -o 'og:image.*content="[^"]*"' client/index.html | head -1 | sed 's/.*content="\(.*\)"/     \1/'
echo ""
echo "   Image Dimensions:"
grep -o 'og:image:width.*content="[^"]*"' client/index.html | head -1 | sed 's/.*content="\(.*\)"/     Width: \1/' || echo "     (not set)"
grep -o 'og:image:height.*content="[^"]*"' client/index.html | head -1 | sed 's/.*content="\(.*\)"/     Height: \1/' || echo "     (not set)"
echo ""
echo "   Twitter Card:"
grep -o 'twitter:card.*content="[^"]*"' client/index.html | head -1 | sed 's/.*content="\(.*\)"/     \1/'
echo ""

echo "=========================================="
echo "Verification Complete"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Build the site and test locally"
echo "  2. Deploy to production"
echo "  3. Clear CDN cache if applicable"
echo "  4. Request re-indexing in Google Search Console"
echo "  5. Test with social media debuggers:"
echo "     - Facebook: https://developers.facebook.com/tools/debug/"
echo "     - Twitter: https://cards-dev.twitter.com/validator"
echo "     - LinkedIn: https://www.linkedin.com/post-inspector/"
echo ""
