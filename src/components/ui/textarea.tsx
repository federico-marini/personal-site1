import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[140px] w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors transition-shadow",
          "bg-[var(--surface)] border-[var(--border-color)] placeholder:text-zinc-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] focus-visible:border-transparent",
          "focus-visible:shadow-[0_0_0_6px_rgba(56,189,248,0.12),0_0_24px_rgba(56,189,248,0.25)]",
          "hover:bg-[var(--surface-muted)]",
          "disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:focus-visible:ring-red-500/40",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";


