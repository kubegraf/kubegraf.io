import { LayoutDashboard, Brain, XCircle, CheckCircle2 } from "lucide-react";
import styles from "./WhatIsAISRE.module.css";

const traditional = [
  "Shows you dashboards",
  "Fires generic alerts",
  "Leaves root cause to you",
  "No context on what changed",
];

const kubegraf = [
  "Tells you what broke",
  "Tells you why it broke",
  "Shows what changed before it broke",
  "Recommends the safest fix",
];

export default function WhatIsAISRE() {
  return (
    <section className={styles.section} aria-label="What is an AI SRE Platform">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Brain size={13} aria-hidden="true" />
            <span>AI SRE Platform — Explained</span>
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleMuted}>Traditional tools</span>
            <br />
            show you{" "}
            <span className={styles.titleStrike}>dashboards.</span>
            <br />
            <span className={styles.titleHighlight}>KubeGraf</span> tells you{" "}
            <span className={styles.titleAccent}>what to do.</span>
          </h2>
          <p className={styles.subtitle}>
            An AI SRE platform doesn't just surface telemetry. It understands incidents,
            replaces manual runbook automation with AI-driven diagnosis, and guides remediation
            with evidence and confidence scoring — like having a senior SRE on-call automation
            running 24/7.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className={styles.compareGrid}>
          {/* Traditional Tools */}
          <div className={styles.cardNeg}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapNeg}>
                <LayoutDashboard size={18} aria-hidden="true" />
              </div>
              <span className={styles.cardLabelNeg}>Monitoring / Alerting Tools</span>
            </div>
            <ul className={styles.list}>
              {traditional.map((item) => (
                <li key={item} className={styles.listItemNeg}>
                  <XCircle size={15} className={styles.iconNeg} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider arrow */}
          <div className={styles.vsWrapper} aria-hidden="true">
            <div className={styles.vsArrow}>→</div>
            <span className={styles.vsLabel}>vs</span>
          </div>

          {/* KubeGraf */}
          <div className={styles.cardPos}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapPos}>
                <Brain size={18} aria-hidden="true" />
              </div>
              <span className={styles.cardLabelPos}>KubeGraf — AI SRE Platform</span>
            </div>
            <ul className={styles.list}>
              {kubegraf.map((item) => (
                <li key={item} className={styles.listItemPos}>
                  <CheckCircle2 size={15} className={styles.iconPos} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Definition callout */}
        <div className={styles.definition}>
          <div className={styles.definitionInner}>
            <span className={styles.definitionLabel}>Definition</span>
            <p className={styles.definitionText}>
              <strong>AI SRE Platform</strong> — Software that acts as an on-call site
              reliability engineer: detecting anomalies, correlating multi-source signals,
              explaining root cause with evidence, and recommending validated fixes with a
              human always in the loop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
