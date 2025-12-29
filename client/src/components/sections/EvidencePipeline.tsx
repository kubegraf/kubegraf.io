import { Database, GitCompare, FileSearch, GitPullRequest } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Evidence Collection",
    items: [
      "Logs (stderr, container, init)",
      "Events (K8s API server)",
      "Metrics (memory, CPU, restarts)",
      "Config (recent deployments, updates)",
      "All timestamped, stored locally"
    ]
  },
  {
    icon: GitCompare,
    title: "Correlation Engine",
    items: [
      "Temporal alignment (what happened when)",
      "Causal inference (what caused what)",
      "Pattern matching (known failure modes)",
      "Output: ranked hypotheses with confidence"
    ]
  },
  {
    icon: FileSearch,
    title: "Diagnosis",
    items: [
      "System explains in plain language",
      "Cites evidence for each claim",
      "Shows confidence level per finding",
      "No guessing, no hallucination"
    ]
  },
  {
    icon: GitPullRequest,
    title: "Fix Preview",
    items: [
      "Shows exact YAML diff",
      "Estimates impact (pods affected, downtime)",
      "Risk score (low/medium/high)",
      "Rollback plan included"
    ]
  }
];

export default function EvidencePipeline() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 border-t border-border/50 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            How Diagnosis Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Evidence-driven process from data collection to safe remediation
          </p>
        </div>

        {/* Pipeline visualization - desktop */}
        <div className="hidden md:flex items-center justify-center gap-6 mb-16">
          {steps.map((step, idx) => (
            <div key={step.title} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-card border-2 border-border/50 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground mt-3 font-semibold max-w-[120px] text-center">
                  {step.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-16 h-px bg-border" />
                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-border">
                    <path d="M0 6 L8 6 L5 3 M8 6 L5 9" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.title} className="relative">
              <div className="h-full p-6 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 transition-colors">
                {/* Icon - mobile only */}
                <div className="md:hidden w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-display font-semibold mb-4">
                  {step.title}
                </h3>

                <ul className="space-y-2">
                  {step.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Key principle */}
        <div className="mt-12 text-center">
          <p className="text-sm text-secondary-foreground/70 font-mono max-w-2xl mx-auto">
            Deterministic, reproducible, evidence-backed. Every step can be inspected.
          </p>
        </div>
      </div>
    </section>
  );
}
