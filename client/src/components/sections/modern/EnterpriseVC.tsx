import { motion } from "framer-motion";
import styles from "./EnterpriseVC.module.css";

const kpis = [
  {
    id: 1,
    metric: "50%",
    label: "Reduction in incident resolution time",
    description: "Teams using KubeGraf resolve Kubernetes incidents 50% faster on average.",
  },
  {
    id: 2,
    metric: "80%",
    label: "Prevention rate",
    description: "Predict and prevent downtime before it impacts users.",
  },
  {
    id: 3,
    metric: "3am",
    label: "Safe for critical incidents",
    description: "Built for production incidents when you need trust and evidence, not guesswork.",
  },
];

export default function EnterpriseVC() {
  return (
    <section className={styles.section} aria-label="Enterprise and VC focused section">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Built for Scale & Enterprise</h2>
          <p className={styles.subtitle}>
            KubeGraf delivers measurable ROI and is designed for enterprise Kubernetes environments
          </p>
        </motion.div>

        {/* KPIs */}
        <div className={styles.kpisGrid}>
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.kpiCard}
            >
              <div className={styles.kpiMetric}>{kpi.metric}</div>
              <h3 className={styles.kpiLabel}>{kpi.label}</h3>
              <p className={styles.kpiDescription}>{kpi.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={styles.testimonial}
        >
          <div className={styles.testimonialContent}>
            <p className={styles.testimonialQuote}>
              "KubeGraf transformed how we handle Kubernetes incidents. The evidence-backed
              diagnostics and safe fix previews give our team confidence during critical moments."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Early Adopter</span>
                <span className={styles.authorRole}>Platform Engineering Lead</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
