import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-primary/10">
        <a href="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter">
          <img src="/kubegraf-logo-light.png" alt="KubeGraf Logo" className="w-12 h-12 object-contain" />
          KubeGraf
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="/#features" className="hover:text-primary transition-colors">Features</a>
          <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-white/5">
            Sign In
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-primary/50 hover:bg-primary/10 rounded-full px-4"
            onClick={() => window.location.href = '/docs/installation.html'}
          >
            Install
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
            onClick={() => window.location.href = '/docs/quickstart.html'}
          >
            Get Started
            <Terminal className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
