import { motion } from "framer-motion";
import { BarChart3, Clock, FileJson } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const brainFeatures = [
  {
    icon: BarChart3,
    title: "Change Intelligence",
    description: "Shows what changed before an incident—deployments, configs, secrets—to identify potential causes."
  },
  {
    icon: Clock,
    title: "Searchable History",
    description: "Every diagnosis saved locally. Search past incidents by pod name, namespace, error type, or fix applied."
  },
  {
    icon: FileJson,
    title: "Export for Postmortems",
    description: "Export incident reports with correlated events and root cause analysis for team sharing."
  }
];

export default function BrainPanel() {
  return (
    <section id="brain-panel" className="py-24 md:py-32 relative z-10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            Learn from <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Every Incident</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Local incident storage with full event history, change tracking, and searchable diagnosis records. No data leaves your machine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {brainFeatures.map((feature, index) => (
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
