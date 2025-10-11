import { Reveal, Parallax } from "@/components/motion/scroll";

export function Experience() {
  const items = [
    {
      role: "Data Scientist",
      company: "Deloitte Business Solutions (Smart Solutions Lab) — Rome, Italy",
      period: "2025 — Present",
      desc:
        "Built real-estate valuation services integrating OMI data, cadastral shapefiles, and adaptive radius comparables. Deployed ML pipelines and dynamic pricing models on SQL Server + .NET Core, powering internal analytics tools.",
    },
    {
      role: "Founder",
      company: "IncognitoAI",
      period: "2025 — Present",
      desc:
        "Designed and implemented a FastAPI + Docker anonymization engine for LLMs. Raised early grants and incubated at Dock Startup Lab (Lazio Innova), winning Demo Day 2025. Architecting analytics modules for PII detection, masking logs, and AI-usage governance.",
    },
    {
      role: "Researcher",
      company: "Biophysics & Computational Modeling",
      period: "Before 2025",
      desc:
        "Modeled self-assembling DNA nanostructures using simulation. Authored a paper on computational DNA lattice formation published in the Journal of Chemical Physics.",
      link: "https://pubs.aip.org/aip/jcp/article-abstract/163/9/094902/3361142/Entropy-driven-phase-behavior-of-all-DNA?redirectedFrom=fulltext",
      linkText: "View publication",
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Experience</h2>
        </Reveal>
        <ol className="relative border-s border-zinc-200 dark:border-zinc-800">
          {items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <Parallax>
                <li className="mb-10 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-[--accent] text-[--accent-foreground] ring-2 ring-background shadow-[0_0_24px_rgba(56,189,248,0.4)]" />
                  <h3 className="font-semibold">
                    {item.role} — {item.company}
                  </h3>
                  <time className="block text-xs text-zinc-500">{item.period}</time>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                  {"link" in item && item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-sm text-[--accent] hover:underline"
                    >
                      {item.linkText || "Learn more"} →
                    </a>
                  )}
                </li>
              </Parallax>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}


