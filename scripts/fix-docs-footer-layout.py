#!/usr/bin/env python3
"""
Fix documentation footer layout to exactly match landing page Footer.tsx structure.
Applies to all HTML files in client/public/docs/ and docs/ directories.
"""

from pathlib import Path
import re

# Updated footer HTML matching Footer.tsx exactly
FOOTER_HTML = '''                <footer class="docs-footer">
            <div class="docs-footer-content">
                <!-- Main Footer Content -->
                <div class="docs-footer-main">
                    <div class="docs-footer-grid">
                        <!-- Brand Column -->
                        <div class="docs-footer-brand">
                            <a href="/" class="docs-footer-logo-link">
                                <img id="footer-logo-img" src="/assets/logos/binary-matrix/logo-transparent-dark.svg" alt="KubeGraf" class="kubegraf-logo">
                                <span class="docs-footer-logo-text">KubēGraf</span>
                            </a>
                            <p class="docs-footer-description">Local-first Kubernetes incident detection and diagnosis. No SaaS lock-in.</p>
                            <div class="docs-footer-brand-clarity">
                                <strong>Brand clarity:</strong> KubeGraf (kubegraf.io) is an independent product and is not affiliated with Kubernetes, the CNCF, Grafana Labs, or the DevOpsProdigy KubeGraf Grafana plugin.
                            </div>
                            <div class="docs-footer-github">
                                <a href="https://github.com/kubegraf/kubegraf" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                    <span>GitHub</span>
                                </a>
                            </div>
                        </div>

                        <!-- Product Column -->
                        <div class="docs-footer-column">
                            <h3>Product</h3>
                            <ul>
                                <li><a href="/#features">Features</a></li>
                                <li><a href="/docs/installation.html">Installation</a></li>
                                <li><a href="/compare">Compare</a></li>
                                <li><a href="https://github.com/kubegraf/kubegraf/issues" target="_blank" rel="noopener noreferrer">Roadmap</a></li>
                            </ul>
                        </div>

                        <!-- Resources Column -->
                        <div class="docs-footer-column">
                            <h3>Resources</h3>
                            <ul>
                                <li><a href="/docs/">Documentation</a></li>
                                <li><a href="/docs/quickstart.html">Quickstart</a></li>
                                <li><a href="/docs/terminal-ui.html">Guides</a></li>
                                <li><a href="https://github.com/kubegraf/kubegraf/discussions" target="_blank" rel="noopener noreferrer">Community</a></li>
                            </ul>
                        </div>

                        <!-- Developers Column -->
                        <div class="docs-footer-column">
                            <h3>Developers</h3>
                            <ul>
                                <li><a href="https://github.com/kubegraf/kubegraf" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                                <li><a href="/docs/commands.html">CLI Reference</a></li>
                                <li><a href="/docs/configuration.html">API Docs</a></li>
                                <li><a href="https://github.com/kubegraf/kubegraf/issues/new" target="_blank" rel="noopener noreferrer">Report Bug</a></li>
                            </ul>
                        </div>

                        <!-- Company Column -->
                        <div class="docs-footer-column">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="/kubegraf">About</a></li>
                                <li><a href="mailto:contact@kubegraf.io">Contact</a></li>
                                <li><a href="/privacy">Privacy</a></li>
                                <li><a href="/license">License</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Bottom Bar -->
                <div class="docs-footer-bottom">
                    <div class="docs-footer-copyright">
                        <span>&copy; 2025 KubēGraf. All rights reserved.</span>
                        <span class="docs-footer-separator">•</span>
                        <span>Apache 2.0 License</span>
                        <span class="docs-footer-separator">•</span>
                        <a href="mailto:contact@kubegraf.io">contact@kubegraf.io</a>
                    </div>
                    <div class="theme-selector">
                        <button id="theme-light-btn" onclick="setTheme('light')" aria-label="Light theme" title="Light">☀️</button>
                        <button id="theme-dark-btn" onclick="setTheme('dark')" aria-label="Dark theme" title="Dark">🌙</button>
                    </div>
                </div>
            </div>
        </footer>'''

def update_footer_in_file(file_path: Path) -> bool:
    """Update footer in a single HTML file."""
    try:
        content = file_path.read_text(encoding='utf-8')

        # Match the entire footer section
        footer_pattern = r'<footer class="docs-footer">.*?</footer>'

        if not re.search(footer_pattern, content, re.DOTALL):
            print(f"⚠ No footer found in {file_path}")
            return False

        # Replace footer
        updated_content = re.sub(footer_pattern, FOOTER_HTML, content, flags=re.DOTALL)

        # Write back
        file_path.write_text(updated_content, encoding='utf-8')
        return True
    except Exception as e:
        print(f"✗ Error updating {file_path}: {e}")
        return False

def main():
    # Process both directories
    directories = [
        Path("client/public/docs"),
        Path("docs")
    ]

    total_updated = 0

    for docs_dir in directories:
        if not docs_dir.exists():
            print(f"⚠ Directory not found: {docs_dir}")
            continue

        print(f"\n📁 Processing {docs_dir}/")

        # Find all HTML files recursively
        html_files = list(docs_dir.rglob("*.html"))

        updated = 0
        for html_file in html_files:
            if update_footer_in_file(html_file):
                print(f"  ✓ {html_file.relative_to(docs_dir)}")
                updated += 1

        print(f"✓ Successfully updated {updated}/{len(html_files)} files in {docs_dir}/")
        total_updated += updated

    print(f"\n✅ Total: Updated {total_updated} files across all directories")

if __name__ == "__main__":
    main()
