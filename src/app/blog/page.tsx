import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, Parallax } from "@/components/motion/scroll";
import { Tilt } from "@/components/motion/tilt";
import { metadata as ragMeta } from "./rag-on-nextjs/page.mdx";
import { metadata as loadingMeta } from "./loading-states-design/page.mdx";

export const metadata = {
  title: "Blog — Vale.dev",
  description: "Articles about AI, web, and developer experience.",
  alternates: { canonical: "/blog" },
};

type PostListItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
};

const posts: PostListItem[] = [
  {
    slug: "rag-on-nextjs",
    title: ragMeta.title,
    excerpt: ragMeta.description,
    date: ragMeta.date,
    tags: ragMeta.tags,
  },
  {
    slug: "loading-states-design",
    title: loadingMeta.title,
    excerpt: loadingMeta.description,
    date: loadingMeta.date,
    tags: loadingMeta.tags,
  },
];

export default function BlogPage() {
  return (
    <main className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-prose">
            Notes and articles about building AI‑powered products, Next.js, and DX.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Parallax>
                <Tilt>
                  <Link href={`/blog/${post.slug}`} className="block">
                    <Card className="overflow-hidden group neon-shadow border neon-border bg-[--surface-muted]">
                      <div className="h-36 bg-[--gradient-strip]" />
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-3">
                          <span>{post.title}</span>
                          <span className="text-xs text-zinc-500">{new Date(post.date).toLocaleDateString()}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {post.excerpt}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {post.tags.map((t) => (
                            <Badge key={t} variant="secondary">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Tilt>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}


