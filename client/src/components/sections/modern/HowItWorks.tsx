import { Search, BarChart3, Eye, CheckCircle2 } from "lucide-react";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    id: 1,
    number: "01",
    title: "Detect",
    description: "Auto scan clusters and detect incidents",
    details:
      "Continuously monitors your Kubernetes clusters for common failure patterns including CrashLoopBackOff, OOMKilled, probe failures, and deployment issues.",
    icon: Search,
  },
  {
    id: 2,
    number: "02",
    title: "Diagnose",
    description: "Correlate logs, events, metrics, YAML diffs",
    details:
      "Gathers evidence from multiple sources—container logs, Kubernetes events, metrics, and recent YAML changes—to identify root causes with confidence scores.",
    icon: BarChart3,
  },
  {
    id: 3,
    number: "03",
    title: "Preview Fix",
    description: "Dry-run, impact analysis, confidence scores",
    details:
      "Shows exactly what will change before applying any fix. Includes impact assessment, rollback plan, and confidence scores to help you make informed decisions.",
    icon: Eye,
  },
  {
    id: 4,
    number: "04",
    title: "Apply Safely",
    description: "Human-in-loop approval with rollback",
    details:
      "You approve or reject every change. One-click rollback available. Every action requires explicit human confirmation—no blind automation.",
    icon: CheckCircle2,
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} aria-label="How it works">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Four Steps</span>{" "}
            <span className={styles.highlightAmber}>to Safe Incident Response</span>
          </h2>
          <p className={styles.subtitle}>
            From detection to resolution, KubeGraf guides you through every step with evidence and
            safety in mind
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className={styles.stepCard}
              >
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>{step.number}</div>
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

        {/* Interactive Visual Placeholder */}
        <div className={styles.visualPlaceholder}>
          <div className={styles.visualContainer}>
            <p className={styles.placeholderText}>
              [Interactive Visual: Step-by-step flow diagram showing the four-step process]
            </p>
            <p className={styles.placeholderSubtext}>
              Replace with interactive visual diagram or animation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
