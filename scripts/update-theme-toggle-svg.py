#!/usr/bin/env python3
"""
Update all documentation HTML files to use SVG sun icon instead of emoji
for theme toggle button.
"""

import os
import re
from pathlib import Path

# Define the old emoji button pattern
OLD_PATTERN = re.compile(
    r'<button id="theme-toggle-btn"[^>]*>☀️</button>',
    re.MULTILINE | re.DOTALL
)

# Define the new SVG sun icon button
NEW_BUTTON = '''<button id="theme-toggle-btn" onclick="toggleTheme()" aria-label="Toggle theme" title="Toggle theme" style="padding: 0.5rem 0.75rem; border-radius: 0.375rem; background: rgba(var(--muted-rgb), 0.2); border: 1px solid rgba(var(--border-rgb), 0.5); transition: all 0.2s; cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block; transition: all 0.2s;">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </svg>
                    </button>'''

def update_html_file(file_path):
    """Update a single HTML file to use SVG sun icon."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if file contains the old pattern
        if not OLD_PATTERN.search(content):
            print(f"⏭️  Skip: {file_path} (already updated or no theme button found)")
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
