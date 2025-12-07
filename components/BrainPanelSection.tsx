"use client";

const bulletPoints = [
  "Timeline of incidents, warnings, and scaling events (24–72h).",
  "OOM detection and performance hotspots at a glance.",
  "Works with or without external AI — rule-based insights by default."
];

export function BrainPanelSection() {
  return (
    <section className="py-20" id="insights">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="relative space-y-5 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <p className="text-xs uppercase tracking-[0.4em] text-neon-cyan">Brain Panel</p>
            <h3 className="text-3xl font-semibold">Brain Panel: Your Local SRE Co-Pilot</h3>
            <p className="text-gray-300">
              Live, local intelligence surfaces correlated events, OOM warnings, and actionable summaries without
              sending data to the cloud.
            </p>
            <ul className="space-y-3 text-gray-200">
              {bulletPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="text-neon-cyan">⟠</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#030312] to-[#08091c] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">AI summary</p>
            <pre className="rounded-2xl bg-black/70 p-4 text-xs font-mono text-neon-cyan">
{`{
  "incident": "OOM spike detected",
  "cluster": "prod-us-west",
  "pod": "api-server",
  "recommendation": "Scale memory by +200Mi",
  "confidence": "93%"
}`}
            </pre>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
              JSON ready for automation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
