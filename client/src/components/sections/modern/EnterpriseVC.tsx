import { TrendingDown, ShieldCheck, Clock, Calculator, ArrowRight } from "lucide-react";
import styles from "./EnterpriseVC.module.css";

const kpis = [
  {
    id: 1,
    metric: "80%",
    label: "Faster MTTR",
    description: "Resolve Kubernetes incidents 80% faster with evidence-backed root cause analysis and guided safe fixes.",
    icon: TrendingDown,
  },
  {
    id: 2,
    metric: "33%",
    label: "Engineering time reclaimed",
    description: "Reduce firefighting overhead and give your team back the time to build instead of debug.",
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

        {/* ROI CTA — prominent link to /roi */}
        <div className={styles.roiCta}>
          <div className={styles.roiStats}>
            <div className={styles.roiStat}>
              <span className={styles.roiStatNum}>$624K</span>
              <span className={styles.roiStatLabel}>avg annual savings · 100-person team</span>
            </div>
            <span className={styles.roiDivider} aria-hidden="true" />
            <div className={styles.roiStat}>
              <span className={styles.roiStatNum}>80%</span>
              <span className={styles.roiStatLabel}>faster MTTR</span>
            </div>
            <span className={styles.roiDivider} aria-hidden="true" />
            <div className={styles.roiStat}>
              <span className={styles.roiStatNum}>3×</span>
              <span className={styles.roiStatLabel}>first-year ROI</span>
            </div>
          </div>

          <a href="/roi" className={styles.roiButton} aria-label="See full ROI analysis">
            <Calculator size={18} aria-hidden="true" />
            Calculate Your ROI
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

      </div>
    </section>
  );
}
