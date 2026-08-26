import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium telemetry",
        variant === "default" && "bg-[var(--color-card-hover)] text-[var(--color-text-muted)] border border-[var(--color-border)]",
        variant === "outline" && "border border-[var(--color-primary)]/40 text-[var(--color-primary)]",
        variant === "accent" && "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30",
        className
      )}
    >
      {children}
    </span>
  );
}
