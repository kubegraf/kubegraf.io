import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 md:py-32 relative z-10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 leading-tight tracking-tight">
              Designed for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Human Judgment</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              KubeGraf surfaces evidence and suggests fixes. You decide what to apply. No black-box automation. No blind changes to your cluster.
            </p>
            <ul className="space-y-4">
              {[
                "Runs on your laptop or inside your infrastructure",
                "No agents or sidecars required",
                "Uses your existing kubeconfig",
                "Read-only by default with explicit confirmation for changes"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-3 text-base font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-xl border border-border/50 bg-card/50 p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-mono text-primary font-semibold">INCIDENT DETECTED</span>
                </div>
                <div className="text-4xl font-mono font-bold mb-2">3</div>
                <div className="text-sm text-muted-foreground mb-6">CrashLoopBackOff</div>
                <div className="space-y-3">
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary/30 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary/30 rounded-full" style={{ width: '40%' }} />
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary/30 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
