import { Button } from "@/components/ui/button";
import { Terminal, BookOpen, Github } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 border-t border-border/50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
          {/* Heading */}
          <h2
            style={{ fontSize: 'clamp(2rem, 1.6rem + 2vw, 3.5rem)' }}
            className="font-mono font-bold mb-5 leading-tight px-2"
          >
            <span className="text-primary">Start</span>
            <span className="text-foreground/90"> </span>
            <span className="text-amber-500">Investigating</span>
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-foreground/85 mb-7 md:mb-8 max-w-2xl mx-auto px-2 leading-relaxed">
            KubēGraf is available now.
          </p>

          {/* Install command */}
          <div className="mb-8 md:mb-10 max-w-2xl mx-auto">
            <div className="bg-card/50 border border-border/50 rounded-lg p-3 sm:p-4 md:p-6 font-mono text-left overflow-x-auto">
              <div className="text-xs sm:text-sm text-muted-foreground mb-2"># Install</div>
              <div className="text-sm sm:text-base text-primary mb-3 md:mb-4 whitespace-nowrap">$ brew install kubegraf</div>
              <div className="text-xs sm:text-sm text-muted-foreground mb-2"># Analyze</div>
              <div className="text-sm sm:text-base text-primary whitespace-nowrap">$ kubegraf analyze --cluster prod</div>
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
