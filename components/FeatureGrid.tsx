"use client";

const features = [
  {
    title: "AI Control Plane",
    text: "Brain Panel analyzes 24–72h of events, OOMs, scaling anomalies, and surfaces next steps."
  },
  {
    title: "Three Interfaces, One Brain",
    text: "Terminal, Web Dashboard, and Modern SPA stay in sync via a global store and live cache."
  },
  {
    title: "Local-First & Private",
    text: "~15MB binary, runs on your laptop. Works offline, behind VPNs, and in air-gapped environments."
  },
  {
    title: "GitOps Native",
    text: "Designed for ArgoCD and Flux. See drift, sync status, and reconcile from one view."
  }
];

export function FeatureGrid() {
  return (
    <section id="brain" className="py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.6em] text-gray-400">Why KubeGraf</p>
          <h2 className="text-3xl font-semibold text-white">Four powerful pillars</h2>
          <p className="text-gray-400">
            AI-native diagnostics, synchronized interfaces, privacy-first operations, and GitOps readiness.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative space-y-3 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.75)] transition hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-neon-cyan">{feature.title}</p>
              <p className="text-gray-200">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
