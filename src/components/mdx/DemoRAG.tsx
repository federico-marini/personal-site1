"use client";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Doc = { id: string; title: string; tags: string[]; chunks: string[] };

const DOCS: Doc[] = [
  {
    id: "1",
    title: "Next.js streaming routes",
    tags: ["Next.js", "Streaming"],
    chunks: [
      "Use React Suspense to progressively stream server components.",
      "Edge runtime reduces cold starts for AI UIs.",
    ],
  },
  {
    id: "2",
    title: "Vector search 101",
    tags: ["AI", "RAG"],
    chunks: [
      "Embeddings map text to a high-dimensional space.",
      "Cosine similarity ranks nearest chunks to the query.",
    ],
  },
  {
    id: "3",
    title: "Prompt engineering basics",
    tags: ["LLM"],
    chunks: [
      "Provide system instructions and constraints.",
      "Give concrete examples to guide the model.",
    ],
  },
];

export function DemoRAG() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [] as Doc[];
    const q = query.toLowerCase();
    return DOCS.filter(
      (d) => d.title.toLowerCase().includes(q) || d.chunks.some((c) => c.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <Card className="not-prose border neon-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>RAG mini‑search</span>
          <Badge variant="secondary">Demo</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type a query… (e.g. embeddings, cosine, streaming)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={() => setQuery(query)} variant="default">
            Search
          </Button>
        </div>

          {results.length === 0 ? (
          <p className="text-sm text-zinc-500">No results. Try &quot;embeddings&quot; or &quot;streaming&quot;.</p>
        ) : (
          <ul className="space-y-2">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  className="w-full rounded-md border bg-[--surface-muted] p-3 text-left hover:bg-[--surface]"
                  onClick={() => setExpanded((prev) => (prev === r.id ? null : r.id))}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{r.title}</span>
                    <div className="flex gap-1">
                      {r.tags.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {expanded === r.id ? (
                    <ul className="mt-2 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                      {r.chunks.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}


