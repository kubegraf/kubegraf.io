import { motion } from "framer-motion";

export default function Platforms() {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            Platform Support
          </h2>
          <p className="text-xl text-gray-400">Works everywhere Kubernetes runs</p>
        </div>
        <div className="flex justify-center gap-8 flex-wrap">
          {['AWS EKS', 'GCP GKE', 'Azure AKS', 'Self-Managed'].map((platform, idx) => (
            <motion.div
              key={platform}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-cyan-400 font-bold"
            >
              {platform}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}