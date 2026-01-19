import { motion } from "framer-motion";

export default function UseCases() {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            Use Cases
          </h2>
          <p className="text-xl text-gray-400">Real-world problem solving</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Pod Crashes', 'Resource Leaks', 'Config Errors'].map((useCase, idx) => (
            <motion.div
              key={useCase}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-3 text-cyan-400">{useCase}</h3>
              <p className="text-gray-400">Real-time detection and resolution</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}