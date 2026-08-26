"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CertificateViewer } from "@/components/ui/CertificateViewer";
import { getCertifications } from "@/lib/content";

export default function Certifications() {
  const certifications = getCertifications();

  return (
    <section id="certifications" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          index="06"
          label="Certifications"
          title="Courses & credentials"
          description={`${certifications.length} certifications across research, cloud, security, and software development — click any card with a "View" badge to see the original certificate.`}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <CertificateViewer
                image={cert.image}
                fileUrl={cert.fileUrl}
                title={cert.title}
                subtitle={[cert.organization, cert.year].filter(Boolean).join(" · ")}
              >
                <Card className="detect-frame flex h-full items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Award size={19} />
                  </div>
                  <div>
                    <p className="font-medium leading-snug text-[var(--color-text)]">{cert.title}</p>
                    {cert.organization && (
                      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{cert.organization}</p>
                    )}
                    <div className="mt-1.5 flex items-center gap-3">
                      {cert.year && (
                        <span className="telemetry text-xs text-[var(--color-text-dim)]">{cert.year}</span>
                      )}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
                        >
                          Verify <ExternalLink size={11} />
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
