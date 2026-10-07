# Portfolio

SK Rohan Parveag's portfolio - Next.js 15 (App Router), TypeScript, Tailwind. Statically generated, so every page returns full HTML on first response (no client-side-only content).

## Structure

- `/` - hero, proof strip, selected work, pillars, experience, contact
- `/work`, `/work/[slug]` - flagship case studies + supporting/archive projects
- `/notes`, `/notes/[slug]` - long-form technical writing
- `/about`, `/uses` - story/skills, infrastructure
- `/apps`, `/apps/[appId]` - small shipped apps
- `/api/chat` - the AI assistant's endpoint (RAG over `rohan_knowledge.md`, OpenAI key stays server-side)

Content lives in `src/content/` (`site.ts`, `caseStudies.ts`, `notes.ts`). The chatbot's knowledge instead comes from `rohan_knowledge.md` at the repo root - see below.

## Dev

```bash
npm install
npm run dev
```

Set `OPENAI_API_KEY` in `.env` for the chat assistant.

## Chatbot / RAG

The floating assistant answers only from Rohan's own material, and links each answer to the page it came from.

1. **Index**- `scripts/build-rag-index.mjs` builds `src/server/rag/knowledge-index.json` from
   `rohan_knowledge.md` (chunked on its `##`/`###` boundaries; the "Chatbot behaviour instructions" and
   "Maintenance log" sections are excluded) **plus every case study and note** in `src/content/`. Every
   chunk carries a `title` and `url` for source links. Embeddings: `text-embedding-3-small`, one batched call.
2. **Retrieve**- `src/server/rag/retrieve.ts` ranks chunks by 0.7 × cosine similarity + 0.3 × keyword
   overlap, with a small boost for the page the visitor is on. Short follow-ups are joined with the
   previous question before embedding, so "what stack did it use?" works.
3. **Answer**- `src/app/api/chat/route.ts` streams the reply (`CHAT_MODEL`, default `gpt-5-nano`) with the
   system prompt from `src/server/rag/systemPrompt.ts` and returns the source pages in an `X-Sources`
   header. Input is validated and capped, and each IP gets 20 questions per 10 minutes (`src/server/rateLimit.ts`).
4. **UI**- `src/components/AIChatbot.tsx`: streaming with a stop button, page-aware suggestions,
   a safe markdown subset (`src/components/chat/ChatMarkdown.tsx`), source chips, and the conversation kept
   per tab in `sessionStorage`.

**Whenever `rohan_knowledge.md`, a case study or a note changes, re-run the indexer and commit the result:**

```bash
npm run build:rag
```

## SEO

- `src/lib/seo.ts`- `pageMeta()` gives every page its own canonical URL and full Open Graph / Twitter tags;
  JSON-LD helpers build one linked graph (`Person`, `WebSite`, `ProfilePage`, `Blog`/`BlogPosting`,
  `SoftwareApplication`/`SoftwareSourceCode`/`CreativeWork`, `BreadcrumbList`).
- `src/app/sitemap.ts` (real dates, priorities, image entries), `src/app/robots.ts`,
  `/notes/rss.xml` (RSS feed) and `/llms.txt` (a site map for AI assistants)- all generated from `src/content/`.
- Bump `SITE_UPDATED` in `src/lib/seo.ts` when content changes meaningfully.
- **Domain:** `https://rohanparveag.in`, set once as `SITE_URL` in `src/lib/seo.ts`. `next.config.mjs`
  308-redirects `rohanparveag.online` and `www.` hosts to the same path on the new domain.
- **AEO (answer engines):** visible FAQ on `/about` and "quick answers" on every project page, both with
  `FAQPage` markup; `/llms.txt` (index) and `/llms-full.txt` (full text); AI crawlers named in `robots.ts`.
- **SEM / analytics (all optional, off until set):**

  | Variable                   | What it does                                                                                                                              |
  | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
  | `NEXT_PUBLIC_GA_ID`        | Loads GA4. Events: `generate_lead` (email click- mark as a key event), `social_click`, `project_link_click`, `chat_open`, `chat_question` |
  | `GOOGLE_SITE_VERIFICATION` | Search Console verification meta tag                                                                                                      |
  | `BING_SITE_VERIFICATION`   | Bing Webmaster Tools verification meta tag                                                                                                |
  | `CHAT_MODEL`               | Chat model for the assistant (default `gpt-5-nano`)                                                                                       |

## Build

```bash
npm run build
npm run start
```

Deploy target: Vercel (or Cloudflare Pages) - `vercel.json` sets `framework: nextjs`.
