"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Github, Linkedin, Mail, MapPin, CalendarDays } from "lucide-react";
import { Reveal } from "@/components/motion/scroll";
import { Card, CardContent } from "@/components/ui/card";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || "Failed to send message");
      }

      toast.success("Thanks! I will get back to you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    }
  };

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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: title, intro, details, socials */}
          <Reveal>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-5">Let’s build together!</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg leading-relaxed">
                I’m always interested in new opportunities and exciting projects. Whether you have a
                question or just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-5 mb-10">
                <a href="mailto:federico.marini@incognitoai.it" className="flex items-center gap-3 group">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[--surface] border border-[var(--border-color)] group-hover:bg-[--surface-muted] transition-colors">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="text-sm sm:text-base">federico.marini@incognitoai.it</span>
                </a>
                <a
                  href="mailto:federico.marini@incognitoai.it?subject=Call%20request&body=Tell%20me%20about%20your%20project%20and%20share%20a%20few%20time%20slots."
                  className="flex items-center gap-3 group"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[--surface] border border-[var(--border-color)] group-hover:bg-[--surface-muted] transition-colors">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <span className="text-sm sm:text-base group-hover:underline underline-offset-4">Book a call</span>
                </a>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[--surface] border border-[var(--border-color)]">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="text-sm sm:text-base">Rome / Paris</span>
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
            </div>
          </Reveal>

          {/* Right: tidy form card (no tilt) */}
          <Reveal delay={0.1}>
            <Card className="border border-[var(--border-color)] bg-[--surface] backdrop-blur-sm">
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        aria-invalid={errors.name ? true : false}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@domain.com"
                        aria-invalid={errors.email ? true : false}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can I help?"
                        aria-invalid={errors.subject ? true : false}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        {...register("subject")}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-xs text-red-600">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={6}
                      aria-invalid={errors.message ? true : false}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


