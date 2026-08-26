"use client";

import { GraduationCap, Mail, ArrowUp, Users } from "lucide-react";
import { GithubIcon, LinkedinIcon, IeeeIcon } from "@/components/icons/BrandIcons";
import { getProfile, getSocials } from "@/lib/content";

export default function Footer() {
  const profile = getProfile();
  const socials = getSocials();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--color-border)]">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold">
              {profile.name}
            </span>
            <p className="mt-3 max-w-xs text-sm text-[var(--color-text-muted)]">
              {profile.shortBio}
            </p>
            <div className="mt-5 flex gap-3">
              <SocialIcon href={socials.github} label="GitHub"><GithubIcon size={16} /></SocialIcon>
              <SocialIcon href={socials.linkedin} label="LinkedIn"><LinkedinIcon size={16} /></SocialIcon>
              <SocialIcon href={socials.googleScholar} label="Google Scholar"><GraduationCap size={16} /></SocialIcon>
              {socials.ieee && (
                <SocialIcon href={socials.ieee} label="IEEE Author Profile"><IeeeIcon size={16} /></SocialIcon>
              )}
              {socials.gdgCommunity && (
                <SocialIcon href={socials.gdgCommunity} label="GDG on Campus DMIHER"><Users size={16} /></SocialIcon>
              )}
              <SocialIcon href={`mailto:${socials.email}`} label="Email"><Mail size={16} /></SocialIcon>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">Quick Links</p>
            <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
              {[
                ["about", "About"],
                ["experience", "Experience"],
                ["projects", "Projects"],
                ["research", "Research"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className="transition-colors hover:text-[var(--color-primary)]"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Get in Touch</p>
            <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
              <li>{profile.location}</li>
              <li>
                <a href={`mailto:${socials.email}`} className="transition-colors hover:text-[var(--color-primary)]">
                  {socials.email}
                </a>
              </li>
              <li>
                <a href={`tel:${socials.phone}`} className="transition-colors hover:text-[var(--color-primary)]">
                  {socials.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-dim)] sm:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3.5 py-2 transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
    >
      {children}
    </a>
  );
}
