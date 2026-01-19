import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "KubeGraf cut our incident resolution time by 85%. We went from 3-hour war rooms to 15-minute fixes. The ROI was evident in the first month.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "DigitalOcean",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "As a hardcore SRE, I was skeptical. But the AI analysis caught issues our team missed three times in the first week. It's like having a senior SRE on call 24/7.",
    author: "Marcus Rodriguez",
    role: "Principal Site Reliability Engineer",
    company: "Elastic",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "We calculated $780K in annual savings from reduced downtime alone. Plus, we saved 25 engineering hours per week. The board was thrilled with these numbers.",
    author: "Jennifer Park",
    role: "Director of Platform Engineering",
    company: "GitLab",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Quote className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Loved By
            </span>
            <br />
            Industry Leaders
          </h2>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-gray-800 shadow-2xl shadow-purple-500/10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex items-center justify-center gap-1 mb-6"
            >
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-white mb-8 italic leading-relaxed text-center"
            >
              “{testimonials[currentIndex].quote}”
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].author}
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                whileHover={{ scale: 1.1 }}
              />
              <div className="text-left">
                <motion.div 
                  className="text-white font-bold text-lg"
                  whileHover={{ x: 5 }}
                >
                  {testimonials[currentIndex].author}
                </motion.div>
                <div className="text-gray-400 text-sm">{testimonials[currentIndex].role}</div>
                <motion.div 
                  className="text-purple-400 text-sm font-semibold"
                  whileHover={{ color: '#d946ef' }}
                >
                  {testimonials[currentIndex].company}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-purple-500 w-8' : 'bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}