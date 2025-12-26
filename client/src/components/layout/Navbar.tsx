import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Terminal, Menu, X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mobileMenuOpen && e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight">
              <img
                src="/assets/logos/binary-matrix/logo-binary-matrix-cyan.svg"
                alt="KubeGraf"
                className="kubegraf-logo"
              />
              <span>KubēGraf</span>
            </a>

            {/* Desktop Navigation - Minimal like Render/Supabase */}
            <div className="hidden md:flex items-center gap-1">
              <a 
                href="/#features" 
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors"
              >
                Features
              </a>
              <a 
                href="/kubegraf" 
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors"
              >
                About
              </a>
              <Link 
                href="/docs-overview" 
                className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5 font-semibold"
              >
                <BookOpen className="w-4 h-4" />
                Docs
              </Link>
              <Link 
                href="/compare" 
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors"
              >
                Compare
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
                onClick={() => window.location.href = '/docs/web-dashboard.html'}
              >
                Sign In
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-sm"
                onClick={() => window.location.href = '/docs/installation.html'}
              >
                Install
              </Button>
              <Button
                size="sm"
                className="text-sm bg-primary text-primary-foreground hover:bg-primary/90"
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
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-1">
                <a
                  href="/#features"
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="/kubegraf"
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <Link
                  href="/docs-overview"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-4 h-4" />
                  Documentation
                </Link>
                <Link
                  href="/compare"
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compare
                </Link>
                <div className="h-px bg-border my-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-sm"
                  onClick={() => {
                    window.location.href = '/docs/web-dashboard.html';
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-sm"
                  onClick={() => {
                    window.location.href = '/docs/installation.html';
                    setMobileMenuOpen(false);
                  }}
                >
                  Install
                </Button>
                <Button
                  size="sm"
                  className="justify-start text-sm bg-primary text-primary-foreground hover:bg-primary/90"
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
