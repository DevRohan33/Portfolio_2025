import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import ScrollToTop from "@/components/ScrollToTop";
import { personalInfo } from "@/content/site";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://rohanparveag.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SK Rohan Parveag — AI Systems Engineer",
    template: "%s — SK Rohan Parveag",
  },
  description:
    "I build AI systems that survive contact with production: RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SK Rohan Parveag",
    title: "SK Rohan Parveag — AI Systems Engineer",
    description:
      "RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Rohan Parveag — AI Systems Engineer",
    description:
      "RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running.",
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  url: siteUrl,
  email: `mailto:${personalInfo.email}`,
  sameAs: [personalInfo.github, personalInfo.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
          <AIChatbot />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
