import { Link } from "wouter";
import { BookOpen, Download, Mail, FileText, Shield, Linkedin, Twitter, Instagram, Globe } from "lucide-react";
import React, { useEffect, useState } from "react";
import styles from "./FooterModern.module.css";
import { LINKS } from "@/config/links";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.02.048.035.088.068.107a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const footerLinks: {
  product: { label: string; href: string; icon?: React.ElementType; external?: boolean }[];
  company: { label: string; href: string; external?: boolean; icon?: React.ElementType }[];
  legal: { label: string; href: string; icon?: React.ElementType }[];
} = {
  product: [
    { label: "Docs", href: "/docs/", icon: BookOpen },
    { label: "Install", href: "/docs/installation.html", icon: Download },
  ],
  company: [
    { label: "Orkastor", href: "https://orkastor.com", external: true, icon: Globe },
    { label: "About KubeGraf", href: "/kubegraf" },
    { label: "Contact", href: "mailto:contact@kubegraf.io", external: true, icon: Mail },
  ],
  legal: [
    { label: "Privacy", href: "/privacy", icon: Shield },
    { label: "License", href: "/license", icon: FileText },
  ],
};

export default function FooterModern() {
  const [themePreference, setThemePreference] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Use same key as docs pages for consistency across all pages
    const saved = localStorage.getItem('kubegraf-theme') as 'light' | 'dark' | null;
    if (saved) {
      setThemePreference(saved);
      applyTheme(saved);
    } else {
      // Default to light theme
      setThemePreference('light');
      applyTheme('light');
    }
  }, []);

  const applyTheme = (pref: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', pref);
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
      className={styles.themeToggle}
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
        className={styles.themeIcon}
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

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.brandLink}>
              <div className={styles.logoContainer}>
                <img
                  src={themePreference === 'dark' ? '/kubegraf-dark-new-bg.svg' : '/kubegraf.svg'}
                  alt="KubeGraf"
                  className={styles.logo}
                />
                <span className={styles.brandName}>KubēGraf</span>
              </div>
            </Link>
            <p className={styles.tagline}>
              AI SRE platform for Kubernetes — automated root cause analysis, incident response automation, and SafeFix™ in minutes.
            </p>
            <p className={styles.tagline} style={{ opacity: 0.55, marginTop: '0.5rem', fontSize: '0.7rem' }}>
              Used by teams switching from Komodor, Rootly, Incident.io, Harness &amp; Deductive AI
            </p>
            <p className={styles.tagline} style={{ opacity: 0.7, marginTop: '0.25rem' }}>
              A flagship product of{" "}
              <a href="https://orkastor.com" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--primary))', textDecoration: 'none' }}>
                Orkastor
              </a>
            </p>
            <div className={styles.socialLinks}>
              <a href={LINKS.DISCORD_URL} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="KubeGraf Discord Community">
                <DiscordIcon className={styles.socialIcon} />
              </a>
              <a href="https://www.linkedin.com/company/kubegraf/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="KubeGraf on LinkedIn">
                <Linkedin className={styles.socialIcon} aria-hidden="true" />
              </a>
              <a href="https://x.com/kubegraf" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="KubeGraf on X">
                <Twitter className={styles.socialIcon} aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/kubegraf.io/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="KubeGraf on Instagram">
                <Instagram className={styles.socialIcon} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className={styles.linksGrid}>
            <div className={styles.linksColumn}>
              <h3 className={styles.columnTitle}>Product</h3>
              <ul className={styles.linksList}>
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={styles.link}
                    >
                      {link.icon && <link.icon className={styles.linkIcon} aria-hidden="true" />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linksColumn}>
              <h3 className={styles.columnTitle}>Company</h3>
              <ul className={styles.linksList}>
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className={styles.link}
                        aria-label={link.label}
                      >
                        {link.icon && <link.icon className={styles.linkIcon} aria-hidden="true" />}
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={styles.link}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linksColumn}>
              <h3 className={styles.columnTitle}>Legal</h3>
              <ul className={styles.linksList}>
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.link}>
                      {link.icon && <link.icon className={styles.linkIcon} aria-hidden="true" />}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; 2026 KubēGraf by Orkastor. All rights reserved.
          </p>
          <ThemePreferenceControl />
        </div>
      </div>
    </footer>
  );
}
