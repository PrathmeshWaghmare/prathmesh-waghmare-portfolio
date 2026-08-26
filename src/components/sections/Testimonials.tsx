"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, MessageSquarePlus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { getTestimonials, getSocials } from "@/lib/content";

export default function Testimonials() {
  const testimonials = getTestimonials();
  const socials = getSocials();
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="section-padding relative">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading index="09" label="Testimonials" title="What people say" />
          <Card className="detect-frame flex flex-col items-center gap-4 p-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              <MessageSquarePlus size={20} />
            </div>
            <p className="max-w-md text-sm text-[var(--color-text-muted)]">
              Testimonials from mentors, collaborators, and teammates will appear here.
              Add entries to <code className="rounded bg-[var(--color-card-hover)] px-1.5 py-0.5 telemetry text-xs">content/testimonials.json</code> to populate this section.
            </p>
            <a
              href={`mailto:${socials.email}`}
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              Know Prathmesh? Send a note →
            </a>
          </Card>
        </div>
      </section>
    );
  }

  const active = testimonials[index];
  const step = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading index="09" label="Testimonials" title="What people say" align="center" />
        <div className="relative mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-8 text-center md:p-10">
                <Quote className="mx-auto mb-4 text-[var(--color-primary)]" size={28} />
                <p className="text-lg text-[var(--color-text)] md:text-xl">{active.quote}</p>
                <p className="mt-6 font-medium text-[var(--color-text)]">{active.name}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{active.role}</p>
              </Card>
            </motion.div>
          </AnimatePresence>
          {testimonials.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={() => step(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-primary)]" aria-label="Previous">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => step(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-primary)]" aria-label="Next">
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
