import { motion } from "framer-motion";
import { Search, Database, Wrench, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Detect",
    description: "KubeGraf watches your cluster and automatically detects incidents like CrashLoopBackOff, OOMKilled, and failed deployments.",
  },
  {
    number: "02",
    icon: Database,
    title: "Diagnose",
    description: "Evidence is collected from multiple sources—logs, events, metrics, recent changes—and correlated to identify the root cause.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Preview Fix",
    description: "See exactly what changes will be made before applying any fix. Includes impact assessment, rollback plan, and confidence score.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Apply Safely",
    description: "You approve or reject. One-click rollback available. Every action requires human confirmation—no blind automation.",
  },
];

export default function Workflow() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 1.6rem + 2vw, 3.5rem)' }}
            className="font-mono font-bold mb-4 leading-tight"
          >
            <span className="text-foreground/90">How </span>
            <span className="text-primary">it</span>
            <span className="text-foreground/90"> </span>
            <span className="text-amber-500">works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-foreground/85 max-w-2xl mx-auto leading-relaxed"
          >
            From incident detection to safe remediation in four steps
          </motion.p>
        </div>

        {/* Workflow steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
