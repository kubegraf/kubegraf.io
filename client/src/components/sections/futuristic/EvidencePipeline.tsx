import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, GitBranch, Search, Shield } from "lucide-react";

export default function EvidencePipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            Evidence Pipeline
          </h2>
          <p className="text-xl text-gray-400">AI-powered correlation engine</p>
        </motion.div>
      </div>
    </section>
  );
}