import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { Geist, Geist_Mono } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Federico Marini | Forward Deployed Engineer, Applied AI | Rome/Paris",
  description:
    "Federico Marini - Forward Deployed Engineer at Wonderful AI. I design, deploy, and scale agentic AI systems for enterprise customers, including a telecom voice agent handling 100K+ calls/day at 75% containment. Physicist by training. Rome / Paris, available in Milan.",
  keywords: [
    "Federico Marini",
    "Forward Deployed Engineer",
    "Physicist",
    "IncognitoAI",
    "Wonderful AI",
    "AI",
    "Machine Learning",
    "Agentic AI",
    "Voice AI",
    "Enterprise AI",
    "Milan",
    "Privacy AI",
    "LLM",
    "Rome",
    "Paris",
    "Python",
    "Software Engineer",
  ],
  authors: [{ name: "Federico Marini" }],
  creator: "Federico Marini",
  publisher: "Federico Marini",
  openGraph: {
    title: "Federico Marini | Forward Deployed Engineer, Applied AI",
    description:
      "Forward Deployed Engineer at Wonderful AI. Designing, deploying, and scaling agentic AI systems for enterprise — architecture, evaluation, and production.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Federico Marini",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Federico Marini — Engineer & Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Federico Marini | Engineer & AI Founder",
    description:
      "Forward Deployed Engineer at Wonderful AI. Designing, deploying, and scaling agentic AI systems for enterprise — architecture, evaluation, and production.",
    images: ["/opengraph-image"],
    creator: "@federicomarini",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    // Add Google Search Console verification when you set it up
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
