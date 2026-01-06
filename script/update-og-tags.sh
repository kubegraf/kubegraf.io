#!/bin/bash
# Update all OpenGraph meta tags to use opengraph-v2.jpg

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "Updating OpenGraph meta tags..."

# Update client/index.html (main source file)
echo "✓ Updating client/index.html"
sed -i '' 's|/opengraph\.jpg|/opengraph-v2.jpg|g' client/index.html

# Update all HTML files in docs/ directory
echo "✓ Updating docs/**/*.html"
find docs -name "*.html" -type f -exec sed -i '' 's|https://kubegraf\.io/opengraph\.jpg|https://kubegraf.io/opengraph-v2.jpg|g' {} \;

# Update all HTML files in client/public/docs/ directory
echo "✓ Updating client/public/docs/**/*.html"
find client/public/docs -name "*.html" -type f -exec sed -i '' 's|https://kubegraf\.io/opengraph\.jpg|https://kubegraf.io/opengraph-v2.jpg|g' {} \;

# Update vite plugin
echo "✓ Updating vite-plugin-meta-images.ts"
sed -i '' 's|opengraph\.jpg|opengraph-v2.jpg|g' vite-plugin-meta-images.ts

# Update prepare-site script
echo "✓ Updating script/prepare-site.ts"
sed -i '' 's|"opengraph\.jpg"|"opengraph-v2.jpg"|g' script/prepare-site.ts

echo ""
echo "✅ All OpenGraph references updated to opengraph-v2.jpg"
echo ""
echo "Summary:"
echo "  - client/index.html: Updated"
echo "  - docs/**/*.html: Updated"
echo "  - client/public/docs/**/*.html: Updated"
echo "  - vite-plugin-meta-images.ts: Updated"
echo "  - script/prepare-site.ts: Updated"
