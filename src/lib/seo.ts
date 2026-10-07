import type { Metadata } from "next";
import { education, personalInfo } from "@/content/site";

/** The one place the domain lives. Everything else (metadata, sitemap, JSON-LD, feeds) derives from it. */
export const SITE_URL = "https://rohanparveag.in";
export const SITE_NAME = "SK Rohan Parveag";

/**
 * When the site's content last meaningfully changed. Used as lastModified in
 * the sitemap- a real date tells crawlers more than "now" on every deploy.
 * Bump it when you update projects or pages.
 */
export const SITE_UPDATED = "2026-10-04";

/** Stable @id anchors, so every page's JSON-LD links into one graph. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}/notes#blog`;

export const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

/** "2026-03" → "2026-03-01", a valid ISO date for schema.org and the sitemap. */
export const isoMonth = (date: string) =>
  date.length === 7 ? `${date}-01` : date;

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: personalInfo.name,
    alternateName: ["Rohan Parveag", "SK Rohan", "DevRohan33"],
    givenName: "Rohan",
    jobTitle: personalInfo.title,
    description:
      "Backend and applied AI engineer building RAG pipelines, tool-calling agents and the data infrastructure underneath them.",
    url: SITE_URL,
    image: abs("/image/profil.jpg"),
    email: `mailto:${personalInfo.email}`,
    sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.leetcode],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    worksFor: { "@type": "Organization", name: "Design Intelligence LLP" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Elitte College of Engineering" },
      {
        "@type": "CollegeOrUniversity",
        name: "Maulana Abul Kalam Azad University of Technology",
      },
      {
        "@type": "EducationalOrganization",
        name: education.diplomaInstitution,
      },
    ],
    knowsAbout: [
      "Retrieval-augmented generation",
      "Large language models",
      "Tool-calling AI agents",
      "Multi-agent systems",
      "Real-time voice agents",
      "FastAPI",
      "Python",
      "Data pipelines",
      "Firebase",
      "System design",
      "Vector databases",
      "Pinecone",
      "LangChain",
      "Docker",
    ],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Portfolio of SK Rohan Parveag- AI systems, backend and data engineering, with case studies and technical notes.",
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

/** One `@graph` document; nodes reference each other by @id. */
export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

export const DEFAULT_SHARE_IMAGE = "/opengraph-image.png";

export const RSS_ALTERNATE = {
  "application/rss+xml": [
    { url: "/notes/rss.xml", title: "Notes by SK Rohan Parveag" },
  ],
};

/**
 * Per-page metadata with its own canonical URL and complete Open Graph tags.
 * (Next replaces, rather than merges, a page's `openGraph` and `alternates`
 * objects, so every page builds them in full here.)
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
  article,
}: {
  title?: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  article?: { publishedTime: string; section?: string; tags?: string[] };
}): Metadata {
  const ogTitle = title
    ? `${title} - ${SITE_NAME}`
    : `${SITE_NAME} - AI Systems Engineer`;
  // A page's own openGraph replaces the root one, so fall back to the site card explicitly.
  const shareImage = image ?? DEFAULT_SHARE_IMAGE;
  const images = [
    image
      ? { url: shareImage, alt: title ?? SITE_NAME }
      : {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - AI Systems Engineer`,
        },
  ];
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, types: RSS_ALTERNATE },
    openGraph: {
      siteName: SITE_NAME,
      locale: "en_IN",
      url: path,
      title: ogTitle,
      description,
      images,
      ...(type === "article" && article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            authors: [SITE_URL + "/about"],
            section: article.section,
            tags: article.tags,
          }
        : type === "profile"
          ? {
              type: "profile",
              firstName: "Rohan",
              lastName: "Parveag",
              username: "DevRohan33",
            }
          : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [shareImage],
    },
  };
}
