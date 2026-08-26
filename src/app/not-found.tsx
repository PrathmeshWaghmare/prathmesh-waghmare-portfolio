"use client";

import { Home, ArrowLeft } from "lucide-react";
import BackgroundFX from "@/components/layout/BackgroundFX";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <BackgroundFX />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="detect-frame is-active eyebrow relative rounded-lg border border-[var(--color-border)] px-6 py-4 text-6xl font-bold telemetry text-[var(--color-text)] sm:text-7xl">
          <span className="detect-label">STATUS: 404 · NOT FOUND</span>
          404
        </span>
        <h1 className="mt-8 font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
          This page wasn&apos;t detected.
        </h1>
        <p className="mt-3 max-w-sm text-sm text-[var(--color-text-muted)]">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex gap-3">
          <Button href="/">
            <Home size={15} /> Back home
          </Button>
          <Button href="#" variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft size={15} /> Go back
          </Button>
        </div>
      </main>
    </>
  );
}
