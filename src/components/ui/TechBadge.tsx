import { cn } from "@/lib/utils";
import { getTechIcon } from "@/lib/techIcons";

export function TechBadge({ name, className }: { name: string; className?: string }) {
  const icon = getTechIcon(name);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card-hover)] px-2.5 py-1 text-[11px] font-medium telemetry text-[var(--color-text-muted)]",
        className
      )}
    >
      {icon && (
        <svg
          viewBox="0 0 24 24"
          width={12}
          height={12}
          fill={`#${icon.hex}`}
          aria-hidden="true"
          className="shrink-0"
        >
          <path d={icon.path} />
        </svg>
      )}
      {name}
    </span>
  );
}
