import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { FooterModern } from "@/components/sections/modern";

export default function License() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar disableScrollEffects />

      <main className="pt-20">
        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #FE5000, #0891b2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Licensing</span>{" "}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>& Usage</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
            Local-first tool. Free for individuals and small teams. Enterprise plans for advanced features.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-bold text-foreground mb-2">Free Edition</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Full incident detection, terminal UI, web dashboard. No pod limits.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Individual developers & small teams
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-bold text-foreground mb-2">Pro</h3>
              <p className="text-sm text-muted-foreground mb-3">
                AI-powered root cause analysis, advanced diagnostics, multi-cluster management.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Growing teams & production use
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-bold text-foreground mb-2">Enterprise</h3>
              <p className="text-sm text-muted-foreground mb-3">
                SSO/SAML, audit logs, dedicated support, custom integrations.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Large organizations & compliance needs
              </p>
            </div>
          </div>

          <div className="text-center p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 mb-8">
            <p className="text-sm font-semibold text-foreground mb-1">
              🔒 All editions run locally on your machine
            </p>
            <p className="text-xs text-muted-foreground">
              Zero data exfiltration. No SaaS. Works offline. Your cluster data never leaves your laptop.
            </p>
          </div>

          <div className="text-center space-y-4">
            <a
              href="/pricing"
              className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2 mr-6"
            >
              View Pricing Details
            </a>
            <a
              href="mailto:contact@kubegraf.io?subject=Enterprise Inquiry"
              className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2"
            >
              Contact Sales
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>
      </main>

      <FooterModern />
    </div>
  );
}
