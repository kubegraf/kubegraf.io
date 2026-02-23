import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, GitBranch, ClipboardList, Users, Key } from "lucide-react";
import styles from "./ProductionReady.module.css";
import WaitlistModal from "@/components/forms/WaitlistModal";

const features = [
  {
    id: 1,
    icon: GitBranch,
    title: "Multi-Cluster Management",
    description: "Investigate and remediate incidents across multiple clusters from a single interface. Switch context without losing your investigation thread.",
  },
  {
    id: 2,
    icon: ClipboardList,
    title: "Full Audit Trail",
    description: "Every analysis, recommendation, and applied fix is logged with timestamps and user context—ready for post-mortems and compliance reviews.",
  },
  {
    id: 3,
    icon: Key,
    title: "RBAC-Aware Operations",
    description: "Respects your cluster's RBAC policies. Suggested fixes adapt to what your user can actually apply, preventing permission errors at 3am.",
  },
  {
    id: 4,
    icon: Users,
    title: "Team Collaboration",
    description: "Assign incidents, annotate root causes, and share investigation context with your on-call team without leaving the tool.",
  },
];

export default function ProductionReady() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section className={styles.section} aria-label="Production ready">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Built for</span>{" "}
            <span className={styles.highlightAmber}>Engineering Teams</span>
          </h2>
          <p className={styles.subtitle}>
            Operational tooling designed around how real SRE teams work on Kubernetes—at scale, under pressure, with compliance requirements
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className={styles.featureCard}
              >
                <div className={styles.iconContainer}>
                  <IconComponent className={styles.icon} aria-hidden="true" />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.ctaContainer}>
          <Button
            size="lg"
            className={styles.ctaButton}
            onClick={() => setWaitlistOpen(true)}
            aria-label="Get started with free install"
          >
            Get Started – Free Install
            <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </section>
  );
}
