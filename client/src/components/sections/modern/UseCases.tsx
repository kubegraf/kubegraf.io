import { AlertCircle, Zap, Database, Settings, Activity } from "lucide-react";
import styles from "./UseCases.module.css";

const useCases = [
  {
    id: 1,
    title: "CrashLoopBackOff Fix & Kubernetes Incident Remediation",
    description:
      "Automatically diagnose CrashLoopBackOff causes — OOM kills, failed probes, bad config mounts, or missing secrets — and deliver a SafeFix™ with dry-run validation before applying.",
    impact: "Reduces CrashLoopBackOff MTTR from hours to minutes",
    icon: AlertCircle,
  },
  {
    id: 2,
    title: "OOMKilled Remediation & Memory Limit Tuning",
    description:
      "Detect OOMKilled pods, analyze actual memory usage vs. configured limits, and recommend precise resource limit adjustments backed by historical Prometheus metrics.",
    impact: "Eliminates recurring OOMKilled incidents with evidence-based fixes",
    icon: Zap,
  },
  {
    id: 3,
    title: "Prometheus Alert Automation & Kubernetes Alert Management",
    description:
      "Correlate Prometheus alerts with Kubernetes events, deployment changes, and pod logs to automatically triage alert storms, eliminate false positives, and route to the right fix.",
    impact: "Cuts alert fatigue and automates incident response from first signal",
    icon: Activity,
  },
  {
    id: 4,
    title: "Kubernetes Deployment Rollback Automation",
    description:
      "Detect failed rollouts caused by bad images, misconfigurations, or resource constraints. Automatically trigger a safe rollback with full audit trail and pre-rollback dry-run.",
    impact: "Automated rollback in seconds — no manual kubectl intervention needed",
    icon: Settings,
  },
  {
    id: 5,
    title: "Kubernetes Observability AI: Root Cause from Logs, Metrics & Traces",
    description:
      "Correlate OpenTelemetry traces, distributed tracing spans, Grafana metrics, and Kubernetes events into a single root cause chain — so you never manually grep across five tools again.",
    impact: "Full-stack root cause analysis in one view, not five dashboards",
    icon: Database,
  },
];

export default function UseCases() {
  return (
    <section className={styles.section} aria-label="Use cases">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Automated Kubernetes</span>{" "}
            <span className={styles.highlightAmber}>Incident Remediation</span>
          </h2>
          <p className={styles.subtitle}>
            From CrashLoopBackOff to OOMKilled to deployment rollbacks — KubeGraf diagnoses and remediates the most common Kubernetes incidents automatically
          </p>
        </div>

        <div className={styles.timelineContainer}>
          {/* Visual Timeline */}
          <div className={styles.timelineVisual}>
            <div className={styles.timelineStep}>
              <div className={styles.timelineDot}></div>
              <span className={styles.timelineLabel}>Incident</span>
            </div>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineStep}>
              <div className={styles.timelineDot}></div>
              <span className={styles.timelineLabel}>RCA</span>
            </div>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineStep}>
              <div className={styles.timelineDot}></div>
              <span className={styles.timelineLabel}>Safe Fix</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {useCases.map((useCase) => {
            const IconComponent = useCase.icon;
            return (
              <div
                key={useCase.id}
                className={styles.card}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <IconComponent className={styles.cardIcon} aria-hidden="true" />
                  </div>
                  <h3 className={styles.cardTitle}>{useCase.title}</h3>
                </div>
                <p className={styles.cardDescription}>{useCase.description}</p>
                <div className={styles.impact}>
                  <span className={styles.impactLabel}>Impact:</span>
                  <span className={styles.impactText}>{useCase.impact}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
