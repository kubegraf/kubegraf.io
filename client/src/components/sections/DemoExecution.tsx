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
    <section className="relative py-12 md:py-16 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-8 md:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2">
            See It In Action
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-2">
            Real output from a CrashLoopBackOff investigation.
            No edits. No marketing. Just evidence.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Same investigation, two interfaces
          </p>
        </div>

        {/* Single column on mobile, two columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Terminal UI */}
          <div>
            <div className="mb-3 md:mb-4 text-center px-2">
              <h3 className="text-base md:text-lg font-display font-semibold mb-1">Terminal UI</h3>
              <p className="text-xs text-muted-foreground">
                For SSH sessions and remote debugging
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
              <div className="p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm leading-relaxed max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto overflow-x-auto" role="log" aria-label="Demo execution output" tabIndex={0}>
            <pre className="text-foreground/80 whitespace-pre min-w-max">
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
            <div className="mb-3 md:mb-4 text-center px-2">
              <h3 className="text-base md:text-lg font-display font-semibold mb-1">Web Dashboard</h3>
              <p className="text-xs text-muted-foreground">
                Visual timeline, metrics graphs, evidence browser
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
            <div className="p-3 sm:p-4 md:p-6">
              {/* Mock browser chrome */}
              <div className="bg-muted/20 rounded-t-lg px-2 sm:px-3 md:px-4 py-2 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1 sm:gap-1.5">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center overflow-hidden">
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-mono truncate block">localhost:8080 - KubeGraf</span>
                </div>
              </div>

              {/* Web UI content */}
              <div className="bg-card/30 p-3 sm:p-4 md:p-6 rounded-b-lg space-y-4 sm:space-y-5 md:space-y-6 overflow-x-auto">
                {/* Incident header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-500 text-xl sm:text-2xl">⚠️</span>
                      <h4 className="text-base sm:text-lg font-semibold truncate">CrashLoopBackOff</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      checkout-api-7d9f4 · production · 14:23:18 UTC
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Confidence</div>
                    <div className="text-xl sm:text-2xl font-bold text-primary">94%</div>
                  </div>
                </div>

                {/* Timeline visualization */}
                <div className="border-l-2 border-primary/30 pl-3 sm:pl-4 space-y-3 sm:space-y-4">
                  <div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Evidence Collected</div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] sm:text-xs text-green-500 whitespace-nowrap">
                        Logs (3)
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] sm:text-xs text-green-500 whitespace-nowrap">
                        Events (12)
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] sm:text-xs text-green-500 whitespace-nowrap">
                        Metrics
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] sm:text-xs text-green-500 whitespace-nowrap">
                        Changes
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Root Cause</div>
                    <div className="text-xs sm:text-sm break-words">
                      <span className="text-red-400">OOMKilled</span> - memory limit exceeded (498Mi/512Mi = 97%)
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Proposed Fix</div>
                    <div className="bg-muted/20 border border-border/50 rounded p-2 sm:p-3 font-mono text-[10px] sm:text-xs overflow-x-auto">
                      <div className="flex items-start gap-2 min-w-max">
                        <span className="text-red-400">-</span>
                        <span className="text-red-400">memory: "512Mi"</span>
                      </div>
                      <div className="flex items-start gap-2 min-w-max">
                        <span className="text-green-500">+</span>
                        <span className="text-green-500">memory: "1Gi"</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-2">Impact</div>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                      <div className="bg-muted/20 rounded p-1.5 sm:p-2">
                        <div className="text-muted-foreground truncate">Pods</div>
                        <div className="font-semibold">3</div>
                      </div>
                      <div className="bg-muted/20 rounded p-1.5 sm:p-2">
                        <div className="text-muted-foreground truncate">Downtime</div>
                        <div className="font-semibold">~30s</div>
                      </div>
                      <div className="bg-muted/20 rounded p-1.5 sm:p-2">
                        <div className="text-muted-foreground truncate">Risk</div>
                        <div className="font-semibold text-green-500">LOW</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border/50">
                  <button className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded font-medium text-xs sm:text-sm hover:bg-primary/90 transition-colors">
                    Preview Fix
                  </button>
                  <button className="px-3 sm:px-4 py-2 border border-border/50 rounded text-xs sm:text-sm hover:bg-muted/20 transition-colors">
                    Save Report
                  </button>
                  <button className="px-3 sm:px-4 py-2 border border-border/50 rounded text-xs sm:text-sm hover:bg-muted/20 transition-colors">
                    Re-analyze
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border/50 px-3">
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
            Every diagnosis is backed by collected evidence. Every fix requires human approval.
          </p>
        </div>
      </div>
    </section>
  );
}
