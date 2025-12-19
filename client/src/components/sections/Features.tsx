import { motion } from "framer-motion";
import { Cpu, Globe, Lock, Workflow, Zap, Box } from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Incident Detection",
    description: "Monitors for CrashLoopBackOff, OOMKilled, restart storms, probe failures, and pending pods."
  },
  {
    icon: Globe,
    title: "Multi-Cluster Support",
    description: "Switch between clusters instantly. Unified incident view across all your Kubernetes environments."
  },
  {
    icon: Cpu,
    title: "Evidence-Based Diagnosis",
    description: "Correlates events, logs, and resource state to explain what failed and why."
  },
  {
    icon: Lock,
    title: "Local-First Security",
    description: "Your credentials and incident history stay on your machine. No telemetry uploads required."
  },
  {
    icon: Box,
    title: "Knowledge Bank",
    description: "Every diagnosis stored locally in SQLite. Search past incidents by pod, namespace, or error type."
  },
  {
    icon: Zap,
    title: "Safe Fix Previews",
    description: "Dry-run validation and one-click rollback before applying any changes to your cluster."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Built for <span className="text-gradient-primary">Incident Response</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Fast root cause analysis during incidents—without introducing new dependencies or SaaS requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 font-display group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
