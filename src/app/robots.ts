import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Search crawlers and AI answer-engine crawlers are both welcome: being quoted
 * accurately by ChatGPT, Perplexity, Claude or Google's AI Overviews is the
 * point of the llms.txt files and the FAQ markup. Named explicitly so it's a
 * deliberate choice, not an accident of the wildcard- remove a line to opt out.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // The chat endpoint is POST-only and has nothing worth indexing.
      { userAgent: "*", allow: "/", disallow: "/api/" },
      {
        userAgent: AI_CRAWLERS,
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
