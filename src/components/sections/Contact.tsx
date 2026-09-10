import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/scroll";

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
      {/* subtle dotted network background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--particle) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* soft glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[--accent] opacity-15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[--accent-2] opacity-15 blur-[100px]" />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight mb-5">Get in touch</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg leading-relaxed">
            Have a question, a project idea, or just want to connect? Drop me a message.
          </p>

          <div className="space-y-5 mb-10">
            <a href="mailto:federico97marini@gmail.com" className="flex items-center gap-3 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[--surface] border border-[var(--border-color)] group-hover:bg-[--surface-muted] transition-colors">
                <Mail className="h-5 w-5" />
              </span>
              <span className="text-sm sm:text-base group-hover:underline underline-offset-4">federico97marini@gmail.com</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[--surface] border border-[var(--border-color)]">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="text-sm sm:text-base">Rome / Paris · Available in Milan</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { href: "https://github.com/federico-marini", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/federico-marini-893092b1/", icon: Linkedin, label: "LinkedIn" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={item.label}
                className="h-12 w-12 rounded-full bg-[--surface] border border-[var(--border-color)] flex items-center justify-center hover:shadow-[0_0_24px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 transition"
                title={item.label}
              >
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
