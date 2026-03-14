import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { FooterModern } from "@/components/sections/modern";
import { getBlogPost, getRelatedPosts, BlogSection } from "@/data/blogPosts";
import NotFound from "@/pages/not-found";

function renderSection(section: BlogSection, i: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="text-lg sm:text-2xl font-bold mt-8 sm:mt-10 mb-3 sm:mb-4"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="text-base sm:text-lg font-semibold mt-6 sm:mt-7 mb-2 sm:mb-3"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="space-y-2 mb-5">
          {section.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "hsl(var(--primary))" }}
              />
              <span className="flex-1 min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="space-y-2 mb-5">
          {section.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-muted-foreground text-sm">
              <span
                className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                style={{
                  background: "hsl(var(--primary) / 0.15)",
                  color: "hsl(var(--primary))",
                }}
              >
                {j + 1}
              </span>
              <span className="flex-1 min-w-0">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          key={i}
          className="my-6 sm:my-7 px-4 sm:px-5 py-4 rounded-xl border-l-4 text-sm leading-relaxed"
          style={{
            background: "hsl(var(--primary) / 0.08)",
            borderColor: "hsl(var(--primary))",
            color: "hsl(var(--foreground))",
          }}
        >
          {section.text}
        </div>
      );
    case "code":
      return (
        <div key={i} className="my-4 sm:my-5 rounded-lg overflow-hidden" style={{ maxWidth: "100%" }}>
          {section.lang && (
            <div
              className="flex items-center px-3 py-1.5 text-xs font-mono"
              style={{
                background: "hsl(220 13% 12%)",
                color: "#9ca3af",
                borderBottom: "1px solid hsl(220 13% 18%)",
              }}
            >
              {section.lang}
            </div>
          )}
          {/* Outer div handles horizontal scroll on mobile */}
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <pre
              className="p-3 sm:p-4 text-xs sm:text-sm font-mono leading-relaxed"
              style={{
                background: "hsl(220 13% 8%)",
                color: "#e5e7eb",
                margin: 0,
                minWidth: "100%",
                width: "max-content",
              }}
            >
              <code>{section.text}</code>
            </pre>
          </div>
        </div>
      );
    default:
      return null;
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  "Troubleshooting": "hsl(var(--primary))",
  "Incident Management": "#f59e0b",
  "Platform Engineering": "#8b5cf6",
  "AI SRE": "#10b981",
};

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPost(params.slug ?? "");
  const related = post ? getRelatedPosts(post.slug, 3) : [];

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — KubeGraf Blog`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", post.description);

    const ld = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      keywords: post.tags.join(", "),
      url: `https://kubegraf.io/blog/${post.slug}`,
      author: { "@type": "Organization", name: "KubeGraf", url: "https://kubegraf.io" },
      publisher: {
        "@type": "Organization",
        name: "KubeGraf",
        url: "https://kubegraf.io",
        logo: "https://kubegraf.io/web-app-manifest-512x512.png",
      },
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [post]);

  if (!post) return <NotFound />;

  const catColor = CATEGORY_COLORS[post.category] ?? "hsl(var(--primary))";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar disableScrollEffects />

      <main className="pt-16 sm:pt-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Back link — larger touch target */}
            <Link href="/blog">
              <span
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors mb-6 sm:mb-8 cursor-pointer py-2"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                All articles
              </span>
            </Link>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: `${catColor}22`, color: catColor }}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {post.readTime} min read
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 sm:mb-5">
              {post.title}
            </h1>

            {/* Description lead */}
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/10">
              {post.description}
            </p>

            {/* Tags — scrollable on mobile */}
            <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-muted-foreground flex-shrink-0"
                  style={{ background: "hsl(var(--muted))" }}
                >
                  <Tag className="w-2.5 h-2.5 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>

            {/* Article body */}
            <div>
              {post.content.map((section, i) => renderSection(section, i))}
            </div>

            {/* CTA card */}
            <div
              className="mt-10 sm:mt-14 p-5 sm:p-7 rounded-2xl border border-white/10 text-center"
              style={{ background: "hsl(var(--card))" }}
            >
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Want this automated?</p>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                KubeGraf handles{" "}
                <span style={{ color: "hsl(var(--primary))" }}>diagnosis and remediation</span>{" "}
                automatically.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5 max-w-md mx-auto leading-relaxed">
                Local-first AI SRE platform for Kubernetes. Detects, diagnoses, and fixes incidents
                with SafeFix™ dry-run validation — your data never leaves your cluster.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full font-bold"
                  onClick={() => { window.location.href = "/#early-access"; }}
                >
                  Get Early Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link href="/docs/quickstart.html">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full font-semibold">
                    Quick Start Guide
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <div
                    className="group rounded-xl border border-white/10 p-4 sm:p-5 cursor-pointer transition-all active:scale-[0.98] flex flex-col gap-2"
                    style={{ background: "hsl(var(--card))", WebkitTapHighlightColor: "transparent" }}
                  >
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold self-start"
                      style={{
                        background: `${CATEGORY_COLORS[rp.category] ?? "hsl(var(--primary))"}22`,
                        color: CATEGORY_COLORS[rp.category] ?? "hsl(var(--primary))",
                      }}
                    >
                      {rp.category}
                    </span>
                    <h3 className="font-semibold text-sm leading-snug sm:group-hover:text-primary transition-colors">
                      {rp.title}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground mt-auto">
                      <Clock className="w-3 h-3" />
                      {rp.readTime} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <FooterModern />
    </div>
  );
}
