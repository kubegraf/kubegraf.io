import { Check, X, AlertTriangle, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { FooterModern } from "@/components/sections/modern";
import WaitlistModal from "@/components/forms/WaitlistModal";

export default function Compare() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    // Set page title and meta description
    document.title = 'KubeGraf vs Komodor vs Rootly vs Incident.io vs SRE.ai — Kubernetes AI SRE Platform Comparison';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'KubeGraf is a Kubernetes-native, local-first autonomous AI SRE platform. Compare vs Komodor (change tracking, no remediation), Rootly (generic on-call, not K8s-native), Incident.io (no Kubernetes depth), SRE.ai (cloud-dependent). SafeFix™ dry-run. Zero data exfiltration.');
    }
  }, []);

  const Icon = ({ status }: { status: '✅' | '❌' | '⚠️' | '' }) => {
    if (status === '✅') return <Check className="w-5 h-5 text-green-500" />;
    if (status === '❌') return <X className="w-5 h-5 text-red-500" />;
    if (status === '⚠️') return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar disableScrollEffects />

      <main className="pt-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #FE5000, #0891b2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>KubeGraf vs Komodor, Rootly,</span>{" "}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Incident.io & SRE.ai</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            KubeGraf is an autonomous, Kubernetes-native AI SRE platform with local-first architecture — built for root cause analysis and safe remediation, not just change tracking, on-call routing, or cloud-based AI triage.
          </p>
        </motion.div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0"
        >
          <p className="text-sm text-muted-foreground mb-4 lg:hidden">
            Scroll horizontally to see all comparisons →
          </p>
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 font-semibold text-sm">Capability</th>
                <th className="text-center py-4 px-4 font-bold text-primary text-sm">KubeGraf</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">Komodor</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">Rootly</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">Incident.io</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">SRE.ai</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Primary focus</td>
                <td className="py-4 px-4 text-center text-primary font-semibold">AI root cause analysis & remediation</td>
                <td className="py-4 px-4 text-center text-muted-foreground">K8s change tracking</td>
                <td className="py-4 px-4 text-center text-muted-foreground">On-call & incident management</td>
                <td className="py-4 px-4 text-center text-muted-foreground">On-call, incident response & status pages</td>
                <td className="py-4 px-4 text-center text-muted-foreground">AI DevOps agents & reliability</td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Kubernetes-native</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Local-first / no data exfiltration</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">AI root cause analysis</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Evidence-backed diagnosis</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Kubernetes change correlation</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Safe fix recommendations</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Dry-run fix preview (SafeFix™)</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Human-in-the-loop approval</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">On-call management</td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Status pages</td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Multi-cluster support</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent)]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 tracking-tight">
            <span style={{
              background: 'linear-gradient(135deg, #FE5000, #0891b2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Ready to try</span>{" "}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>KubeGraf?</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Free to install. No account required. Runs locally in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button aria-label="Install KubeGraf free" size="lg" className="h-12 px-8 text-base font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all rounded-full group" onClick={() => setWaitlistOpen(true)}>
              <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
              Install KubeGraf Free
            </Button>
            <Link href="/docs/quickstart.html">
              <Button aria-label="Open KubeGraf quick start guide" variant="outline" size="lg" className="h-12 px-8 text-base font-bold border-border hover:bg-card/50 transition-all rounded-full group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Quick Start Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </main>

      <FooterModern />
      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
