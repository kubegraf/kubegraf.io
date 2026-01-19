import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const stats = [
    {
      label: "Average MTTR reduction",
      value: "80%",
      color: "text-green-600",
      bgColor: "bg-green-100",
      details: ["From 2.5 hours to 30 minutes", "Across 1000+ incidents"],
    },
    {
      label: "Clusters under management",
      value: "15,000+",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      details: ["Managing 500M+ pods monthly", "99.9% uptime SLA"],
    },
    {
      label: "Annual savings per SRE",
      value: "$500K+",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      details: ["From reduced downtime", "And improved efficiency"],
    },
    {
      label: "Incident resolution rate",
      value: "94%",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      details: ["First-time fix success", "Without escalation"],
    },
  ];

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 30,
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
            PROVEN IMPACT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Results that 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              venture capitalists
            </span>
            <br />
            and executives love
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We track metrics that matter: revenue protection, team efficiency, and customer satisfaction
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 40,
              }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
              }}
              whileHover={{ y: -8 }}
              className="text-center p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <div className={`text-6xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-300 mb-4">{stat.label}</div>
              <div className="space-y-2">
                {stat.details.map((detail) => (
                  <div key={detail} className="text-sm text-gray-400">
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA for investors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gray-800 p-8 rounded-2xl border border-gray-700"
        >
          <h3 className="text-2xl font-bold mb-4">
            Interested in our growth metrics?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We track ARR, NRR, customer acquisition costs, and product adoption metrics. 
            Available in our investor data room.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/investors"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Investor Deck
            </a>
            <a
              href="mailto:investors@kubegraf.io"
              className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Contact CFO
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}