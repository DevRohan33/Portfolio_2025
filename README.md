# Portfolio

SK Rohan Parveag's portfolio — Next.js 15 (App Router), TypeScript, Tailwind. Statically generated, so every page returns full HTML on first response (no client-side-only content).

## Structure

- `/` — hero, proof strip, selected work, pillars, experience, contact
- `/work`, `/work/[slug]` — flagship case studies + supporting/archive projects
- `/notes`, `/notes/[slug]` — long-form technical writing
- `/about`, `/uses` — story/skills, infrastructure
- `/apps`, `/apps/[appId]` — small shipped apps
- `/api/chat` — the AI assistant's endpoint (RAG over `rohan_knowledge.md`, OpenAI key stays server-side)

Content lives in `src/content/` (`site.ts`, `caseStudies.ts`, `notes.ts`). The chatbot's knowledge instead comes from `rohan_knowledge.md` at the repo root — see below.

## Dev

```bash
npm install
npm run dev
```

Set `OPENAI_API_KEY` in `.env` for the chat assistant.

## Chatbot / RAG

The floating assistant answers only from `rohan_knowledge.md`. Pipeline:

1. `scripts/build-rag-index.mjs` chunks that file on its own `##`/`###` boundaries (excluding the
   "Chatbot behaviour instructions" and "Maintenance log" sections — those aren't retrievable facts),
   embeds each chunk with `text-embedding-3-small`, and writes `src/server/rag/knowledge-index.json`.
2. `src/app/api/chat/route.ts` embeds the incoming question, retrieves the top matching chunks
   (`src/server/rag/retrieve.ts`), and answers with `gpt-4o-mini` using a system prompt
   (`src/server/rag/systemPrompt.ts`, hand-transcribed from the doc's own behaviour-instructions section)
   plus that retrieved context.

**Whenever `rohan_knowledge.md` changes, re-run the indexer and commit the result:**

```bash
npm run build:rag
```

This is a Next.js API route, not a separate FastAPI service — it already keeps `OPENAI_API_KEY`
server-side with no separate backend to deploy/host, which was the actual requirement. Move to a
standalone FastAPI service if you outgrow what a single Next.js route can do.

## Build

```bash
npm run build
npm run start
```

Deploy target: Vercel (or Cloudflare Pages) — `vercel.json` sets `framework: nextjs`.
