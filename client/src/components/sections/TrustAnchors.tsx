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
    <section className="relative py-16 md:py-20 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Built for Production Incidents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for engineers who need trust, safety, and control during critical moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {anchors.map((anchor) => (
            <div key={anchor.title} className="text-center">
              <div className="inline-flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-display font-semibold mb-6 text-foreground">
                  {anchor.title}
                </h3>
                <ul className="space-y-3">
                  {anchor.statements.map((statement, idx) => (
                    <li key={idx} className="text-base text-muted-foreground">
                      {statement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Principle statement */}
        <div className="mt-16 text-center">
          <p className="text-sm text-secondary-foreground/70 font-mono max-w-3xl mx-auto border-t border-border/50 pt-8">
            No blind automation. No telemetry. No vendor lock-in. Just evidence-driven incident intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}
