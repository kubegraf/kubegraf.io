import { Button } from "@/components/ui/button";
import { Home, Book, MessageCircle, Search, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Large 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent">
            404
          </h1>
          <p className="text-2xl font-semibold mt-4 mb-2">Page Not Found</p>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-4">Popular Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-primary/50 hover:bg-primary/10"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-primary/50 hover:bg-primary/10"
              >
                <Book className="w-4 h-4" />
                Documentation
              </Button>
            </Link>
            <Link href="/faq">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-primary/50 hover:bg-primary/10"
              >
                <MessageCircle className="w-4 h-4" />
                FAQ
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-primary/50 hover:bg-primary/10"
              >
                <Search className="w-4 h-4" />
                Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="gap-2 hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}
