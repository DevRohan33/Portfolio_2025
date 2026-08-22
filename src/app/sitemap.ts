import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";
import { notes } from "@/content/notes";
import { appsStoreData } from "@/content/site";

const siteUrl = "https://rohanparveag.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/notes", "/about", "/uses", "/apps"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const workRoutes = Object.keys(caseStudies).map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: new Date(),
  }));

  const noteRoutes = notes.map((note) => ({
    url: `${siteUrl}/notes/${note.slug}`,
    lastModified: new Date(),
  }));

  const appRoutes = appsStoreData.map((app) => ({
    url: `${siteUrl}/apps/${app.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...workRoutes, ...noteRoutes, ...appRoutes];
}
