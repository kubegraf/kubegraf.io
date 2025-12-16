import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 animate-pulse">🚀 Limited Time Offer</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Hurry to Grab Soon
          </h1>
          <p className="text-lg text-muted-foreground">
            Start with full free features. Upgrade to Pro when you're ready for advanced capabilities.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="relative border-white/10 bg-black/40 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Perfect for learning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "All three interfaces (Terminal, Web, SPA)",
                    "Unlimited local clusters",
                    "Multi-cluster support (up to 5 clusters)",
                    "Basic observability"
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Get Started Free
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-primary/50 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur">
              <div className="absolute -top-3 right-6">
                <Badge className="bg-primary text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription className="text-primary font-medium">
                  🚀 Grab it soon - Limited time offer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Everything in Free, plus:",
                    "Brain Panel with AI diagnostics",
                    "Advanced tools & exports",
                    "Unlimited cluster connections"
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start 14-Day Trial
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Stack Up</h2>
            <p className="text-muted-foreground">
              Transparent comparison with popular Kubernetes tools. We believe in letting the features speak for themselves.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold bg-primary/5">KubeGraf</th>
                  <th className="text-center p-4 font-semibold">Lens Desktop</th>
                  <th className="text-center p-4 font-semibold">k9s</th>
                  <th className="text-center p-4 font-semibold">Kubectl</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td colSpan={5} className="p-4 text-sm font-semibold text-primary">
                    Interface & User Experience
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-sm">Terminal UI</td>
                  <td className="text-center p-4 bg-primary/5">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-yellow-400">⚠</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-sm">Web Dashboard</td>
                  <td className="text-center p-4 bg-primary/5">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-sm">Modern SPA</td>
                  <td className="text-center p-4 bg-primary/5">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td colSpan={5} className="p-4 text-sm font-semibold text-primary">
                    Intelligence & Automation
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-sm">AI-Assisted Troubleshooting</td>
                  <td className="text-center p-4 bg-primary/5">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-yellow-400">⚠</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-sm">Brain Panel (Event Analysis)</td>
                  <td className="text-center p-4 bg-primary/5">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-red-400">✗</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td colSpan={5} className="p-4 text-sm font-semibold text-primary">
                    Deployment & Accessibility
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-sm">Binary Size</td>
                  <td className="text-center p-4 bg-primary/5 text-sm">~15MB</td>
                  <td className="text-center p-4 text-sm">~300MB+</td>
                  <td className="text-center p-4 text-sm">~20MB</td>
                  <td className="text-center p-4 text-sm">~50MB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="mb-2">© 2024 Kubegraf.io. All rights reserved.</p>
          <p>
            <a href="mailto:contact@kubegraf.io" className="hover:text-primary transition-colors">
              contact@kubegraf.io
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
