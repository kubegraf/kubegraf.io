/**
 * DemoExecution - Single canonical demonstration
 *
 * Shows real execution output from a CrashLoopBackOff investigation.
 * Both TUI (terminal) and Web UI shown.
 * No animations, no interactivity, no marketing.
 * Just evidence-backed incident intelligence.
 */

export default function DemoExecution() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
            See It In Action
          </h2>
          <p className="text-muted-foreground mb-2">
            Real output from a CrashLoopBackOff investigation.
            No edits. No marketing. Just evidence.
          </p>
          <p className="text-sm text-muted-foreground">
            Same investigation, two interfaces
          </p>
        </div>

        {/* Two-column layout: TUI and Web UI side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Terminal UI */}
          <div>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-display font-semibold mb-1">Terminal UI</h3>
              <p className="text-xs text-muted-foreground">
                For SSH sessions and remote debugging
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
              <div className="p-6 font-mono text-sm leading-relaxed max-h-[600px] overflow-y-auto" role="log" aria-label="Demo execution output">
            <pre className="text-foreground/80 whitespace-pre-wrap">
{`$ kubegraf watch --cluster prod-eu-1

[14:23:18 UTC] `}<span className="text-amber-500">⚠️  Incident detected</span>{`
  Pod: checkout-api-7d9f4
  Namespace: production
  Status: CrashLoopBackOff
  Restart count: 5 (last 8 minutes)
  Cluster: prod-eu-1

Triggering investigation...

Collecting evidence...

├─ Pod logs (stderr, last 3 restarts)
│  `}<span className="text-red-400">[14:22:41] fatal error: runtime: out of memory</span>{`
│  `}<span className="text-red-400">[14:21:15] fatal error: runtime: out of memory</span>{`
│  `}<span className="text-red-400">[14:19:52] fatal error: runtime: out of memory</span>{`
│
├─ Kubernetes events (last 10 minutes)
│  [14:22:43] Pod/checkout-api-7d9f4: OOMKilled (limit: 512Mi)
│  [14:21:17] Pod/checkout-api-7d9f4: OOMKilled (limit: 512Mi)
│  [14:19:54] Pod/checkout-api-7d9f4: OOMKilled (limit: 512Mi)
│
├─ Resource metrics (memory usage)
│  Peak: 498Mi (97% of limit)
│  Average: 485Mi (95% of limit)
│  Trend: stable high usage (no spike)
│
└─ Recent changes (last 1 hour)
   [13:45:12] Deployment/checkout-api updated
   Image: checkout:v2.8.3 → v2.8.4
   Memory limit: unchanged (512Mi)

Evidence correlation: 3 sources aligned
Confidence: 94%

Root cause identified:
  OOMKilled - container memory limit exceeded

Evidence:
  1. Pod logs: "runtime: out of memory" (3 consecutive restarts)
  2. K8s events: OOMKilled exit code (3 occurrences)
  3. Metrics: 97% memory utilization (498Mi/512Mi)
  4. Pattern: stable high usage, not transient spike

Correlation confidence: 94%

Likely trigger:
  Deployment v2.8.4 (deployed 38 minutes ago)
  Memory usage pattern consistent before/after
  → Limit was already too low, new version exposed it

Recommendation:
  Increase memory limit: 512Mi → 1Gi
  Based on: current usage (498Mi) + 100% headroom

Safe fix available:

Proposed change (dry-run):
───────────────────────────────────────────
apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout-api
  namespace: production
spec:
  template:
    spec:
      containers:
      - name: checkout
        resources:
          limits:
`}<span className="text-red-400">-           memory: "512Mi"</span>{`
`}<span className="text-green-500">+           memory: "1Gi"</span>{`
          requests:
`}<span className="text-red-400">-           memory: "512Mi"</span>{`
`}<span className="text-green-500">+           memory: "1Gi"</span>{`
───────────────────────────────────────────

Impact assessment:
  Pods affected: 3 replicas
  Expected downtime: ~30 seconds (rolling restart)
  Risk level: LOW

Rollback plan:
  kubectl rollout undo deployment/checkout-api -n production
  (available for 10 revisions)

Dry-run: no changes applied yet

`}<span className="text-cyan-500">? Apply this fix to production? (y/N) _</span>{`

  [y] Apply now (rolling restart)
  [N] Cancel (default)
  [d] Save diff to file
  [r] Re-analyze`}
            </pre>
              </div>
            </div>
          </div>

          {/* Web UI */}
          <div>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-display font-semibold mb-1">Web Dashboard</h3>
              <p className="text-xs text-muted-foreground">
                Visual timeline, metrics graphs, evidence browser
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              {/* Mock browser chrome */}
              <div className="bg-muted/20 rounded-t-lg px-4 py-2 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground font-mono">localhost:8080 - KubeGraf</span>
                </div>
              </div>

              {/* Web UI content */}
              <div className="bg-card/30 p-6 rounded-b-lg space-y-6">
                {/* Incident header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-500 text-2xl">⚠️</span>
                      <h4 className="text-lg font-semibold">CrashLoopBackOff</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      checkout-api-7d9f4 · production · 14:23:18 UTC
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                    <div className="text-2xl font-bold text-primary">94%</div>
                  </div>
                </div>

                {/* Timeline visualization */}
                <div className="border-l-2 border-primary/30 pl-4 space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Evidence Collected</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-500">
                        Logs (3 sources)
                      </span>
                      <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-500">
                        Events (12)
                      </span>
                      <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-500">
                        Metrics
                      </span>
                      <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-500">
                        Recent changes
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Root Cause</div>
                    <div className="text-sm">
                      <span className="text-red-400">OOMKilled</span> - memory limit exceeded (498Mi/512Mi = 97%)
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Proposed Fix</div>
                    <div className="bg-muted/20 border border-border/50 rounded p-3 font-mono text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400">-</span>
                        <span className="text-red-400">memory: "512Mi"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500">+</span>
                        <span className="text-green-500">memory: "1Gi"</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Impact</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-muted/20 rounded p-2">
                        <div className="text-muted-foreground">Pods</div>
                        <div className="font-semibold">3</div>
                      </div>
                      <div className="bg-muted/20 rounded p-2">
                        <div className="text-muted-foreground">Downtime</div>
                        <div className="font-semibold">~30s</div>
                      </div>
                      <div className="bg-muted/20 rounded p-2">
                        <div className="text-muted-foreground">Risk</div>
                        <div className="font-semibold text-green-500">LOW</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium text-sm hover:bg-primary/90 transition-colors">
                    Preview Fix
                  </button>
                  <button className="px-4 py-2 border border-border/50 rounded text-sm hover:bg-muted/20 transition-colors">
                    Save Report
                  </button>
                  <button className="px-4 py-2 border border-border/50 rounded text-sm hover:bg-muted/20 transition-colors">
                    Re-analyze
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Every diagnosis is backed by collected evidence. Every fix requires human approval.
          </p>
        </div>
      </div>
    </section>
  );
}
