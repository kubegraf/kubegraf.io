import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Terminal, Menu, X } from "lucide-react";
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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-0.5 px-1"
      >
        <div className="glass rounded-full px-2 py-0.5 flex items-center gap-2 shadow-2xl shadow-primary/10">
          <a href="/" className="flex items-center gap-1 font-display font-bold text-2xl tracking-tight">
            <img
              src="/assets/logo/kubegraf_color_icon.png?v=3"
              alt="KubeGraf"
              className="object-contain"
              style={{ width: 64, height: 64 }}
            />
            <span className="leading-none">KubēGraf</span>
          </a>

          <div className="hidden md:flex items-center gap-4 text-base font-medium text-muted-foreground">
            <a href="/#features" className="hover:text-primary transition-colors ml-2">Features</a>
            <a href="/kubegraf" className="hover:text-primary transition-colors">What is KubeGraf?</a>
            <Link href="/compare" className="hover:text-primary transition-colors">Compare</Link>
            <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
            <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex hover:bg-white/5 text-base"
              onClick={() => window.location.href = '/docs/web-dashboard.html'}
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-primary/50 hover:bg-primary/10 rounded-full px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              onClick={() => window.location.href = '/docs/installation.html'}
            >
              Install
            </Button>
            <Button
              size="sm"
              className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              onClick={() => window.location.href = '/docs/quickstart.html'}
            >
              Get Started
              <Terminal className="w-4 h-4 ml-2" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
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
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-0 right-0 z-40 mx-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="glass rounded-2xl p-4 shadow-2xl border border-white/10">
              <div className="flex flex-col gap-2">
                <a
                  href="/#features"
                  className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="/kubegraf"
                  className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  What is KubeGraf?
                </a>
                <Link
                  href="/compare"
                  className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compare
                </Link>
                <Link
                  href="/docs"
                  className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Docs
                </Link>
                <Link
                  href="/pricing"
                  className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>

                <div className="h-px bg-white/10 my-2" />

                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start hover:bg-white/5 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
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
                  className="justify-start border-primary/50 hover:bg-primary/10 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  onClick={() => {
                    window.location.href = '/docs/installation.html';
                    setMobileMenuOpen(false);
                  }}
                >
                  Install
                </Button>
                <Button
                  size="sm"
                  className="justify-start bg-primary text-primary-foreground hover:bg-primary/90 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
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
