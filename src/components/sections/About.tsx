"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Globe2, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getProfile } from "@/lib/content";

export default function About() {
  const profile = getProfile();

  return (
    <section id="about" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading index="01" label="About" title="Who I am" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg leading-relaxed text-[var(--color-text-muted)] md:text-xl">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Badge key={interest}>{interest}</Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <Card className="detect-frame p-6">
              <div className="flex items-start gap-4">
                {profile.education.logo ? (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-white p-1">
                    <Image
                      src={profile.education.logo}
                      alt={`${profile.education.institution} logo`}
                      width={36}
                      height={36}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <GraduationCap size={20} />
                  </div>
                )}
                <div>
                  <p className="eyebrow">Education</p>
                  <p className="mt-1.5 font-medium text-[var(--color-text)]">
                    {profile.education.degree} — {profile.education.branch}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {profile.education.institution}, {profile.education.location}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="accent">{profile.education.expected}</Badge>
                    <Badge variant="outline">CGPA {profile.education.cgpa}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="detect-frame p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  <Globe2 size={20} />
                </div>
                <div>
                  <p className="eyebrow">Languages</p>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    {profile.languages.join(" · ")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="detect-frame p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-purple)]/10 text-[var(--color-purple)]">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="eyebrow">Focus Areas</p>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    Computer Vision · Remote Sensing · Medical Imaging · Full-Stack Web
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
