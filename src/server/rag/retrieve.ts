import fs from "fs";
import path from "path";

export type IndexedChunk = {
  id: number;
  heading: string;
  title?: string;
  url?: string;
  content: string;
  embedding: number[];
};

type KnowledgeIndex = {
  builtAt: string;
  model: string;
  chunks: IndexedChunk[];
};

export type Source = { title: string; url: string };

let cached: KnowledgeIndex | null | undefined;
let chunkTerms: Set<string>[] = [];

const STOPWORDS = new Set(
  "a an and are as at be but by can did do does for from has have he his how i in is it its me my of on or rohan rohan's s so tell that the their them there they this to was what when where which who why will with you your about".split(
    " ",
  ),
);

function terms(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9][a-z0-9+#.-]*/g) ?? []).filter(
    (t) => t.length > 1 && !STOPWORDS.has(t),
  );
}

function loadIndex(): KnowledgeIndex | null {
  if (cached !== undefined) return cached;
  try {
    const filePath = path.join(process.cwd(), "src", "server", "rag", "knowledge-index.json");
    cached = JSON.parse(fs.readFileSync(filePath, "utf8")) as KnowledgeIndex;
    chunkTerms = cached.chunks.map((c) => new Set(terms(`${c.heading} ${c.content}`)));
  } catch {
    cached = null;
  }
  return cached;
}

function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0,
    magA = 0,
    magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export function isIndexAvailable() {
  return loadIndex() !== null;
}

/**
 * Hybrid retrieval: 0.7 × embedding similarity + 0.3 × keyword overlap.
 * Embeddings catch paraphrase; the lexical half rescues exact names and terms
 * ("RapidFuzz", "Razorpay", "EXIF") that a small embedding model blurs.
 * Chunks from the page the visitor is reading get a small boost, so
 * "how does this work?" resolves to the project on screen.
 */
export function retrieveTopChunks(
  queryEmbedding: number[],
  queryText: string,
  { topK = 6, currentPath }: { topK?: number; currentPath?: string } = {},
): IndexedChunk[] {
  const index = loadIndex();
  if (!index) return [];

  const queryTerms = Array.from(new Set(terms(queryText)));

  const scored = index.chunks.map((chunk, i) => {
    const vector = cosineSimilarity(queryEmbedding, chunk.embedding);
    const lexical = queryTerms.length
      ? queryTerms.filter((t) => chunkTerms[i].has(t)).length / queryTerms.length
      : 0;
    const onPage = currentPath && chunk.url && chunk.url === currentPath ? 0.05 : 0;
    return { chunk, score: 0.7 * vector + 0.3 * lexical + onPage };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((r) => r.chunk);
}

export function formatContext(chunks: IndexedChunk[]) {
  return chunks
    .map((c) => `### ${c.heading}${c.url ? ` (page: ${c.url})` : ""}\n${c.content}`)
    .join("\n\n");
}

/** Distinct pages behind the retrieved chunks, best match first. */
export function sourcesFor(chunks: IndexedChunk[], limit = 3): Source[] {
  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const c of chunks) {
    if (!c.url || !c.title || seen.has(c.url)) continue;
    seen.add(c.url);
    sources.push({ title: c.title, url: c.url });
    if (sources.length === limit) break;
  }
  return sources;
}
