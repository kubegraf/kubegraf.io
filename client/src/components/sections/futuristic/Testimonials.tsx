import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-400">Real results from real SREs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {Array(3).fill(0).map((_, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
              <p className="text-gray-300 mb-4">"KubeGraf reduced our MTTR by 85%"</p>
              <div className="text-cyan-400 font-bold">- SRE @ Tech Company</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}