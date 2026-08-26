import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] transition-colors duration-300 hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-card-hover)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
