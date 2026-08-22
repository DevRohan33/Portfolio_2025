import fs from "fs";
import path from "path";

type IndexedChunk = {
  id: number;
  heading: string;
  content: string;
  embedding: number[];
};

type KnowledgeIndex = {
  builtAt: string;
  model: string;
  chunks: IndexedChunk[];
};

let cached: KnowledgeIndex | null | undefined;

function loadIndex(): KnowledgeIndex | null {
  if (cached !== undefined) return cached;
  try {
    const filePath = path.join(process.cwd(), "src", "server", "rag", "knowledge-index.json");
    cached = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    cached = null;
  }
  return cached;
}

function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0, magA = 0, magB = 0;
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

export function retrieveTopChunks(queryEmbedding: number[], topK = 5): IndexedChunk[] {
  const index = loadIndex();
  if (!index) return [];

  return [...index.chunks]
    .map((chunk) => ({ chunk, score: cosineSimilarity(queryEmbedding, chunk.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((r) => r.chunk);
}

export function formatContext(chunks: IndexedChunk[]) {
  return chunks.map((c) => `### ${c.heading}\n${c.content}`).join("\n\n");
}
