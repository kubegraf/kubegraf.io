import { motion } from "framer-motion";
import { Rocket, ArrowRight, Github, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle,_#ffffff_1px,_transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Ready to transform your
          <br />
          <motion.span
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent bg-200"
          >
            Kubernetes operations?
          </motion.span>
        </motion.h2>
        
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
        >
          Join 15,000+ SREs who've reduced MTTR by 80% and saved $500K+ annually.
          Deploy in 60 seconds with zero configuration.
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold py-6 px-8 rounded-xl shadow-xl shadow-white/30 hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
          >
            <Rocket className="w-6 h-6" />
            Start Free 14-Day Trial
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 text-lg font-semibold py-6 px-8 rounded-xl inline-flex items-center gap-3 transition-all duration-300"
          >
            <Github className="w-6 h-6" />
            View on GitHub
          </Button>
        </motion.div>
        
        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-white/80"
        >
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Shield className="w-4 h-4" />
            <span>SOC2 Type II Certified</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}