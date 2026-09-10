"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Parallax, Reveal } from "@/components/motion/scroll";
import { Tilt } from "@/components/motion/tilt";

type Project = {
  id: string;
  title: string;
  description: string;
  image?: string;
  credit?: string;
  tags: string[];
  links?: { demo?: string; github?: string };
};

const allProjects: Project[] = [
  {
    id: "p0",
    title: "Enterprise Voice Agent",
    description: "Production agentic voice system deployed for a major telecom. Scaled to 100K+ inbound calls/day with 75% containment and 1.3s median latency. I owned the deployment end-to-end: solution design, tool/API integration with enterprise systems, evaluation harness, monitoring, and CI/CD.",
    image: "/projects/voice-agent-architecture.svg",
    tags: ["AI", "Voice AI", "LLM", "REST APIs", "Evals", "Backend"],
    links: {}
  },
  {
    id: "p3",
    title: "arte — Typewriter Literary Rendering",
    description: "An image and a full book go in; a piece of physical art comes out. The tool maps a novel's characters onto an image grid — Floyd–Steinberg dithering, adaptive thresholds matching the image histogram to the text's character-weight distribution — consuming the text strictly sequentially, never reordering a single letter. Zoom in and it's readable Melville. It then emits vector stencil PDFs at true physical scale, auto-tiled across A2/A1/A0 sheets for laser cutting.",
    image: "/projects/arte-typewriter.jpg",
    credit: "Rendered from Moby-Dick (1851) over a public-domain humpback photograph — NOAA / National Marine Sanctuaries.",
    tags: ["Tools", "Python", "NumPy", "Pillow", "ReportLab", "Imaging"],
    links: {}
  },
  {
    id: "p1",
    title: "IncognitoAI",
    description: "A privacy proxy for LLMs that detects and anonymizes PII before inference. Uses a fine-tuned Llama 3B for entity recognition, with regex pre-filters for structured patterns. Sensitive tokens are replaced before reaching third-party LLM providers and re-injected in the response.",
    image: "/projects/incognitoai-logo.svg",
    tags: ["AI", "FastAPI", "Docker", "Redis", "FAISS", "Backend"],
    links: { demo: "https://www.incognitoai.eu/" }
  },
  {
    id: "p2",
    title: "Real Estate Valuator",
    description: "Internal Deloitte tool for automated property appraisal, combining OMI comparables, cadastral GIS data, and statistical regressions (monoparametric + power law). Predictive analytics meets territorial intelligence.",
    image: "/projects/real-estate.mp4",
    tags: ["AI", "C#", ".NET", "SQL Server", "GIS", "Backend"],
    links: {}
  }
];

const filters = ["All", "AI", "Backend", "Tools"] as const;

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return allProjects;
    return allProjects.filter((p) => p.tags.includes(active));
  }, [active]);

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                variant={active === f ? "default" : "outline"}
                onClick={() => setActive(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
              >
                <Parallax>
                  <Tilt>
                    <Card className="overflow-hidden group neon-shadow border neon-border bg-[--surface-muted]">
                      {project.image && (
                      <div className="bg-[--surface-muted]">
                        {project.image.toLowerCase().endsWith(".mp4") ? (
                          <video
                            src={project.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-auto object-contain"
                          />
                        ) : (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-auto object-contain"
                            />
                          </>
                        )}
                      </div>
                      )}
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {project.description}
                        </p>
                        {project.credit && (
                          <p className="mt-2 text-xs text-zinc-500">{project.credit}</p>
                        )}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tags.map((t) => (
                            <Badge key={t} variant="secondary">
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex gap-2">
                          {project.links?.demo && (
                            <Button asChild>
                              <a href={project.links.demo} target="_blank">
                                Live demo
                              </a>
                            </Button>
                          )}
                          {project.links?.github && (
                            <Button asChild variant="outline">
                              <a href={project.links.github} target="_blank">
                                GitHub
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Tilt>
                </Parallax>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}


