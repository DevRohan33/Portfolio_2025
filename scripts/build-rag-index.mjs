// Builds src/server/rag/knowledge-index.json from rohan_knowledge.md.
//
// The source doc's own frontmatter specifies the ingestion contract: chunk on
// `##`/`###` boundaries, ~400-600 tokens per chunk, every section self-contained.
// Section 12 (chatbot behaviour instructions) and 13 (maintenance log) are
// explicitly marked as directives/meta rather than retrievable facts, so they're
// excluded from the index — section 12 is hand-transcribed into
// src/server/rag/systemPrompt.ts instead.
//
// Run manually with a valid OPENAI_API_KEY in .env: `npm run build:rag`
// Re-run whenever rohan_knowledge.md changes.

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

const EXCLUDED_SECTIONS = [
  "12. Chatbot behaviour instructions",
  "13. Maintenance log",
];

const MAX_CHUNK_WORDS = 260; // ~350-400 tokens; sections above this split on ###

function stripFrontmatter(md) {
  return md.replace(/^---\n[\s\S]*?\n---\n/, "");
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

function buildChunks(md) {
  const clean = stripFrontmatter(md);
  const top = splitOnHeading(clean, 2); // ## sections
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
        chunks.push({ heading: `${section.heading} — ${sub.heading}`, content: sub.content });
      }
    } else {
      chunks.push({ heading: section.heading, content: section.content });
    }
  }

  return chunks.filter((c) => wordCount(c.content) > 8);
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

  const md = fs.readFileSync(SOURCE, "utf8");
  const chunks = buildChunks(md);
  console.log(`Built ${chunks.length} chunks from rohan_knowledge.md`);

  const openai = new OpenAI({ apiKey });
  const indexed = [];
  for (const [i, chunk] of chunks.entries()) {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: `${chunk.heading}\n\n${chunk.content}`,
    });
    indexed.push({
      id: i,
      heading: chunk.heading,
      content: chunk.content,
      embedding: res.data[0].embedding,
    });
    console.log(`  [${i + 1}/${chunks.length}] ${chunk.heading}`);
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    OUT_FILE,
    JSON.stringify({ builtAt: new Date().toISOString(), model: "text-embedding-3-small", chunks: indexed })
  );
  console.log(`Wrote ${indexed.length} chunks to ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
