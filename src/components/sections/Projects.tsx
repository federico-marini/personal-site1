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
  image: string;
  tags: string[];
  links?: { demo?: string; github?: string };
};

const allProjects: Project[] = [
  {
    id: "p1",
    title: "IncognitoAI",
    description: "A secure proxy for LLMs that anonymizes and re-injects sensitive data using custom regex NER before inference. Privacy by architecture — no sensitive tokens ever leave the company perimeter.",
    image: "/projects/incognitoai.mp4",
    tags: ["AI", "FastAPI", "Docker", "Redis", "FAISS", "Backend"],
    links: { demo: "https://www.incognitoai.it/" }
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

const filters = ["All", "AI", "Frontend", "Backend"] as const;

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
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {project.description}
                        </p>
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


