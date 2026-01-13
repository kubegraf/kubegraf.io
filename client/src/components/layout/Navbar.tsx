import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Terminal, Menu, X, BookOpen, ChevronDown, Zap, Shield, Brain, Network, FileCode, HelpCircle, Users, BookMarked, Github, MessageSquare, Download, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Dropdown menu items
const productItems = [
  { label: "Features", href: "#features", icon: Zap, description: "Core capabilities" },
  { label: "Terminal UI", href: "/docs/terminal-ui.html", icon: Terminal, description: "Command-line interface" },
  { label: "Web Dashboard", href: "/docs/web-dashboard.html", icon: Network, description: "Visual monitoring" },
  { label: "Security", href: "/docs/security.html", icon: Shield, description: "Local-first design" },
];

const resourcesItems = [
  { label: "Documentation", href: "/docs/", icon: BookOpen, description: "Getting started guides" },
  { label: "Quick Start", href: "/docs/quickstart.html", icon: Zap, description: "5-minute setup" },
  { label: "Installation", href: "/docs/installation.html", icon: Download, description: "Platform-specific guides" },
  { label: "ROI & Business Impact", href: "/roi", icon: TrendingUp, description: "Cost savings analysis" },
  { label: "FAQ", href: "/faq", icon: HelpCircle, description: "Common questions" },
];

const companyItems = [
  { label: "About KubeGraf", href: "/kubegraf", icon: Brain, description: "Our mission" },
  { label: "ROI & Business Impact", href: "/roi", icon: TrendingUp, description: "Cost savings analysis" },
  { label: "Compare", href: "/compare", icon: FileCode, description: "vs. alternatives" },
];

interface DropdownProps {
  label: string;
  items: typeof productItems;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  theme: 'light' | 'dark';
}

interface NavbarProps {
  disableScrollEffects?: boolean;
}

function NavDropdown({ label, items, isOpen, onToggle, onClose, theme }: DropdownProps) {
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
      <motion.button
        onClick={onToggle}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all duration-200 outline-none"
        style={{
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 0.9)',
          fontSize: '1rem', // Standardizing font size
        }}
        whileHover={{ 
          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(17, 24, 39, 1)',
        }}
        whileTap={{ scale: 0.98 }}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-2 w-72 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-2">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    onClose();
                    // Handle smooth scrolling for hash links
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      const targetId = item.href.substring(1);
                      const targetElement = document.getElementById(targetId);
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div 
                      className="font-semibold transition-colors duration-200"
                      style={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 0.95)',
                        fontSize: '0.9375rem',
                      }}
                    >
                      {item.label}
                    </div>
                    <div 
                      className="transition-colors duration-200"
                      style={{
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(75, 85, 99, 1)',
                        fontSize: '0.8125rem',
                        lineHeight: '1.25rem',
                      }}
                    >
                      {item.description}
                    </div>
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

export default function Navbar({ disableScrollEffects = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(disableScrollEffects ? 0 : 0); // 0 to 1, represents scroll position

  useEffect(() => {
    // Skip scroll listener entirely if effects are disabled
    if (disableScrollEffects) {
      setScrolled(false);
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 50; // Start effect at 50px
      const maxScroll = 200; // Fully applied at 200px

      setScrolled(scrollY > scrollThreshold);

      // Calculate scroll progress (0 to 1)
      if (scrollY <= scrollThreshold) {
        setScrollProgress(0);
      } else if (scrollY >= maxScroll) {
        setScrollProgress(1);
      } else {
        const progress = (scrollY - scrollThreshold) / (maxScroll - scrollThreshold);
        setScrollProgress(progress);
      }
    };

    handleScroll(); // Check initial scroll position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [disableScrollEffects]);

  useEffect(() => {
    // Read theme from localStorage (same key as docs pages)
    const saved = localStorage.getItem('kubegraf-theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
    } else {
      // Default to light theme
      setTheme('light');
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
        initial={disableScrollEffects ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        transition={disableScrollEffects ? { duration: 0 } : { duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 ${disableScrollEffects ? '' : 'transition-all duration-300 ease-out'}`}
        style={disableScrollEffects ? {
          // Static styles when effects are disabled - NO effects at all
          backgroundColor: theme === 'dark'
            ? 'rgba(2, 6, 23, 0.9)'
            : 'rgba(250, 246, 233, 1)', // #faf6e9 - Rich cream matching page background
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderBottom: 'none',
          boxShadow: 'none',
          // Responsive height: 64px on mobile, 72px on tablet, 80px on desktop
          height: window.innerWidth < 640 ? '64px' : window.innerWidth < 1024 ? '72px' : '80px',
        } : {
          // Progressive background opacity based on scroll progress
          backgroundColor: theme === 'dark'
            ? `rgba(2, 6, 23, ${0.7 + scrollProgress * 0.25})` // 0.7 to 0.95
            : `rgba(255, 255, 255, ${0.8 + scrollProgress * 0.18})`, // 0.8 to 0.98

          // Progressive backdrop blur
          backdropFilter: `blur(${12 + scrollProgress * 12}px)`, // 12px to 24px
          WebkitBackdropFilter: `blur(${12 + scrollProgress * 12}px)`,

          // Progressive border opacity
          borderBottom: scrolled ? `1px solid ${theme === 'dark'
            ? `rgba(255, 255, 255, ${0.05 + scrollProgress * 0.05})`
            : `rgba(15, 23, 42, ${0.05 + scrollProgress * 0.05})`}` : 'none',

          // Progressive shadow - increases with scroll
          boxShadow: scrolled
            ? (theme === 'dark'
                ? `0 ${4 + scrollProgress * 6}px ${20 + scrollProgress * 10}px rgba(0, 0, 0, ${0.15 + scrollProgress * 0.15})`
                : `0 ${4 + scrollProgress * 6}px ${20 + scrollProgress * 10}px rgba(0, 0, 0, ${0.03 + scrollProgress * 0.05})`)
            : 'none',

          // Progressive height reduction on scroll for modern effect
          height: scrolled ? '64px' : '80px',
        }}
      >
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <motion.img
                key={theme}
                src={theme === 'dark' ? '/kubegraf-dark-new-bg.svg' : '/kubegraf.svg'}
                alt="KubeGraf"
                className="w-auto flex-shrink-0 h-8 sm:h-10 md:h-12 lg:h-14"
                animate={disableScrollEffects ? {} : {
                  height: scrolled ? 40 : undefined, // Only animate on scroll when effects enabled
                }}
                transition={disableScrollEffects ? { duration: 0 } : {
                  height: { duration: 0.3, ease: "easeOut" }
                }}
                whileHover={disableScrollEffects ? {} : { scale: 1.05 }}
              />
              <motion.span
                className="font-display font-bold whitespace-nowrap transition-colors duration-300 text-lg sm:text-xl md:text-2xl lg:text-3xl"
                animate={disableScrollEffects ? {} : {
                  fontSize: scrolled ? '1.5rem' : undefined, // Only animate on scroll when effects enabled
                }}
                transition={disableScrollEffects ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
                style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : '#4a3b2e', // Warm brown for cream theme
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FE5000'; // Primary orange color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : '#4a3b2e';
                }}
              >
                KubēGraf
              </motion.span>
            </a>

            {/* Desktop Navigation - Portainer style with dropdowns */}
            <div className="hidden lg:flex items-center gap-1">
              <NavDropdown
                label="Product"
                items={productItems}
                isOpen={openDropdown === 'product'}
                onToggle={() => handleDropdownToggle('product')}
                onClose={() => setOpenDropdown(null)}
                theme={theme}
              />
              <NavDropdown
                label="Resources"
                items={resourcesItems}
                isOpen={openDropdown === 'resources'}
                onToggle={() => handleDropdownToggle('resources')}
                onClose={() => setOpenDropdown(null)}
                theme={theme}
              />
              <NavDropdown
                label="Company"
                items={companyItems}
                isOpen={openDropdown === 'company'}
                onToggle={() => handleDropdownToggle('company')}
                onClose={() => setOpenDropdown(null)}
                theme={theme}
              />
            </div>

            {/* CTA Buttons - Portainer style */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="https://github.com/kubegraf/kubegraf"
                target="_blank"
                rel="noopener noreferrer"
                className={`${disableScrollEffects ? '' : 'transition-all duration-200'} flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium`}
                style={{
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 24, 39, 0.8)',
                  fontSize: '0.9375rem',
                }}
                whileHover={disableScrollEffects ? {} : {
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(17, 24, 39, 1)',
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                }}
                whileTap={disableScrollEffects ? {} : { scale: 0.98 }}
              >
                <Github className="w-4 h-4" />
                <span className="hidden xl:inline">GitHub</span>
              </motion.a>

              {/* Docs and Install combined CTA */}
              <div
                className={`relative rounded-lg group p-[1px] ${disableScrollEffects ? '' : 'transition-all duration-500'}`}
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5))',
                }}
              >
                {/* Glow effect on hover */}
                {!disableScrollEffects && <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />}
                
                <div 
                  className="flex items-center gap-0 px-1 py-1 rounded-[7px] relative overflow-hidden"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <motion.a
                    href="/docs/"
                    className={`px-3 py-1.5 font-semibold ${disableScrollEffects ? '' : 'transition-all duration-200'} flex items-center gap-2 rounded-md`}
                    style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 0.9)',
                      fontSize: '0.875rem',
                    }}
                    whileHover={disableScrollEffects ? {} : {
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      color: 'hsl(var(--primary))'
                    }}
                  >
                    <BookOpen className="w-4 h-4" />
                    Docs
                  </motion.a>
                  
                  <div className="w-[1px] h-4 bg-border/50 mx-1" />

                  <motion.button
                    onClick={() => window.location.href = '/docs/installation.html'}
                    className={`px-3 py-1.5 font-bold ${disableScrollEffects ? '' : 'transition-all duration-200'} rounded-md`}
                    style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 0.9)',
                      fontSize: '0.875rem',
                    }}
                    whileHover={disableScrollEffects ? {} : {
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      color: 'hsl(var(--primary))'
                    }}
                  >
                    Install
                  </motion.button>
                </div>
              </div>

              <motion.div
                whileHover={disableScrollEffects ? {} : { scale: 1.02 }}
                whileTap={disableScrollEffects ? {} : { scale: 0.98 }}
              >
                <Button
                  size="sm"
                  className="shadow-xl px-5 h-10 font-bold tracking-tight rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'white',
                    fontSize: '0.9375rem',
                    boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.25)',
                  }}
                  onClick={() => window.location.href = '/docs/quickstart.html'}
                >
                  Get Started
                  <Terminal className="w-4 h-4 ml-2 opacity-80" />
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
              }}
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
            <div className="pt-20 sm:pt-24 px-6 pb-6 h-full overflow-y-auto">
              {/* Product Section */}
              <div className="mb-6">
                <div 
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(107, 114, 128, 1)',
                  }}
                >
                  Product
                </div>
                {productItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-3.5 px-2 rounded-lg transition-all active:bg-primary/10"
                    style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
                      minHeight: '48px', // Better touch target for mobile
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(var(--primary))';
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      // Handle smooth scrolling for hash links
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        const targetId = item.href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
                    <span className="font-medium text-base">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Resources Section */}
              <div className="mb-6 pt-4 border-t border-border">
                <div 
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(107, 114, 128, 1)',
                  }}
                >
                  Resources
                </div>
                {resourcesItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-3.5 px-2 rounded-lg transition-all active:bg-primary/10"
                    style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
                      minHeight: '48px', // Better touch target for mobile
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(var(--primary))';
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
                    <span className="font-medium text-base">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Company Section */}
              <div className="mb-6 pt-4 border-t border-border">
                <div 
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(107, 114, 128, 1)',
                  }}
                >
                  Company
                </div>
                {companyItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-3.5 px-2 rounded-lg transition-all active:bg-primary/10"
                    style={{
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
                      minHeight: '48px', // Better touch target for mobile
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(var(--primary))';
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
                    <span className="font-medium text-base">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Mobile CTAs */}
              <div className="pt-6 border-t border-border space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-center h-12 text-base font-semibold"
                  style={{
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
                  }}
                  onClick={() => {
                    window.location.href = '/docs/installation.html';
                    setMobileMenuOpen(false);
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Install
                </Button>
                <Button
                  className="w-full justify-center h-12 text-base font-bold"
                  style={{
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'rgba(255, 255, 255, 1)', // White text on primary background
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                  onClick={() => {
                    window.location.href = '/docs/quickstart.html';
                    setMobileMenuOpen(false);
                  }}
                >
                  <Terminal className="w-5 h-5 mr-2" />
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
