import { motion } from "framer-motion";
import { Terminal, Globe, Lock, BarChart3, Code, Database } from "lucide-react";
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
  },
  {
    icon: Lock,
    title: "Open Source",
    description: "Audit the code, run it offline, modify it for your environment. Apache License 2.0.",
    badge: "Trust",
    color: "from-green-500/20 to-green-600/20"
  }
];

export default function PowerfulFeatures() {
  return (
    <section id="powerful-features" className="py-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Security & Trust</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Local-first architecture
          </h2>
          <p className="text-muted-foreground text-lg">
            Your credentials never leave your laptop. No telemetry required. No SaaS dependency for core features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {powerfulFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-white/10 bg-black/40 backdrop-blur h-full group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">{feature.badge}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
