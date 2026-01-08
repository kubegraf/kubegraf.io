import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users, Play } from "lucide-react";
import styles from "./CTASectionModern.module.css";

export default function CTASectionModern() {
  return (
    <section className={styles.section} aria-label="Call to action">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.content}
        >
          <div className={styles.textContent}>
            <h2 className={styles.title}>Ready to Get Started?</h2>
            <p className={styles.subtitle}>
              Join teams using KubeGraf for evidence-driven incident resolution. Get started free
              or request a demo.
            </p>

            <div className={styles.ctaGroup}>
              <Button
                size="lg"
                className={styles.primaryCTA}
                onClick={() => (window.location.href = "/docs/installation.html")}
                aria-label="Get started with free install"
              >
                <Download className={styles.ctaIcon} aria-hidden="true" />
                Get Started – Free Install
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={styles.secondaryCTA}
                onClick={() => (window.location.href = "mailto:contact@kubegraf.io?subject=Enterprise Demo Request")}
                aria-label="Request demo or enterprise information"
              >
                <Play className={styles.ctaIcon} aria-hidden="true" />
                Request Demo / Enterprise
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={styles.tertiaryCTA}
                onClick={() => (window.open("https://github.com/kubegraf/kubegraf/discussions", "_blank"))}
                aria-label="Join early access or community"
              >
                <Users className={styles.ctaIcon} aria-hidden="true" />
                Join Early Access / Community
              </Button>
            </div>

            <div className={styles.trustMessage}>
              <p className={styles.trustText}>
                Trust, safety, and evidence-driven decisions. That's what KubeGraf delivers.
              </p>
            </div>
          </div>

          {/* Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={styles.visualContent}
          >
            <div className={styles.visualPlaceholder}>
              <div className={styles.placeholderHeader}>
                <div className={styles.placeholderButtons}>
                  <span className={styles.placeholderButton}></span>
                  <span className={styles.placeholderButton}></span>
                  <span className={styles.placeholderButton}></span>
                </div>
                <span className={styles.placeholderTitle}>Terminal UI / Web Dashboard</span>
              </div>
              <div className={styles.placeholderContent}>
                <p className={styles.placeholderText}>
                  [Visual: Terminal UI / Web Dashboard showing KubeGraf in action]
                </p>
                <p className={styles.placeholderSubtext}>
                  Replace with actual Terminal UI or Web Dashboard screenshot/GIF
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
