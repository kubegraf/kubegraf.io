import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { FooterModern } from "@/components/sections/modern";

export default function Pricing() {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Pricing - KubēGraf | Free and Pro Plans';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'KubeGraf pricing: Start free with unlimited clusters, terminal UI, and web dashboard. Upgrade to Pro for Brain Panel diagnostics and advanced incident analysis.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar disableScrollEffects />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span style={{
              background: 'linear-gradient(135deg, #FE5000, #0891b2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free. Upgrade only if you need deeper incident insight.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl border border-white/10 p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Free</h2>
              <p className="text-muted-foreground">For individuals and small teams</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Terminal UI, Web UI, and SPA</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Unlimited cluster connections</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">One-click cluster switching</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Incident detection and basic diagnostics</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Local-first operation (no SaaS dependency)</span>
              </li>
            </ul>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.location.href = '/docs/installation.html'}
            >
              Get started free
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-3">
              No account required.
            </p>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl border border-primary/50 p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Pro</h2>
              <p className="text-muted-foreground">
                For teams operating production clusters that need deeper diagnosis and shared incident learning
              </p>
            </div>

            <p className="text-sm text-muted-foreground mb-4">Everything in Free, plus:</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Brain Panel with evidence-backed diagnostics</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Advanced incident analysis and summaries</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Knowledge Bank export and sharing</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Unlimited cluster connections with fast switching</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Early access to new incident analysis features</span>
              </li>
            </ul>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.location.href = 'https://app.kubegraf.io/signup'}
            >
              Start 14-day trial
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-3">
              No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl border border-white/10 p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Trust & Transparency</h2>
          <p className="text-muted-foreground leading-relaxed">
            KubeGraf runs locally on your machine. Your cluster data never leaves your environment.
            If you try Pro and decide it's not for you, you can stop using Pro features at any time—the
            Free plan will continue working exactly as before.
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>

          <div className="space-y-6">
            <div className="glass-card rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-3">Do I need an account to use KubeGraf?</h3>
              <p className="text-muted-foreground">
                No. The Free plan requires no account, no registration, and no telemetry. Download the binary
                and run it against your clusters. Pro features require creating an account only for license verification.
              </p>
            </div>

            <div className="glass-card rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-3">Does KubeGraf send my data to the cloud?</h3>
              <p className="text-muted-foreground">
                No. All cluster data stays on your machine. Pro features run locally. The only data sent during
                Pro usage is anonymous license verification—no cluster logs, events, or resource data is transmitted.
              </p>
            </div>

            <div className="glass-card rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-3">Can I downgrade or stop using Pro later?</h3>
              <p className="text-muted-foreground">
                Yes. You can stop using Pro at any time. The Free plan continues working without interruption.
                No lock-in, no penalties, no loss of local incident history.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enterprise */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center glass-card rounded-2xl border border-white/10 p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Enterprise & Offline Usage</h2>
          <p className="text-muted-foreground mb-4">
            Looking for enterprise support, custom licensing, or offline distribution?
          </p>
          <a
            href="mailto:contact@kubegraf.io"
            className="text-primary hover:text-primary/80 font-semibold"
          >
            Contact us at contact@kubegraf.io
          </a>
        </motion.div>
      </section>
      </main>

      <FooterModern />
    </div>
  );
}
