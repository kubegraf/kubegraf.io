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
          className="text-xl sm:text-2xl font-bold mt-10 mb-4"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="text-lg font-semibold mt-7 mb-3"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="list-none space-y-2 mb-5">
          {section.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "hsl(var(--primary))" }}
              />
              {item}
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
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          key={i}
          className="my-7 px-5 py-4 rounded-xl border-l-4 text-sm leading-relaxed"
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
        <div key={i} className="my-5">
          {section.lang && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-mono"
              style={{
                background: "hsl(var(--muted))",
                color: "hsl(var(--muted-foreground))",
                borderBottom: "1px solid hsl(var(--border))",
              }}
            >
              {section.lang}
            </div>
          )}
          <pre
            className="overflow-x-auto p-4 text-sm font-mono leading-relaxed rounded-b-lg"
            style={{ background: "hsl(220 13% 8%)", color: "#e5e7eb" }}
          >
            <code>{section.text}</code>
          </pre>
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
      author: {
        "@type": "Organization",
        name: "KubeGraf",
        url: "https://kubegraf.io",
      },
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

      <main className="pt-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Back link */}
            <Link href="/blog">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                All articles
              </span>
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
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
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-5">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 pb-6 border-b border-white/10">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((t) => (
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

            {/* Content */}
            <div className="prose-like">
              {post.content.map((section, i) => renderSection(section, i))}
            </div>

            {/* CTA */}
            <div
              className="mt-14 p-7 rounded-2xl border border-white/10 text-center"
              style={{ background: "hsl(var(--card))" }}
            >
              <p className="text-sm text-muted-foreground mb-1">Want this automated?</p>
              <h2 className="text-xl font-bold mb-3">
                KubeGraf handles{" "}
                <span style={{ color: "hsl(var(--primary))" }}>diagnosis and remediation</span>{" "}
                automatically.
              </h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                Local-first AI SRE platform for Kubernetes. Detects, diagnoses, and fixes incidents
                with SafeFix™ dry-run validation — your data never leaves your cluster.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  className="rounded-full font-bold"
                  onClick={() => {
                    window.location.href = "/#early-access";
                  }}
                >
                  Get Early Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link href="/docs/quickstart.html">
                  <Button variant="outline" size="lg" className="rounded-full font-semibold">
                    Quick Start Guide
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
            <h2 className="text-xl font-bold mb-6 text-center">More Articles</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <div
                    className="group rounded-xl border border-white/10 p-5 cursor-pointer transition-all hover:border-white/20 hover:-translate-y-0.5"
                    style={{ background: "hsl(var(--card))" }}
                  >
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold mb-3 inline-block"
                      style={{
                        background: `${CATEGORY_COLORS[rp.category] ?? "hsl(var(--primary))"}22`,
                        color: CATEGORY_COLORS[rp.category] ?? "hsl(var(--primary))",
                      }}
                    >
                      {rp.category}
                    </span>
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors mb-2">
                      {rp.title}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
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
