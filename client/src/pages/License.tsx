import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function License() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-64 pb-16 sm:pt-72">
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

      <Footer />
    </div>
  );
}
