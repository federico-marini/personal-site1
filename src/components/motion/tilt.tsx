"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  scale?: number;
};

export function Tilt({
  children,
  className,
  maxTiltDeg = 8,
  scale = 1.02,
}: TiltProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef<number | null>(null);
  const [{ rx, ry, s }, set] = React.useState({ rx: 0, ry: 0, s: 1 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (px - 0.5) * (maxTiltDeg * 2);
    const rotateX = (0.5 - py) * (maxTiltDeg * 2);
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => set({ rx: rotateX, ry: rotateY, s: scale }));
  };

  const handleLeave = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => set({ rx: 0, ry: 0, s: 1 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("[transform-style:preserve-3d] will-change-transform", className)}
      style={{
        transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`,
        transition: s === 1 ? "transform 200ms ease" : "transform 40ms linear",
      }}
    >
      {children}
    </div>
  );
}


