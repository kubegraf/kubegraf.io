import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap } from "lucide-react";

import { motion } from "framer-motion";
import { Brain, Zap, Check } from "lucide-react";

export default function BrainPanelDetailed() {
  return (
    <section className="py-24 md:py-32 relative z-10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            Evidence-backed <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Diagnosis</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            KubeGraf correlates events, logs, and changes to explain incidents with supporting evidence—not guesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Root Cause Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-full p-8 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display group-hover:text-primary transition-colors">
                Root Cause Analysis
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                When an incident is detected, KubeGraf builds a complete picture by correlating multiple data sources.
              </p>
              <ul className="space-y-3">
                {[
                  "Recent events and container logs",
                  "Error patterns (exit codes, OOM signals, probe failures)",
                  "Recent changes to deployments, configs, and secrets"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Safe Fix Previews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-full p-8 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display group-hover:text-primary transition-colors">
                Safe Fix Previews
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For resolvable incidents, KubeGraf suggests fixes and shows exactly what will change before you apply anything.
              </p>
              <ul className="space-y-3">
                {[
                  "Dry-run validation with kubectl before execution",
                  "One-click rollback if fix doesn't resolve the issue",
                  "Read-only mode by default—changes require confirmation"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
