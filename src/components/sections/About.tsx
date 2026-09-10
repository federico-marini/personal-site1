"use client";

import { Card } from "@/components/ui/card";
import { Reveal, Parallax } from "@/components/motion/scroll";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 relative">
      {/* Background vortex image */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/Karmansche_Wirbelstr_kleine_Re.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
          <Parallax>
            <Card className="overflow-hidden h-64 sm:h-80 md:h-96 neon-shadow border neon-border bg-[--surface-muted]">
              <div className="relative w-full h-full">
                <img
                  src="/federico-marini.jpg"
                  alt="Federico Marini"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </Parallax>
          <div className="space-y-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">About me</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-zinc-600 dark:text-zinc-400">
              I studied physics — modeling complex systems, running large-scale simulations,
              and learning to reason from first principles. Today I apply that mindset as a
              Forward Deployed Engineer at Wonderful AI, where I&apos;m embedded with enterprise
              customers to scope, architect, deploy, and evaluate production AI systems.
              I&apos;ve worked across customer-facing voice agents and back-office automation,
              including scaling a telecom voice agent to 100,000+ calls per day. Previously I
              built enterprise data products at Deloitte and founded IncognitoAI, a privacy
              layer for generative AI.
              I like working at the boundary between customers and engineering: understanding a
              real operational problem, designing the system, and getting it to work reliably
              in production. Most of my recent code lives in private enterprise repos under
              NDA — for context on style and approach, see the projects and published physics
              paper below.
              </p>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}


