import { CheckCircle2 } from "lucide-react";
import WaitlistForm from "@/components/forms/WaitlistForm";
import styles from "./EarlyAccessSection.module.css";

const benefits = [
  "Early feature access before public release",
  "Powered by OrkaAI — Orkastor's multi-model reasoning engine",
  "Shape the roadmap — your incidents influence what we build next",
  "First access to every new SafeFix™ pattern and diagnostic capability as we ship",
];

export default function EarlyAccessSection() {
  return (
    <section className={styles.section} id="early-access" aria-label="Early access signup">
      <div className={styles.bgAccent} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left — headline + benefits + social proof */}
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>Early Access — Limited Spots</span>
          </div>

          <h2 className={styles.title}>
            Be the first to{" "}
            <span className={styles.titleHighlight}>transform</span>{" "}
            how your team handles Kubernetes incidents.
          </h2>

          <ul className={styles.benefits}>
            {benefits.map((b, i) => (
              <li key={i} className={styles.benefitItem}>
                <CheckCircle2 className={styles.benefitIcon} aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className={styles.socialStrip}>
            <span className={styles.socialItem}>
              <span className={styles.socialNum}>500+</span> on the waitlist
            </span>
            <span className={styles.socialDivider} aria-hidden="true" />
            <span className={styles.socialItem}>
              Beta <span className={styles.socialNum}>Q2 2025</span>
            </span>
            <span className={styles.socialDivider} aria-hidden="true" />
            <span className={styles.socialItem}>
              <span className={styles.socialNum}>$0</span> to get started
            </span>
          </div>
        </div>

        {/* Right — form card */}
        <div className={styles.right}>
          <div className={styles.formCard}>
            <WaitlistForm size="lg" placeholder="you@company.com" />
            <p className={styles.privacyNote}>
              No spam, ever. Unsubscribe anytime.{" "}
              <a href="/privacy" className={styles.privacyLink}>Privacy policy</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
