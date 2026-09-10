import { Reveal } from "@/components/motion/scroll";

const metrics = [
  { value: "100K+", label: "Inbound calls / day" },
  { value: "75%", label: "Containment" },
  { value: "1.3s", label: "Median latency" },
];

export function Metrics() {
  return (
    <section id="metrics" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border neon-border bg-[--surface-muted] neon-shadow px-6 py-8 text-center">
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[--accent]">
                  {m.value}
                </div>
                <div className="mt-2 text-sm uppercase tracking-wider text-zinc-500">
                  {m.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Production voice agent designed and scaled for a major telecom enterprise.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
