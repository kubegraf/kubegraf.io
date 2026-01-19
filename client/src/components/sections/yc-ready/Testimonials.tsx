import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "KubeGraf cut our incident resolution time by 85%. We went from 3-hour war rooms to 15-minute fixes. The ROI was evident in the first month.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "DigitalOcean",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "As a hardcore SRE, I was skeptical. But the AI analysis caught issues our team missed three times in the first week. It's like having a senior SRE on call 24/7.",
    author: "Marcus Rodriguez",
    role: "Principal Site Reliability Engineer",
    company: "Elastic",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "We calculated $780K in annual savings from reduced downtime alone. Plus, we saved 25 engineering hours per week. The board was thrilled with these numbers.",
    author: "Jennifer Park",
    role: "Director of Platform Engineering",
    company: "GitLab",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "SOC2 compliance was a key requirement. KubeGraf's zero-data-exfiltration architecture and detailed audit logs made our security review seamless.",
    author: "David Kim",
    role: "Chief Security Officer",
    company: "FinTech Startup",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: TestimonialProps; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 relative"
    >
      {/* Quote icon */}
      <div className="absolute top-4 left-4 text-blue-200">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.983 3v7.391c0 2.908-2.35 5.259-5.258 5.259h-.73v6.35h.73c6.214 0 11.258-5.045 11.258-11.259V3H9.983z"/>
          <path d="M20.017 3v7.391c0 2.908-2.35 5.259-5.258 5.259h-.73v6.35h.73c6.214 0 11.258-5.045 11.258-11.259V3H20.017z"/>
        </svg>
      </div>
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-lg text-gray-900 mb-6 italic leading-relaxed">
        “{testimonial.quote}”
      </p>
      
      {/* Author info */}
      <div className="flex items-center gap-4">
        <motion.img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-16 h-16 rounded-full object-cover"
          whileHover={{ scale: 1.1 }}
        />
        <div>
          <div className="font-bold text-gray-900">{testimonial.author}</div>
          <div className="text-sm text-gray-600">{testimonial.role}</div>
          <div className="text-sm font-semibold text-blue-600">{testimonial.company}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
            CUSTOMER SUCCESS STORIES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Loved by SREs, praised by
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              executives
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from platform teams managing production Kubernetes at scale
          </p>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} index={idx} />
          ))}
        </div>
        
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gray-50 p-8 rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "SREs surveyed", value: "10,000+" },
              { label: "Will recommend", value: "98%" },
              { label: "Net Promoter Score", value: "67" },
              { label: "Third-party verified", value: "G2" },
            ].map((badge) => (
              <div key={badge.label}>
                <div className="text-3xl font-bold text-blue-600 mb-2">{badge.value}</div>
                <div className="text-sm text-gray-600">{badge.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}