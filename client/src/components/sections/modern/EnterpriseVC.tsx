import { TrendingDown, ShieldCheck, Clock } from "lucide-react";
import styles from "./EnterpriseVC.module.css";

const kpis = [
  {
    id: 1,
    metric: "50%",
    label: "Reduction in incident resolution time",
    description: "Teams using KubeGraf resolve Kubernetes incidents 50% faster on average.",
    icon: TrendingDown,
  },
  {
    id: 2,
    metric: "80%",
    label: "Prevention rate",
    description: "Predict and prevent downtime before it impacts users.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    metric: "3am",
    label: "Safe for critical incidents",
    description: "Built for production incidents when you need trust and evidence, not guesswork.",
    icon: Clock,
  },
];

export default function EnterpriseVC() {
  return (
    <section className={styles.section} aria-label="Enterprise and VC focused section">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Built for Scale</span>{" "}
            <span className={styles.highlightAmber}>& Enterprise</span>
          </h2>
          <p className={styles.subtitle}>
            KubeGraf delivers measurable ROI and is designed for enterprise Kubernetes environments
          </p>
        </div>

        {/* KPIs */}
        <div className={styles.kpisGrid}>
          {kpis.map((kpi) => {
            const IconComponent = kpi.icon;
            return (
              <div
                key={kpi.id}
                className={styles.kpiCard}
              >
                <div className={styles.kpiHeader}>
                  <div className={styles.kpiMetric}>{kpi.metric}</div>
                  <IconComponent className={styles.kpiIcon} aria-hidden="true" />
                </div>
                <h3 className={styles.kpiLabel}>{kpi.label}</h3>
                <p className={styles.kpiDescription}>{kpi.description}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonial */}
        <div className={styles.testimonial}>
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
        </div>

      </div>
    </section>
  );
}
