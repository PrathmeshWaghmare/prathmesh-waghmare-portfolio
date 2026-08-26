"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Eye, LayoutGrid, Wrench, Database, Sparkles, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { getSkills } from "@/lib/content";
import { getTechIcon } from "@/lib/techIcons";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  brain: Brain,
  eye: Eye,
  layout: LayoutGrid,
  wrench: Wrench,
  database: Database,
  sparkles: Sparkles,
};

export default function Skills() {
  const categories = getSkills();

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          label="Skills"
          title="Tools & technologies"
          description="From model training and remote-sensing pipelines to full-stack web development."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat, ci) => {
            const Icon = ICONS[cat.icon] ?? Sparkles;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: ci * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-text)]">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {cat.skills.map((skill, si) => {
                      const icon = getTechIcon(skill.name);
                      return (
                        <div key={skill.name}>
                          <div className="mb-1.5 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                              {icon && (
                                <svg viewBox="0 0 24 24" width={12} height={12} fill={`#${icon.hex}`} aria-hidden="true">
                                  <path d={icon.path} />
                                </svg>
                              )}
                              {skill.name}
                            </span>
                            <span className="telemetry text-[var(--color-text-dim)]">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.9, delay: si * 0.05, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
