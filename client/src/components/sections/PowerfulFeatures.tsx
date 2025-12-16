import { motion } from "framer-motion";
import { ShoppingCart, Bot, Rocket, BarChart3, Cpu, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const powerfulFeatures = [
  {
    icon: ShoppingCart,
    title: "App Marketplace",
    description: "One-click deployment of 50+ applications including Istio, ArgoCD, Kong, Vault, and more. Install, configure, and manage with ease.",
    badge: "Marketplace",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    icon: Bot,
    title: "ML Training Jobs",
    description: "Run ML training workloads on Kubernetes with GPU support. Submit Python scripts, configure resources, and stream logs in real-time.",
    badge: "ML Workloads",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    icon: Rocket,
    title: "ML Inference Services",
    description: "Deploy ML models as production-ready APIs. Support for multiple runtimes including FastAPI, MLServer, BentoML, and KServe with auto-scaling.",
    badge: "ML Workloads",
    color: "from-cyan-500/20 to-cyan-600/20"
  },
  {
    icon: BarChart3,
    title: "MLflow Integration",
    description: "Experiment tracking, model registry, and ML lifecycle management. Deploy MLflow with Helm, configure storage backends, and manage models.",
    badge: "ML Workloads",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    icon: Database,
    title: "Feast Feature Store",
    description: "Manage feature stores for ML pipelines. Deploy Feast for feature engineering, versioning, and serving features to training and inference workloads.",
    badge: "ML Workloads",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    icon: Cpu,
    title: "GPU Management",
    description: "Detect and manage GPU resources across your cluster. Monitor GPU utilization, allocate GPUs to ML workloads, and optimize resource usage.",
    badge: "Hardware",
    color: "from-green-500/20 to-green-600/20"
  }
];

export default function PowerfulFeatures() {
  return (
    <section id="powerful-features" className="py-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Powerful Features</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Everything you need for modern Kubernetes
          </h2>
          <p className="text-muted-foreground text-lg">
            From app deployment to ML workloads, KubeGraf provides the tools you need to manage your clusters effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {powerfulFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-white/10 bg-black/40 backdrop-blur h-full group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">{feature.badge}</Badge>
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
