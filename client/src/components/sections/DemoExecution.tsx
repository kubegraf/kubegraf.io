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
    <section className="relative py-12 sm:py-16 lg:py-20 border-t border-border/50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-8 sm:mb-10 px-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
            See It In Action
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-2 leading-relaxed">
            Real incident detection and diagnosis in action.
            No edits. No marketing. Just evidence.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Same incident, two interfaces
          </p>
        </div>

        {/* Single column on mobile, two columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Terminal UI */}
          <div className="flex flex-col">
            <div className="mb-3 md:mb-4 text-center px-2">
              <h3 className="text-base md:text-lg font-display font-semibold mb-1">Terminal UI</h3>
              <p className="text-xs text-muted-foreground">
                For SSH sessions and remote debugging
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg flex-1">
              <div className="p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm leading-relaxed h-[500px] overflow-y-auto overflow-x-auto" role="log" aria-label="Demo execution output" tabIndex={0}>
            <pre className="text-foreground/80 whitespace-pre min-w-max">
{`$ kubegraf incidents show restarts-payments-api-service-7c9bd978bb-mp28c-app

Incident not found in database, scanning cluster...

`}<span className="text-amber-500">═══════════════════════════════════════════════════════════════════
INCIDENT DETAILS
═══════════════════════════════════════════════════════════════════</span>{`

ID:          restarts-payments-api-service-7c9bd978bb-mp28c-app
`}<span className="text-amber-500">Severity:    WARNING</span>{`
Started:     2025-12-21 19:10:40 GMT
Namespace:   secrets-test
Resource:    Pod/test-app-csi-7c9bd978bb-mp28c

Type:        high_restarts
`}<span className="text-amber-500">Summary:     Container app has restarted 268 times</span>{`
Count:       268

`}<span className="text-cyan-500">═══════════════════════════════════════════════════════════════════
INCIDENT SUMMARY
═══════════════════════════════════════════════════════════════════</span>{`

`}<span className="text-cyan-500">🔍 Investigation Steps:</span>{`
   1. Check container logs for error patterns
   2. Review recent pod events
   3. Check previous container logs (if crashed)
   4. Verify resource limits and requests
   5. Check for configuration issues

`}<span className="text-amber-500">⚠️  Common Causes:</span>{`
   • Application crashes due to bugs
   • Resource exhaustion (OOM, CPU)
   • Failed health checks
   • Configuration errors
   • Missing dependencies

`}<span className="text-green-500">💡 Potential Fixes:</span>{`
   • Increase resource limits
   • Fix application bugs
   • Adjust readiness/liveness probes
   • Fix configuration
   • Ensure dependencies are available

`}<span className="text-cyan-500">Collecting evidence...</span>{`

├─ Pod logs (last 10 entries)
│  [19:15:23] Error: Cannot connect to database
│  [19:15:20] Retrying connection... (attempt 3/3)
│  [19:15:17] Database connection timeout
│  [19:15:14] Error: Cannot connect to database
│
├─ Kubernetes events (last 30 minutes)
│  [19:15:25] Container app in pod test-app-csi-7c9bd978bb-mp28c restarted
│  [19:10:45] Back-off restarting failed container app
│  [19:10:40] Container app started
│
└─ Resource metrics
   CPU: 12m (1.2% of limit)
   Memory: 145Mi (28% of limit)
   → Resources not exhausted

`}<span className="text-green-500">Evidence correlation: Database connection failures aligned with restarts</span>{`
Confidence: 92%

`}<span className="text-amber-500">Root cause identified:</span>{`
  Database connection failures causing application crashes

`}<span className="text-cyan-500">Recommendation:</span>{`
  1. Verify database service is running and accessible
  2. Check database credentials in secrets
  3. Review network policies allowing pod-to-db traffic
  4. Consider increasing connection timeout
  5. Add retry logic with exponential backoff`}
            </pre>
              </div>
            </div>
          </div>

          {/* Web UI */}
          <div className="flex flex-col">
            <div className="mb-3 md:mb-4 text-center px-2">
              <h3 className="text-base md:text-lg font-display font-semibold mb-1">Web Dashboard</h3>
              <p className="text-xs text-muted-foreground">
                Visual timeline, metrics graphs, evidence browser
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg flex-1 flex flex-col">
              {/* Mock browser chrome */}
              <div className="bg-muted/20 px-2 sm:px-3 md:px-4 py-2 flex items-center gap-2 border-b border-border flex-shrink-0">
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
              <div className="bg-card/30 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 overflow-x-auto overflow-y-auto h-[460px]">
                {/* Incident header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-500 text-xl sm:text-2xl">⚠️</span>
                      <h4 className="text-base sm:text-lg font-semibold truncate">High Restarts</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      test-app-csi-7c9bd978bb-mp28c · secrets-test · 19:10:40 GMT
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Confidence</div>
                    <div className="text-xl sm:text-2xl font-bold text-primary">92%</div>
                  </div>
                </div>

                {/* Incident summary badge */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 sm:p-3">
                  <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Severity</div>
                  <div className="text-sm sm:text-base font-semibold text-amber-500">WARNING</div>
                  <div className="text-xs sm:text-sm text-foreground/80 mt-1">
                    Container app has restarted <span className="font-bold text-amber-500">268 times</span>
                  </div>
                </div>

                {/* Timeline visualization */}
                <div className="border-l-2 border-primary/30 pl-3 sm:pl-4 space-y-3 sm:space-y-4">
                  <div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Evidence Collected</div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] sm:text-xs text-green-500 whitespace-nowrap">
                        Logs (10)
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] sm:text-xs text-green-500 whitespace-nowrap">
                        Events (8)
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] sm:text-xs text-green-500 whitespace-nowrap">
                        Metrics
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Root Cause</div>
                    <div className="text-xs sm:text-sm break-words">
                      <span className="text-amber-400">Database connection failures</span> causing application crashes
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Investigation Steps</div>
                    <div className="bg-muted/20 border border-border/50 rounded p-2 sm:p-3 text-[10px] sm:text-xs space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-500">1.</span>
                        <span className="text-foreground/80">Check container logs for error patterns</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-500">2.</span>
                        <span className="text-foreground/80">Verify database service is running</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-500">3.</span>
                        <span className="text-foreground/80">Check database credentials in secrets</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-500">4.</span>
                        <span className="text-foreground/80">Review network policies</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-2">Resource Utilization</div>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                      <div className="bg-muted/20 rounded p-1.5 sm:p-2">
                        <div className="text-muted-foreground truncate">CPU</div>
                        <div className="font-semibold text-green-500">1.2%</div>
                      </div>
                      <div className="bg-muted/20 rounded p-1.5 sm:p-2">
                        <div className="text-muted-foreground truncate">Memory</div>
                        <div className="font-semibold text-green-500">28%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-border/50">
                  <button className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded font-medium text-xs sm:text-sm hover:bg-primary/90 transition-colors">
                    View Full Report
                  </button>
                  <button className="px-3 sm:px-4 py-2 border border-border/50 rounded text-xs sm:text-sm hover:bg-muted/20 transition-colors">
                    Export Logs
                  </button>
                  <button className="px-3 sm:px-4 py-2 border border-border/50 rounded text-xs sm:text-sm hover:bg-muted/20 transition-colors">
                    Re-analyze
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border/50 px-3">
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
            Every diagnosis is backed by collected evidence. Every fix requires human approval.
          </p>
        </div>
      </div>
    </section>
  );
}
