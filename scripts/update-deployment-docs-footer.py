#!/usr/bin/env python3
"""
Update footer structure in deployment /docs directory HTML files.
"""

import os
import re
from pathlib import Path

# Deployment docs directory
DOCS_DIR = Path("docs")

# New footer HTML matching React Footer.tsx structure
FOOTER_HTML = '''                <footer class="docs-footer">
            <div class="docs-footer-content">
                <div class="docs-footer-top">
                    <div class="docs-footer-brand">
                        <a href="/" class="docs-footer-logo" style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 1rem; text-decoration: none;">
                            <img src="/assets/logos/binary-matrix/logo-binary-matrix-cyan.svg" alt="KubeGraf" style="width: 48px; height: 48px;">
                            <span style="font-size: 1rem; font-weight: 700; color: var(--text); font-family: 'Space Grotesk', sans-serif;">KubēGraf</span>
                        </a>
                        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem; max-width: 280px;">Local-first Kubernetes incident detection and diagnosis. No SaaS lock-in.</p>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 8px; font-size: 0.75rem; color: var(--text-muted); line-height: 1.5; max-width: 280px;">
                            <strong style="color: var(--text);">Brand clarity:</strong> KubeGraf (kubegraf.io) is an independent product and is not affiliated with Kubernetes, the CNCF, Grafana Labs, or the DevOpsProdigy KubeGraf Grafana plugin.
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <a href="https://github.com/kubegraf/kubegraf" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-muted); text-decoration: none; transition: color 0.2s;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                    <div class="docs-footer-columns">
                        <div class="docs-footer-column">
                            <h4>Product</h4>
                            <a href="/#features">Features</a>
                            <a href="/docs/installation.html">Installation</a>
                            <a href="/compare">Compare</a>
                            <a href="https://github.com/kubegraf/kubegraf/issues" target="_blank" rel="noopener noreferrer">Roadmap</a>
                        </div>
                        <div class="docs-footer-column">
                            <h4>Resources</h4>
                            <a href="/docs/">Documentation</a>
                            <a href="/docs/quickstart.html">Quickstart</a>
                            <a href="/docs/terminal-ui.html">Guides</a>
                            <a href="https://github.com/kubegraf/kubegraf/discussions" target="_blank" rel="noopener noreferrer">Community</a>
                        </div>
                        <div class="docs-footer-column">
                            <h4>Developers</h4>
                            <a href="https://github.com/kubegraf/kubegraf" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="/docs/commands.html">CLI Reference</a>
                            <a href="/docs/configuration.html">API Docs</a>
                            <a href="https://github.com/kubegraf/kubegraf/issues/new" target="_blank" rel="noopener noreferrer">Report Bug</a>
                        </div>
                        <div class="docs-footer-column">
                            <h4>Company</h4>
                            <a href="/kubegraf">About</a>
                            <a href="mailto:contact@kubegraf.io">Contact</a>
                            <a href="/privacy">Privacy</a>
                            <a href="/license">License</a>
                        </div>
                    </div>
                </div>
                <div class="docs-footer-bottom">
                    <div class="docs-footer-copyright">
                        <span>&copy; 2025 KubēGraf. All rights reserved.</span>
                        <span>•</span>
                        <span>Apache 2.0 License</span>
                        <span>•</span>
                        <span><a href="mailto:contact@kubegraf.io" style="color: var(--text-muted); text-decoration: none;">contact@kubegraf.io</a></span>
                    </div>
                    <div class="theme-selector">
                        <button id="theme-light-btn" onclick="setTheme('light')" aria-label="Light theme" title="Light">☀️</button>
                        <button id="theme-dark-btn" onclick="setTheme('dark')" aria-label="Dark theme" title="Dark">🌙</button>
                    </div>
                </div>
            </div>
        </footer>'''


def update_footer_in_file(file_path):
    """Update footer in a single HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find footer section using regex
        footer_pattern = r'<footer class="docs-footer">.*?</footer>'

        if not re.search(footer_pattern, content, re.DOTALL):
            print(f"⚠️  No footer found in {file_path}")
            return False

        # Replace footer
        updated_content = re.sub(
            footer_pattern,
            FOOTER_HTML,
            content,
            flags=re.DOTALL
        )

        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)

        print(f"✓ Updated {file_path}")
        return True

    except Exception as e:
        print(f"✗ Error updating {file_path}: {e}")
        return False


def main():
    """Update all HTML files in docs directory."""
    html_files = list(DOCS_DIR.glob("**/*.html"))

    print(f"Found {len(html_files)} HTML files in deployment docs")
    print("-" * 60)

    success_count = 0
    for html_file in html_files:
        if update_footer_in_file(html_file):
            success_count += 1

    print("-" * 60)
    print(f"\n✓ Successfully updated {success_count}/{len(html_files)} files")


if __name__ == "__main__":
    main()
