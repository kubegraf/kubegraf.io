import { motion } from "framer-motion";
import { Shield, Lock, Eye } from "lucide-react";

export default function Security() {
  return (
    <section id="security" className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 bg-red-500/20 text-red-400 rounded-full font-bold">
            ZERO TRUST ARCHITECTURE
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
            Enterprise-Grade Security
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[Shield, Lock, Eye].map((Icon, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 text-center backdrop-blur-sm"
            >
              <Icon className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Data Privacy</h3>
              <p className="text-gray-400">Zero data exfiltration guarantee</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}