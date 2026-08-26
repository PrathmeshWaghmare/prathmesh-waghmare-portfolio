"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Search, ChevronDown, FileText } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { TechBadge } from "@/components/ui/TechBadge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { getProjects } from "@/lib/content";

export default function Projects() {
  const projects = getProjects();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = projects.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          label="Projects"
          title="Things I've built"
          description="From ISRO satellite-imagery research to healthcare AI and full-stack web platforms."
        />

        {/* Controls */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                  category === cat
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech…"
              className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-card)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-primary)]"
            />
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const isOpen = expanded === project.id;
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(isOpen && "md:col-span-2 lg:col-span-3")}
                >
                  <Card className="detect-frame h-full overflow-hidden">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <span className="detect-label">{project.category.toUpperCase()}</span>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
                      {project.status.includes("ISRO") && (
                        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/95 p-1 shadow-lg">
                          <Image
                            src="/images/logos/isro.webp"
                            alt="ISRO"
                            width={30}
                            height={30}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="outline">{project.status}</Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[var(--color-text)]">
                          {project.title}
                        </h3>
                        <span className="telemetry shrink-0 text-[11px] text-[var(--color-text-dim)]">
                          {project.duration}
                        </span>
                      </div>

                      <p className="mt-2.5 text-sm text-[var(--color-text-muted)]">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <TechBadge key={t} name={t} />
                        ))}
                      </div>

                      {project.researchIds && project.researchIds.length > 0 && (
                        <a
                          href="#research"
                          className="mt-4 flex items-center gap-1.5 rounded-md border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-2.5 py-1.5 text-xs font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/20 w-fit"
                        >
                          <FileText size={13} />
                          Published as {project.researchIds.length > 1 ? `${project.researchIds.length} research papers` : "a research paper"}
                        </a>
                      )}

                      <AnimatePresence>
                        {isOpen && project.highlights.length > 0 && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-2 overflow-hidden border-t border-[var(--color-border)] pt-4"
                          >
                            {project.highlights.map((h, idx) => (
                              <li key={idx} className="text-sm text-[var(--color-text-muted)]">
                                — {h}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
                            >
                              <GithubIcon className="h-[15px] w-[15px]" /> Code
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
                            >
                              <ExternalLink size={15} /> Live
                            </a>
                          )}
                        </div>
                        {project.highlights.length > 0 && (
                          <button
                            onClick={() => setExpanded(isOpen ? null : project.id)}
                            className="flex items-center gap-1 text-xs text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-primary)]"
                          >
                            {isOpen ? "Less" : "Details"}
                            <ChevronDown size={13} className={cn("transition-transform", isOpen && "rotate-180")} />
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-[var(--color-text-muted)]">
            No projects match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </section>
  );
}
