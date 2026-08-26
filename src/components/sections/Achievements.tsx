"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CertificateViewer } from "@/components/ui/CertificateViewer";
import { getAchievements } from "@/lib/content";

export default function Achievements() {
  const achievements = getAchievements();

  return (
    <section id="achievements" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          index="07"
          label="Achievements"
          title="Milestones & recognition"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {achievements.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <CertificateViewer
                image={item.image}
                fileUrl={item.fileUrl}
                title={item.title}
                subtitle={item.category}
              >
                <Card className="detect-frame flex h-full items-start gap-4 p-6">
                  {item.logo ? (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-white p-1.5">
                      <Image
                        src={item.logo}
                        alt=""
                        width={36}
                        height={36}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-purple)]/20 text-[var(--color-primary)]">
                      <Trophy size={19} />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-snug text-[var(--color-text)]">{item.title}</p>
                    </div>
                    <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{item.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-primary)]"
                        >
                          Source <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </CertificateViewer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
