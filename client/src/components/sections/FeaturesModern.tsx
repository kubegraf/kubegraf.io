import { motion } from "framer-motion";
import {
  Shield,
  Brain,
  Network,
  Terminal,
  Globe,
  FileCode,
  Database,
  Zap,
  GitBranch
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const whyFeatures = [
  {
    icon: Shield,
    title: "Local-First Architecture",
    description: "Runs on your laptop or in-cluster. No data sent to third parties. Complete control over your incident data.",
    badge: "Security",
    badgeColor: "bg-green-500/10 text-green-500 border-green-500/20"
  },
  {
    icon: Brain,
    title: "Incident Intelligence",
    description: "AI-powered root cause analysis with evidence-backed fixes. Understand what went wrong and how to fix it safely.",
    badge: "AI-Powered",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20"
  },
  {
    icon: Network,
    title: "Multi-Cluster Support",
    description: "Manage incidents across dev, staging, and production from one place. Context-switch without losing track.",
    badge: "Enterprise",
    badgeColor: "bg-primary/10 text-primary border-primary/20"
  }
];

const keyFeatures = [
  {
    icon: Terminal,
    title: "Terminal UI",
    description: "Lightweight TUI perfect for SSH sessions and remote debugging"
  },
  {
    icon: Globe,
    title: "Web Dashboard",
    description: "Modern web interface with real-time updates and visual timelines"
  },
  {
    icon: FileCode,
    title: "Evidence Collection",
    description: "Automatic log, event, and metric correlation for faster diagnosis"
  },
  {
    icon: Database,
    title: "Knowledge Bank",
    description: "Learn from past incidents with searchable history and patterns"
  },
  {
    icon: Zap,
    title: "Safe Fix Previews",
    description: "See what changes before applying anything to your cluster"
  },
  {
    icon: GitBranch,
    title: "Developer Mode",
    description: "JSON output for CI/CD integration and automation workflows"
  }
];

export default function FeaturesModern() {
  const isMobile = useIsMobile();

  // Motion props - disabled on mobile for performance
  const fadeInView = isMobile
    ? {}
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };

  return (
    <>
      {/* Why KubēGraf Section */}
      <section id="features" className="relative py-16 md:py-20 lg:py-24 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            {...fadeInView}
            transition={isMobile ? undefined : { duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              Why KubēGraf?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for teams who value security, intelligence, and control over their infrastructure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                {...fadeInView}
                transition={isMobile ? undefined : { duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium mb-4 ${feature.badgeColor}">
                    {feature.badge}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-semibold mb-3">
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

      {/* Key Features Section */}
      <section className="relative py-16 md:py-20 lg:py-24 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            {...fadeInView}
            transition={isMobile ? undefined : { duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for modern Kubernetes incident response
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                {...fadeInView}
                transition={isMobile ? undefined : { duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="h-full p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <feature.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
