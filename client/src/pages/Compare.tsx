import { Check, X, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Compare() {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Compare - KubēGraf vs Lens, k9s, kubectl, Datadog';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compare KubeGraf to Lens Desktop, k9s, kubectl, and Datadog. See how KubeGraf focuses on incident understanding with evidence-backed diagnostics and safe fix recommendations.');
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
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            How KubeGraf Compares
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            KubeGraf focuses on incident understanding and safe action, not just visibility.
          </p>
        </motion.div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 font-semibold text-sm">Capability</th>
                <th className="text-center py-4 px-4 font-bold text-primary text-sm">KubeGraf</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">Lens Desktop</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">k9s</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">kubectl</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">Datadog</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Primary purpose</td>
                <td className="py-4 px-4 text-center text-primary font-semibold">Incident intelligence & safe ops</td>
                <td className="py-4 px-4 text-center text-muted-foreground">Cluster visibility</td>
                <td className="py-4 px-4 text-center text-muted-foreground">CLI navigation</td>
                <td className="py-4 px-4 text-center text-muted-foreground">Raw control</td>
                <td className="py-4 px-4 text-center text-muted-foreground">Observability SaaS</td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Local-first</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Mandatory SaaS</td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Automatic incident detection</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Explains <em>why</em> failures happen</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Evidence-backed diagnosis</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Change correlation</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Safe fix recommendations</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Dry-run fix preview</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Human-in-the-loop actions</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Terminal UI (TUI)</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Web / SPA interface</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Unified multi-cluster incidents</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Incident knowledge retention</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Runs fully offline</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Binary footprint</td>
                <td className="py-4 px-4 text-center text-primary font-semibold">~15 MB</td>
                <td className="py-4 px-4 text-center text-muted-foreground">~300 MB+</td>
                <td className="py-4 px-4 text-center text-muted-foreground">~20 MB</td>
                <td className="py-4 px-4 text-center text-muted-foreground">~50 MB</td>
                <td className="py-4 px-4 text-center"></td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </section>

      <Footer variant="minimal" />
    </div>
  );
}
