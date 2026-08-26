"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  Home, User, Briefcase, FolderGit2, BookOpen, Sparkles,
  Award, Trophy, Images, Mail, GraduationCap,
  SunMedium, Moon, FileDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, IeeeIcon } from "@/components/icons/BrandIcons";
import { getSocials, getProfile } from "@/lib/content";

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "research", label: "Research Publications", icon: BookOpen },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const socials = getSocials();
  const profile = getProfile();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const goTo = useCallback((id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openLink = useCallback((url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 rounded-full glass px-4 py-2.5 text-xs text-[var(--color-text-muted)] shadow-lg transition-colors hover:text-[var(--color-text)] hover:border-[var(--color-primary)]"
      >
        <span className="telemetry">⌘K</span>
        <span>Quick nav</span>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[12vh] px-4"
      onClick={() => setOpen(false)}
    >
      <Command
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-2xl"
        label="Command palette"
      >
        <div className="flex items-center border-b border-[var(--color-border)] px-4">
          <span className="eyebrow mr-2">$</span>
          <Command.Input
            autoFocus
            placeholder="Search sections, links, actions…"
            className="w-full bg-transparent py-3.5 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-dim)]"
          />
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-[var(--color-text-muted)]">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigate" className="px-2 py-1 text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
            {sections.map(({ id, label, icon: Icon }) => (
              <Command.Item
                key={id}
                onSelect={() => goTo(id)}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text)] aria-selected:bg-[var(--color-card-hover)] aria-selected:text-[var(--color-primary)]"
              >
                <Icon size={16} />
                {label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Links" className="px-2 py-1 text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
            <Command.Item
              onSelect={() => openLink(socials.github)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text)] aria-selected:bg-[var(--color-card-hover)] aria-selected:text-[var(--color-primary)]"
            >
              <GithubIcon size={16} /> GitHub
            </Command.Item>
            <Command.Item
              onSelect={() => openLink(socials.linkedin)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text)] aria-selected:bg-[var(--color-card-hover)] aria-selected:text-[var(--color-primary)]"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </Command.Item>
            <Command.Item
              onSelect={() => openLink(socials.googleScholar)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text)] aria-selected:bg-[var(--color-card-hover)] aria-selected:text-[var(--color-primary)]"
            >
              <GraduationCap size={16} /> Google Scholar
            </Command.Item>
            {socials.ieee && (
              <Command.Item
                onSelect={() => openLink(socials.ieee!)}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text)] aria-selected:bg-[var(--color-card-hover)] aria-selected:text-[var(--color-primary)]"
              >
                <IeeeIcon size={16} /> IEEE Author Profile
              </Command.Item>
            )}
            <Command.Item
              onSelect={() => openLink(profile.resumeUrl)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text)] aria-selected:bg-[var(--color-card-hover)] aria-selected:text-[var(--color-primary)]"
            >
              <FileDown size={16} /> Download Resume
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions" className="px-2 py-1 text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
            <Command.Item
              onSelect={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text)] aria-selected:bg-[var(--color-card-hover)] aria-selected:text-[var(--color-primary)]"
            >
              {theme === "dark" ? <SunMedium size={16} /> : <Moon size={16} />}
              Toggle theme
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2 text-[10px] text-[var(--color-text-dim)]">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </Command>
    </div>
  );
}
