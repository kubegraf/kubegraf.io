import { motion } from "framer-motion";
import { Search, Microscope, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Detect",
    description: "Auto-discover unhealthy resources across all your clusters in real-time"
  },
  {
    number: "02",
    icon: Microscope,
    title: "Diagnose",
    description: "AI explains why it failed with correlated logs, events, and timeline analysis"
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Decide",
    description: "Review safe fix previews. Apply or rollback with confidence using one command"
  }
];

export default function HowItWorks() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 border-t border-border/50 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps from incident to resolution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection lines - hidden on mobile */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Step Content */}
              <div className="text-center">
                {/* Icon Circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 mb-6">
                  <step.icon className="w-7 h-7 text-primary" />
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{step.number}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/docs/quickstart.html"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            See it in action
            <span className="text-xl">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
