import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroSection} aria-label="Hero section">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={styles.textContent}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={styles.badge}
            >
              <span className={styles.badgeDot}></span>
              <span className={styles.badgeText}>AI-Powered Kubernetes Intelligence</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.headline}
            >
              <span className={styles.highlight}>Next‑Gen AI Brain</span>{" "}
              for Kubernetes Incident Intelligence
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={styles.subheadline}
            >
              Smart, evidence-driven Kubernetes incident intelligence. KubeGraf thinks like an
              SRE — providing insights and safe recommendations while you remain in control.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={styles.ctaGroup}
            >
              <Button
                size="lg"
                className={styles.primaryCTA}
                onClick={() => (window.location.href = "/docs/installation.html")}
                aria-label="Get started with KubeGraf"
              >
                Get Started
                <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={styles.secondaryCTA}
                onClick={() => (window.location.href = "/docs/installation.html")}
                aria-label="View installation guide"
              >
                Installation
                <Download className={styles.ctaIcon} aria-hidden="true" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={styles.trustIndicators}
            >
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>🔒</span>
                <span>Local-First</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>⚡</span>
                <span>Evidence-Driven</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>🛡️</span>
                <span>Human-in-Loop</span>
              </div>
            </motion.div>
            
            {/* Optional Micro-Text for Social Proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className={styles.socialProof}
            >
              Trusted by SREs | Designed for Enterprise & Local-First Deployments
            </motion.p>
          </motion.div>

          {/* Right Column - Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={styles.visualContent}
          >
            <div className={styles.demoContainer}>
              {/* Placeholder for Terminal UI + Web Dashboard GIF */}
              <div className={styles.demoPlaceholder}>
                <div className={styles.demoHeader}>
                  <div className={styles.demoButtons}>
                    <span className={styles.demoButton}></span>
                    <span className={styles.demoButton}></span>
                    <span className={styles.demoButton}></span>
                  </div>
                  <span className={styles.demoTitle}>KubeGraf Terminal UI + Web Dashboard</span>
                </div>
                <div className={styles.demoContent}>
                  {/* Placeholder for GIF showing: incident detection → dry-run → apply safely */}
                  <div className={styles.gifPlaceholder}>
                    <p className={styles.placeholderText}>
                      [GIF: Terminal UI showing incident detection → dry-run preview → safe apply]
                    </p>
                    <p className={styles.placeholderSubtext}>
                      Replace with actual Terminal UI + Web Dashboard demo GIF
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
