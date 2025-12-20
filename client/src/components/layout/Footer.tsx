import { Link } from "wouter";
import { LINKS } from "@/config/links";
import { useEffect, useState } from "react";

interface FooterProps {
  variant?: "default" | "minimal";
}

export default function Footer({ variant = "default" }: FooterProps) {
  const [themePreference, setThemePreference] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load saved preference or default to system
    const saved = localStorage.getItem('kubegraf-theme-preference') as 'light' | 'dark' | null;
    if (saved) {
      setThemePreference(saved);
      applyTheme(saved);
    } else {
      // Default to system preference - determine which icon to show based on system
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      const defaultDisplay = prefersLight ? 'light' : 'dark';
      setThemePreference(defaultDisplay);
      // Don't set data-theme, let CSS prefers-color-scheme handle it
      applyTheme('system');
    }
  }, []);

  const applyTheme = (pref: 'system' | 'light' | 'dark') => {
    if (pref === 'system') {
      // Remove data-theme to use system preference
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', pref);
    }
  };

  const handleThemeChange = (pref: 'light' | 'dark') => {
    setThemePreference(pref);
    localStorage.setItem('kubegraf-theme-preference', pref);
    applyTheme(pref);
  };
  const ThemePreferenceControl = () => (
    <div className="inline-flex items-center gap-1 p-1 rounded-md bg-muted/20 border border-border/50">
      <button
        onClick={() => handleThemeChange('light')}
        className={`px-2 py-1 rounded transition-all duration-200 ${
          themePreference === 'light'
            ? 'opacity-100 scale-110'
            : 'opacity-40 hover:opacity-60'
        }`}
        aria-label="Light theme"
        title="Light"
      >
        <span className="text-sm">☀️</span>
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className={`px-2 py-1 rounded transition-all duration-200 ${
          themePreference === 'dark'
            ? 'opacity-100 scale-110'
            : 'opacity-40 hover:opacity-60'
        }`}
        aria-label="Dark theme"
        title="Dark"
      >
        <span className="text-sm">🌙</span>
      </button>
    </div>
  );

  if (variant === "minimal") {
    return (
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-3">&copy; 2025 KubēGraf</p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs">
            <a
              href={LINKS.BUG_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              Report a bug
            </a>
            <a
              href={LINKS.FEATURE_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              Request a feature
            </a>
            <Link href={LINKS.PRIVACY} className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href={LINKS.LICENSE} className="hover:text-primary transition-colors">
              License (Apache 2.0)
            </Link>
            <a
              href={LINKS.CONTACT_MAILTO}
              className="hover:text-primary transition-colors"
            >
              Contact
            </a>
            <ThemePreferenceControl />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-12 border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Copyright */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              © 2025 KubēGraf
            </p>
            <p className="text-sm text-muted-foreground">
              <a href="https://kubegraf.io" className="hover:text-primary transition-colors">kubegraf.io</a>
              {" · "}
              <a href={LINKS.CONTACT_MAILTO} className="hover:text-primary transition-colors">
                {LINKS.CONTACT_EMAIL}
              </a>
            </p>
          </div>

          {/* Tagline & Description */}
          <div className="text-center mb-8 pb-8 border-b border-white/5">
            <h3 className="text-xl font-display font-bold mb-3">
              KubēGraf — Intelligent Insight for Kubernetes Incidents
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              KubeGraf is a local-first Kubernetes tool for detecting incidents, understanding root causes, and safely responding to failures.
              It runs on your laptop or inside your environment. No mandatory SaaS. No vendor lock-in.
            </p>
          </div>

          {/* Brand Clarity */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              <strong>Brand clarity:</strong> KubeGraf (kubegraf.io) is an independent product and is not affiliated with Kubernetes,
              the CNCF, Grafana Labs, or the DevOpsProdigy KubeGraf Grafana plugin.
            </p>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs text-muted-foreground">
              <a
                href={LINKS.BUG_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Report a bug
              </a>
              <a
                href={LINKS.FEATURE_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Request a feature
              </a>
              <Link href={LINKS.PRIVACY} className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href={LINKS.LICENSE} className="hover:text-primary transition-colors">
                License (Apache 2.0)
              </Link>
              <a
                href={LINKS.CONTACT_MAILTO}
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>
              <ThemePreferenceControl />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

