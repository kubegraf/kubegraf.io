import { motion } from "framer-motion";
import { BarChart3, Clock, FileJson } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const brainFeatures = [
  {
    icon: BarChart3,
    title: "Change Intelligence",
    description: "Shows what changed before an incident—deployments, configs, secrets—to identify potential causes."
  },
  {
    icon: Clock,
    title: "Searchable History",
    description: "Every diagnosis saved locally. Search past incidents by pod name, namespace, error type, or fix applied."
  },
  {
    icon: FileJson,
    title: "Export for Postmortems",
    description: "Export incident reports with correlated events and root cause analysis for team sharing."
  }
];

export default function BrainPanel() {
  return (
    <section id="brain-panel" className="py-24 relative z-10 bg-gradient-to-b from-purple-950/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">Knowledge Bank</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Learn from Every Incident
          </h2>
          <p className="text-muted-foreground text-lg">
            Local incident storage with full event history, change tracking, and searchable diagnosis records. No data leaves your machine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-white/10 bg-black/40 backdrop-blur h-full hover:border-purple-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
