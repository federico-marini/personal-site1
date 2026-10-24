"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Entrance motion that always resolves.
 * The previous version stayed at opacity 0 until IntersectionObserver
 * reported the node in view (with a shrinking root margin). Below-the-fold
 * sections therefore kept their layout height as a blank gap — About copy
 * and Skills sat invisible between the photo and the project cards, which
 * animate on mount. This plays the same fade on mount instead, so the
 * section is painted whether or not it has been scrolled into view.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("reveal-in", className)}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.55,
        ease: "easeOut",
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Parallax({
  children,
  offset = 24,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Measure an untransformed wrapper. Applying y to the scroll target
  // feeds the transform back into getBoundingClientRect and can shove
  // the block far from its layout slot.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : offset, reduce ? 0 : -offset]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
