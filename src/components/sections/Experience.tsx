import { Reveal, Parallax } from "@/components/motion/scroll";

export function Experience() {
  const items = [
    {
      role: "Forward Deployed Engineer",
      company: "Wonderful AI",
      period: "2026 – Present",
      desc:
        "Design and deploy production AI agents (voice and chat) for enterprise clients. Build backend middleware and REST APIs integrating LLM systems with client databases and external services. Contribute to model pipelines, benchmarking and evaluation frameworks.",
    },
    {
      role: "Data Scientist",
      company: "Deloitte Business Solutions",
      period: "2025",
      desc:
        "Built an automated real-estate valuation engine, managing backend logic, pricing algorithms, and ETL pipelines for geo-spatial data. Developed Python + PostgreSQL pipelines integrating enterprise data from 30+ plants worldwide to power live C-level dashboards.",
    },
    {
      role: "Founder",
      company: "IncognitoAI",
      period: "2025 – Present",
      desc:
        "Built a proxy system that anonymizes PII in GenAI prompts using open-source models. Led product vision and early sales. Won July Demo Day, secured €18k public grant.",
    },
    {
      role: "Researcher",
      company: "CINECA (ISCRA Class B)",
      period: "2023 – 2024",
      desc:
        "Engineered high-performance computing workflows and ran large-scale simulations in polymer physics. Optimized data pipelines using the Leonardo HPC framework.",
      link: "https://doi.org/10.1063/5.0279969",
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
                    {item.role}, {item.company}
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


