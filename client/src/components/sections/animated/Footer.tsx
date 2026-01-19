import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Changelog", href: "/changelog" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Community", href: "/community" },
    { label: "Blog", href: "/blog" },
    { label: "Status", href: "https://status.kubegraf.io" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Security", href: "/security" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "License", href: "/license" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-gray-800 py-16 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle,_#374151_1px,_transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring" }}
              className="mb-4"
            >
              <motion.div 
                className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                KubeGraf
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 text-sm mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              AI-powered Kubernetes incident resolution. Built for SREs, by SREs.
            </motion.p>
            
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                {[
                  { icon: Github, href: "https://github.com/kubegraf", label: "GitHub" },
                  { icon: Twitter, href: "https://twitter.com/kubegraf", label: "Twitter" },
                  { icon: Linkedin, href: "https://linkedin.com/company/kubegraf", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <motion.h4 
                className="text-sm font-bold text-white mb-4"
                whileHover={{ x: 5, color: '#a855f7' }}
                transition={{ duration: 0.2 }}
              >
                {category}
              </motion.h4>
              
              <ul className="space-y-3">
                {links.map((link) => (
                  <motion.li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300 inline-block"
                      whileHover={{ x: 5, color: '#a855f7' }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div 
            className="text-gray-400 text-sm mb-4 md:mb-0"
            whileHover={{ color: '#a855f7' }}
          >
            © {currentYear} KubeGraf, Inc. All rights reserved. Built with ❤️ for SREs.
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-6 text-gray-400 text-sm"
            whileHover={{ color: '#a855f7' }}
          >
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              All systems operational
            </motion.span>
            <motion.span
              whileHover={{ color: '#a855f7' }}
              transition={{ duration: 0.2 }}
            >
              SOC2 Type II • GDPR • CCPA
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}