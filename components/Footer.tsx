"use client";

import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Installation", href: "#installation" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Quick Start", href: "/docs/quickstart.html" },
      { label: "Installation Guide", href: "/docs/installation.html" },
      { label: "Commands", href: "/docs/commands.html" },
      { label: "Configuration", href: "/docs/configuration.html" },
      { label: "Terminal UI", href: "/docs/terminal-ui.html" },
      { label: "Web Dashboard", href: "/docs/web-dashboard.html" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "All Docs", href: "/docs/" },
      { label: "Plugins", href: "/docs/plugins.html" },
      { label: "Resource Map", href: "/docs/resource-map.html" },
      { label: "Security", href: "/docs/security.html" },
      { label: "GitHub", href: "https://github.com/kubegraf/kubegraf", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="py-16 px-0 border-t border-[rgba(59,130,246,0.2)] mt-8">
      <div className="w-[min(1400px,100%)] mx-auto px-16">
        <div className="grid grid-cols-3 gap-12 mb-12 lg:grid-cols-1 lg:gap-8">
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-[0.2em]">
                {section.title}
              </h3>
              <ul className="list-none space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[#94a3b8] hover:text-[#3b82f6] transition-colors text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t border-[rgba(59,130,246,0.1)]"
        >
          <p className="m-0 text-[0.85rem] text-[#94a3b8]">
            © {new Date().getFullYear()} KubeGraf. Apache 2.0 License.
          </p>
          <p className="mt-2">
            <a
              href="mailto:contact@kubegraf.io"
              className="text-[#3b82f6] hover:text-[#22d3ee] transition-colors text-sm"
            >
              contact@kubegraf.io
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
