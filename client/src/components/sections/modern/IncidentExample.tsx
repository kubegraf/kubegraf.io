import { Terminal, ShieldCheck } from "lucide-react";
import styles from "./IncidentExample.module.css";

const incidentLines = [
  { type: "section", text: "═══════════════════════════════════════════════════" },
  { type: "section", text: "INCIDENT DETAILS" },
  { type: "section", text: "═══════════════════════════════════════════════════" },
  { type: "row", key: "ID:", val: "restarts-payments-api-service", valType: "val" },
  { type: "row", key: "Severity:", val: "WARNING", valType: "warn" },
  { type: "row", key: "Started:", val: "2025-12-21 19:10:40 GMT", valType: "val" },
  { type: "row", key: "Namespace:", val: "production", valType: "val" },
  { type: "row", key: "Resource:", val: "Pod/payments-api-7c9bd978bb-mp28c", valType: "val" },
  { type: "blank", text: "" },
  { type: "row", key: "Type:", val: "high_restarts", valType: "val" },
  { type: "row", key: "Summary:", val: "Container app has restarted 268 times", valType: "warn" },
  { type: "blank", text: "" },
  { type: "success", text: "🔍 Investigation Steps:" },
  { type: "bullet", text: "  1. Check container logs for LivenessProbe failures" },
  { type: "bullet", text: "  2. Review recent deployments (3h ago)" },
  { type: "bullet", text: "  3. Analyse resource limits vs actual usage" },
  { type: "bullet", text: "  4. Inspect YAML diff from last deploy" },
  { type: "blank", text: "" },
  { type: "info", text: "Recommendation: Increase initialDelaySeconds 5 → 20" },
  { type: "confidence", text: "Confidence: 91%  |  Risk: LOW  |  Rollback: Ready" },
];

export default function IncidentExample() {
  return (
    <section
      className={styles.section}
      aria-label="Real incident example"
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Terminal size={13} aria-hidden="true" />
            <span>Real Incident Example</span>
          </div>
          <h2 className={styles.title}>
            No Dashboards.{" "}
            <span className={styles.titleHighlight}>Just Clarity.</span>
          </h2>
          <p className={styles.subtitle}>
            This is what KubeGraf returns when you run{" "}
            <code className={styles.inlineCode}>kubegraf diagnose</code>. Clear root
            cause, evidence, and a ready-to-apply SafeFix™ — in one command.
          </p>
        </div>

        {/* Terminal card */}
        <div className={styles.card}>
          {/* Window chrome */}
          <div className={styles.cardHeader}>
            <div className={styles.dots}>
              <span className={styles.dot} style={{ background: "#ef4444" }} />
              <span className={styles.dot} style={{ background: "#f59e0b" }} />
              <span className={styles.dot} style={{ background: "#10b981" }} />
            </div>
            <span className={styles.cardTitle}>kubegraf — zsh</span>
            <span className={styles.cardBadge}>payments-api</span>
          </div>

          {/* Terminal body */}
          <div className={styles.cardBody}>
            <div className={styles.termLine}>
              <span className={styles.prompt}>$</span>
              <span className={styles.cmd}> kubegraf diagnose restarts-payments-api</span>
            </div>

            {incidentLines.map((line, i) => {
              if (line.type === "blank") {
                return <div key={i} className={styles.blank} />;
              }
              if (line.type === "section") {
                return (
                  <div key={i} className={styles.sectionLine}>
                    {line.text}
                  </div>
                );
              }
              if (line.type === "row") {
                return (
                  <div key={i} className={styles.rowLine}>
                    <span className={styles.rowKey}>{line.key}</span>
                    <span
                      className={
                        line.valType === "warn" ? styles.rowValWarn : styles.rowVal
                      }
                    >
                      {line.val}
                    </span>
                  </div>
                );
              }
              if (line.type === "success") {
                return (
                  <div key={i} className={styles.successLine}>
                    {line.text}
                  </div>
                );
              }
              if (line.type === "bullet") {
                return (
                  <div key={i} className={styles.bulletLine}>
                    {line.text}
                  </div>
                );
              }
              if (line.type === "info") {
                return (
                  <div key={i} className={styles.infoLine}>
                    {line.text}
                  </div>
                );
              }
              if (line.type === "confidence") {
                return (
                  <div key={i} className={styles.confidenceLine}>
                    <ShieldCheck size={13} aria-hidden="true" />
                    <span>{line.text}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Outcome callout */}
        <div className={styles.outcomes}>
          <div className={styles.outcomeItem}>
            <span className={styles.outcomeNum}>T+0</span>
            <span className={styles.outcomeLbl}>Incident detected</span>
          </div>
          <div className={styles.outcomeDivider} aria-hidden="true">→</div>
          <div className={styles.outcomeItem}>
            <span className={styles.outcomeNum}>T+2 min</span>
            <span className={styles.outcomeLbl}>Root cause with evidence</span>
          </div>
          <div className={styles.outcomeDivider} aria-hidden="true">→</div>
          <div className={styles.outcomeItem}>
            <span className={styles.outcomeNum}>T+5 min</span>
            <span className={styles.outcomeLbl}>SafeFix applied &amp; resolved</span>
          </div>
        </div>
      </div>
    </section>
  );
}
