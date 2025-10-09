"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-zinc-300/30 dark:bg-zinc-700/40", className)} />;
}

export function LoadingPlayground() {
  const [username, setUsername] = useState("Vale");
  const [draft, setDraft] = useState(username);
  const [isSaving, setIsSaving] = useState(false);
  const [mode, setMode] = useState<"skeleton" | "optimistic">("skeleton");

  useEffect(() => setDraft(username), [username]);

  const save = async () => {
    setIsSaving(true);
    if (mode === "optimistic") {
      setUsername(draft);
    }
    await new Promise((r) => setTimeout(r, 1200));
    if (mode === "skeleton") {
      setUsername(draft);
    }
    setIsSaving(false);
  };

  return (
    <Card className="not-prose border neon-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Loading states playground</span>
          <div className="inline-flex gap-2">
            <Button className="h-8 px-3" variant={mode === "skeleton" ? "default" : "outline"} onClick={() => setMode("skeleton")}>
              Skeleton
            </Button>
            <Button className="h-8 px-3" variant={mode === "optimistic" ? "default" : "outline"} onClick={() => setMode("optimistic")}>
              Optimistic
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Input value={draft} onChange={(e) => setDraft(e.target.value)} />
          <Button onClick={save} disabled={isSaving}>
            {isSaving ? "Saving…" : "Save"}
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <div className="text-xs text-zinc-500 mb-2">Profile preview</div>
          {isSaving && mode === "skeleton" ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-64" />
            </div>
          ) : (
            <div>
              <div className="font-medium">@{username}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Hi, I&apos;m {username}. I like smooth UIs and neon gradients.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


