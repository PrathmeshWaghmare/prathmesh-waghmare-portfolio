"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
  className,
}: {
  index?: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      <div className={cn("mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
        {index && <span className="telemetry text-xs text-[var(--color-text-dim)]">{index}</span>}
        <span className="eyebrow">{label}</span>
        <span className="h-px flex-1 max-w-16 bg-[var(--color-border)]" />
      </div>
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-[var(--color-text-muted)] md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
