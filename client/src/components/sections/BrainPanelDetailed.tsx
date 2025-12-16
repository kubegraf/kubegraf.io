import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap } from "lucide-react";

export default function BrainPanelDetailed() {
  return (
    <section className="py-24 relative z-10 bg-gradient-to-b from-purple-950/20 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">Brain & Performance</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Next-gen intelligence + unified state
          </h2>
          <p className="text-muted-foreground text-lg">
            Brain Panel V1 brings a local-only SRE brain, while the new global store speeds every resource tab with smart caching.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Brain Panel V1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl">Brain Panel (V1)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Accessible via the header toggle, the Brain drawer surfaces a 24–72h timeline of incidents, spikes, and scaling events plus an AI-ready summary JSON.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-sm">Cluster timeline (incidents, warnings, scaling)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-sm">OOM + reliability insights with metric cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-sm">Rule-based recommendations when AI services are absent</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Global Store + Cache */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Global Store + Cache</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  A new SolidJS store centralizes cluster selection, multi-namespace state, and theming, persisting choices to localStorage.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">Resource cache keyed by cluster + namespaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">Pods/Deployments/Services use 15s TTL and background refreshes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">Skeleton-first UX with gentle updates to avoid flicker</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
