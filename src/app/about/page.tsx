import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/scroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// DRAFT — da rivedere. Kept noindex and out of sitemap/nav until reviewed.
// All content below is taken from existing site sections (Hero, About,
// Metrics, Experience, Projects, Contact); do not add facts that aren't there.

export const metadata: Metadata = {
  title: "About | Federico Marini",
  description:
    "Federico Marini is a Forward Deployed Engineer at Wonderful AI, designing, deploying, and scaling agentic AI systems for enterprise customers. Physicist by training.",
  alternates: { canonical: "/about" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const experience = [
  {
    role: "Forward Deployed Engineer",
    company: "Wonderful AI",
    period: "2026 – Present",
  },
  {
    role: "Data Scientist",
    company: "Deloitte Business Solutions",
    period: "May 2025 – December 2025",
  },
  { role: "Founder", company: "IncognitoAI", period: "March 2025 – July 2026" },
  {
    role: "Researcher",
    company: "CINECA (ISCRA Class B)",
    period: "2023 – 2024",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16 sm:pt-28 sm:pb-24">
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div
          role="note"
          className="mb-10 rounded-xl border-2 border-dashed border-amber-500 bg-amber-500/10 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400"
        >
          DRAFT — da rivedere
        </div>

        <Reveal>
          <p className="text-sm uppercase tracking-widest text-zinc-500 mb-3">
            Forward Deployed Engineer · Applied AI
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            About Federico Marini
          </h1>
        </Reveal>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <Reveal delay={0.05}>
            <p>
              I&apos;m a physicist by training and an engineer by trade. I studied physics —
              modeling complex systems, running large-scale simulations, and learning to reason
              from first principles — and today I apply that mindset as a Forward Deployed
              Engineer at Wonderful AI.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-3">
              What I do
            </h2>
            <p>
              I design, deploy, and scale agentic AI systems for enterprise customers — from
              technical discovery and architecture through evaluation and production. I&apos;m
              embedded with customers to scope use cases and own deployments end-to-end:
              solution design, integrations with enterprise systems, evaluation, monitoring,
              and CI/CD. I&apos;ve worked across customer-facing voice agents and back-office
              automation.
            </p>
            <p className="mt-4">
              For a major telecom, I designed and scaled a customer-facing voice agent to
              100,000+ calls per day in three months, reaching 75% containment and 1.3s median
              latency.
            </p>
            <p className="mt-4">
              I like working at the boundary between customers and engineering: understanding a
              real operational problem, designing the system, and getting it to work reliably in
              production.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-3">
              Before that
            </h2>
            <p>
              At Deloitte Business Solutions I built enterprise data products, including an
              automated real-estate valuation engine and Python + PostgreSQL pipelines feeding
              live C-level dashboards with data from 30+ plants worldwide. I founded IncognitoAI,
              a privacy proxy that anonymizes PII in GenAI prompts before they reach third-party
              LLM providers; it won July Demo Day and secured €20k in public grants. Earlier, as a
              researcher on a CINECA ISCRA Class B project, I engineered HPC workflows and ran
              large-scale polymer-physics simulations, optimizing data pipelines with the Leonardo HPC framework (see the{" "}
              <a
                href="https://doi.org/10.1063/5.0279969"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--accent] underline underline-offset-2"
              >
                publication
              </a>
              ).
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {experience.map((item) => (
                <li
                  key={item.company}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-zinc-200 dark:border-zinc-800 pb-2"
                >
                  <span className="font-medium text-foreground">
                    {item.role}, {item.company}
                  </span>
                  <span className="text-xs text-zinc-500">{item.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-3">
              Side projects
            </h2>
            <p>
              Outside client work I build tools like <strong>arte</strong>: an image and a full
              book go in, a piece of physical art comes out. It maps a novel&apos;s characters onto
              an image grid with Floyd–Steinberg dithering, consuming the text strictly in order,
              so zooming in reveals readable Melville — then emits vector stencil PDFs at true
              physical scale, tiled across A2/A1/A0 sheets for laser cutting.
            </p>
            <p className="mt-4">
              Most of my recent code lives in private enterprise repos under NDA; the{" "}
              <Link href="/#projects" className="text-[--accent] underline underline-offset-2">
                projects
              </Link>{" "}
              on the home page give a sense of style and approach.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-3">
              Where
            </h2>
            <p>
              Based between Rome and Paris, available in Milan.{" "}
              <Link href="/#contact" className="text-[--accent] underline underline-offset-2">
                Get in touch
              </Link>
              .
            </p>
            <p className="mt-4">
              Find me on{" "}
              <a
                href="https://www.linkedin.com/in/federico-marini-893092b1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--accent] underline underline-offset-2"
              >
                LinkedIn
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/federico-marini"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--accent] underline underline-offset-2"
              >
                GitHub
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
