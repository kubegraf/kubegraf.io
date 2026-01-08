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
];

interface DropdownProps {
  label: string;
  items: typeof productItems;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  theme: 'light' | 'dark';
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
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors"
        style={{
          color: 'rgba(17, 24, 39, 1)', // Dark color for all themes
          fontSize: '1.125rem', // 18px - increased font size
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'rgba(17, 24, 39, 1)';
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(17, 24, 39, 1)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
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
                    <div 
                      className="font-medium"
                      style={{
                        color: 'rgba(17, 24, 39, 1)', // Dark color
                        fontSize: '0.9375rem', // 15px - larger than text-xs
                      }}
                    >
                      {item.label}
                    </div>
                    <div 
                      className=""
                      style={{
                        color: 'rgba(31, 41, 55, 1)', // Slightly lighter dark color
                        fontSize: '0.875rem', // 14px - larger than text-xs
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

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1, represents scroll position

  useEffect(() => {
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
  }, []);

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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled ? 'border-b' : ''
        }`}
        style={{
          // Progressive background opacity based on scroll progress
          backgroundColor: theme === 'dark' 
            ? `rgba(2, 6, 23, ${0.8 + scrollProgress * 0.15})` // 0.8 to 0.95
            : `rgba(250, 246, 233, ${0.9 + scrollProgress * 0.08})`, // 0.9 to 0.98
          
          // Progressive backdrop blur
          backdropFilter: `blur(${8 + scrollProgress * 16}px)`, // 8px to 24px
          WebkitBackdropFilter: `blur(${8 + scrollProgress * 16}px)`,
          
          // Progressive border opacity
          borderBottomColor: theme === 'dark' 
            ? `rgba(255, 255, 255, ${0.05 + scrollProgress * 0.1})` // 0.05 to 0.15
            : `rgba(15, 23, 42, ${0.05 + scrollProgress * 0.1})`, // 0.05 to 0.15
          borderBottomWidth: scrolled ? '1px' : '0px',
          
          // Progressive shadow - increases with scroll
          boxShadow: scrolled 
            ? (theme === 'dark' 
                ? `0 ${4 + scrollProgress * 10}px ${20 + scrollProgress * 30}px rgba(0, 0, 0, ${0.2 + scrollProgress * 0.3}), 0 0 ${10 + scrollProgress * 15}px rgba(0, 0, 0, ${0.1 + scrollProgress * 0.15})`
                : `0 ${4 + scrollProgress * 10}px ${20 + scrollProgress * 30}px rgba(0, 0, 0, ${0.05 + scrollProgress * 0.1}), 0 0 ${10 + scrollProgress * 15}px rgba(0, 0, 0, ${0.02 + scrollProgress * 0.05})`)
            : 'none',
          
          // Slight height reduction on scroll for modern effect
          height: scrolled ? '56px' : 'auto', // Slightly reduced on scroll
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-center justify-between"
            animate={{
              height: scrolled ? 56 : 80, // Reduce height on scroll
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <motion.img
                key={theme}
                src={theme === 'dark' ? '/kubegraf-dark-new-bg.svg' : '/kubegraf.svg'}
                alt="KubeGraf"
                className="w-auto flex-shrink-0"
                initial={{ rotateY: 0 }}
                animate={{ 
                  rotateY: 360,
                  height: scrolled ? 40 : 64, // Reduce logo size on scroll
                  width: 'auto'
                }}
                transition={{
                  rotateY: { duration: 1.2, ease: "easeInOut", times: [0, 0.5, 1] },
                  height: { duration: 0.3, ease: "easeOut" }
                }}
                whileHover={{ scale: 1.05 }}
                style={{ transformStyle: "preserve-3d" }}
              />
              <motion.span 
                className={`font-display font-bold whitespace-nowrap transition-colors duration-300 group-hover:text-orange-500`}
                animate={{
                  fontSize: scrolled ? '1.5rem' : '2rem', // Reduce text size on scroll
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  color: 'rgba(17, 24, 39, 1)', // Dark color for all themes
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
              <a
                href="https://github.com/kubegraf/kubegraf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors flex items-center gap-1.5"
                style={{
                  color: 'rgba(17, 24, 39, 1)', // Dark color
                  fontSize: '1rem', // 16px - larger font size
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'hsl(var(--primary))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(17, 24, 39, 1)';
                }}
              >
                <Github className="w-4 h-4" />
                <span className="hidden xl:inline">GitHub</span>
              </a>
              {/* Docs and Install in a box with rotating border */}
              <div 
                className="relative rounded-md"
                style={{
                  padding: '2px', // Border width
                  background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.8), rgba(34, 211, 238, 0.9), rgba(59, 130, 246, 0.8), rgba(6, 182, 212, 0.8))',
                  backgroundSize: '400% 100%',
                  animation: 'borderRotate 4s linear infinite',
                }}
              >
                <style>{`
                  @keyframes borderRotate {
                    0% {
                      background-position: 0% 50%;
                    }
                    100% {
                      background-position: 400% 50%;
                    }
                  }
                `}</style>
                <div 
                  className="flex items-center gap-0 px-0.5 py-0.5 rounded-md relative"
                  style={{
                    backgroundColor: 'rgba(6, 182, 212, 0.08)',
                    transition: 'background-color 0.3s ease',
                    borderRadius: 'calc(0.375rem - 2px)', // Slightly smaller to account for border
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.08)';
                  }}
                >
                <a
                  href="/docs/"
                  className="px-2 py-1 font-medium transition-colors flex items-center gap-1 rounded-sm"
                  style={{
                    color: 'rgba(17, 24, 39, 1)', // Dark color
                    fontSize: '0.9375rem', // 15px - slightly smaller
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'hsl(var(--primary))';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(17, 24, 39, 1)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <BookOpen className="w-4 h-4" />
                  Docs
                </a>
                <span 
                  style={{ 
                    width: '1px',
                    height: '18px',
                    backgroundColor: 'rgba(6, 182, 212, 0.7)',
                    display: 'block',
                    marginLeft: '8px',
                    marginRight: '8px',
                    flexShrink: 0,
                    alignSelf: 'center',
                  }}
                ></span>
                <button
                  onClick={() => window.location.href = '/docs/installation.html'}
                  className="px-2 py-1 font-medium transition-colors rounded-sm"
                  style={{
                    color: 'rgba(17, 24, 39, 1)', // Dark color
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9375rem', // 15px - slightly smaller
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'hsl(var(--primary))';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(17, 24, 39, 1)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Install
                </button>
                </div>
              </div>
              <Button
                size="sm"
                className="shadow-lg"
                style={{
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'rgba(255, 255, 255, 1)', // White text on primary background
                  fontSize: '1.125rem', // 18px - increased font size
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
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
              style={{
                color: 'rgba(17, 24, 39, 1)', // Dark color
              }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </motion.div>
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
                <div 
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{
                    color: 'rgba(107, 114, 128, 1)', // Dark muted color
                  }}
                >
                  Product
                </div>
                {productItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-3 transition-colors"
                    style={{
                      color: 'rgba(17, 24, 39, 1)', // Dark color
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(var(--primary))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(17, 24, 39, 1)';
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Resources Section */}
              <div className="mb-6 pt-4 border-t border-border">
                <div 
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{
                    color: 'rgba(107, 114, 128, 1)', // Dark muted color
                  }}
                >
                  Resources
                </div>
                {resourcesItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-3 transition-colors"
                    style={{
                      color: 'rgba(17, 24, 39, 1)', // Dark color
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(var(--primary))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(17, 24, 39, 1)';
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Company Section */}
              <div className="mb-6 pt-4 border-t border-border">
                <div 
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{
                    color: 'rgba(107, 114, 128, 1)', // Dark muted color
                  }}
                >
                  Company
                </div>
                {companyItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 py-3 transition-colors"
                    style={{
                      color: 'rgba(17, 24, 39, 1)', // Dark color
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(var(--primary))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(17, 24, 39, 1)';
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Mobile CTAs */}
              <div className="pt-6 border-t border-border space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  style={{
                    borderColor: 'rgba(15, 23, 42, 0.2)',
                    color: 'rgba(17, 24, 39, 1)', // Dark color
                  }}
                  onClick={() => {
                    window.location.href = '/docs/installation.html';
                    setMobileMenuOpen(false);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install
                </Button>
                <Button
                  className="w-full justify-center"
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
