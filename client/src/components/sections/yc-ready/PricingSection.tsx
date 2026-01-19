import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  cta: string;
  features: PlanFeature[];
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: "Developer",
    price: "$0",
    period: "forever",
    description: "Perfect for solo devs and small teams",
    cta: "Get Started",
    features: [
      { text: "Up to 3 clusters", included: true },
      { text: "Incident auto-detection", included: true },
      { text: "Basic root cause analysis", included: true },
      { text: "Community support", included: true },
      { text: "Slack integration", included: true },
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
    badge: "MOST POPULAR",
    cta: "Start Free Trial",
    featured: true,
    features: [
      { text: "Up to 10 clusters", included: true },
      { text: "Incident auto-detection", included: true },
      { text: "Advanced AI root cause analysis", included: true, highlight: true },
      { text: "Phone & email support", included: true, highlight: true },
      { text: "Slack, PagerDuty, Opsgenie", included: true },
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
    cta: "Contact Sales",
    features: [
      { text: "Unlimited clusters", included: true },
      { text: "All Team features", included: true },
      { text: "Dedicated account manager", included: true, highlight: true },
      { text: "Custom integrations", included: true, highlight: true },
      { text: "Advanced security features", included: true },
      { text: "On-prem deployment", included: true },
      { text: "24/7 phone support", included: true },
      { text: "99.99% SLA with penalties", included: true },
    ],
  },
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: plan.featured ? 0 : -8 }}
      className={`relative ${plan.featured ? 'scale-105' : ''} transition-all duration-300`}
    >
      <div
        className={`bg-white rounded-2xl p-8 border transition-all duration-300 ${
          plan.featured
            ? 'border-blue-200 shadow-xl shadow-blue-200/50'
            : 'border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300'
        }`}
      >
        {/* Badge */}
        {plan.badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold"
          >
            {plan.badge}
          </motion.div>
        )}
        
        {/* Plan header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="text-4xl font-bold text-gray-900 mb-1">
            {plan.price}
          </div>
          <div className="text-sm text-gray-600">{plan.period}</div>
          <p className="text-gray-600 mt-4">{plan.description}</p>
        </div>
        
        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, idx) => (
            <motion.li
              key={feature.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + idx * 0.02 }}
              className={`flex items-start gap-3 text-sm ${
                feature.included ? 'text-gray-600' : 'text-gray-400'
              } ${feature.highlight && feature.included ? 'font-semibold text-blue-600' : ''}`}
            >
              {feature.included ? (
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Minus className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
              )}
              <span>{feature.text}</span>
            </motion.li>
          ))}
        </ul>
        
        {/* CTA */}
        <Button
          className={`w-full font-semibold py-3 ${
            plan.featured
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
          size="lg"
        >
          {plan.cta}
        </Button>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
            SIMPLE, TRANSPARENT PRICING
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose the plan that fits
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              your team's needs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
        
        {/* Pricing plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, idx) => (
            <PlanCard key={plan.name} plan={plan} index={idx} />
          ))}
        </div>
        
        {/* FAQ/bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl border border-gray-200 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Questions about pricing?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We price fairly and transparently. Volume discounts available. 
            All plans include unlimited users and read-only dashboards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/faq"
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              View FAQ
            </a>
            <a
              href="/contact"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Contact Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}