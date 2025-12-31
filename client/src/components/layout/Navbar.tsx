import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Terminal, Menu, X, BookOpen, ChevronDown, Zap, Shield, Brain, Network, FileCode, HelpCircle, Users, BookMarked, Github, MessageSquare, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Dropdown menu items
const productItems = [
  { label: "Features", href: "/#features", icon: Zap, description: "Core capabilities" },
  { label: "Terminal UI", href: "/docs/terminal-ui.html", icon: Terminal, description: "Command-line interface" },
  { label: "Web Dashboard", href: "/docs/web-dashboard.html", icon: Network, description: "Visual monitoring" },
  { label: "Security", href: "/docs/security.html", icon: Shield, description: "Local-first design" },
];

const resourcesItems = [
  { label: "Documentation", href: "/docs/", icon: BookOpen, description: "Getting started guides" },
  { label: "Quick Start", href: "/docs/quickstart.html", icon: Zap, description: "5-minute setup" },
  { label: "Installation", href: "/docs/installation.html", icon: Download, description: "Platform-specific guides" },
  { label: "FAQ", href: "/faq", icon: HelpCircle, description: "Common questions" },
];

const companyItems = [
  { label: "About KubeGraf", href: "/kubegraf", icon: Brain, description: "Our mission" },
  { label: "Compare", href: "/compare", icon: FileCode, description: "vs. alternatives" },
  { label: "Community", href: "https://github.com/kubegraf/kubegraf/discussions", icon: Users, description: "Join the discussion" },
  { label: "GitHub", href: "https://github.com/kubegraf/kubegraf", icon: Github, description: "Source code" },
];

interface DropdownProps {
  label: string;
  items: typeof productItems;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function NavDropdown({ label, items, isOpen, onToggle, onClose }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-72 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-2">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Read theme from localStorage (same key as docs pages)
    const saved = localStorage.getItem('kubegraf-theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
    } else {
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      setTheme(prefersLight ? 'light' : 'dark');
    }

    // Listen for theme changes (from footer toggle or other pages)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kubegraf-theme' && e.newValue) {
        setTheme(e.newValue as 'light' | 'dark');
      }
    };

    // Also listen for attribute changes on documentElement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
          if (newTheme) setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener('storage', handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mobileMenuOpen && e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 font-display font-bold text-xl tracking-tight group">
              <img
                src={theme === 'light' ? '/assets/logos/binary-matrix/logo-transparent-light.svg' : '/assets/logos/binary-matrix/logo-transparent-dark.svg'}
                alt="KubeGraf"
                className="kubegraf-logo transition-transform group-hover:scale-110"
              />
              <span className="hidden sm:inline">KubēGraf</span>
            </a>

            {/* Desktop Navigation - Portainer style with dropdowns */}
            <div className="hidden lg:flex items-center gap-1">
              <NavDropdown
                label="Product"
                items={productItems}
                isOpen={openDropdown === 'product'}
                onToggle={() => handleDropdownToggle('product')}
                onClose={() => setOpenDropdown(null)}
              />
              <NavDropdown
                label="Resources"
                items={resourcesItems}
                isOpen={openDropdown === 'resources'}
                onToggle={() => handleDropdownToggle('resources')}
                onClose={() => setOpenDropdown(null)}
              />
              <NavDropdown
                label="Company"
                items={companyItems}
                isOpen={openDropdown === 'company'}
                onToggle={() => handleDropdownToggle('company')}
                onClose={() => setOpenDropdown(null)}
              />
              <a
                href="/docs/"
                className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                Docs
              </a>
            </div>

            {/* CTA Buttons - Portainer style */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://github.com/kubegraf/kubegraf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                <span className="hidden xl:inline">GitHub</span>
              </a>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
                onClick={() => window.location.href = '/docs/installation.html'}
              >
                Install
              </Button>
              <Button
                size="sm"
                className="text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                onClick={() => window.location.href = '/docs/quickstart.html'}
              >
                Get Started
                <Terminal className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <div className="pt-20 px-6 pb-6 h-full overflow-y-auto">
              {/* Product Section */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Product</div>
                {productItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-3 text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Resources Section */}
              <div className="mb-6 pt-4 border-t border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Resources</div>
                {resourcesItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-3 text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Company Section */}
              <div className="mb-6 pt-4 border-t border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Company</div>
                {companyItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-3 text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Mobile CTAs */}
              <div className="pt-6 border-t border-border space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => {
                    window.location.href = '/docs/installation.html';
                    setMobileMenuOpen(false);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install
                </Button>
                <Button
                  className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    window.location.href = '/docs/quickstart.html';
                    setMobileMenuOpen(false);
                  }}
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
