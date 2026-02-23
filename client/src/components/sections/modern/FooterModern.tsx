import { Link } from "wouter";
import { BookOpen, Download, Mail, FileText, Shield, Linkedin, Twitter, Instagram } from "lucide-react";
import React, { useEffect, useState } from "react";
import styles from "./FooterModern.module.css";

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
    { label: "Company", href: "/kubegraf" },
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
              AI SRE platform for Kubernetes — root cause to safe fix in minutes.
            </p>
            <div className={styles.socialLinks}>
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
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                        aria-label={`${link.label} (opens in new tab)`}
                      >
                        {link.icon && <link.icon className={styles.linkIcon} aria-hidden="true" />}
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={styles.link}>
                        {link.icon && <link.icon className={styles.linkIcon} aria-hidden="true" />}
                        {link.label}
                      </Link>
                    )}
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
            &copy; {new Date().getFullYear()} KubēGraf. All rights reserved.
          </p>
          <ThemePreferenceControl />
        </div>
      </div>
    </footer>
  );
}
