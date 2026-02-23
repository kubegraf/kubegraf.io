import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Search, Terminal, Fingerprint } from "lucide-react";
import styles from "./EvidenceDesign.module.css";
import WaitlistModal from "@/components/forms/WaitlistModal";

const evidencePoints = [
  {
    id: 1,
    title: "Confidence Scores",
    description: "Every diagnosis includes a confidence score based on evidence quality and correlation strength. Know how certain KubeGraf is before you act.",
    icon: BarChart3,
  },
  {
    id: 2,
    title: "Reproducible RCA",
    description: "Root cause analysis is backed by logs, events, and metrics that you can verify independently. Full reasoning chain, not a black box.",
    icon: Search,
  },
  {
    id: 3,
    title: "Anomaly Fingerprinting",
    description: "Detects recurring failure patterns and builds fingerprints to auto-recognize similar incidents, cutting diagnosis time on repeat failures.",
    icon: Fingerprint,
  },
  {
    id: 4,
    title: "TUI + Web Dashboard",
    description: "View evidence in both terminal UI and web dashboard. Use the TUI during incidents; use the dashboard for post-mortems and trend analysis.",
    icon: Terminal,
  },
];

export default function EvidenceDesign() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

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

        <div className={styles.evidenceGrid}>
          {evidencePoints.map((point) => {
            const IconComponent = point.icon;
            return (
              <div key={point.id} className={styles.evidenceCard}>
                <div className={styles.evidenceIcon}>
                  <IconComponent className={styles.iconLucide} aria-hidden="true" />
                </div>
                <h3 className={styles.evidenceTitle}>{point.title}</h3>
                <p className={styles.evidenceDescription}>{point.description}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.ctaContainer}>
          <Button
            size="lg"
            className={styles.ctaButton}
            onClick={() => setWaitlistOpen(true)}
            aria-label="See KubeGraf in action"
          >
            See It In Action
            <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </section>
  );
}
