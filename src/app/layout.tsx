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
  title: "Federico Marini | Data Scientist, Physicist & AI Founder | Rome/Paris",
  description:
    "Federico Marini - Data Scientist at Deloitte, Founder of IncognitoAI. Physicist turned data scientist specializing in privacy-preserving AI, GDPR-compliant LLM solutions, and high-performance analytics. Based in Rome and Paris.",
  keywords: [
    "Federico Marini",
    "Data Scientist",
    "Physicist",
    "IncognitoAI",
    "Deloitte",
    "AI",
    "Machine Learning",
    "Privacy AI",
    "GDPR",
    "LLM",
    "Rome",
    "Paris",
    "Python",
    "Data Science",
  ],
  authors: [{ name: "Federico Marini" }],
  creator: "Federico Marini",
  publisher: "Federico Marini",
  openGraph: {
    title: "Federico Marini | Data Scientist, Physicist & AI Founder",
    description:
      "Data Scientist at Deloitte & Founder of IncognitoAI. Building privacy-preserving AI systems, analytics pipelines, and GDPR-compliant LLM solutions.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Federico Marini",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Federico Marini — Data Scientist & Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Federico Marini | Data Scientist & AI Founder",
    description:
      "Data Scientist at Deloitte & Founder of IncognitoAI. Building privacy-preserving AI systems, analytics pipelines, and GDPR-compliant LLM solutions.",
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
