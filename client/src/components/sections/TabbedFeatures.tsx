import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Globe,
  Search,
  Wrench,
  Shield,
  Database,
} from "lucide-react";

const features = [
  {
    id: "terminal",
    icon: Terminal,
    title: "Terminal UI",
    shortTitle: "Terminal",
    description: "A lightweight, keyboard-driven TUI perfect for SSH sessions and remote debugging. Navigate incidents with vim-like bindings.",
    bullets: [
      "Vim-style keyboard navigation",
      "Works over SSH connections",
      "Real-time log streaming",
      "Resource utilization at a glance",
    ],
    color: "from-cyan-500 to-blue-500",
    image: "/assets/screenshots/terminal-ui.png",
  },
  {
    id: "dashboard",
    icon: Globe,
    title: "Web Dashboard",
    shortTitle: "Dashboard",
    description: "A modern web interface with real-time updates, visual timelines, and interactive incident exploration.",
    bullets: [
      "Drag-and-drop timeline",
      "Real-time cluster updates",
      "Visual resource mapping",
      "Collaborative debugging",
    ],
    color: "from-purple-500 to-pink-500",
    image: "/assets/screenshots/web-dashboard.png",
  },
  {
    id: "detection",
    icon: Search,
    title: "Incident Detection",
    shortTitle: "Detection",
    description: "Automatically detect and classify Kubernetes incidents using intelligent pattern recognition and anomaly detection.",
    bullets: [
      "CrashLoopBackOff detection",
      "OOMKilled analysis",
      "Deployment rollout issues",
      "Resource constraint alerts",
    ],
    color: "from-orange-500 to-red-500",
    image: "/assets/screenshots/detection.png",
  },
  {
    id: "diagnosis",
    icon: Database,
    title: "Evidence Collection",
    shortTitle: "Evidence",
    description: "Automatically correlate logs, events, and metrics to build a complete picture of what went wrong.",
    bullets: [
      "Multi-source log aggregation",
      "Event timeline correlation",
      "Resource metric analysis",
      "Change tracking & diffing",
    ],
    color: "from-green-500 to-emerald-500",
    image: "/assets/screenshots/evidence.png",
  },
  {
    id: "fix",
    icon: Wrench,
    title: "Safe Fix Preview",
    shortTitle: "Fix Preview",
    description: "See exactly what changes will be made before applying any fix. Confidence scores help you make informed decisions.",
    bullets: [
      "Dry-run by default",
      "Visual diff of changes",
      "Risk assessment scores",
      "One-click rollback",
    ],
    color: "from-yellow-500 to-orange-500",
    image: "/assets/screenshots/fix-preview.png",
  },
  {
    id: "security",
    icon: Shield,
    title: "Local-First Security",
    shortTitle: "Security",
    description: "All data stays on your machine. No cloud dependency, no data sent to third parties, complete control.",
    bullets: [
      "Zero cloud dependencies",
      "No data exfiltration",
      "RBAC-aware operations",
      "Audit trail logging",
    ],
    color: "from-blue-500 to-indigo-500",
    image: "/assets/screenshots/security.png",
  },
];

const AUTO_ROTATE_INTERVAL = 6500; // 6.5 seconds like Portainer

export default function TabbedFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / AUTO_ROTATE_INTERVAL) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setActiveIndex((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    };

    progressRef.current = setInterval(updateProgress, 50);

    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [activeIndex, isPaused]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const activeFeature = features[activeIndex];

  return (
    <section id="features" className="relative py-12 sm:py-16 lg:py-20 border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight"
          >
            Everything you need for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">
              incident response
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Powerful features designed for modern Kubernetes debugging workflows
          </motion.p>
        </div>

        {/* Tab navigation */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => handleTabClick(index)}
              className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                index === activeIndex
                  ? "text-foreground bg-card border border-border shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <feature.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{feature.shortTitle}</span>
              </span>

              {/* Progress bar for active tab */}
              {index === activeIndex && !isPaused && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted rounded-b-lg overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Feature content */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center"
            >
              {/* Text content */}
              <div className="order-2 lg:order-1">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${activeFeature.color} bg-opacity-10 mb-5`}>
                  <activeFeature.icon className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">{activeFeature.title}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight">
                  {activeFeature.title}
                </h3>

                <p className="text-lg sm:text-xl text-muted-foreground mb-5 leading-relaxed">
                  {activeFeature.description}
                </p>

                <ul className="space-y-3">
                  {activeFeature.bullets.map((bullet, i) => (
                    <motion.li
                      key={bullet}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${activeFeature.color}`} />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Visual content - placeholder for screenshots */}
              <div className="order-1 lg:order-2">
                <div className={`relative rounded-2xl bg-gradient-to-br ${activeFeature.color} p-0.5 shadow-2xl`}>
                  <div className="bg-card rounded-2xl p-6 min-h-[280px] lg:min-h-[360px] flex items-center justify-center">
                    {/* Terminal-style preview */}
                    <div className="w-full bg-background rounded-lg border border-border overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">
                          {activeFeature.shortTitle.toLowerCase()}
                        </span>
                      </div>
                      <div className="p-4 font-mono text-sm">
                        <div className="text-green-500">$ kubegraf {activeFeature.id}</div>
                        <div className="text-muted-foreground mt-2">
                          {activeFeature.id === "terminal" && (
                            <>
                              <div>┌────────────────────────────────────┐</div>
                              <div>│ KubeGraf Terminal UI v1.0         │</div>
                              <div>│ Connected: prod-cluster           │</div>
                              <div>│ Incidents: 3 active               │</div>
                              <div>└────────────────────────────────────┘</div>
                            </>
                          )}
                          {activeFeature.id === "dashboard" && (
                            <>
                              <div className="text-cyan-500">Starting web server...</div>
                              <div className="text-muted-foreground">→ Dashboard: http://localhost:8080</div>
                              <div className="text-green-500 mt-1">✓ Ready for connections</div>
                            </>
                          )}
                          {activeFeature.id === "detection" && (
                            <>
                              <div className="text-yellow-500">⚠ CrashLoopBackOff detected</div>
                              <div className="text-muted-foreground ml-2">Pod: api-server-7x9a2</div>
                              <div className="text-muted-foreground ml-2">Restarts: 5 in last 10m</div>
                              <div className="text-cyan-500 mt-1">→ Running diagnosis...</div>
                            </>
                          )}
                          {activeFeature.id === "diagnosis" && (
                            <>
                              <div className="text-cyan-500">Collecting evidence...</div>
                              <div className="text-muted-foreground ml-2">├─ Pod logs (3 sources)</div>
                              <div className="text-muted-foreground ml-2">├─ Events (12 found)</div>
                              <div className="text-muted-foreground ml-2">└─ Metrics (memory spike)</div>
                            </>
                          )}
                          {activeFeature.id === "fix" && (
                            <>
                              <div className="text-green-500">✓ Fix available</div>
                              <div className="text-muted-foreground ml-2">memory: 512Mi → 1Gi</div>
                              <div className="text-muted-foreground ml-2">confidence: 94%</div>
                              <div className="text-yellow-500 mt-1">? Apply fix? [dry-run]</div>
                            </>
                          )}
                          {activeFeature.id === "security" && (
                            <>
                              <div className="text-green-500">✓ Local-only mode active</div>
                              <div className="text-muted-foreground ml-2">No external connections</div>
                              <div className="text-muted-foreground ml-2">Data stored locally</div>
                              <div className="text-muted-foreground ml-2">RBAC: cluster-admin</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
