import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

export default function License() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-white/5 py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <img src="/assets/logo/kubegraf_color_icon.png" alt="KubeGraf" className="object-contain" style={{ width: 96, height: 96 }} />
            KubeGraf
          </a>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="/docs" className="hover:text-primary transition-colors">Docs</a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">License</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              KubeGraf is licensed under the <strong className="text-foreground">Apache License 2.0</strong>.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What the license allows</h2>
            <p>
              You may use, modify, and distribute KubeGraf for any purpose, including commercial use. You can create derivative works, integrate KubeGraf into proprietary products, and use it in production environments without restriction.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What the license requires</h2>
            <p>
              If you distribute KubeGraf or any derivative work, you must include a copy of the Apache License 2.0 and preserve all copyright, patent, trademark, and attribution notices from the original source code.
            </p>
            <p>
              If you modify KubeGraf, you must clearly mark your changes and include a notice stating that you modified the files.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Patent grant</h2>
            <p>
              The Apache License 2.0 includes an express patent grant. Contributors grant you a license to any patents they hold that cover their contributions to KubeGraf. If you sue anyone over patent claims related to KubeGraf, your patent license terminates.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Commercial use</h2>
            <p>
              Commercial use is explicitly allowed. You can use KubeGraf in your business, sell products that include it, or offer services based on it. No additional license or permission is required.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Full license text</h2>
            <p>
              The complete Apache License 2.0 is available at:
            </p>
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-mono text-sm"
            >
              https://www.apache.org/licenses/LICENSE-2.0
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="mt-4">
              A copy of the license is also included in the <code className="text-sm bg-white/5 px-2 py-1 rounded">LICENSE</code> file in the KubeGraf source repository.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 KubeGraf</p>
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
