#!/usr/bin/env python3
"""
Fix documentation pages background color to match landing page exactly.
Updates inline CSS in all HTML files to use #faf6e9 instead of #ffffff.
"""

import os
import re
from pathlib import Path

def fix_bg_color(file_path):
    """Update background color in inline CSS of HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Fix light theme background color in inline style block
        # Pattern: --bg: #ffffff; (in light theme section)
        content = re.sub(
            r'(:root\[data-theme="light"\]\s*\{[^}]*--bg:\s*)#ffffff;',
            r'\1#faf6e9;',
            content,
            flags=re.DOTALL
        )

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Process all HTML files in docs directories."""
    base_dir = Path('/Users/puvendhan/Documents/repos/kubegraf.io')

    # Both deployment and development docs directories
    docs_dirs = [
        base_dir / 'docs',
        base_dir / 'client' / 'public' / 'docs'
    ]

    total_files = 0
    updated_files = 0

    for docs_dir in docs_dirs:
        if not docs_dir.exists():
            print(f"Directory not found: {docs_dir}")
            continue

        # Find all HTML files recursively
        html_files = list(docs_dir.rglob('*.html'))

        for html_file in html_files:
            total_files += 1
            if fix_bg_color(html_file):
                updated_files += 1
                print(f"✓ Updated: {html_file.relative_to(base_dir)}")
            else:
                print(f"  Skipped: {html_file.relative_to(base_dir)}")

    print(f"\n{'='*60}")
    print(f"Total files processed: {total_files}")
    print(f"Files updated: {updated_files}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
