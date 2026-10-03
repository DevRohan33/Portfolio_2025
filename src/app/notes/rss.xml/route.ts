import { personalInfo } from "@/content/site";
import { notesNewestFirst, topicLabel } from "@/lib/notes";
import { SITE_URL, abs, isoMonth } from "@/lib/seo";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of the notes, for readers and for discovery. */
export function GET() {
  const notes = notesNewestFirst();
  const items = notes
    .map((n) => {
      const url = abs(`/notes/${n.slug}`);
      return `    <item>
      <title>${escape(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(n.summary)}</description>
      <category>${escape(topicLabel[n.topic])}</category>
      <pubDate>${new Date(isoMonth(n.date)).toUTCString()}</pubDate>
      <author>${personalInfo.email} (${escape(personalInfo.name)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Notes by ${escape(personalInfo.name)}</title>
    <link>${SITE_URL}/notes</link>
    <atom:link href="${SITE_URL}/notes/rss.xml" rel="self" type="application/rss+xml" />
    <description>Long-form technical writing on RAG, data pipelines and infrastructure, from systems that actually ran.</description>
    <language>en</language>
    <lastBuildDate>${notes.length ? new Date(isoMonth(notes[0].date)).toUTCString() : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
