import { caseStudies } from "@/content/caseStudies";
import { notesNewestFirst } from "@/lib/notes";
import { aboutLead, faqs, personalInfo } from "@/content/site";
import { SITE_URL, abs } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /llms.txt (llmstxt.org): a plain-markdown map of the site for AI assistants
 * and AI search (ChatGPT, Perplexity, Claude), so they describe Rohan and his
 * work from the source instead of guessing. Generated from the same content as
 * the pages, so it never drifts out of date.
 */
export function GET() {
  const projects = Object.values(caseStudies)
    .map((s) => `- [${s.name}](${abs(`/work/${s.slug}`)}): ${s.summary} Status: ${s.status}. Stack: ${s.stack}.`)
    .join("\n");
  const notes = notesNewestFirst()
    .map((n) => `- [${n.title}](${abs(`/notes/${n.slug}`)}): ${n.summary}`)
    .join("\n");

  const body = `# ${personalInfo.name}

> ${personalInfo.title} in Kolkata, India. ${aboutLead}

Currently Junior Software Engineer at Design Intelligence LLP, building production LLM systems: an agentic engineering assistant on OpenAI function calling, RAG pipelines, and the FastAPI integrations and data pipelines underneath.

Contact: ${personalInfo.email} · GitHub: ${personalInfo.github} · LinkedIn: ${personalInfo.linkedin}

## Projects

${projects}

## Notes

${notes}

## Quick answers

${faqs.map((f) => `- **${f.q}** ${f.a}`).join("\n")}

## Pages

- [About](${abs("/about")}): story, principles, career path, skills and education
- [Uses](${abs("/uses")}): the full stack and infrastructure
- [Work](${abs("/work")}): all projects
- [Full site content for LLMs](${abs("/llms-full.txt")})
- [Notes RSS](${abs("/notes/rss.xml")})
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
