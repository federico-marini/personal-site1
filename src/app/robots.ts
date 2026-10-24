import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Search and AI crawlers that are explicitly welcome. "*" already allows
// everything; the named rules make the intent explicit for each bot.
const namedCrawlers = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: namedCrawlers, allow: ["/", "/llms.txt"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
