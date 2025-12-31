import { Link } from "wouter";
import { LINKS } from "@/config/links";
import { useEffect, useState } from "react";
import { Github } from "lucide-react";

interface FooterProps {
  variant?: "default" | "minimal";
}

export default function Footer({ variant = "default" }: FooterProps) {
  const [themePreference, setThemePreference] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Use same key as docs pages for consistency across all pages
    const saved = localStorage.getItem('kubegraf-theme') as 'light' | 'dark' | null;
    if (saved) {
      setThemePreference(saved);
      applyTheme(saved);
    } else {
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      const defaultDisplay = prefersLight ? 'light' : 'dark';
      setThemePreference(defaultDisplay);
      applyTheme(defaultDisplay);
    }
  }, []);

  const applyTheme = (pref: 'system' | 'light' | 'dark') => {
    if (pref === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', pref);
    }
  };

  const handleThemeChange = (pref: 'light' | 'dark') => {
    setThemePreference(pref);
    localStorage.setItem('kubegraf-theme', pref);
    applyTheme(pref);
  };

  const toggleTheme = () => {
    const newTheme = themePreference === 'light' ? 'dark' : 'light';
    handleThemeChange(newTheme);
  };

  const ThemePreferenceControl = () => (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-md bg-muted/20 border border-border/50 transition-all duration-200 hover:scale-110 hover:bg-muted/30"
      aria-label={`Switch to ${themePreference === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${themePreference === 'light' ? 'dark' : 'light'} theme`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all"
      >
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
    </button>
  );

  if (variant === "minimal") {
    return (
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-3">&copy; 2025 KubēGraf</p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs">
            <a href={LINKS.BUG_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Report a bug</a>
            <a href={LINKS.FEATURE_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Request a feature</a>
            <Link href={LINKS.PRIVACY} className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href={LINKS.LICENSE} className="hover:text-primary transition-colors">License</Link>
            <a href={LINKS.CONTACT_MAILTO} className="hover:text-primary transition-colors">Contact</a>
            <ThemePreferenceControl />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-neutral-200" style={{ backgroundColor: '#f5f1e8' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link href="/">
                <div className="flex items-center gap-1 mb-4 group">
                  <img
                    src={themePreference === 'light' ? '/assets/logos/binary-matrix/logo-transparent-light.svg' : '/assets/logos/binary-matrix/logo-transparent-dark.svg'}
                    alt="KubeGraf"
                    className="kubegraf-logo"
                  />
                  <span className="text-base sm:text-lg md:text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-amber-500">KubēGraf</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Local-first Kubernetes incident detection and diagnosis. No SaaS lock-in.
              </p>
              <div className="mb-4 p-3 bg-muted/30 border border-border/50 rounded-lg max-w-sm">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Brand clarity:</strong> KubeGraf (kubegraf.io) is an independent product and is not affiliated with Kubernetes, the CNCF, Grafana Labs, or the DevOpsProdigy KubeGraf Grafana plugin.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/kubegraf/kubegraf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="col-span-1">
              <h3 className="font-semibold text-sm mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="/docs/installation.html" className="text-muted-foreground hover:text-primary transition-colors">Installation</a></li>
                <li><Link href={LINKS.COMPARE} className="text-muted-foreground hover:text-primary transition-colors">Compare</Link></li>
                <li><a href={LINKS.ISSUES_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Roadmap</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="col-span-1">
              <h3 className="font-semibold text-sm mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/docs/" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="/docs/quickstart.html" className="text-muted-foreground hover:text-primary transition-colors">Quickstart</a></li>
                <li><a href="/docs/terminal-ui.html" className="text-muted-foreground hover:text-primary transition-colors">Guides</a></li>
                <li><a href="https://github.com/kubegraf/kubegraf/discussions" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Developers Column */}
            <div className="col-span-1">
              <h3 className="font-semibold text-sm mb-4">Developers</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="https://github.com/kubegraf/kubegraf" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="/docs/commands.html" className="text-muted-foreground hover:text-primary transition-colors">CLI Reference</a></li>
                <li><a href="/docs/configuration.html" className="text-muted-foreground hover:text-primary transition-colors">API Docs</a></li>
                <li><a href={LINKS.BUG_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Report Bug</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="col-span-1">
              <h3 className="font-semibold text-sm mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/kubegraf" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                <li><a href={LINKS.CONTACT_MAILTO} className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                <li><Link href={LINKS.PRIVACY} className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href={LINKS.LICENSE} className="text-muted-foreground hover:text-primary transition-colors">License</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span>&copy; 2025 KubēGraf. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span>Apache 2.0 License</span>
              <span className="hidden md:inline">•</span>
              <a href={LINKS.CONTACT_MAILTO} className="hover:text-primary transition-colors">{LINKS.CONTACT_EMAIL}</a>
            </div>
            <ThemePreferenceControl />
          </div>
        </div>
      </div>
    </footer>
  );
}

