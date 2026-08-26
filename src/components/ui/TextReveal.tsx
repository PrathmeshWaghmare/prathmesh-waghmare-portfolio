"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Splits `text` into words and reveals them with a GSAP stagger — used for
 * the hero headline. Kept separate from the rest of the site's Framer
 * Motion animations since GSAP's tween engine is a better fit for this
 * kind of per-character/word choreography.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = el.querySelectorAll<HTMLElement>(".word");

    if (prefersReducedMotion) {
      gsap.set(words, { opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    gsap.fromTo(
      words,
      { opacity: 0, y: "110%", rotateX: -40 },
      {
        opacity: 1,
        y: "0%",
        rotateX: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        delay,
      }
    );
  }, [delay]);

  return (
    <span ref={ref} className={className} style={{ perspective: 600 }}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <span className="word inline-block will-change-transform">
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
