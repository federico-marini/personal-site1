import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { metadata as ragMeta } from "./blog/rag-on-nextjs/page.mdx";
import { metadata as loadingMeta } from "./blog/loading-states-design/page.mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ url: string; lastModified?: string; changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"]; priority?: number }>
    = [
      { url: `${siteUrl}/`, changeFrequency: "daily", priority: 1 },
      { url: `${siteUrl}/blog`, changeFrequency: "daily", priority: 0.8 },
      { url: `${siteUrl}/blog/rag-on-nextjs`, lastModified: ragMeta.date, changeFrequency: "weekly", priority: 0.7 },
      { url: `${siteUrl}/blog/loading-states-design`, lastModified: loadingMeta.date, changeFrequency: "weekly", priority: 0.7 },
    ];

  return routes.map((r) => ({
    url: r.url,
    lastModified: r.lastModified ?? new Date().toISOString(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}


