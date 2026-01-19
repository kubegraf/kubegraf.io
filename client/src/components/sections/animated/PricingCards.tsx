import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const plans = [
  {
    name: "Developer",
    price: "$0",
    period: "forever",
    description: "Perfect for solo devs and small teams",
    featured: false,
    cta: "Get Started",
    features: [
      { text: "Up to 3 clusters", included: true },
      { text: "Incident auto-detection", included: true },
      { text: "Basic root cause analysis", included: true },
      { text: "Community support", included: true },
      { text: "Advanced AI insights", included: false, highlight: true },
      { text: "Custom dashboards", included: false },
      { text: "99.9% SLA", included: false },
    ],
  },
  {
    name: "Team",
    price: "$499",
    period: "per month",
    description: "For growing teams managing production workloads",
    featured: true,
    cta: "Start Free Trial",
    badge: "MOST POPULAR",
    features: [
      { text: "Up to 10 clusters", included: true },
      { text: "Advanced AI analysis", included: true, highlight: true },
      { text: "Phone & email support", included: true, highlight: true },
      { text: "Custom dashboards", included: true },
      { text: "GitHub/GitLab integration", included: true },
      { text: "99.9% SLA", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations with complex needs",
    featured: false,
    cta: "Contact Sales",
    features: [
      { text: "Unlimited clusters", included: true },
      { text: "Dedicated account manager", included: true, highlight: true },
      { text: "Custom integrations", included: true, highlight: true },
      { text: "24/7 phone support", included: true },
      { text: "99.99% SLA", included: true },
    ],
  },
];

function PricingCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: plan.featured ? 0 : -10 }}
      className={`relative ${plan.featured ? 'scale-105 z-10' : ''}`}
    >
      {plan.badge && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
        >
          {plan.badge}
        </motion.div>
      )}
      
      <motion.div
        className={`relative bg-gray-900 rounded-2xl p-8 border backdrop-blur-sm transition-all duration-300 ${
          plan.featured
            ? 'border-purple-500 shadow-2xl shadow-purple-500/25 bg-gradient-to-br from-gray-900 to-purple-900/10'
            : 'border-gray-700 shadow-lg hover:shadow-xl hover:border-gray-600'
        }`}
        whileHover={{ 
          boxShadow: plan.featured 
            ? '0 25px 50px rgba(168, 85, 247, 0.4)' 
            : '0 20px 40px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div className="text-center mb-8">
          <h3 className={`text-2xl font-bold ${plan.featured ? 'text-purple-400' : 'text-white'} mb-2`}>
            {plan.name}
          </h3>
          <div className={`text-4xl font-bold ${plan.featured ? 'text-purple-400' : 'text-white'} mb-1`}>
            {plan.price}
          </div>
          <div className="text-gray-400 text-sm mb-4">{plan.period}</div>
          <p className="text-gray-400">{plan.description}</p>
        </div>
        
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, idx) => (
            <motion.li
              key={feature.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex items-start gap-3 text-sm ${
                feature.included ? 'text-gray-300' : 'text-gray-500'
              } ${feature.highlight && feature.included ? 'font-semibold text-blue-300' : ''}`}
            >
              {feature.included ? (
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <Minus className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              )}
              <span>{feature.text}</span>
            </motion.li>
          ))}
        </ul>
        
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full font-bold py-4 rounded-xl transition-all duration-300 ${
            plan.featured
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-white hover:bg-gray-100 text-gray-900'
          }`}
        >
          {plan.cta}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function PricingCards() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Simple,
            </span>
            <br />
            Transparent Pricing
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Start free, scale as you grow. No hidden fees, no surprises.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, idx) => (
            <PricingCard key={plan.name} plan={plan} index={idx} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gray-900/50 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Questions about pricing?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            We price fairly and transparently. Volume discounts available. 
            All plans include unlimited users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              View FAQ
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}