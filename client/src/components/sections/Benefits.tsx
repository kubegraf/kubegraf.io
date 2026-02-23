import { motion } from "framer-motion";
import { Shield, Search, Wrench, Zap, Lock, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";

const benefits = [
  {
    icon: Zap,
    title: "Detect Incidents",
    description: "Pattern recognition identifies CrashLoopBackOff, OOMKilled, and deployment failures before escalation.",
    gradientLight: "from-cyan-100 to-blue-100",
    gradientDark: "from-cyan-500/10 to-blue-500/10",
    iconBg: "bg-cyan-500/20 dark:bg-cyan-500/15",
    iconColor: "text-cyan-700 dark:text-cyan-400",
  },
  {
    icon: Search,
    title: "Diagnose with Evidence",
    description: "Correlates logs, events, and metrics to explain why incidents happen—with confidence scores.",
    gradientLight: "from-purple-100 to-pink-100",
    gradientDark: "from-purple-500/10 to-pink-500/10",
    iconBg: "bg-purple-500/20 dark:bg-purple-500/15",
    iconColor: "text-purple-700 dark:text-purple-400",
  },
  {
    icon: Wrench,
    title: "Preview Fixes Safely",
    description: "See exactly what changes will be made. Dry-run by default, one-click rollback.",
    gradientLight: "from-amber-100 to-orange-100",
    gradientDark: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-500/20 dark:bg-amber-500/15",
    iconColor: "text-amber-700 dark:text-amber-400",
  },
  {
    icon: Lock,
    title: "Runs Locally",
    description: "All data stays on your laptop or cluster. No cloud dependency, no data exfiltration.",
    gradientLight: "from-green-100 to-emerald-100",
    gradientDark: "from-green-500/10 to-emerald-500/10",
    iconBg: "bg-green-500/20 dark:bg-green-500/15",
    iconColor: "text-green-700 dark:text-green-400",
  },
  {
    icon: Shield,
    title: "No Lock-In",
    description: "Apache 2.0 license. Works with any Kubernetes cluster. No mandatory SaaS.",
    gradientLight: "from-indigo-100 to-violet-100",
    gradientDark: "from-indigo-500/10 to-violet-500/10",
    iconBg: "bg-indigo-500/20 dark:bg-indigo-500/15",
    iconColor: "text-indigo-700 dark:text-indigo-400",
  },
  {
    icon: GitBranch,
    title: "Production-Ready",
    description: "Built for 3am incidents. Shows evidence, requires human approval for every change.",
    gradientLight: "from-rose-100 to-red-100",
    gradientDark: "from-rose-500/10 to-red-500/10",
    iconBg: "bg-rose-500/20 dark:bg-rose-500/15",
    iconColor: "text-rose-700 dark:text-rose-400",
  },
];

export default function Benefits() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(theme === 'dark' || (!theme && prefersDark));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

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
              className={`bg-gradient-to-br ${isDark ? benefit.gradientDark : benefit.gradientLight} border border-border/50 rounded-xl p-6 hover:border-border transition-all duration-300 hover:shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-lg ${benefit.iconBg} flex items-center justify-center mb-4`}>
                <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
              </div>
              <h3 className="text-lg font-display font-semibold mb-3 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
