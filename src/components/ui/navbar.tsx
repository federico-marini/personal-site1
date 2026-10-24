"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;

const linkClass =
  "rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent]";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const close = () => {
    setOpen(false);
    // Clear before the anchor's default jump; the effect cleanup runs too late
    // and a locked body would swallow the hash scroll.
    document.body.style.overflow = "";
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-50 border-b neon-border backdrop-blur-md bg-background/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="font-semibold tracking-tight shrink-0" onClick={close}>
          FM.dev
        </Link>
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={cn(linkClass, "px-3 py-2 text-sm")}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" className="px-3">
            <a
              href="https://github.com/federico-marini"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
          <button
            ref={buttonRef}
            type="button"
            className="md:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-300 text-foreground dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent]"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>
      <div
        id={menuId}
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "md:hidden overflow-hidden bg-background",
          open ? "border-t border-[var(--border-color)]" : "pointer-events-none"
        )}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul
            className={cn(
              "flex flex-col overflow-hidden transition-[max-height,opacity,padding] duration-200 ease-out",
              open ? "max-h-[32rem] py-2 opacity-100" : "max-h-0 py-0 opacity-0"
            )}
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(linkClass, "block px-3 py-3 text-base font-medium")}
                  onClick={close}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
