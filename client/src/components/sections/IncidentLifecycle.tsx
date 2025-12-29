import { Radar, Network, FileText, FileCode, Archive } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const stages = [
  {
    id: "detect",
    icon: Radar,
    title: "Detect",
    what: "Auto-discover unhealthy resources",
    how: "Watches pod state, events, metrics",
    evidence: "Event-driven, no polling"
  },
  {
    id: "correlate",
    icon: Network,
    title: "Correlate",
    what: "Build evidence chains",
    how: "Links logs, events, config changes, metrics",
    evidence: "Temporal + causal correlation"
  },
  {
    id: "explain",
    icon: FileText,
    title: "Explain",
    what: "Root cause with proof",
    how: "System analysis backed by collected evidence",
    evidence: "Every diagnosis cites sources"
  },
  {
    id: "preview",
    icon: FileCode,
    title: "Preview Fix",
    what: "See changes before applying",
    how: "Dry-run mode shows exact diff",
    evidence: "Human approval required",
    special: true // Only this one gets animation
  },
  {
    id: "learn",
    icon: Archive,
    title: "Learn",
    what: "Build incident memory",
    how: "Similar incidents surface automatically",
    evidence: "Local knowledge base, no SaaS"
  }
];

export default function IncidentLifecycle() {
  const [visibleStage, setVisibleStage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === "preview") {
            setVisibleStage("preview");
          }
        });
      },
      { threshold: 0.5 }
    );

    const previewCard = document.getElementById("preview");
    if (previewCard) {
      observer.observe(previewCard);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            The Incident Intelligence System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Evidence-driven diagnosis from detection to resolution
          </p>
        </div>

        {/* Visual timeline - desktop */}
        <div className="hidden md:flex items-center justify-center gap-4 mb-12">
          {stages.map((stage, idx) => (
            <div key={stage.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${
                  stage.special
                    ? 'bg-accent/10 border-accent/20'
                    : 'bg-primary/10 border-primary/20'
                }`}>
                  <stage.icon className={`w-5 h-5 ${
                    stage.special ? 'text-accent' : 'text-primary'
                  }`} />
                </div>
                <span className="text-xs text-muted-foreground mt-2 font-mono">{stage.title}</span>
              </div>
              {idx < stages.length - 1 && (
                <div className="w-12 h-px bg-border/50 mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Stage cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {stages.map((stage, idx) => (
            <div
              key={stage.id}
              id={stage.id}
              className="group relative"
              style={{
                animationDelay: `${idx * 100}ms`
              }}
            >
              <div
                className={`h-full p-5 rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-300 ${
                  stage.special
                    ? 'border-accent/30 hover:border-accent/50 hover:bg-card/80'
                    : 'border-border/50 hover:border-primary/30 hover:bg-card/80'
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  stage.special
                    ? 'bg-accent/10 group-hover:bg-accent/20'
                    : 'bg-primary/10 group-hover:bg-primary/20'
                } transition-colors`}>
                  <stage.icon className={`w-5 h-5 ${
                    stage.special ? 'text-accent' : 'text-primary'
                  }`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-semibold mb-3">
                  {stage.title}
                </h3>

                <div className="space-y-2 text-sm">
                  <p className="text-foreground font-medium">{stage.what}</p>
                  <p className="text-muted-foreground">{stage.how}</p>
                  <p className="text-xs text-secondary-foreground/70 font-mono mt-3">
                    {stage.evidence}
                  </p>
                </div>

                {/* Special radial reveal for Preview Fix */}
                {stage.special && visibleStage === "preview" && (
                  <div className="absolute inset-0 rounded-xl border-2 border-accent/20 animate-radial-reveal pointer-events-none" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Every stage builds on evidence from the previous one. No guessing, no black boxes.
          </p>
        </div>
      </div>
    </section>
  );
}
