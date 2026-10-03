// Builds src/server/rag/knowledge-index.json for the portfolio assistant.
//
// Two sources:
//   1. rohan_knowledge.md — chunked on its own `##`/`###` boundaries. Section 12
//      (chatbot behaviour instructions) and 13 (maintenance log) are directives
//      and meta rather than retrievable facts, so they're excluded; section 12 is
//      hand-transcribed into src/server/rag/systemPrompt.ts instead.
//   2. The site's own content — every case study and every note — so the
//      assistant can answer detailed questions about a project and link to the
//      page the answer came from.
//
// Every chunk carries `title` + `url`; the chat UI shows them as source links.
//
// Run with a valid OPENAI_API_KEY in .env: `npm run build:rag`
// Re-run whenever rohan_knowledge.md, src/content/caseStudies.ts or
// src/content/notes.ts changes. (The npm script runs Node with
// --experimental-strip-types so it can import those .ts files directly.)

import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config({ quiet: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.join(__dirname, "../rohan_knowledge.md");
const OUT_DIR = path.join(__dirname, "../src/server/rag");
const OUT_FILE = path.join(OUT_DIR, "knowledge-index.json");
const MODEL = "text-embedding-3-small";

const EXCLUDED_SECTIONS = ["12. Chatbot behaviour instructions", "13. Maintenance log"];

const MAX_CHUNK_WORDS = 260; // ~350-400 tokens; sections above this split on ###

// Which page a knowledge-base section is best linked to, matched on its heading.
const KNOWLEDGE_URLS = [
  [/TechPluse/i, "/work/techpluse", "TechPluse"],
  [/RYBO|MyLedger/i, "/work/rybo", "RYBO"],
  [/Abhyas/i, "/work/abhyas", "Abhyas Voice Coach"],
  [/Job Radar/i, "/work/job-radar", "Job Radar"],
  [/Business Operations Platform/i, "/work/ai-workspace", "AI Workspace"],
  [/Technical work at Design Intelligence/i, "/work/agentic-assistant", "Work at Design Intelligence"],
  [/Skills/i, "/uses", "Stack & skills"],
  [/Other projects/i, "/work", "All work"],
];

function knowledgeSource(heading) {
  const hit = KNOWLEDGE_URLS.find(([re]) => re.test(heading));
  return hit ? { url: hit[1], title: hit[2] } : { url: "/about", title: "About Rohan" };
}

function stripFrontmatter(md) {
  return md.replace(/\r\n/g, "\n").replace(/^---\n[\s\S]*?\n---\n/, "");
}

function splitOnHeading(md, level) {
  const marker = "#".repeat(level) + " ";
  const lines = md.split("\n");
  const sections = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith(marker) && !line.startsWith(marker + "#")) {
      if (current) sections.push(current);
      current = { heading: line.replace(marker, "").trim(), body: [line] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push(current);
  return sections.map((s) => ({ heading: s.heading, content: s.body.join("\n").trim() }));
}

function wordCount(s) {
  return s.split(/\s+/).filter(Boolean).length;
}

function knowledgeChunks(md) {
  const top = splitOnHeading(stripFrontmatter(md), 2); // ## sections
  const chunks = [];

  for (const section of top) {
    if (EXCLUDED_SECTIONS.some((ex) => section.heading.startsWith(ex))) continue;

    if (wordCount(section.content) > MAX_CHUNK_WORDS && /^###\s/m.test(section.content)) {
      const subs = splitOnHeading(section.content, 3); // ### subsections
      // keep any intro text before the first ### as its own chunk
      const firstSubIdx = section.content.indexOf("\n### ");
      const intro = firstSubIdx > -1 ? section.content.slice(0, firstSubIdx).trim() : "";
      if (intro && wordCount(intro) > 15) {
        chunks.push({ heading: section.heading, content: intro });
      }
      for (const sub of subs) {
        chunks.push({ heading: `${section.heading} - ${sub.heading}`, content: sub.content });
      }
    } else {
      chunks.push({ heading: section.heading, content: section.content });
    }
  }

  return chunks
    .filter((c) => wordCount(c.content) > 8)
    .map((c) => ({ ...c, ...knowledgeSource(c.heading) }));
}

async function siteChunks() {
  const { caseStudies } = await import("../src/content/caseStudies.ts");
  const { notes } = await import("../src/content/notes.ts");
  const chunks = [];

  for (const s of Object.values(caseStudies)) {
    const url = `/work/${s.slug}`;
    const links = (s.links ?? []).map((l) => `${l.label}: ${l.href}`).join(", ");
    chunks.push({
      heading: `Project: ${s.name} — overview`,
      title: s.name,
      url,
      content: [
        `${s.name} (project page: ${url}). ${s.summary}`,
        `Role: ${s.role}. Stack: ${s.stack}. Timeline: ${s.timeline}. Status: ${s.status}.`,
        links && `Links: ${links}.`,
        s.notice && `Note: ${s.notice}`,
        ...s.problem,
        `Constraints: ${s.constraints.join("; ")}.`,
        `Results: ${s.results.map((r) => `${r.value} ${r.caption}`).join("; ")}.`,
      ]
        .filter(Boolean)
        .join("\n\n"),
    });
    chunks.push({
      heading: `Project: ${s.name} — architecture and decisions`,
      title: s.name,
      url,
      content: [
        `How ${s.name} is built. ${s.architecture}`,
        ...s.architectureBullets.map((b) => `- ${b}`),
        ...s.decisions.map((d) => `Decision — ${d.title}: ${d.body}`),
        `What Rohan would do differently: ${s.whatIdRedo}`,
      ].join("\n"),
    });
  }

  for (const n of notes) {
    const url = `/notes/${n.slug}`;
    n.body.split(/\n(?=## )/).forEach((section, i) => {
      const lines = section.split("\n");
      const heading = i === 0 ? "introduction" : lines[0].replace(/^##\s+/, "");
      const text = i === 0 ? `${n.summary}\n\n${section}` : lines.slice(1).join("\n").trim();
      chunks.push({
        heading: `Note: ${n.title} — ${heading}`,
        title: n.title,
        url,
        content: `From Rohan's note "${n.title}" (${n.date}, ${url}).\n\n${text}`,
      });
    });
  }
  return chunks;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Set OPENAI_API_KEY in .env before running this script.");
    process.exit(1);
  }
  if (!fs.existsSync(SOURCE)) {
    console.error("rohan_knowledge.md not found at repo root:", SOURCE);
    process.exit(1);
  }

  const knowledge = knowledgeChunks(fs.readFileSync(SOURCE, "utf8"));
  const site = await siteChunks();
  const chunks = [...knowledge, ...site];
  console.log(
    `Built ${chunks.length} chunks (${knowledge.length} from rohan_knowledge.md, ${site.length} from case studies and notes)`,
  );

  // One batched request instead of one per chunk.
  const openai = new OpenAI({ apiKey });
  const res = await openai.embeddings.create({
    model: MODEL,
    input: chunks.map((c) => `${c.heading}\n\n${c.content}`),
  });

  const indexed = chunks.map((chunk, i) => ({
    id: i,
    heading: chunk.heading,
    title: chunk.title,
    url: chunk.url,
    content: chunk.content,
    embedding: res.data[i].embedding,
  }));
  for (const c of indexed) console.log(`  [${c.id + 1}/${indexed.length}] ${c.heading}  ->  ${c.url}`);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    OUT_FILE,
    JSON.stringify({ builtAt: new Date().toISOString(), model: MODEL, chunks: indexed }),
  );
  console.log(`Wrote ${indexed.length} chunks to ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
