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
  title: "Federico Marini — Data Scientist & Founder",
  description:
    "Data Scientist at Deloitte & Founder of IncognitoAI. Building privacy-preserving AI systems, analytics pipelines, and GDPR-compliant LLM solutions.",
  openGraph: {
    title: "Federico Marini — Data Scientist & Founder",
    description:
      "Data Scientist at Deloitte & Founder of IncognitoAI. Building privacy-preserving AI systems, analytics pipelines, and GDPR-compliant LLM solutions.",
    type: "website",
    images: [
      {
        url: "/opengraph-image", // Next will append .png
        width: 1200,
        height: 630,
        alt: "Federico Marini — Data Scientist & Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Federico Marini — Data Scientist & Founder",
    description:
      "Data Scientist at Deloitte & Founder of IncognitoAI. Building privacy-preserving AI systems, analytics pipelines, and GDPR-compliant LLM solutions.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: "/",
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
