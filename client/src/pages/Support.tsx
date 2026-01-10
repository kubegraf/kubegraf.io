import { Bug, Lightbulb, Shield, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LINKS } from "@/config/links";

export default function Support() {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Support - KubēGraf';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get support for KubeGraf. Report bugs, request features, or contact us for security issues and general inquiries.');
    }
  }, []);

  const supportItems = [
    {
      icon: Bug,
      title: "Report a Bug",
      description: "Found an issue? GitHub Issues is the best way to report bugs.",
      action: "Open Bug Report",
      href: LINKS.BUG_URL,
      external: true,
    },
    {
      icon: Lightbulb,
      title: "Request a Feature",
      description: "Have an idea for improvement? Share it via GitHub Issues.",
      action: "Open Feature Request",
      href: LINKS.FEATURE_URL,
      external: true,
    },
    {
      icon: Shield,
      title: "Security Issues",
      description: "For security vulnerabilities, please contact us directly.",
      action: "Email Security Team",
      href: LINKS.CONTACT_MAILTO,
      external: false,
    },
    {
      icon: Mail,
      title: "General Contact",
      description: "Questions, feedback, or need help? We're here to assist.",
      action: "Contact Us",
      href: LINKS.CONTACT_MAILTO,
      external: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-64 pb-12 sm:pt-72 sm:pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get help, report issues, or share feedback. We're here to help.
          </p>
        </motion.div>
      </section>

      {/* Support Options */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {supportItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-xl border border-white/10 p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {item.action}
                      {item.external && <ExternalLink className="w-4 h-4" />}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-xl border border-white/10 p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <a href={LINKS.DOCS_URL} className="text-primary hover:text-primary/80">
                Documentation
              </a>
              {" — "}Browse our docs for installation guides, configuration, and usage examples.
            </p>
            <p>
              <a
                href={LINKS.ISSUES_URL}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary/80"
              >
                GitHub Issues
              </a>
              {" — "}View existing issues, discussions, and community contributions.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

