"use client";

import { useState, type ReactNode, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, FileDown, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Wraps a card (or any trigger content) so clicking it opens a lightbox
 * showing the actual certificate — a rendered preview image plus a link to
 * the original PDF/PNG file. If neither `image` nor `fileUrl` is provided,
 * this renders as an inert passthrough (no click affordance, no lightbox).
 */
export function CertificateViewer({
  image,
  fileUrl,
  title,
  subtitle,
  children,
  className,
}: {
  image?: string;
  fileUrl?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const viewable = Boolean(image || fileUrl);

  if (!viewable) {
    return <div className={className}>{children}</div>;
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={onKeyDown}
        aria-label={`View certificate: ${title}`}
        className={cn("group/cert relative cursor-pointer", className)}
      >
        {children}
        <span className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/90 px-2 py-1 text-[10px] text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover/cert:opacity-100">
          <Maximize2 size={10} /> View
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white sm:right-8 sm:top-8"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-card)]"
            >
              {image && (
                <div className="relative max-h-[65vh] w-full overflow-auto bg-black/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={title} className="w-full h-auto" />
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] p-4">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">{title}</p>
                  {subtitle && <p className="text-xs text-[var(--color-text-muted)]">{subtitle}</p>}
                </div>
                {fileUrl && (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3.5 py-2 text-xs text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    <FileDown size={13} /> Open original
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
