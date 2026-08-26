import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundFX from "@/components/layout/BackgroundFX";
import { Card } from "@/components/ui/Card";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on computer vision, satellite imagery, and research from Prathmesh Waghmare.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <BackgroundFX />
      <Navbar />
      <main id="main-content" className="section-padding pt-32">
        <div className="container-px mx-auto max-w-4xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            <ArrowLeft size={14} /> Back home
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 max-w-xl text-[var(--color-text-muted)]">
            Notes on computer vision, satellite imagery, and research — written up here as they happen.
          </p>

          <div className="mt-12">
            {posts.length === 0 ? (
              <Card className="detect-frame flex flex-col items-center gap-4 p-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Newspaper size={20} />
                </div>
                <p className="max-w-md text-sm text-[var(--color-text-muted)]">
                  No posts yet. This page is wired up and ready — add entries to{" "}
                  <code className="rounded bg-[var(--color-card-hover)] px-1.5 py-0.5 telemetry text-xs">
                    src/content/blog.json
                  </code>{" "}
                  (Markdown supported) and they&apos;ll appear here automatically.
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="detect-frame p-6">
                    <p className="telemetry text-xs text-[var(--color-text-dim)]">{post.date}</p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">{post.excerpt}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
