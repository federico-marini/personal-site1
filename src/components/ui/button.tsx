"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "ghost"
  | "outline"
  | "link";

type BaseProps = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};
type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: false };
type ButtonAsChild = BaseProps & { asChild: true; children: React.ReactElement };
export type ButtonProps = ButtonAsButton | ButtonAsChild;

const baseStyles =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ring-offset-background";

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-[--accent] text-[--accent-foreground] hover:opacity-90 dark:hover:opacity-90 shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_26px_rgba(56,189,248,0.45)]",
  secondary:
    "bg-zinc-100 text-foreground hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
  ghost:
    "hover:bg-zinc-100 dark:hover:bg-zinc-900",
  outline:
    "border border-[var(--border-color)] text-foreground hover:bg-[var(--surface-muted)] shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]",
  link: "underline-offset-4 hover:underline text-blue-600 dark:text-blue-400",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", fullWidth, asChild, ...props }, ref) => {
    const classes = cn(
      baseStyles,
      variants[variant],
      fullWidth && "w-full",
      className
    );
    if (asChild) {
      const { children } = props as ButtonAsChild;
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(child.props.className, classes),
      });
    }
    return <button ref={ref} className={classes} {...(props as ButtonAsButton)} />;
  }
);
Button.displayName = "Button";


