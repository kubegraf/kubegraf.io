import { Button } from "@/components/ui/button";
import { Terminal, BookOpen, Github } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-24 lg:py-28 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Start Investigating
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            KubēGraf is available now.
          </p>

          {/* Install command */}
          <div className="mb-10 max-w-2xl mx-auto">
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 font-mono text-left">
              <div className="text-sm text-muted-foreground mb-2"># Install</div>
              <div className="text-base text-primary mb-4">$ brew install kubegraf</div>
              <div className="text-sm text-muted-foreground mb-2"># Analyze</div>
              <div className="text-base text-primary">$ kubegraf analyze --cluster prod</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="text-base px-8 py-6 h-auto"
              onClick={() => window.location.href = '/docs/quickstart.html'}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Read Docs
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 h-auto"
              onClick={() => window.open('https://github.com/kubegraf/kubegraf', '_blank')}
            >
              <Github className="w-5 h-5 mr-2" />
              View GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 h-auto"
              onClick={() => window.location.href = '/docs/quickstart.html'}
            >
              <Terminal className="w-5 h-5 mr-2" />
              Download
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
