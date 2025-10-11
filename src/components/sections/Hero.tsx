"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const VonKarmanScene = dynamic(() => import("@/components/hero/VonKarmanScene").then(m => m.VonKarmanScene), {
  ssr: false,
});

export function Hero() {
  return (
    <section id="home" className="relative isolate pt-28 sm:pt-32">
      <BackgroundGradient />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-widest text-zinc-500">
              Data Scientist & Founder
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="block">Hi, I&apos;m Federico.</span>
            <span className="block">I translate complexity into clarity.</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-prose">
              A physicist turned data scientist, I build systems that bridge science and business —
              from analytics pipelines to AI-driven privacy architectures.
            </p>
            <div className="flex items-center gap-3">
            <Button variant="secondary" asChild className="border neon-border">
              <a href="#projects">View my works</a>
              </Button>
              <Button variant="secondary" asChild className="border neon-border">
                <a href="#contact">Contact me</a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="h-64 sm:h-80 md:h-96 rounded-2xl border neon-border bg-[--gradient-hero] relative overflow-hidden"
          >
            <VonKarmanScene />
            <div className="absolute bottom-3 right-3 text-xs text-zinc-500 dark:text-zinc-400 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
              WIP: von Kármán vortex street simulation (Three.js/TSX)
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BackgroundGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.25),rgba(236,72,153,0.10)_40%,transparent_70%)]"
    />
  );
}

import React from "react";



