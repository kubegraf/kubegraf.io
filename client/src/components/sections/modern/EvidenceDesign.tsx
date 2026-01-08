import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import styles from "./EvidenceDesign.module.css";

const evidencePoints = [
  {
    id: 1,
    title: "Confidence Scores",
    description: "Every diagnosis includes a confidence score based on evidence quality and correlation strength.",
  },
  {
    id: 2,
    title: "Reproducible RCA",
    description: "Root cause analysis is backed by logs, events, and metrics that you can verify independently.",
  },
  {
    id: 3,
    title: "Multi-Source Correlation",
    description: "Correlates data from logs, events, metrics, and YAML diffs to build a complete picture.",
  },
  {
    id: 4,
    title: "TUI + Web Dashboard",
    description: "View evidence in both terminal UI and web dashboard for different workflows and preferences.",
  },
];

export default function EvidenceDesign() {
  return (
    <section className={styles.section} aria-label="Evidence-driven design">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>
            Every Diagnosis is Backed by Evidence, Not Magic
          </h2>
          <p className={styles.subtitle}>
            KubeGraf provides transparent, verifiable diagnostics with confidence scores and
            reproducible root cause analysis
          </p>
        </motion.div>

        <div className={styles.content}>
          <div className={styles.evidenceGrid}>
            {evidencePoints.map((point, index) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.evidenceCard}
              >
                <div className={styles.evidenceIcon}>
                  <span className={styles.iconDot}></span>
                </div>
                <h3 className={styles.evidenceTitle}>{point.title}</h3>
                <p className={styles.evidenceDescription}>{point.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Visual Timeline Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.timelineContainer}
          >
            <h3 className={styles.timelineTitle}>Visual Timeline</h3>
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
            <p className={styles.timelinePlaceholder}>
              [Visual Timeline: incident → RCA → applied fixes]
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={styles.ctaContainer}
        >
          <Button
            size="lg"
            className={styles.ctaButton}
            onClick={() => (window.location.href = "/docs/quickstart.html")}
            aria-label="See KubeGraf in action"
          >
            See It In Action
            <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
