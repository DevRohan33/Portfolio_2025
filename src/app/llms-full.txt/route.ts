import { caseStudies } from "@/content/caseStudies";
import { aboutLead, aboutStory, faqs, personalInfo } from "@/content/site";
import { formatNoteDate, notesNewestFirst } from "@/lib/notes";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /llms-full.txt- the complete text of the site in one markdown file, for AI
 * assistants that read a whole site before answering. /llms.txt is the short
 * index; this is the full content behind it.
 */
export function GET() {
  const projects = Object.values(caseStudies)
    .map(
      (s) => `## ${s.name}

URL: ${abs(`/work/${s.slug}`)}
Role: ${s.role} · Stack: ${s.stack} · Timeline: ${s.timeline} · Status: ${s.status}
${s.links?.length ? `Links: ${s.links.map((l) => l.href).join(", ")}\n` : ""}${s.notice ? `Note: ${s.notice}\n` : ""}
${s.summary}

### The problem

${s.problem.join("\n\n")}

### Constraints

${s.constraints.map((c) => `- ${c}`).join("\n")}

### Architecture

${s.architecture}

${s.architectureBullets.map((b) => `- ${b}`).join("\n")}

### Decisions

${s.decisions.map((d) => `**${d.title}.** ${d.body}`).join("\n\n")}

### Results

${s.results.map((r) => `- ${r.value}- ${r.caption}`).join("\n")}

### What he'd do differently

${s.whatIdRedo}`,
    )
    .join("\n\n---\n\n");

  const notes = notesNewestFirst()
    .map(
      (n) =>
        `## ${n.title}\n\nURL: ${abs(`/notes/${n.slug}`)} · ${formatNoteDate(n.date)}\n\n${n.summary}\n\n${n.body}`,
    )
    .join("\n\n---\n\n");

  const body = `# ${personalInfo.name}- full site content

> ${personalInfo.title} in Kolkata, India. ${aboutLead}

Contact: ${personalInfo.email} · GitHub: ${personalInfo.github} · LinkedIn: ${personalInfo.linkedin}

# About

${aboutStory.trim()}

# Frequently asked questions

${faqs.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}

# Projects

${projects}

# Notes

${notes}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
