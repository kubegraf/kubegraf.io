const anchors = [
  {
    title: "Runs on your laptop",
    statements: [
      "No data leaves cluster",
      "No SaaS dependency",
      "Complete control"
    ]
  },
  {
    title: "Every fix is a preview",
    statements: [
      "You approve or reject",
      "One-command rollback",
      "Safe by default"
    ]
  },
  {
    title: "Evidence, not magic",
    statements: [
      "System cites its sources",
      "Confidence scores shown",
      "Reproducible diagnosis"
    ]
  }
];

export default function TrustAnchors() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <h2
            style={{ fontSize: 'clamp(2rem, 1.6rem + 2vw, 3.5rem)' }}
            className="font-mono font-bold mb-4 leading-tight"
          >
            <span className="text-foreground/90">Built for </span>
            <span className="text-primary">Production</span>
            <span className="text-foreground/90"> </span>
            <span className="text-amber-500">Incidents</span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground/85 max-w-2xl mx-auto leading-relaxed">
            Designed for engineers who need trust, safety, and control during critical moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {anchors.map((anchor) => (
            <div key={anchor.title} className="text-center">
              <div className="inline-flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-display font-semibold mb-5 text-foreground leading-tight">
                  {anchor.title}
                </h3>
                <ul className="space-y-3">
                  {anchor.statements.map((statement, idx) => (
                    <li key={idx} className="text-base sm:text-lg text-muted-foreground">
                      {statement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Principle statement */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-3xl mx-auto border-t border-border/50 pt-6 sm:pt-7">
            No blind automation. No telemetry. No vendor lock-in. Just evidence-driven incident intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}
