import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap } from "lucide-react";

export default function BrainPanelDetailed() {
  return (
    <section className="py-24 relative z-10 bg-gradient-to-b from-purple-950/20 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">How It Works</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Evidence-backed diagnosis
          </h2>
          <p className="text-muted-foreground text-lg">
            KubeGraf correlates events, logs, and changes to explain incidents with supporting evidence—not guesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Root Cause Analysis */}
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
                  <CardTitle className="text-2xl">Root Cause Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  When an incident is detected, KubeGraf builds a complete picture by correlating multiple data sources.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-sm">Recent events and container logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-sm">Error patterns (exit codes, OOM signals, probe failures)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-sm">Recent changes to deployments, configs, and secrets</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Safe Fix Previews */}
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
                  <CardTitle className="text-2xl">Safe Fix Previews</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  For resolvable incidents, KubeGraf suggests fixes and shows exactly what will change before you apply anything.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">Dry-run validation with kubectl before execution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">One-click rollback if fix doesn't resolve the issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">Read-only mode by default—changes require confirmation</span>
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
