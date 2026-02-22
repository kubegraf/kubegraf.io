import { Search, BarChart3, Eye, CheckCircle2 } from "lucide-react";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    id: 1,
    title: "Detect Anomalies",
    description: "Real-time pattern recognition across clusters",
    details:
      "Identifies CrashLoopBackOff, OOMKills, probe failures, and deployment anomalies. Tracks restart patterns, resource pressure, and configuration drift.",
    icon: Search,
  },
  {
    id: 2,
    title: "Correlate Evidence",
    description: "Multi-source analysis with temporal correlation",
    details:
      "Correlates logs, Kubernetes events, metrics, traces, and recent deployments. Builds a timeline of what changed and when. Outputs reproducible evidence chains with confidence scores.",
    icon: BarChart3,
  },
  {
    id: 3,
    title: "Simulate Fixes",
    description: "Dry-run validation before any changes",
    details:
      "Generates kubectl apply --dry-run output. Shows exact YAML diffs, blast radius analysis, and potential side effects. No surprises.",
    icon: Eye,
  },
  {
    id: 4,
    title: "Execute with Control",
    description: "You approve, we execute, rollback ready",
    details:
      "Every change requires explicit approval. Full audit trail. One-command rollback. No black-box automation—you're always in control.",
    icon: CheckCircle2,
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} aria-label="How it works">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Incident → Root Cause</span>{" "}
            <span className={styles.highlightAmber}>→ SafeFix™ → Resolved</span>
          </h2>
          <p className={styles.subtitle}>
            Four deterministic steps. No guesswork. No manual grepping. KubeGraf works the incident so you can fix it — with evidence, confidence, and full control at every step.
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className={styles.stepCard}
              >
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepIcon} aria-hidden="true">
                    <IconComponent className={styles.iconSvg} />
                  </div>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                <div className={styles.stepDetails}>
                  <p>{step.details}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flow summary */}
        <div className={styles.flowSummary}>
          {["Detect", "Correlate", "Simulate", "Execute"].map((label, i, arr) => (
            <span key={label} className={styles.flowGroup}>
              <span className={styles.flowStep}>{label}</span>
              {i < arr.length - 1 && (
                <span className={styles.flowArrow} aria-hidden="true">→</span>
              )}
            </span>
          ))}
          <span className={styles.flowResolved}>· Resolved</span>
        </div>
      </div>
    </section>
  );
}
