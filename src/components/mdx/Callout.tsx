"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";

type CalloutVariant = "info" | "warning" | "success";

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: CalloutVariant;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  const colorByVariant: Record<CalloutVariant, string> = {
    info: "border-[--accent] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]",
    warning:
      "border-amber-500 bg-[color-mix(in_oklab,theme(colors.amber.500)_8%,transparent)]",
    success:
      "border-emerald-500 bg-[color-mix(in_oklab,theme(colors.emerald.500)_8%,transparent)]",
  };

  const IconByVariant: Record<CalloutVariant, typeof Info> = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2,
  };

  const Icon = IconByVariant[variant];

  return (
    <div
      className={cn(
        "not-prose rounded-lg border px-4 py-3 text-sm",
        colorByVariant[variant],
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 opacity-80" />
        <div className="space-y-1">
          {title ? (
            <div className="font-medium tracking-tight">{title}</div>
          ) : null}
          {children ? <div className="text-zinc-700 dark:text-zinc-300">{children}</div> : null}
        </div>
      </div>
    </div>
  );
}


