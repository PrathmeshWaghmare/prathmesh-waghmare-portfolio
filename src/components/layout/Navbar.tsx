"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, SunMedium, Moon, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { getProfile } from "@/lib/content";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const profile = getProfile();

  useEffect(() => {
    setMounted(true);
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = ["hero", ...links.map((l) => l.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  function goTo(id: string) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container-px mx-auto max-w-7xl">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
          )}
        >
          <button
            onClick={() => goTo("hero")}
            className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--color-text)]"
          >
            <span className="detect-frame flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-sm text-[var(--color-primary)] is-active">
              {profile.initials}
            </span>
            <span className="hidden sm:inline">{profile.name.split(" ")[0]}</span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === link.id
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-[var(--color-card-hover)] border border-[var(--color-border)]"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {theme === "dark" ? <SunMedium size={16} /> : <Moon size={16} />}
              </button>
            )}
            <a
              href={profile.resumeUrl}
              download
              className="hidden items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-medium text-white transition-transform hover:-translate-y-0.5 sm:flex"
            >
              <Download size={13} /> Resume
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-2 overflow-hidden rounded-2xl lg:hidden"
            >
              <div className="flex flex-col p-2">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => goTo(link.id)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-left text-sm transition-colors",
                      active === link.id
                        ? "bg-[var(--color-card-hover)] text-[var(--color-primary)]"
                        : "text-[var(--color-text-muted)]"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
