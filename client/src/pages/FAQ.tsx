import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <h3 className="text-lg font-semibold pr-4">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="px-6 pb-4"
        >
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('kubegraf-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('kubegraf-theme', newTheme);
  };

  const faqs = [
    {
      question: "What is KubeGraf?",
      answer: "KubeGraf is a local-first Kubernetes tool that detects incidents, explains why they happen with evidence, and previews safe fixes—without SaaS lock-in. It runs on your laptop or inside your environment."
    },
    {
      question: "Do I need an account to use KubeGraf?",
      answer: "No. The Free plan requires no account, no registration, and no telemetry. Download the binary and run it against your clusters. Pro features require creating an account only for license verification."
    },
    {
      question: "Does KubeGraf send my data to the cloud?",
      answer: "No. All cluster data stays on your machine. Pro features run locally. The only data sent during Pro usage is anonymous license verification—no cluster logs, events, or resource data is transmitted."
    },
    {
      question: "What platforms does KubeGraf support?",
      answer: "KubeGraf runs on macOS, Linux, and Windows. It works with any Kubernetes cluster including Docker Desktop, Minikube, kind, EKS, GKE, AKS, and self-managed clusters."
    },
    {
      question: "How do I install KubeGraf?",
      answer: "On macOS, use Homebrew: 'brew tap kubegraf/tap && brew install kubegraf'. On Linux, download the binary from the releases page. On Windows, use Scoop or download the installer. See the installation docs for detailed instructions."
    },
    {
      question: "How much does KubeGraf cost?",
      answer: "KubeGraf has a Free plan with unlimited cluster connections, terminal UI, web UI, and basic incident detection. The Pro plan adds Brain Panel diagnostics, advanced analysis, and knowledge export."
    },
    {
      question: "Can I use KubeGraf in production?",
      answer: "Yes. KubeGraf is designed for production use. It runs read-only queries against your cluster by default and requires explicit confirmation for any write operations."
    },
    {
      question: "How does KubeGraf compare to kubectl?",
      answer: "kubectl is a powerful CLI for cluster control. KubeGraf adds incident detection, evidence-backed diagnostics, change correlation, and safe fix recommendations. You can use both together."
    },
    {
      question: "How does KubeGraf compare to k9s?",
      answer: "k9s is excellent for terminal-based navigation. KubeGraf adds automatic incident detection, root cause analysis, web UI, and Brain Panel diagnostics. Both have terminal UIs."
    },
    {
      question: "How does KubeGraf compare to Lens Desktop?",
      answer: "Lens provides cluster visibility via desktop app. KubeGraf focuses on incident understanding with evidence-backed diagnosis, change correlation, and safe fix recommendations. KubeGraf is lighter (~15MB vs ~300MB) and offers both terminal and web interfaces."
    },
    {
      question: "Can I run KubeGraf offline?",
      answer: "Yes. KubeGraf Free runs completely offline. KubeGraf Pro requires occasional license verification but can work offline for extended periods once verified."
    },
    {
      question: "Does KubeGraf work with multiple clusters?",
      answer: "Yes. KubeGraf supports unlimited cluster connections with one-click switching. It uses your existing kubeconfig and respects your context configuration."
    },
    {
      question: "What is the Brain Panel?",
      answer: "The Brain Panel is a Pro feature that provides evidence-backed incident diagnostics. It correlates events, logs, and recent changes to explain what failed and why, with safe fix recommendations."
    },
    {
      question: "Can I downgrade from Pro to Free?",
      answer: "Yes. You can stop using Pro at any time. The Free plan continues working without interruption. No lock-in, no penalties, no loss of local incident history."
    },
    {
      question: "Is KubeGraf open source?",
      answer: "KubeGraf is licensed under Apache License 2.0. You can use, modify, and distribute it freely, including for commercial purposes."
    },
    {
      question: "How do I get support?",
      answer: "Free users can use GitHub Discussions and documentation. Pro users get priority support via email. Enterprise customers can purchase dedicated support contracts."
    },
    {
      question: "Does KubeGraf require cluster admin permissions?",
      answer: "No. KubeGraf works with read-only cluster access. You only need permissions to view resources in the namespaces you want to monitor."
    },
    {
      question: "Can I use KubeGraf with GitOps?",
      answer: "Yes. KubeGraf works alongside GitOps tools like ArgoCD and FluxCD. It helps you understand what changed and why deployments failed."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-white/5 py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <img src="/assets/logo/kubegraf_color_icon.png" alt="KubeGraf" className="object-contain" style={{ width: 96, height: 96 }} />
            KubēGraf
          </a>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="/docs" className="hover:text-primary transition-colors">Docs</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Common questions about installing, using, and understanding KubeGraf
          </p>
        </motion.div>
      </section>

      {/* FAQ List */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center glass-card rounded-2xl border border-white/10 p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Join our community discussions or contact us directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/kubegraf/kubegraf/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-primary/50 hover:bg-primary/10 transition-colors text-base font-medium"
            >
              GitHub Discussions
            </a>
            <a
              href="mailto:contact@kubegraf.io"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-base font-medium"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 KubēGraf</p>
        </div>
      </footer>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 flex items-center justify-center cursor-pointer hover:scale-110 hover:border-primary transition-all duration-300 shadow-lg z-50"
        aria-label="Toggle theme"
      >
        <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
      </button>
    </div>
  );
}
