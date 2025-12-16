import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Terminal, Code, Shield, Puzzle, Zap, FileText } from "lucide-react";

const docSections = [
  {
    title: "Quick Start",
    description: "Get up and running with KubeGraf in minutes",
    icon: Zap,
    link: "/docs/quickstart.html",
    color: "text-yellow-400"
  },
  {
    title: "Installation",
    description: "Install KubeGraf on macOS, Linux, and Windows",
    icon: Terminal,
    link: "/docs/installation.html",
    color: "text-blue-400"
  },
  {
    title: "Configuration",
    description: "Configure clusters, contexts, and preferences",
    icon: Code,
    link: "/docs/configuration.html",
    color: "text-green-400"
  },
  {
    title: "Commands",
    description: "Complete command reference and examples",
    icon: FileText,
    link: "/docs/commands.html",
    color: "text-purple-400"
  },
  {
    title: "Terminal UI",
    description: "Master the terminal interface with vim keybindings",
    icon: Terminal,
    link: "/docs/terminal-ui.html",
    color: "text-cyan-400"
  },
  {
    title: "Web Dashboard",
    description: "Explore the web-based dashboard features",
    icon: BookOpen,
    link: "/docs/web-dashboard.html",
    color: "text-pink-400"
  },
  {
    title: "Security",
    description: "RBAC, authentication, and security best practices",
    icon: Shield,
    link: "/docs/security.html",
    color: "text-red-400"
  },
  {
    title: "Plugins",
    description: "Extend KubeGraf with custom plugins",
    icon: Puzzle,
    link: "/docs/plugins.html",
    color: "text-orange-400"
  }
];

export default function Docs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-white/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to master KubeGraf and manage your Kubernetes clusters effectively.
          </p>
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((doc) => {
              const Icon = doc.icon;
              return (
                <Card
                  key={doc.title}
                  className="border-white/10 bg-black/40 backdrop-blur hover:border-primary/50 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`${doc.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{doc.title}</CardTitle>
                    </div>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = doc.link}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 bg-black/20 border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/docs/quickstart.html"
              className="p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-colors bg-black/40"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                5-Minute Quick Start
              </h3>
              <p className="text-sm text-muted-foreground">
                Install, connect to your cluster, and run your first commands in under 5 minutes.
              </p>
            </a>
            <a
              href="/docs/installation.html"
              className="p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-colors bg-black/40"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-400" />
                Installation Guide
              </h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step installation instructions for all platforms including air-gapped environments.
              </p>
            </a>
            <a
              href="/docs/commands.html"
              className="p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-colors bg-black/40"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Command Reference
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete reference of all KubeGraf commands with examples and use cases.
              </p>
            </a>
            <a
              href="/docs/resource-map.html"
              className="p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-colors bg-black/40"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-400" />
                Resource Map
              </h3>
              <p className="text-sm text-muted-foreground">
                Visual guide to Kubernetes resources and how KubeGraf helps you manage them.
              </p>
            </a>
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
