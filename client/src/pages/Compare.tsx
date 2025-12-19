import { Check, X, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Compare() {
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

  const Icon = ({ status }: { status: '✅' | '❌' | '⚠️' | '' }) => {
    if (status === '✅') return <Check className="w-5 h-5 text-green-500" />;
    if (status === '❌') return <X className="w-5 h-5 text-red-500" />;
    if (status === '⚠️') return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <img src="/assets/logo/kubegraf_color_icon.png" alt="KubeGraf" className="object-contain" style={{ width: 96, height: 96 }} />
            KubēGraf
          </a>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="/docs" className="hover:text-primary transition-colors">Docs</a>
            <a href="/kubegraf" className="hover:text-primary transition-colors">What is KubeGraf?</a>
            <a href="/pricing" className="hover:text-primary transition-colors">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            How KubeGraf Compares
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            KubeGraf focuses on incident understanding and safe action, not just visibility.
          </p>
        </motion.div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 font-semibold text-sm">Capability</th>
                <th className="text-center py-4 px-4 font-bold text-primary text-sm">KubeGraf</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">Lens Desktop</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">k9s</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">kubectl</th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground text-sm">Datadog</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Primary purpose</td>
                <td className="py-4 px-4 text-center text-primary font-semibold">Incident intelligence & safe ops</td>
                <td className="py-4 px-4 text-center text-muted-foreground">Cluster visibility</td>
                <td className="py-4 px-4 text-center text-muted-foreground">CLI navigation</td>
                <td className="py-4 px-4 text-center text-muted-foreground">Raw control</td>
                <td className="py-4 px-4 text-center text-muted-foreground">Observability SaaS</td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Local-first</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Mandatory SaaS</td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Automatic incident detection</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Explains <em>why</em> failures happen</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Evidence-backed diagnosis</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Change correlation</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Safe fix recommendations</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Dry-run fix preview</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Human-in-the-loop actions</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Terminal UI (TUI)</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Web / SPA interface</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Unified multi-cluster incidents</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Incident knowledge retention</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
                <td className="py-4 px-4 text-center"></td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Runs fully offline</td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="⚠️" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="✅" /></td>
                <td className="py-4 px-4 text-center"><Icon status="❌" /></td>
              </tr>

              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Binary footprint</td>
                <td className="py-4 px-4 text-center text-primary font-semibold">~15 MB</td>
                <td className="py-4 px-4 text-center text-muted-foreground">~300 MB+</td>
                <td className="py-4 px-4 text-center text-muted-foreground">~20 MB</td>
                <td className="py-4 px-4 text-center text-muted-foreground">~50 MB</td>
                <td className="py-4 px-4 text-center"></td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-3">&copy; 2025 KubēGraf</p>
          <div className="flex justify-center gap-6 text-xs">
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/license" className="hover:text-primary transition-colors">License</a>
          </div>
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
