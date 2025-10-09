"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const isDev = process.env.NODE_ENV !== "production";
const rawBlog = process.env.NEXT_PUBLIC_BLOG_ENABLED ?? process.env.BLOG_ENABLED;
const blogEnabled = rawBlog === "true" || (rawBlog == null && isDev);

const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
  ...(blogEnabled ? [{ href: "/blog", label: "Blog" }] : []),
] as const;

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b neon-border backdrop-blur-md bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="font-semibold tracking-tight">
          Vale.dev
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn("px-3 py-2 text-sm rounded-md hover:bg-zinc-100/5")}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline">
            <a href="https://github.com/valeman100" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4 mr-2" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}


