import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";

export default function CTASection() {
  return (
    <section id="cta" className="relative py-24 overflow-hidden bg-gradient-to-br from-cyan-600 to-purple-600">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          whileHover={{ scale: 1.02 }}
          className="text-5xl font-bold mb-6 text-white"
        >
          Ready to Transform Your Kubernetes Operations?
        </motion.h2>
        <motion.p
          whileHover={{ scale: 1.05 }}
          className="text-xl text-white/90 mb-8"
        >
          Join thousands of SREs who've reduced MTTR by 80%
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-lg inline-flex items-center gap-3"
          onClick={() => window.location.href = "/docs/installation.html"}
        >
          <Rocket className="w-6 h-6" />
          Start Free Trial
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}