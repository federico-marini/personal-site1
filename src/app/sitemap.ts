import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// /about is intentionally excluded while it is a noindex draft.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
