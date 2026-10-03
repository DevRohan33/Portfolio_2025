import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";
import { notes } from "@/content/notes";
import { appsStoreData } from "@/content/site";
import { SITE_UPDATED, abs, isoMonth } from "@/lib/seo";

/**
 * Real lastModified dates (not "now" on every deploy), priorities that match
 * how important each page is, and image entries so screenshots can surface in
 * Google Images.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(SITE_UPDATED);
  const newestNote = notes.map((n) => n.date).sort().at(-1);

  const pages: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: updated, changeFrequency: "weekly", priority: 1, images: [abs("/opengraph-image.png")] },
    { url: abs("/work"), lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/about"), lastModified: updated, changeFrequency: "monthly", priority: 0.8, images: [abs("/image/profil.jpg")] },
    {
      url: abs("/notes"),
      lastModified: newestNote ? new Date(isoMonth(newestNote)) : updated,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: abs("/uses"), lastModified: updated, changeFrequency: "monthly", priority: 0.5 },
    { url: abs("/apps"), lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
  ];

  const work: MetadataRoute.Sitemap = Object.values(caseStudies).map((s) => ({
    url: abs(`/work/${s.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [s.image, ...(s.gallery ?? []).map((g) => g.src)].filter((src): src is string => !!src).map(abs),
  }));

  const writing: MetadataRoute.Sitemap = notes.map((n) => ({
    url: abs(`/notes/${n.slug}`),
    lastModified: new Date(isoMonth(n.date)),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const apps: MetadataRoute.Sitemap = appsStoreData.map((a) => ({
    url: abs(`/apps/${a.id}`),
    lastModified: updated,
    changeFrequency: "yearly",
    priority: 0.3,
    images: [abs(a.icon)],
  }));

  return [...pages, ...work, ...writing, ...apps];
}
