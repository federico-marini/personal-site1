import Link from "next/link";
import type { ComponentType } from "react";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/mdx/Callout";
import { DemoRAG } from "@/components/mdx/DemoRAG";
import { LoadingPlayground } from "@/components/mdx/LoadingPlayground";

// Map Markdown elements and expose UI components inside MDX content
export function useMDXComponents(
  components: Record<string, ComponentType<unknown>>
) {
  return {
    // Replace <a> with Next.js <Link>
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <Link href={props.href ?? "#"} className="text-[--accent] underline underline-offset-2">
        {props.children}
      </Link>
    ),
    // Expose design-system components to MDX
    Badge,
    Callout,
    DemoRAG,
    LoadingPlayground,
    ...components,
  } as Record<string, ComponentType<unknown>>;
}


