import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, CheckCircle, Zap } from "lucide-react";
import styles from "./ProductionReady.module.css";

const features = [
  {
    id: 1,
    icon: Shield,
    title: "Local-First Design",
    description: "Safe for 3am incidents. All data stays on your machine.",
  },
  {
    id: 2,
    icon: CheckCircle,
    title: "Evidence-Backed Recommendations",
    description: "Every suggestion is backed by logs, events, and metrics.",
  },
  {
    id: 3,
    icon: Zap,
    title: "Human-in-Loop",
    description: "You approve or reject every change. No blind automation.",
  },
  {
    id: 4,
    icon: Lock,
    title: "Dry-Run & Rollback Support",
    description: "Preview changes before applying. One-click rollback available.",
  },
];

export default function ProductionReady() {
  return (
    <section className={styles.section} aria-label="Production ready">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>
            <span className={styles.highlight}>Production-Ready</span>{" "}
            <span className={styles.highlightAmber}>& Trusted</span>
          </h2>
          <p className={styles.subtitle}>
            Built for engineers who need trust, safety, and control during critical moments
          </p>
        </motion.div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.featureCard}
              >
                <div className={styles.iconContainer}>
                  <IconComponent className={styles.icon} aria-hidden="true" />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={styles.licenseSection}
        >
          <div className={styles.licenseCard}>
            <p className={styles.licenseDescription}>
              Open source, no SaaS lock-in. Use KubeGraf in production with confidence.
            </p>
          </div>
        </motion.div>

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
            onClick={() => (window.location.href = "/docs/installation.html")}
            aria-label="Get started with free install"
          >
            Get Started – Free Install
            <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
