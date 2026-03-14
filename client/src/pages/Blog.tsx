import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { FooterModern } from "@/components/sections/modern";
import { blogPosts } from "@/data/blogPosts";

const CATEGORY_COLORS: Record<string, string> = {
  "Troubleshooting": "hsl(var(--primary))",
  "Incident Management": "#f59e0b",
  "Platform Engineering": "#8b5cf6",
  "AI SRE": "#10b981",
};

function categoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "hsl(var(--primary))";
}

export default function Blog() {
  useEffect(() => {
    document.title = "Blog — KubeGraf | Kubernetes Incident Management & AI SRE Guides";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Kubernetes troubleshooting guides, AI SRE best practices, CrashLoopBackOff & OOMKilled fixes, incident management frameworks, and Prometheus alert automation — from the KubeGraf team."
      );
    }

    const ld = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "KubeGraf Blog",
      url: "https://kubegraf.io/blog",
      description:
        "Kubernetes troubleshooting guides, AI SRE best practices, and incident management frameworks.",
      publisher: { "@type": "Organization", name: "KubeGraf", url: "https://kubegraf.io" },
      blogPost: blogPosts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        url: `https://kubegraf.io/blog/${p.slug}`,
        datePublished: p.date,
        keywords: p.tags.join(", "),
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar disableScrollEffects />

      <main className="pt-16 sm:pt-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 sm:mb-4"
              style={{
                background: "hsl(var(--primary) / 0.12)",
                color: "hsl(var(--primary))",
                border: "1px solid hsl(var(--primary) / 0.25)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(var(--primary))" }} />
              Kubernetes & AI SRE
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
              KubeGraf{" "}
              <span style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), #0891b2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Blog
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Kubernetes troubleshooting guides, AI SRE best practices, and incident management
              frameworks — written for SREs and platform engineers.
            </p>
          </motion.div>

          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 sm:mb-12"
          >
            <Link href={`/blog/${featured.slug}`}>
              <div
                className="group relative rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all active:scale-[0.99]"
                style={{ background: "hsl(var(--card))", WebkitTapHighlightColor: "transparent" }}
              >
                <div
                  className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top left, hsl(var(--primary) / 0.06), transparent 60%)" }}
                />
                <div className="relative p-5 sm:p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: `${categoryColor(featured.category)}22`,
                        color: categoryColor(featured.category),
                      }}
                    >
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {featured.readTime} min read
                    </span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {new Date(featured.date).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 sm:group-hover:text-primary transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 max-w-3xl leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {featured.description}
                  </p>
                  <div className="hidden sm:flex flex-wrap gap-2 mb-5">
                    {featured.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-muted-foreground"
                        style={{ background: "hsl(var(--muted))" }}
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {t}
                      </span>
                    ))}
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold sm:group-hover:gap-2.5 transition-all"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Post grid — 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div
                    className="group h-full rounded-xl border border-white/10 p-4 sm:p-5 cursor-pointer transition-all active:scale-[0.98] flex flex-col"
                    style={{
                      background: "hsl(var(--card))",
                      WebkitTapHighlightColor: "transparent",
                      minHeight: "44px",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: `${categoryColor(post.category)}22`,
                          color: categoryColor(post.category),
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base mb-2 leading-snug sm:group-hover:text-primary transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 border-t border-white/5">
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground sm:group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <FooterModern />
    </div>
  );
}
