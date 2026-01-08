import { motion } from "framer-motion";
import styles from "./CoreFeatures.module.css";

// TODO: Replace with actual SVG icons from /assets/icons/
const features = [
  {
    id: 1,
    title: "Detect Incidents",
    description: "Automatically scans your clusters to identify CrashLoopBackOff, OOMKilled, probe failures, and deployment issues.",
    icon: "🔍", // Replace with SVG icon
    hoverDescription: "Real-time monitoring with pattern recognition for common Kubernetes failure modes.",
  },
  {
    id: 2,
    title: "Diagnose with Evidence",
    description: "Correlates logs, events, metrics, and YAML diffs to provide evidence-backed root cause analysis.",
    icon: "📊", // Replace with SVG icon
    hoverDescription: "Multi-source correlation with confidence scores and reproducible diagnostics.",
  },
  {
    id: 3,
    title: "Preview Fix Safely",
    description: "Dry-run validation shows exactly what will change before applying any fix, with impact analysis.",
    icon: "👁️", // Replace with SVG icon
    hoverDescription: "See the diff, understand the impact, and make informed decisions with confidence scores.",
  },
  {
    id: 4,
    title: "Safe Dev Environment Testing",
    description: "Test fixes in isolated environments before applying to production clusters.",
    icon: "🧪", // Replace with SVG icon
    hoverDescription: "Safe testing environment for validating fixes without production risk.",
  },
  {
    id: 5,
    title: "Scalable & Team-Friendly",
    description: "Built for production with multi-cluster support, RBAC integration, and audit logging.",
    icon: "🏢", // Replace with SVG icon
    hoverDescription: "Scalable architecture designed for teams and enterprise Kubernetes environments.",
  },
  {
    id: 6,
    title: "Local-First & Secure",
    description: "All data stays on your machine. No cloud dependency, no data exfiltration, complete control.",
    icon: "🔒", // Replace with SVG icon
    hoverDescription: "Zero-trust architecture with local-first design. Your cluster data never leaves your environment.",
  },
];

export default function CoreFeatures() {
  return (
    <section className={styles.section} aria-label="Core features">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Core Capabilities</h2>
          <p className={styles.subtitle}>
            Everything you need to detect, diagnose, and safely fix Kubernetes incidents
          </p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.card}
            >
              <div className={styles.iconContainer}>
                <span className={styles.icon} aria-hidden="true">
                  {feature.icon}
                </span>
                {/* TODO: Replace icon span with <IconComponent className={styles.iconSvg} /> */}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
              <div className={styles.hoverContent}>
                <p className={styles.hoverDescription}>{feature.hoverDescription}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
