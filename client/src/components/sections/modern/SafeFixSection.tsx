import { useState, useEffect } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./SafeFixSection.module.css";

const TOTAL_TICKS = 14;
const TICK_MS = 380;
const HOLD_MS = 2800;

const scenarios = [
  {
    id: "throttle-api-gateway",
    command: "kubegraf diagnose throttle-api-gateway",
    severity: "WARNING",
    isCritical: false,
    stat: { key: "P99 Latency", val: "4.2s" },
    namespace: "production",
    finding: "CPU throttling — requests.cpu too low",
    detail: "200m limit causes 78% throttle ratio under load",
    evidence: [
      "P99 response time up 8× in last 2h",
      "CPU throttle ratio: 78% over 30m window",
      "HPA at max replicas, cannot scale further",
    ],
    confidence: 89,
    fix: {
      descVerb: "Increase",
      descParam: "resources.requests.cpu",
      from: "200m",
      to: "500m",
      sub: "Raises CPU allocation to eliminate throttling under sustained load.",
      risk: "LOW",
      blastRadius: "1 deploy · 5 replicas",
      yaml: `  spec:
    containers:
      - name: api-gateway
        resources:
          requests:
-           cpu: 200m
+           cpu: 500m
          limits:
            cpu: "1"`,
    },
  },
  {
    id: "oom-checkout-api",
    command: "kubegraf diagnose oom-checkout-api",
    severity: "CRITICAL",
    isCritical: true,
    stat: { key: "OOMKills", val: "12" },
    namespace: "production",
    finding: "OOMKilled — memory limit exceeded",
    detail: "256Mi limit too low for traffic spike",
    evidence: [
      "12 OOMKill events in 30m window",
      "Node allocatable: 4Gi, pod limit: 256Mi",
      "Traffic up 3× since 14:20 UTC",
    ],
    confidence: 87,
    fix: {
      descVerb: "Increase",
      descParam: "resources.limits.memory",
      from: "256Mi",
      to: "512Mi",
      sub: "Doubles memory headroom to absorb traffic spikes without OOM.",
      risk: "LOW",
      blastRadius: "1 deploy · 2 replicas",
      yaml: `  spec:
    containers:
      - name: checkout-api
        resources:
          limits:
-           memory: 256Mi
+           memory: 512Mi
          requests:
            memory: 128Mi`,
    },
  },
  {
    id: "crashloop-auth-service",
    command: "kubegraf diagnose crashloop-auth-service",
    severity: "CRITICAL",
    isCritical: true,
    stat: { key: "CrashLoops", val: "47" },
    namespace: "auth",
    finding: "Missing ConfigMap mount",
    detail: "JWT_SECRET key absent from env source",
    evidence: [
      "47 CrashLoopBackOff events in 1h",
      "Env var JWT_SECRET unresolved at startup",
      "ConfigMap 'auth-config' missing key",
    ],
    confidence: 94,
    fix: {
      descVerb: "Add",
      descParam: "JWT_SECRET",
      from: "absent",
      to: "mounted",
      sub: "Injects the required JWT secret from the cluster Secret store.",
      risk: "MEDIUM",
      blastRadius: "1 deploy · 4 replicas",
      yaml: `  spec:
    containers:
      - name: auth-service
        env:
+         - name: JWT_SECRET
+           valueFrom:
+             secretKeyRef:
+               name: auth-secrets
+               key: jwt-secret`,
    },
  },
];

const features = [
  {
    icon: Eye,
    label: "Exact YAML diff preview",
    description: "See every line that changes — nothing hidden.",
  },
  {
    icon: AlertTriangle,
    label: "Blast radius analysis",
    description: "Scope of impact before you commit.",
  },
  {
    icon: RotateCcw,
    label: "One-command rollback",
    description: "Undo instantly if something goes wrong.",
  },
  {
    icon: CheckCircle2,
    label: "Human-in-loop approval",
    description: "Every change requires your explicit sign-off.",
  },
];

export default function SafeFixSection() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [tick, setTick] = useState(0);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (tick < TOTAL_TICKS) {
      timer = setTimeout(() => setTick((t) => t + 1), TICK_MS);
    } else {
      timer = setTimeout(() => {
        setScenarioIdx((s) => (s + 1) % scenarios.length);
        setTick(0);
        setApplied(false);
      }, HOLD_MS);
    }
    return () => clearTimeout(timer);
  }, [tick]);

  const sc = scenarios[scenarioIdx];
  const show = (lineIdx: number) => tick > lineIdx;
  const done = tick >= TOTAL_TICKS;

  const handleApply = () => {
    if (!applied) setApplied(true);
  };

  return (
    <section
      className={styles.section}
      id="safefix"
      aria-label="SafeFix — safe remediation with control"
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <ShieldCheck size={13} aria-hidden="true" />
            <span>SafeFix™</span>
          </div>
          <h2 className={styles.title}>
            Safe Remediation.{" "}
            <span className={styles.titleHighlight}>Human Control.</span>
          </h2>
          <p className={styles.subtitle}>
            When KubeGraf identifies root cause, it doesn't stop there. It generates a
            SafeFix™ recommendation — with confidence score, risk level, YAML diff preview,
            blast radius analysis, and one-command rollback. Every change requires your
            explicit approval.
          </p>
        </div>

        {/* Split Panel Demo */}
        <div className={styles.demoPanel}>
          {/* Left — Incident + RCA terminal */}
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.termDots}>
                <span className={styles.dot} style={{ background: "#ef4444" }} />
                <span className={styles.dot} style={{ background: "#f59e0b" }} />
                <span className={styles.dot} style={{ background: "#10b981" }} />
              </div>
              <span className={styles.termTitle}>kubegraf diagnose</span>
              <span className={styles.termLive} aria-hidden="true" />
            </div>

            <div className={styles.termBody}>
              {show(0) && (
                <div className={styles.termLine}>
                  <span className={styles.termPrompt}>$</span>
                  <span className={styles.termCmd}> {sc.command}</span>
                </div>
              )}

              {show(1) && <div className={styles.termSection}>INCIDENT</div>}
              {show(2) && (
                <div className={styles.termRow}>
                  <span className={styles.termKey}>ID:</span>
                  <span className={styles.termVal}>{sc.id}</span>
                </div>
              )}
              {show(3) && (
                <div className={styles.termRow}>
                  <span className={styles.termKey}>Severity:</span>
                  <span className={sc.isCritical ? styles.termCrit : styles.termWarn}>
                    {sc.severity}
                  </span>
                </div>
              )}
              {show(4) && (
                <div className={styles.termRow}>
                  <span className={styles.termKey}>{sc.stat.key}:</span>
                  <span className={sc.isCritical ? styles.termCrit : styles.termWarn}>
                    {sc.stat.val}
                  </span>
                </div>
              )}
              {show(5) && (
                <div className={styles.termRow}>
                  <span className={styles.termKey}>Namespace:</span>
                  <span className={styles.termVal}>{sc.namespace}</span>
                </div>
              )}

              {show(5) && <div className={styles.termSpacer} />}
              {show(6) && <div className={styles.termSection}>ROOT CAUSE</div>}
              {show(7) && (
                <div className={styles.termRow}>
                  <span className={styles.termKey}>Finding:</span>
                  <span className={styles.termInfo}>{sc.finding}</span>
                </div>
              )}
              {show(8) && (
                <div className={styles.termRow}>
                  <span className={styles.termKey}>Detail:</span>
                  <span className={styles.termVal}>{sc.detail}</span>
                </div>
              )}

              {show(8) && <div className={styles.termSpacer} />}
              {show(9) && <div className={styles.termSection}>EVIDENCE</div>}
              {show(10) && (
                <div className={styles.termEvidenceRow}>
                  <span className={styles.termBullet}>▸</span>
                  <span className={styles.termVal}>{sc.evidence[0]}</span>
                </div>
              )}
              {show(11) && (
                <div className={styles.termEvidenceRow}>
                  <span className={styles.termBullet}>▸</span>
                  <span className={styles.termVal}>{sc.evidence[1]}</span>
                </div>
              )}
              {show(12) && (
                <div className={styles.termEvidenceRow}>
                  <span className={styles.termBullet}>▸</span>
                  <span className={styles.termVal}>{sc.evidence[2]}</span>
                </div>
              )}

              {show(12) && <div className={styles.termSpacer} />}
              {show(13) && (
                <div className={styles.termConfidence}>
                  <span className={styles.termConfLabel}>Confidence</span>
                  <span className={styles.termConfBar}>
                    <span
                      className={styles.termConfFill}
                      style={{ width: done ? `${sc.confidence}%` : "0%" }}
                    />
                  </span>
                  <span className={styles.termConfPct}>{sc.confidence}%</span>
                </div>
              )}

              {!done && tick > 0 && (
                <span className={styles.cursor} aria-hidden="true">█</span>
              )}
            </div>
          </div>

          {/* Right — SafeFix recommendation card */}
          <div className={styles.fixCard} key={scenarioIdx}>
            <div className={styles.fixHeader}>
              <ShieldCheck size={20} className={styles.fixHeaderIcon} aria-hidden="true" />
              <span className={styles.fixHeaderLabel}>SafeFix™ Recommendation</span>
            </div>

            <div className={styles.fixBody}>
              {/* Fix description */}
              <div className={styles.fixDescription}>
                <p className={styles.fixDescTitle}>
                  {sc.fix.descVerb} <code>{sc.fix.descParam}</code>
                </p>
                <div className={styles.fixChange}>
                  <span className={styles.fixFrom}>{sc.fix.from}</span>
                  <ChevronRight size={14} className={styles.fixArrow} />
                  <span className={styles.fixTo}>{sc.fix.to}</span>
                </div>
                <p className={styles.fixDescSub}>{sc.fix.sub}</p>
              </div>

              {/* Risk / Blast radius badges */}
              <div className={styles.metaBadges}>
                <div className={styles.metaBadge}>
                  <span className={styles.metaKey}>Risk</span>
                  <span
                    className={
                      sc.fix.risk === "LOW"
                        ? styles.metaValLow
                        : sc.fix.risk === "MEDIUM"
                        ? styles.metaValMedium
                        : styles.metaVal
                    }
                  >
                    {sc.fix.risk}
                  </span>
                </div>
                <div className={styles.metaBadge}>
                  <span className={styles.metaKey}>Blast Radius</span>
                  <span className={styles.metaVal}>{sc.fix.blastRadius}</span>
                </div>
                <div className={styles.metaBadge}>
                  <span className={styles.metaKey}>Rollback</span>
                  <span className={styles.metaValReady}>Ready</span>
                </div>
              </div>

              {/* YAML Diff Preview — always visible */}
              <div className={styles.diffSection}>
                <div className={styles.diffLabel}>
                  <Eye size={13} aria-hidden="true" />
                  YAML Diff
                </div>
                <pre className={styles.diffCode}>
                  {sc.fix.yaml.split("\n").map((line, i) => {
                    const isAdded = line.trimStart().startsWith("+");
                    const isRemoved = line.trimStart().startsWith("-");
                    return (
                      <span
                        key={i}
                        className={
                          isAdded
                            ? styles.diffAdd
                            : isRemoved
                            ? styles.diffRemove
                            : styles.diffCtx
                        }
                      >
                        {line}
                        {"\n"}
                      </span>
                    );
                  })}
                </pre>
              </div>

              {/* Approval CTAs */}
              <div className={styles.fixActions}>
                {applied ? (
                  <div className={styles.appliedBadge}>
                    <CheckCircle2 size={16} />
                    <span>SafeFix™ applied — rollback ready</span>
                  </div>
                ) : (
                  <>
                    <Button
                      size="sm"
                      className={styles.applyBtn}
                      onClick={handleApply}
                      aria-label="Apply SafeFix™"
                    >
                      <CheckCircle2 size={14} aria-hidden="true" />
                      Apply SafeFix™
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={styles.rollbackBtn}
                      aria-label="Skip this fix"
                    >
                      <RotateCcw size={14} aria-hidden="true" />
                      Skip
                    </Button>
                  </>
                )}
              </div>

              <p className={styles.approvalNote}>
                You stay in control. Every change requires explicit approval.
              </p>
            </div>
          </div>
        </div>

        {/* Feature bullets */}
        <div className={styles.featureGrid}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <Icon size={16} aria-hidden="true" />
                </div>
                <div>
                  <p className={styles.featureLabel}>{f.label}</p>
                  <p className={styles.featureDesc}>{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
