import * as React from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & { size?: Size };

const sizeClasses: Record<Size, string> = {
  sm: "h-9 text-sm px-3",
  md: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", size = "md", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex w-full rounded-md border shadow-sm transition-colors transition-shadow",
          sizeClasses[size],
          "bg-[var(--surface)] border-[var(--border-color)] placeholder:text-zinc-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] focus-visible:border-transparent",
          "focus-visible:shadow-[0_0_0_6px_rgba(56,189,248,0.12),0_0_24px_rgba(56,189,248,0.25)]",
          "hover:bg-[var(--surface-muted)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:focus-visible:ring-red-500/40",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";


