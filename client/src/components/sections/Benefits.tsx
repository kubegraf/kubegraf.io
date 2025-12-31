import { motion } from "framer-motion";
import { Shield, Search, Wrench, Zap, Lock, GitBranch } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Detect Incidents Automatically",
    description: "Intelligent pattern recognition identifies CrashLoopBackOff, OOMKilled, and deployment issues before they escalate.",
  },
  {
    icon: Search,
    title: "Evidence-Backed Diagnosis",
    description: "System correlates logs, events, and metrics to explain exactly why incidents happen—with confidence scores.",
  },
  {
    icon: Wrench,
    title: "Safe Fix Previews",
    description: "See exactly what changes will be made before applying any fix. Dry-run by default, one-click rollback.",
  },
  {
    icon: Lock,
    title: "Runs Locally",
    description: "All data stays on your laptop or inside your cluster. No cloud dependency, no data exfiltration.",
  },
  {
    icon: Shield,
    title: "No Vendor Lock-In",
    description: "Open source, Apache 2.0. Works with any Kubernetes cluster. No mandatory SaaS, no telemetry.",
  },
  {
    icon: GitBranch,
    title: "Built for Production",
    description: "Designed for 3am incidents. Shows evidence, cites sources, requires human approval for every change.",
  },
];

export default function Benefits() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 1.6rem + 2vw, 3.5rem)' }}
            className="font-mono font-bold mb-4 leading-tight"
          >
            <span className="text-foreground/90">Built for </span>
            <span className="text-amber-500">incident</span>
            <span className="text-foreground/90"> </span>
            <span className="text-primary">response</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-foreground/85 max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to detect, diagnose, and safely fix Kubernetes incidents
          </motion.p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
