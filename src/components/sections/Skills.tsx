import { Badge } from "@/components/ui/badge";
import { Parallax, Reveal } from "@/components/motion/scroll";

const groups = [
  {
    title: "Languages",
    items: ["Python", "C#", "SQL", "TypeScript"],
  },
  {
    title: "Frameworks",
    items: ["FastAPI", ".NET Core", "Next.js", "React"],
  },
  {
    title: "Data & AI",
    items: [
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "FAISS",
      "HuggingFace",
    ],
  },
  { title: "Infrastructure", items: ["Docker", "Vercel", "PostgreSQL", "PostGIS", "Redis", "AWS"] },
  {
    title: "Tools",
    items: ["VSCode", "DBeaver", "GitHub Actions", "Power BI", "QGIS"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Skills</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <Parallax className="space-y-4">
                <h3 className="text-sm uppercase tracking-wider text-zinc-500">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


