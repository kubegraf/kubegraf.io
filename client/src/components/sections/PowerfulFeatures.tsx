import { motion } from "framer-motion";
import { Terminal, Globe, BarChart3, Code, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const powerfulFeatures = [
  {
    icon: Terminal,
    title: "Terminal UI (TUI)",
    description: "Keyboard-driven interface for incident triage and cluster navigation. SSH-friendly and fast.",
    badge: "Interfaces",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    icon: Globe,
    title: "Web UI",
    description: "Browser-based dashboard for visual exploration of clusters, incidents, and the Knowledge Bank. Runs locally.",
    badge: "Interfaces",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    icon: Code,
    title: "Developer Mode",
    description: "Point at any pod and ask \"What's wrong?\" KubeGraf explains status, recent changes, and suggests fixes.",
    badge: "Diagnosis",
    color: "from-cyan-500/20 to-cyan-600/20"
  },
  {
    icon: BarChart3,
    title: "Multi-Namespace",
    description: "Filter and monitor across namespaces. Switch contexts instantly. Unified incident view across environments.",
    badge: "Operations",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    icon: Database,
    title: "Local Storage",
    description: "All incident history stored in SQLite on your machine. No cloud dependencies for core features.",
    badge: "Security",
    color: "from-blue-500/20 to-blue-600/20"
  }
];

export default function PowerfulFeatures() {
  return (
    <section id="powerful-features" className="py-24 md:py-32 relative z-10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            Local-first <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Architecture</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Your credentials never leave your laptop. No telemetry required. No SaaS dependency for core features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {powerfulFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
