"use client";

import { useState, useRef, useEffect } from "react";

interface InfoTooltipProps {
  text: string;
}

export function InfoTooltip({ text }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseEnterButton() {
    hoverTimer.current = setTimeout(() => setOpen(true), 150);
  }

  function handleMouseLeaveButton() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(false);
  }

  function handleMouseEnterTooltip() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }

  function handleMouseLeaveTooltip() {
    setOpen(false);
  }

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(o => !o);
  }

  // Tap outside to close on mobile
  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative flex-shrink-0">
      <button
        onMouseEnter={handleMouseEnterButton}
        onMouseLeave={handleMouseLeaveButton}
        onClick={handleClick}
        className="flex items-center justify-center text-zinc-600 hover:text-zinc-400 transition-colors"
        aria-label="More information"
        aria-expanded={open}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
          <path d="M6 5.5v3M6 3.25v.75" stroke="currentColor" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute bottom-full left-0 mb-3 w-[280px] z-20 rounded-lg bg-zinc-900 border border-zinc-700/80 px-3 py-2.5 text-[11px] leading-relaxed text-zinc-300 shadow-xl"
          onMouseEnter={handleMouseEnterTooltip}
          onMouseLeave={handleMouseLeaveTooltip}
        >
          {text}
          {/* Arrow pointing down toward the icon */}
          <div className="absolute -bottom-[5px] left-[5px] h-[10px] w-[10px] rotate-45 border-b border-r border-zinc-700/80 bg-zinc-900" />
        </div>
      )}
    </div>
  );
}
