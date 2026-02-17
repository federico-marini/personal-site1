"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Repeat } from "lucide-react";

const VonKarmanScene = dynamic(() => import("@/components/hero/VonKarmanScene").then(m => m.VonKarmanScene), {
  ssr: false,
});

const LorenzScene = dynamic(() => import("@/components/hero/LorenzScene").then(m => m.LorenzScene), {
  ssr: false,
});

export function Hero() {
  const [simulation, setSimulation] = useState<"vonkarman" | "lorenz">("vonkarman");

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
              Engineer & Founder
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="block">Hi, I&apos;m Federico.</span>
            <span className="block">I build things that work.</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-prose">
              Physics background, engineering practice. I deploy AI agents in production,
              design data pipelines, and ship software that solves real problems.
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
            {simulation === "vonkarman" ? <VonKarmanScene /> : <LorenzScene />}

            {/* Toggle button */}
            <button
              onClick={() => setSimulation(prev => prev === "vonkarman" ? "lorenz" : "vonkarman")}
              className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 hover:border-white/40 transition-all duration-200 group"
              title="Switch simulation"
            >
              <Repeat className="h-4 w-4 text-white/70 group-hover:text-white group-hover:rotate-180 transition-all duration-300" />
            </button>

            {/* Info label */}
            <div className="absolute bottom-3 right-3 text-xs text-zinc-500 dark:text-zinc-400 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
              {simulation === "vonkarman"
                ? "von Kármán Vortex Street (Three.js/TSX)"
                : "Lorenz Attractor - Chaos Theory (Three.js/TSX)"}
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



