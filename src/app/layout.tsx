import type { Metadata, Viewport } from "next";
import { Caveat, Inter, Inter_Tight, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import ScrollToTop from "@/components/ScrollToTop";
import Analytics from "@/components/Analytics";
import { personalInfo } from "@/content/site";
import JsonLd from "@/components/JsonLd";
import { RSS_ALTERNATE, SITE_NAME, SITE_URL, graph, personNode, websiteNode } from "@/lib/seo";

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

// Long-form reading (notes) and the handwritten touches on them.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const description =
  "I build AI systems that survive contact with production: RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SK Rohan Parveag - AI Systems Engineer",
    template: "%s - SK Rohan Parveag",
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: personalInfo.name, url: SITE_URL }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  category: "technology",
  keywords: [
    "SK Rohan Parveag",
    "Rohan Parveag",
    "AI systems engineer",
    "backend engineer Kolkata",
    "RAG engineer",
    "LLM engineer",
    "FastAPI",
    "AI agents",
    "portfolio",
  ],
  // No canonical here on purpose: it would be inherited by every page that
  // doesn't set one. Each page sets its own through pageMeta().
  alternates: { types: RSS_ALTERNATE },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "SK Rohan Parveag - AI Systems Engineer",
    description:
      "RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Rohan Parveag - AI Systems Engineer",
    description:
      "RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  // Search Console / Bing Webmaster verification, only emitted when set in the environment.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0E",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${jetbrainsMono.variable} ${inter.variable} ${newsreader.variable} ${caveat.variable}`}
    >
      <body>
        <JsonLd data={graph(personNode(), websiteNode())} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Analytics />
        <Footer />
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
          <AIChatbot />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
