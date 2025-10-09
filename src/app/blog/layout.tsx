import { ReactNode } from "react";
import { notFound } from "next/navigation";

export default function BlogLayout({ children }: { children: ReactNode }) {
  const isDev = process.env.NODE_ENV !== "production";
  const raw = process.env.NEXT_PUBLIC_BLOG_ENABLED ?? process.env.BLOG_ENABLED;
  const enabled = raw === "true" || (raw == null && isDev);

  if (!enabled) return notFound();

  return <>{children}</>;
}


