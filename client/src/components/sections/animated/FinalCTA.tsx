import { motion } from "framer-motion";
import { ArrowRight, Rocket, Zap, Shield } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-10 left-10 bg-white/10 w-20 h-20 rounded-full backdrop-blur-sm"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-10 bg-white/10 w-32 h-32 rounded-full backdrop-blur-sm"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white border border-white/20 mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀
          </motion.span>
          <span className="text-sm font-semibold">Join 15,000+ SREs</span>
        </motion.div>
        
        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <motion.span
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent bg-[length:200%_200%]"
          >
            Ready to Transform
          </motion.span>
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Your Kubernetes Operations?
          </span>
        </motion.h2>
        
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Join thousands of SREs who've reduced MTTR by 80% and saved $500K+ annually.
          Deploy in 60 seconds with zero configuration.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 hover:text-purple-700 text-xl font-bold py-6 px-10 rounded-xl shadow-2xl shadow-white/30 hover:shadow-white/50 transition-all duration-300 inline-flex items-center gap-3"
          >
            <Rocket className="w-7 h-7" />
            Start Free 14-Day Trial
            <ArrowRight className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm text-xl font-semibold py-6 px-10 rounded-xl inline-flex items-center gap-3 transition-all duration-300"
          >
            <Zap className="w-7 h-7" />
            Schedule Demo
          </motion.button>
        </motion.div>
        
        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-6 text-white/80"
        >
          <motion.div
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">No credit card required</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">SOC2 Type II Certified</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span className="text-sm font-medium">Cancel anytime</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}