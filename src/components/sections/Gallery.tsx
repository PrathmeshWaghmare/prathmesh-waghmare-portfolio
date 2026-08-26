"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { getGallery } from "@/lib/content";

export default function Gallery() {
  const gallery = getGallery();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(gallery.map((g) => g.category)))],
    [gallery]
  );
  const [category, setCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = gallery.filter((g) => category === "All" || g.category === category);

  function openLightbox(id: string) {
    const idx = filtered.findIndex((g) => g.id === id);
    setLightboxIndex(idx);
  }

  function step(dir: 1 | -1) {
    setLightboxIndex((idx) => {
      if (idx === null) return idx;
      const next = (idx + dir + filtered.length) % filtered.length;
      return next;
    });
  }

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="gallery" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          index="08"
          label="Gallery"
          title="Moments & milestones"
          description="ISRO, conferences, campus life, and community work. Real photos are being added — placeholders mark each slot for now."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                category === cat
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => openLightbox(item.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="detect-frame group relative block w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
            >
              <span className="detect-label">{item.category.toUpperCase()}</span>
              <div className={cn("relative aspect-square w-full", item.logo && "bg-white")}>
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className={cn(
                    "transition-transform duration-500 group-hover:scale-105",
                    item.logo ? "object-contain p-8" : "object-cover"
                  )}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left">
                <p className="text-xs text-white/90">{item.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white md:left-8"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-white/10",
                activeItem.logo && "bg-white"
              )}
            >
              <Image
                src={activeItem.image}
                alt={activeItem.caption}
                fill
                className={activeItem.logo ? "object-contain p-12" : "object-cover"}
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white md:right-8"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
            <p className="absolute bottom-8 text-sm text-white/80">{activeItem.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
