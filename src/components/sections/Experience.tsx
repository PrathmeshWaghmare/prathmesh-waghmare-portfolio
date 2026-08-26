"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { TechBadge } from "@/components/ui/TechBadge";
import { Card } from "@/components/ui/Card";
import { getExperience } from "@/lib/content";

export default function Experience() {
  const experience = getExperience();

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          label="Experience"
          title="Where I've worked"
          description="Research and engineering roles — including an ongoing research internship at ISRO's Space Applications Centre."
        />

        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-border)] to-transparent sm:block" />

          <div className="space-y-8">
            {experience.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-0 sm:pl-12"
              >
                <div className="absolute left-0 top-2 hidden h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-bg)] sm:flex">
                  <span className={`h-2.5 w-2.5 rounded-full ${job.current ? "bg-emerald-400 animate-pulse" : "bg-[var(--color-primary)]"}`} />
                </div>

                <Card className="detect-frame p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      {job.logo && (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-white p-1.5">
                          <Image
                            src={job.logo}
                            alt={`${job.organization} logo`}
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-text)]">
                          {job.role}
                        </h3>
                        <p className="mt-1 text-[var(--color-primary)]">{job.organization}</p>
                      </div>
                    </div>
                    {job.current && <Badge variant="accent">Ongoing</Badge>}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-text-dim)]">
                    <span className="telemetry">{job.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    <span>{job.type}</span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {job.highlights.map((h, idx) => (
                      <li key={idx} className="flex gap-2.5 text-sm text-[var(--color-text-muted)]">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.technologies.map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
