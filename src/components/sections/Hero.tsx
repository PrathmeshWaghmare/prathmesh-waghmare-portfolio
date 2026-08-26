"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Mail, MapPin, ArrowDown, Download, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, IeeeIcon } from "@/components/icons/BrandIcons";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { getProfile, getSocials } from "@/lib/content";

function useTypewriter(words: string[], typeSpeed = 55, deleteSpeed = 30, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const profile = getProfile();
  const socials = getSocials();
  const typed = useTypewriter(profile.titleRoles);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="container-px mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Text column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] glass px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">{profile.availability}</span>
          </motion.div>

          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <TextReveal text="Hi, I'm" />{" "}
            <TextReveal text={profile.name} className="text-gradient" delay={0.15} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex h-8 items-center gap-2 telemetry text-lg text-[var(--color-primary)] sm:text-xl"
          >
            <span>{typed}</span>
            <span className="inline-block h-6 w-[2px] animate-pulse bg-[var(--color-primary)]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text-dim)]"
          >
            <MapPin size={14} /> {profile.location}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href={profile.resumeUrl} size="lg">
              <Download size={16} /> Download Resume
            </Button>
            <Button href="#contact" variant="outline" size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              <Send size={16} /> Hire Me
            </Button>
            <Button href="#projects" variant="ghost" size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects <ArrowDown size={16} />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 flex items-center gap-3"
          >
            {[
              { href: socials.github, icon: GithubIcon, label: "GitHub" },
              { href: socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
              ...(socials.ieee ? [{ href: socials.ieee, icon: IeeeIcon, label: "IEEE Author Profile" }] : []),
              { href: socials.googleScholar, icon: GraduationCap, label: "Google Scholar" },
              { href: `mailto:${socials.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="detect-frame flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>

          {/* Animated stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-12 grid max-w-lg grid-cols-2 gap-5 sm:grid-cols-4"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <div className="telemetry text-xl font-semibold text-[var(--color-text)] sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-text-dim)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="detect-frame is-active relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] glass">
            <span className="detect-label">SUBJECT: {profile.initials} · 99.4%</span>
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-transparent" />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-4 bottom-6 hidden items-center gap-3 rounded-2xl border border-[var(--color-border)] px-4 py-3 shadow-xl sm:flex"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-1">
              <Image src="/images/logos/isro.webp" alt="ISRO" width={26} height={26} className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="eyebrow">Currently</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--color-text)]">Research Intern @ ISRO</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass absolute -right-4 top-6 hidden rounded-2xl border border-[var(--color-border)] px-4 py-3 shadow-xl sm:block"
          >
            <p className="eyebrow">Publications</p>
            <p className="mt-1 text-sm font-medium text-[var(--color-text)]">6 IEEE-Indexed Papers</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-text-dim)] md:flex"
        aria-label="Scroll to about section"
      >
        <span className="eyebrow text-[10px]">Scroll</span>
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}
