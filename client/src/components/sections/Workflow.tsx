import { motion } from "framer-motion";
import workflowImg from "@assets/generated_images/abstract_3d_node_workflow_visualization.png";

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30" />
              <div className="relative glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={workflowImg} 
                  alt="3D Workflow Interface" 
                  className="w-full h-auto"
                />
                
                {/* Floating UI Elements Overlay */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-10 right-10 glass-card p-4 rounded-lg border border-primary/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-green-400">PIPELINE ACTIVE</span>
                  </div>
                  <div className="text-2xl font-mono font-bold">98.4%</div>
                  <div className="text-xs text-muted-foreground">Efficiency Rating</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 space-y-8">
            <motion.h2 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold leading-tight"
            >
              Visualize logic like <br />
              <span className="text-gradient-primary">Never Before</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground"
            >
              Forget YAML files and CLI commands. Build production-grade Kubernetes workflows with a node-based interface that gives you X-ray vision into your infrastructure.
            </motion.p>

            <motion.ul 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                "Drag-and-drop architecture",
                "Real-time packet tracing",
                "One-click multi-cloud deploy",
                "AI-assisted debugging"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
