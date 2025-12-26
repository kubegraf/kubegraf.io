import { Button } from "@/components/ui/button";
import { Terminal, BookOpen } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-24 lg:py-28 border-t border-border/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Ready to get started?
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Start detecting and resolving Kubernetes incidents in minutes.
            No credit card required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="text-base px-8 py-6 h-auto shadow-lg shadow-primary/20 hover:shadow-primary/30"
              onClick={() => window.location.href = '/docs/quickstart.html'}
            >
              <Terminal className="w-5 h-5 mr-2" />
              Start your project
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 h-auto"
              onClick={() => window.location.href = '/docs-overview'}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Explore docs
            </Button>
          </div>

          {/* Secondary Link */}
          <p className="text-sm text-muted-foreground">
            Questions? <a href="mailto:contact@kubegraf.io" className="text-primary hover:underline">Get in touch</a>
          </p>
        </div>
      </div>
    </section>
  );
}
