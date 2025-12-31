#!/usr/bin/env python3
"""
Update all documentation HTML files to use a single theme toggle button
instead of two separate buttons for light and dark themes.
"""

import os
import re
from pathlib import Path

# Define the old two-button structure pattern
OLD_PATTERN = re.compile(
    r'<button id="theme-light-btn"[^>]*>☀️</button>\s*'
    r'<button id="theme-dark-btn"[^>]*>🌙</button>',
    re.MULTILINE | re.DOTALL
)

# Define the new single toggle button
NEW_BUTTON = '<button id="theme-toggle-btn" onclick="toggleTheme()" aria-label="Toggle theme" title="Toggle theme">☀️</button>'

def update_html_file(file_path):
    """Update a single HTML file to use the new theme toggle button."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if file contains the old pattern
        if not OLD_PATTERN.search(content):
            print(f"⏭️  Skip: {file_path} (already updated or no theme buttons found)")
            return False

        # Replace old pattern with new button
        new_content = OLD_PATTERN.sub(NEW_BUTTON, content)

        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✓ Updated: {file_path}")
        return True
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    """Update all HTML files in both docs directories."""
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent

    # Both documentation directories
    docs_dirs = [
        repo_root / 'docs',
        repo_root / 'client' / 'public' / 'docs'
    ]

    total_updated = 0
    total_files = 0

    for docs_dir in docs_dirs:
        if not docs_dir.exists():
            print(f"✗ Directory not found: {docs_dir}")
            continue

        print(f"\n📁 Processing: {docs_dir}")

        # Find all HTML files recursively
        html_files = list(docs_dir.rglob('*.html'))

        for html_file in html_files:
            total_files += 1
            if update_html_file(html_file):
                total_updated += 1

    print(f"\n{'='*60}")
    print(f"Summary: Updated {total_updated} of {total_files} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
