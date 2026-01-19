import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  { label: "Kubernetes Clusters", value: 15000, suffix: "+", color: "text-purple-400" },
  { label: "Average MTTR Reduction", value: 85, suffix: "%", color: "text-pink-400" },
  { label: "Pods Monitored Monthly", value: 500, suffix: "M+", color: "text-blue-400" },
  { label: "Accuracy Rate", value: 96, suffix: "%", color: "text-green-400" },
];

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      className={`text-5xl md:text-6xl font-bold ${color} mb-2`}
      initial={{ scale: 0 }}
      animate={{ scale: isInView ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {value.toLocaleString()}{suffix}
          </motion.span>
        </motion.span>
      )}
    </motion.div>
  );
}

export default function AnimatedMetrics() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Proven Results
            </span>
            <br />
            at Scale
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Numbers that speak volumes about our impact on Kubernetes operations
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
              <AnimatedCounter {...metric} />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + idx * 0.2 }}
                className="text-sm text-gray-400"
              >
                {metric.label}
              </motion.div>
              
              <motion.div
                className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.2, duration: 2 }}
              >
                <motion.div
                  className={`h-full ${metric.color.replace('text', 'bg')}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: metric.value + "%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + idx * 0.2, duration: 3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}