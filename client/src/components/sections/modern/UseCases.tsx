import { motion } from "framer-motion";
import { AlertCircle, Zap, Database, Settings, Activity } from "lucide-react";
import styles from "./UseCases.module.css";

const useCases = [
  {
    id: 1,
    title: "PreStop / terminationGracePeriod Conflicts",
    description:
      "Identify and resolve conflicts between PreStop hooks and termination grace periods that cause pod termination issues.",
    impact: "Prevents unexpected pod terminations during deployments",
    icon: AlertCircle,
  },
  {
    id: 2,
    title: "Spot Node Preemption Pod Restarts",
    description:
      "Detect and handle pod restarts caused by spot instance preemptions in cloud environments.",
    impact: "Reduces downtime from unexpected node terminations",
    icon: Zap,
  },
  {
    id: 3,
    title: "Database Connection Failures During Deployment",
    description:
      "Identify connection pool exhaustion and database connectivity issues that occur during rolling updates.",
    impact: "Prevents application failures during deployments",
    icon: Database,
  },
  {
    id: 4,
    title: "Missing Environment Variables / Pod Anti-Affinity Misconfigurations",
    description:
      "Detect missing required environment variables and incorrect pod anti-affinity rules causing scheduling failures.",
    impact: "Ensures proper pod scheduling and configuration",
    icon: Settings,
  },
  {
    id: 5,
    title: "Resource Exhaustion and Failed Health Checks",
    description:
      "Identify CPU/memory exhaustion and health check failures that prevent pods from becoming ready.",
    impact: "Prevents cascading failures and improves reliability",
    icon: Activity,
  },
];

export default function UseCases() {
  return (
    <section className={styles.section} aria-label="Use cases">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>
            <span className={styles.highlight}>Solve Real</span>{" "}
            <span className={styles.highlightAmber}>Kubernetes Problems</span>
          </h2>
          <p className={styles.subtitle}>
            KubeGraf helps you diagnose and fix the most common production Kubernetes incidents
          </p>
        </motion.div>

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
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
