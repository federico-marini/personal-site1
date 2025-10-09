type ArticleJsonLdProps = {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  tags?: string[];
  authorName?: string;
};

export function ArticleJsonLd({ url, title, description, datePublished, tags = [], authorName = "Valerio Mannucci" }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: tags.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}


