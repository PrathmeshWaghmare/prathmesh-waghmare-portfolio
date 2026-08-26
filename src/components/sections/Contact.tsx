"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, GraduationCap, CalendarClock, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, IeeeIcon } from "@/components/icons/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getProfile, getSocials } from "@/lib/content";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Please add a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

export default function Contact() {
  const profile = getProfile();
  const socials = getSocials();
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    // No backend is wired up by default — this opens the visitor's email
    // client pre-filled with the message. To send silently instead, add
    // your EmailJS keys and swap this block for an emailjs.send(...) call.
    const body = `${data.message}\n\n— ${data.name} (${data.email})`;
    window.location.href = `mailto:${socials.email}?subject=${encodeURIComponent(
      data.subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          index="10"
          label="Contact"
          title="Let's build something"
          description="Open to AI/ML research internships, SDE roles, and interesting collaborations."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Card className="detect-frame p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="eyebrow">Email</p>
                  <a href={`mailto:${socials.email}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-primary)]">
                    {socials.email}
                  </a>
                </div>
              </div>
            </Card>
            <Card className="detect-frame p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="eyebrow">Phone</p>
                  <a href={`tel:${socials.phone}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-primary)]">
                    {socials.phone}
                  </a>
                </div>
              </div>
            </Card>
            <Card className="detect-frame p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-purple)]/10 text-[var(--color-purple)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="eyebrow">Location</p>
                  <p className="text-sm text-[var(--color-text)]">{profile.location}</p>
                </div>
              </div>
            </Card>

            <div className="flex gap-3 pt-2">
              <Button href={socials.github} variant="outline" size="icon" external><GithubIcon className="h-4 w-4" /></Button>
              <Button href={socials.linkedin} variant="outline" size="icon" external><LinkedinIcon className="h-4 w-4" /></Button>
              <Button href={socials.googleScholar} variant="outline" size="icon" external><GraduationCap size={16} /></Button>
              {socials.ieee && (
                <Button href={socials.ieee} variant="outline" size="icon" external><IeeeIcon className="h-4 w-4" /></Button>
              )}
            </div>

            <a
              href={`mailto:${socials.email}?subject=${encodeURIComponent("Let's schedule a call")}`}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--color-border)] px-5 py-4 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              <CalendarClock size={16} /> Book a call — email to schedule
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name?.message}>
                    <input {...register("name")} className="input-field" placeholder="Your name" />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input {...register("email")} type="email" className="input-field" placeholder="you@example.com" />
                  </Field>
                </div>
                <Field label="Subject" error={errors.subject?.message}>
                  <input {...register("subject")} className="input-field" placeholder="What's this about?" />
                </Field>
                <Field label="Message" error={errors.message?.message}>
                  <textarea {...register("message")} rows={5} className="input-field resize-none" placeholder="Tell me about the opportunity or project…" />
                </Field>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {sent ? <CheckCircle2 size={16} /> : <Send size={16} />}
                  {sent ? "Opening your email client…" : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .input-field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-bg);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: var(--color-text);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input-field::placeholder { color: var(--color-text-dim); }
        .input-field:focus { border-color: var(--color-primary); }
      `}</style>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-[var(--color-text-muted)]">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
