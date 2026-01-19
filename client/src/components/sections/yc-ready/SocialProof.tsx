import { motion } from "framer-motion";

const customers = [
  "GitLab", "Elastic", "Snyk", "Datadog", "HashiCorp", 
  "DigitalOcean", "GitHub", "Stripe", "Segment", "Okta"
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-gray-600 font-medium">
            TRUSTED BY PLATFORM TEAMS AT INDUSTRY LEADERS
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center items-center gap-8">
          {customers.map((customer, idx) => (
            <motion.div
              key={customer}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              className="text-gray-400 font-bold text-lg"
            >
              {customer}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200"
        >
          {[
            { label: "Reduction in MTTR", value: "80%", color: "text-green-600" },
            { label: "Incident resolution", value: "5x", color: "text-blue-600" },
            { label: "Hours saved/week", value: "25", color: "text-purple-600" },
            { label: "Customer satisfaction", value: "94%", color: "text-amber-600" },
          ].map((metric, idx) => (
            <motion.div
              key={metric.label}
              whileHover={{ scale: 1.02 }}
              className="text-center"
            >
              <div className={`text-3xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}