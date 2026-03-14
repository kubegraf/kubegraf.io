import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import styles from "./FeaturedPosts.module.css";

const CATEGORY_COLORS: Record<string, string> = {
  "Troubleshooting": "hsl(var(--primary))",
  "Incident Management": "#f59e0b",
  "Platform Engineering": "#8b5cf6",
  "AI SRE": "#10b981",
};

export default function FeaturedPosts() {
  const featured = blogPosts.slice(0, 3);

  return (
    <section className={styles.section} aria-label="Featured blog posts">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>From the Blog</span>
          </div>
          <h2 className={styles.title}>
            Kubernetes Guides &{" "}
            <span className={styles.highlight}>Incident Playbooks</span>
          </h2>
          <p className={styles.subtitle}>
            Practical guides on Kubernetes troubleshooting, AI SRE best practices, and incident management — written for SREs and platform engineers.
          </p>
        </div>

        <div className={styles.grid}>
          {featured.map((post) => {
            const catColor = CATEGORY_COLORS[post.category] ?? "hsl(var(--primary))";
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className={styles.card}>
                  <div className={styles.cardMeta}>
                    <span
                      className={styles.category}
                      style={{
                        background: `${catColor}22`,
                        color: catColor,
                      }}
                    >
                      {post.category}
                    </span>
                    <span className={styles.readTime}>
                      <Clock className={styles.clockIcon} aria-hidden="true" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardDesc}>{post.description}</p>
                  <span className={styles.readMore}>
                    Read article <ArrowRight className={styles.arrow} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.footer}>
          <Link href="/blog">
            <span className={styles.viewAll}>
              View all articles <ArrowRight className={styles.viewAllArrow} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
