import { Search, BarChart3, Eye, TestTube2, Building2, Lock } from "lucide-react";
import styles from "./CoreFeatures.module.css";

const features = [
  {
    id: 1,
    title: "Multi-Source Correlation",
    description: "Correlates logs, metrics, traces, Kubernetes events, and deployment changes in real-time. No manual grepping across tools.",
    icon: BarChart3,
    hoverDescription: "Unified correlation layer that understands temporal relationships between signals across your entire stack.",
  },
  {
    id: 2,
    title: "Evidence-Based Root Cause Analysis",
    description: "Presents facts, not guesses. Every diagnosis is backed by evidence with confidence scores and reproducible analysis paths.",
    icon: Search,
    hoverDescription: "AI-driven analysis that shows its work—traces back through logs, events, and metrics to identify the root cause.",
  },
  {
    id: 3,
    title: "Dry-Run Validation Before Execution",
    description: "Simulates every fix before applying it. See the exact YAML diff, impact analysis, and blast radius.",
    icon: Eye,
    hoverDescription: "Zero-risk preview with kubectl diff integration. Know exactly what changes before you commit.",
  },
  {
    id: 4,
    title: "Thinks Like an SRE",
    description: "Trained on real incident patterns. Recommends fixes based on proven remediation strategies, not generic suggestions.",
    icon: TestTube2,
    hoverDescription: "Decision intelligence that understands context—deployment timing, resource constraints, and failure patterns.",
  },
  {
    id: 5,
    title: "Enterprise-Grade Security",
    description: "Zero data exfiltration. All analysis runs locally. RBAC-aware, audit-logged, compliance-ready.",
    icon: Lock,
    hoverDescription: "Local-first architecture. Your cluster data never leaves your environment. Full RBAC integration.",
  },
  {
    id: 6,
    title: "Production-Ready at Scale",
    description: "Multi-cluster support, team workflows, audit trails. Built for organizations with compliance requirements.",
    icon: Building2,
    hoverDescription: "Battle-tested in production environments. Handles thousands of pods across multiple clusters.",
  },
];

interface CoreFeaturesProps {
  id?: string;
}

export default function CoreFeatures({ id }: CoreFeaturesProps) {
  return (
    <section id={id} className={styles.section} aria-label="Core features">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Decision Intelligence,</span>{" "}
            <span className={styles.highlightAmber}>Not Just Observability</span>
          </h2>
          <p className={styles.subtitle}>
            KubeGraf goes beyond monitoring. It correlates, analyzes, and recommends—so you can fix incidents faster with confidence.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className={styles.card}
              >
                <div className={styles.iconContainer}>
                  <IconComponent className={styles.icon} aria-hidden="true" />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
                <div className={styles.hoverContent}>
                  <p className={styles.hoverDescription}>{feature.hoverDescription}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
