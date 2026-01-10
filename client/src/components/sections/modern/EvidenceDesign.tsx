import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Search, Activity, Terminal } from "lucide-react";
import styles from "./EvidenceDesign.module.css";

const evidencePoints = [
  {
    id: 1,
    title: "Confidence Scores",
    description: "Every diagnosis includes a confidence score based on evidence quality and correlation strength.",
    icon: BarChart3,
  },
  {
    id: 2,
    title: "Reproducible RCA",
    description: "Root cause analysis is backed by logs, events, and metrics that you can verify independently.",
    icon: Search,
  },
  {
    id: 3,
    title: "Multi-Source Correlation",
    description: "Correlates data from logs, events, metrics, and YAML diffs to build a complete picture.",
    icon: Activity,
  },
  {
    id: 4,
    title: "TUI + Web Dashboard",
    description: "View evidence in both terminal UI and web dashboard for different workflows and preferences.",
    icon: Terminal,
  },
];

export default function EvidenceDesign() {
  return (
    <section className={styles.section} aria-label="Evidence-driven design">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Every Diagnosis</span>{" "}
            <span className={styles.highlightAmber}>is Backed by Evidence</span>
          </h2>
          <p className={styles.subtitle}>
            KubeGraf provides transparent, verifiable diagnostics with confidence scores and
            reproducible root cause analysis
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.evidenceGrid}>
            {evidencePoints.map((point) => {
              const IconComponent = point.icon;
              return (
                <div
                  key={point.id}
                  className={styles.evidenceCard}
                >
                  <div className={styles.evidenceIcon}>
                    <IconComponent className={styles.iconLucide} aria-hidden="true" />
                  </div>
                  <h3 className={styles.evidenceTitle}>{point.title}</h3>
                  <p className={styles.evidenceDescription}>{point.description}</p>
                </div>
              );
            })}
          </div>

          {/* Visual Timeline */}
          <div className={styles.timelineContainer}>
            <h3 className={styles.timelineTitle}>Diagnosis Timeline</h3>
            <div className={styles.timelineVisual}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineLabel}>Incident Detected</span>
                  <span className={styles.timelineTime}>T+0</span>
                </div>
              </div>
              <div className={styles.timelineConnector}></div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineLabel}>RCA with Evidence</span>
                  <span className={styles.timelineTime}>T+2min</span>
                </div>
              </div>
              <div className={styles.timelineConnector}></div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineLabel}>Fix Applied</span>
                  <span className={styles.timelineTime}>T+5min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <Button
            size="lg"
            className={styles.ctaButton}
            onClick={() => (window.location.href = "/docs/quickstart.html")}
            aria-label="See KubeGraf in action"
          >
            See It In Action
            <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
