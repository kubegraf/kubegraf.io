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
    <section id="features" className="py-24 md:py-32 relative z-10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Clean and Simple */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Incident Response</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Fast root cause analysis during incidents—without introducing new dependencies or SaaS requirements.
          </p>
        </motion.div>

        {/* Features Grid - Ultra Clean Cards like Render/Supabase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.08,
                duration: 0.5,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                {/* Icon - Simple and Clean */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
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
