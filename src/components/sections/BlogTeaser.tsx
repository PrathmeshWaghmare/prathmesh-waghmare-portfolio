"use client";

import { motion } from "framer-motion";
import { Newspaper, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { getBlogPosts } from "@/lib/content";

export default function BlogTeaser() {
  const posts = getBlogPosts();

  return (
    <section id="blog" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading index="11" label="Writing" title="From the blog" />

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="detect-frame flex flex-col items-center gap-4 p-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Newspaper size={20} />
              </div>
              <p className="max-w-md text-sm text-[var(--color-text-muted)]">
                Long-form write-ups on computer vision, satellite imagery, and research
                are on the way. Drop Markdown files into{" "}
                <code className="rounded bg-[var(--color-card-hover)] px-1.5 py-0.5 telemetry text-xs">content/blog.json</code>{" "}
                to publish here.
              </p>
              <a href="/blog" className="flex items-center gap-1.5 text-sm text-[var(--color-primary)] hover:underline">
                Visit blog <ArrowRight size={14} />
              </a>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Card key={post.id} className="detect-frame p-6">
                <p className="telemetry text-xs text-[var(--color-text-dim)]">{post.date}</p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] font-semibold text-[var(--color-text)]">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{post.excerpt}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
