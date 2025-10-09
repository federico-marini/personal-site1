"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = (resolvedTheme ?? theme) === "dark";
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900",
        className
      )}
    >
      {mounted ? (
        <>
          <Sun className={cn("h-4 w-4", isDark && "hidden")} />
          <Moon className={cn("h-4 w-4", !isDark && "hidden")} />
        </>
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}


