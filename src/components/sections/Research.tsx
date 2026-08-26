"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ExternalLink, CheckCircle2, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CertificateViewer } from "@/components/ui/CertificateViewer";
import { getResearch, getSocials } from "@/lib/content";
import { IeeeIcon } from "@/components/icons/BrandIcons";
import { cn } from "@/lib/utils";

const statusVariant = (live: boolean): "default" | "outline" | "accent" =>
  live ? "accent" : "outline";

type FilterKey = "all" | "live" | "pending";

export default function Research() {
  const papers = getResearch();
  const socials = getSocials();
  const liveCount = papers.filter((p) => p.ieeeLive).length;
  const pendingCount = papers.length - liveCount;

  const [filter, setFilter] = useState<FilterKey>("all");
  const filtered = useMemo(() => {
    if (filter === "live") return papers.filter((p) => p.ieeeLive);
    if (filter === "pending") return papers.filter((p) => !p.ieeeLive);
    return papers;
  }, [papers, filter]);

  const tabs: { key: FilterKey; label: string }[] = [
    { key: "all", label: `All (${papers.length})` },
    { key: "live", label: `Live on IEEE Xplore (${liveCount})` },
    { key: "pending", label: `Indexing Pending (${pendingCount})` },
  ];

  return (
    <section id="research" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="04"
            label="Research"
            title="Publications"
            description={`Author of ${papers.length} IEEE-indexed research papers — ${liveCount} live on IEEE Xplore, ${pendingCount} presented at conference with IEEE Xplore indexing pending.`}
            className="mb-0"
          />
          <div className="flex flex-wrap gap-3">
            {socials.ieee && (
              <Button href={socials.ieee} variant="outline" external>
                <IeeeIcon className="h-4 w-4" /> View IEEE Author Profile
              </Button>
            )}
            <Button href={socials.googleScholar} variant="outline" external>
              <GraduationCap size={16} /> Google Scholar
            </Button>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                filter === tab.key
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((paper, i) => (
              <motion.div
                layout
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <CertificateViewer
                  image={paper.image}
                  fileUrl={paper.fileUrl}
                  title={paper.title}
                  subtitle={paper.conference}
                >
                  <Card className="detect-frame flex h-full flex-col p-6 md:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <Badge variant={statusVariant(paper.ieeeLive)}>{paper.status}</Badge>
                      <span className="telemetry text-xs text-[var(--color-text-dim)]">{paper.year}</span>
                    </div>

                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[var(--color-text)]">
                      {paper.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {paper.abstract}
                    </p>

                    <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                      <p className="text-sm text-[var(--color-text)]">{paper.conference}</p>
                      {paper.venue && (
                        <p className="mt-0.5 text-xs text-[var(--color-text-dim)]">{paper.venue}</p>
                      )}
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <Badge>{paper.indexing}</Badge>

                        {paper.ieeeLive && socials.ieee ? (
                          <a
                            href={socials.ieee}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary)] transition-colors hover:opacity-80"
                          >
                            <CheckCircle2 size={13} />
                            Live on IEEE Xplore
                            <ExternalLink size={11} />
                          </a>
                        ) : socials.ieee ? (
                          <a
                            href={socials.ieee}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-primary)]"
                            title="Not yet indexed — will appear on the IEEE author profile once IEEE Xplore publishes it"
                          >
                            <Clock size={13} />
                            IEEE Xplore listing pending
                          </a>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-dim)]">
                            <Clock size={13} />
                            IEEE Xplore listing pending
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </CertificateViewer>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-[var(--color-text-muted)]">
            No publications in this filter.
          </p>
        )}

        <p className="mt-8 text-center text-xs text-[var(--color-text-dim)]">
          {liveCount} of {papers.length} papers are indexed and live on IEEE Xplore today. The remaining {pendingCount} have been presented
          at their respective conferences and will appear on the{" "}
          {socials.ieee ? (
            <a href={socials.ieee} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-primary)]">
              IEEE author profile
            </a>
          ) : (
            "IEEE author profile"
          )}{" "}
          once indexing completes.
        </p>
      </div>
    </section>
  );
}

