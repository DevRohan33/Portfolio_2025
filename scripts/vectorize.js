
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = process.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error("Please set VITE_OPENAI_API_KEY in your .env file");
  process.exit(1);
}

const openai = new OpenAI({ apiKey });

async function vectorize() {
  const contentPath = path.join(__dirname, '../src/lib/knowledge_base.txt');
  const outputPath = path.join(__dirname, '../src/lib/knowledge_vectors.json');

  if (!fs.existsSync(contentPath)) {
    console.error("Knowledge base file not found at", contentPath);
    return;
  }

  const content = fs.readFileSync(contentPath, 'utf8');
  
  // Simple chunking (by section)
  const chunks = content.split('##').filter(c => c.trim()).map(c => '##' + c);

  console.log(`Vectorizing ${chunks.length} chunks...`);

  const vectors = [];

  for (const chunk of chunks) {
    console.log(`Processing chunk: ${chunk.substring(0, 50)}...`);
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk,
    });

    vectors.push({
      content: chunk,
      embedding: embedding.data[0].embedding
    });
  }

  fs.writeFileSync(outputPath, JSON.stringify(vectors, null, 2));
  console.log(`Success! Saved ${vectors.length} vectors to ${outputPath}`);
}

vectorize().catch(console.error);
