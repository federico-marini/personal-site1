import { absoluteUrl, siteUrl } from "@/lib/site";

// Schema.org builders. Every fact here mirrors content already on the site
// (Hero, About, Experience, Skills, Contact sections) — keep them in sync.

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

type Schema = Record<string, unknown>;

export function personSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: "Federico Marini",
    url: siteUrl,
    image: absoluteUrl("/federico-marini.jpg"),
    jobTitle: "Forward Deployed Engineer",
    worksFor: { "@type": "Organization", name: "Wonderful AI" },
    description:
      "Forward Deployed Engineer at Wonderful AI. Designs, deploys, and scales agentic AI systems for enterprise customers, from technical discovery and architecture through evaluation and production. Physicist by training, with earlier work in HPC and polymer dynamics.",
    knowsAbout: [
      "Applied AI",
      "Agentic AI",
      "Voice AI",
      "LLM agents",
      "AI evaluation",
      "Retrieval-augmented generation",
      "Python",
      "FastAPI",
      "TypeScript",
      "Next.js",
      "High-performance computing",
      "Polymer physics",
    ],
    address: [
      { "@type": "PostalAddress", addressLocality: "Rome" },
      { "@type": "PostalAddress", addressLocality: "Paris" },
    ],
    sameAs: [
      "https://github.com/federico-marini",
      "https://www.linkedin.com/in/federico-marini-893092b1/",
    ],
  };
}

export function websiteSchema(): Schema {
  // No SearchAction: the site has no search feature to point it at.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: "Federico Marini",
    inLanguage: "en",
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
}

export type BreadcrumbItem = { name: string; path: string };

/** Builds a BreadcrumbList; "Home" is prepended automatically. */
export function breadcrumbSchema(items: BreadcrumbItem[]): Schema {
  const all: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
