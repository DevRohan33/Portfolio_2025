# Portfolio & Content Plan — SK Rohan Parveag

**Target direction:** Data + AI systems, with deployment/infra as a differentiator
**Prepared:** August 2026

---

## 1. The core problem

Your actual work is significantly more impressive than what your portfolio shows.

**What the portfolio currently says:** "Web Developer and AI Enthusiast." Nine projects, weighted toward small React sites. Internship bullets about a BMI calculator and a to-do list. A skills page that reads like a syllabus.

**What you actually do:** multi-tenant RAG platforms, agentic AI that takes actions in external engineering tools, a QuickBase↔SAP data pipeline, S3/Wasabi asset pipelines with EXIF geolocation extraction and video-to-frame processing, a proxy API layer for credential isolation, and self-managed deployment across Docker/Dokploy/VPS. Plus two live products with real users — TechPluse and MyLedger (2,000+ bills at a real wholesale business).

**None of the second list is on your site.** A recruiter reading your portfolio and a recruiter reading your LinkedIn feed meet two different people. Fix that gap and everything else is polish.

### Three specific problems to name

1. **"Enthusiast" framing.** You are past this. You have production systems with paying/real users. The word to reach for is _shipped_, not _interested in_.
2. **Toy projects dilute flagship projects.** Invoice Generator and GPT Jugad sitting at the same visual weight as a live multi-tenant RAG platform makes the RAG platform look smaller, not the invoice generator look bigger.
3. **The site is client-rendered with no server-side content.** I fetched `rohanparveag.online` and got only meta tags — zero body text. Google can usually execute JS; AI search tools (ChatGPT, Perplexity, Claude), LinkedIn link previews, and many recruiter scrapers often cannot. Right now, to a large and growing share of the internet, your portfolio is a blank page. **This is the single highest-leverage fix on this list.**

---

## 2. Positioning

### Title

> **AI Systems Engineer** — Backend, RAG & Data Pipelines

Use this everywhere: site hero, LinkedIn headline, resume, GitHub bio. Consistency across surfaces is worth more than finding the perfect phrase.

_Why not "Generative AI Developer":_ that's a crowded, prompt-flavored label. "Systems Engineer" claims the thing that's actually rare in your profile — you build the AI _and_ the pipeline _and_ the deployment underneath it.

### One-line positioning

> I build AI systems that survive contact with production — RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running.

### Three proof pillars

Every project, post, and resume bullet should ladder into one of these. If it doesn't fit, it goes in the archive.

| Pillar             | What it proves                         | Evidence you already have                                                                                                                                        |
| ------------------ | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Applied AI**     | You build AI that does work, not demos | Multi-tenant RAG platform · agentic AI acting on external engineering tools · enterprise chatbots · Brave MCP + LLM news pipeline                                |
| **Data & Backend** | You move and shape real data at volume | QuickBase↔SAP pipeline · S3/Wasabi asset pipelines · EXIF geolocation extraction · video→frame processing · dedup/filter/summarize pipeline · FastAPI + Postgres |
| **Ship & Run**     | You own the thing end to end           | Docker · Dokploy · VPS · proxy API layer for credential isolation · TechPluse and MyLedger live and maintained                                                   |

### Your actual differentiator

Most people with your years of experience have _either_ AI project work _or_ infra experience. You have both, plus an unusual origin story — solar plant maintenance at Adani Mundra. Your LinkedIn About already uses this well ("systems have to actually work in the real world"). **Move that line to the portfolio.** It's the most memorable sentence you've written and it's currently only on LinkedIn.

---

## 3. Site architecture

### Current

Home → About → Skills → Projects → Experience → Education → Contact

Nine same-size project cards, one-paragraph descriptions, no depth anywhere.

### Proposed

```
/                    Hero → Proof strip → Flagship work (3) → Pillars → Experience → Contact
/work                All projects, tiered
/work/techpluse      Case study
/work/myledger       Case study
/work/ai-workspace   Case study
/notes               Technical writing (see §7)
/about               Story, skills, education, resume download
/uses                Stack + how you deploy  ← your infra differentiator, made visible
```

**Key structural change:** case study pages. A card can't carry a multi-tenant RAG architecture. A page can. Three case studies beat nine cards for every audience you care about.

### Homepage proof strip

Directly under the hero, four numbers. Concrete, verifiable, no adjectives:

```
2,000+          3+ months        4               1 yr 7 mos
bills processed  live with a      production      shipping backend
in production    real business    systems         & AI at Design Intelligence
```

---

## 4. Copy — section by section

### Hero

```
SK Rohan Parveag
AI Systems Engineer — Backend, RAG & Data Pipelines

I build AI systems that survive contact with production: RAG and agent
pipelines, the data infrastructure that feeds them, and the deployments
that keep them running.

Currently backend & AI at Design Intelligence LLP.

[ See the work ]  [ Resume ]  [ GitHub ]
```

Cut "Architecting the future with Generative AI & Web Innovation." It's atmosphere, not information. Every line in a hero should be something a competitor couldn't also write.

### About

Lead with the Adani story — you already have the right draft on LinkedIn. Tighten:

```
I started out maintaining solar panels at Adani's Mundra facility. Not the
usual origin story for a backend engineer, but it taught me something that
shows up in my code every day: systems have to work in the real world, not
just in theory. A panel array doesn't care how elegant your model is.

I moved into software in 2024. Today I build backend and AI systems at
Design Intelligence LLP — FastAPI services, RAG pipelines, multi-agent
systems, and the data plumbing underneath them. I deploy and maintain
what I build, on Docker and VPS infrastructure I manage myself.

Outside of work I run two products: TechPluse, an automated AI news and
research pipeline, and MyLedger, a wholesale business ledger that's been
live with a real distributor for three months and 2,000+ bills.

BTech CSE, MAKAUT / Elitte College of Engineering, 2026.
```

### Skills — regroup, then cut

The current list has 30+ items across six categories, weighted equally. That signals "student" more than "engineer." Cut to four groups, ordered by your positioning:

```
AI Systems
  RAG pipelines (multi-tenant, hybrid retrieval)
  Multi-agent systems & tool-calling agents
  LangChain · LangGraph · MCP
  Vector databases — FAISS, Pinecone, Chroma
  LLM integration & evaluation

Data & Backend
  Python · FastAPI · Django
  PostgreSQL · MongoDB · schema design
  ETL & pipeline design — dedup, filtering, enrichment
  Object storage pipelines — S3, Wasabi
  Media processing — EXIF extraction, video frame extraction
  REST API design · third-party & proxy API integration

Infrastructure & Delivery
  Docker · Dokploy · VPS administration
  AWS — EC2, S3, RDS, IAM
  CI/CD · credential isolation & secrets handling
  Production monitoring & maintenance

Frontend & 3D
  React · Next.js · TypeScript · Tailwind
  Three.js · React Three Fiber
```

**Cut:** C, Matplotlib, "Data Cleaning & EDA," and the "Core Competencies" word cloud (System Architecture / Problem Solving / etc.). Those eight tiles say nothing a reader can verify — delete the block entirely and let the case studies do that work.

**On honesty:** where a skill is genuinely early, say so — "AWS (EC2, S3, IAM — working knowledge)". A calibrated claim reads as more trustworthy than a flat list, and it protects you in interviews.

---

## 5. Projects — tier and rewrite

### Tier 1 — Flagship (homepage + full case study page)

**1. TechPluse — automated AI news & research pipeline**
`techpluse.in` · live
Merge this with the existing "AI News Intelligence Platform" card — they're the same thing and it should carry the real name and URL.

> An end-to-end pipeline that turns raw internet noise into a structured AI newsroom. Discovers AI/ML/LLM content from the last 24 hours via Brave MCP, filters for relevance and deduplicates against existing entries, rewrites headlines and generates structured summaries with an LLM, then stores everything with source links and direct PDF access for research papers. Fully automated — the newsroom updates without me.

Stack: Python · FastAPI · Brave MCP · LangChain · LLMs · PostgreSQL · React
Case study should cover: dedup strategy, cost per article, failure handling when a source goes down, why MCP over scraping.

**2. MyLedger — wholesale ledger, live with a real business**
Live 3+ months with Gate of India Food · 2,000+ bills

> Every wholesale business I've seen runs on a paper notebook. MyLedger replaces it: stock tracking with real average cost, per-buyer custom rates, automatic due tracking, instant PDF invoices, staff accounts with activity logs, and profit reporting. I designed the product end to end — UI/UX, Firestore data architecture, AWS storage, security rules, subscription logic — and built it using Claude Code as an engineering partner.

Stack: Flutter · Firestore · AWS · Claude Code
**Keep the "I used AI to build this" framing.** It's honest, it's current, and it demonstrates exactly the judgment employers are starting to screen for: knowing what to specify and what to delegate. Your LinkedIn post handles this well — reuse that voice.
Case study should cover: the data model for average cost, security rules for multi-staff access, what you learned shipping to a non-technical user.

**3. AI Business Operations Platform**
With Anubhab Das · launching

> A unified AI workspace for startups: a RAG-powered support agent trained on your own documents (PDF, DOCX, TXT, or just a URL) with lead extraction and a public hosted URL for teams without a website; per-employee AI assistants; automated billing, payslips, and HR tracking; full conversation oversight for founders.

Stack: Python · Django · FastAPI · React · LangChain · RAG · PostgreSQL · Docker · AWS
**Blocking issue: name it.** You've been posting "we haven't named it yet" — that's a fine one-time hook but it can't go on a portfolio. Ship a name before this page goes live.

**4. Enterprise data & asset pipeline** _(Design Intelligence — describe generically if under NDA)_
This is your strongest engineering work and it's completely absent from your site.

> Built the FastAPI backend connecting QuickBase to SAP, plus the asset pipeline serving media from S3 to the frontend: EXIF-based location extraction, video-to-frame conversion, and on-demand 3D and image previews driven by external APIs. Added a proxy API layer so credentials for third-party services never reach the client. Automated bulk operations against Wasabi storage in Python.

Check with your employer on what's shareable. If specifics are off-limits, write it at the architecture level — no client names, no schemas. "Integrated a low-code platform with an ERP" is still a strong sentence.

### Tier 2 — Solid supporting work (`/work`, cards only)

Krishi Sathi · College Management Portal · FytTrk · SMG Energy Website

### Tier 3 — Archive (collapsed list, one line each)

Invoice Generator · Stock Market Analysis · GPT Jugad
Keep them — they show range — but at the bottom, in a `<details>` block or a plain list. No cards, no images.

### Cut entirely

The CodSoft and Oasis Infobyte internship bullet lists. "Designed BMI Calculator" and "Created Calculator GUI" next to a production RAG platform actively lowers your perceived level. Compress both to a single line in Experience:

> **2024 — Python Programming Intern**, CodSoft & Oasis Infobyte. Early Python fundamentals across GUI and API projects.

### Case study template (use for all Tier 1)

```
Problem       →  What was broken, for whom, at what cost
Constraints   →  Budget, scale, team size, deadline, what you couldn't change
Architecture  →  A diagram. Actually draw it. Excalidraw is fine.
Decisions     →  2-3 real forks in the road and why you picked what you picked
Result        →  Numbers. Users, volume, latency, cost, uptime.
What I'd redo →  One honest thing. This single section signals more seniority
                 than the rest of the page combined.
```

---

## 6. Consistency & correctness pass

These are small, but they're the ones that cost you interviews.

**Job title conflict** — portfolio says "Junior Software Developer," LinkedIn says "Junior Software Engineer." Pick one. Use the one on your offer letter.

**Date conflicts:**

- Design Intelligence start: portfolio says Jul 2025, LinkedIn position says Jun 2025
- LinkedIn company header says "1 yr 7 mos" but the listed position is "Jun 2025 – Present"; with the Feb 2025 internship the total is ~1 yr 7 mos, so the header is right and the impression of a gap is a display artifact — just make sure your resume shows both roles explicitly
- Education: portfolio says "Oct 2023 – Apr 2026," LinkedIn says "Oct 2023 – Jul 2026"

**Typos on the live site** (each one is a small credibility tax):

- "Talwind" → **Tailwind** (appears twice)
- "javaScript" → **JavaScript**; "typeScript" → **TypeScript**
- "Maintanence Engineer" → **Maintenance Engineer**
- "abel to get" → **able to get**
- "farmers ai assistace" → **farmers' AI assistance**
- "3js" → **Three.js**
- "Quickbase" → **QuickBase**

**Stat to update:** "10+ Completed Projects" — with TechPluse, MyLedger, and the workspace platform, replace the count with the proof strip from §3. Counts invite the question "how big were they?"; volume numbers don't.

**Footer:** "© 2026 SK Rohan Parveag. Built with Passion & AI." — the year is fine; consider making it auto-update.

**Two emails on LinkedIn** (`skrohanparveag@` and `paarrveagr@`). Publish one. Two looks like a typo even when it isn't.

---

## 7. Content engine

You already have distribution — 1,402 followers, engaged posts, a real build-in-public voice. The gap is that none of that traffic lands anywhere durable. Fix the destination first, then feed it.

### Add `/notes` to the portfolio

Long-form versions of what you already post. Each post is a case study you can link forever, and it's the SEO/AI-search surface your current site completely lacks.

**First six posts, all from work you've already done:**

1. Deduplicating an automated news pipeline — title matching isn't enough
2. Multi-tenant RAG: keeping one customer's documents out of another's answers
3. Extracting geolocation from image EXIF at scale, and why the metadata lies
4. A proxy API layer: how to let a frontend use third-party APIs without shipping keys
5. Running 4 products on one VPS with Dokploy and Docker — the actual setup and monthly cost
6. What shipping to a wholesale distributor taught me that no tutorial did

Post 5 will outperform the others. Cost-transparent infra posts travel, and it's the piece of your profile no one else has.

### LinkedIn cadence

Two posts a week, alternating:

- **Build log** — something you shipped, with a screenshot or short screen recording
- **Teardown** — how a piece of your system works, ending in a link to the `/notes` version

Keep the voice you already use. The "Swiss Army Knife for Startups" post works because it's funny and specific. Don't sand that off.

### GitHub

Currently `DevRohan33` is listed but doing no work for you. Pin six repos, in this order: TechPluse · AI Workspace · College Management Portal · Krishi Sathi · FytTrk · Stock Analysis. Every pinned repo needs a README with: one-line description, screenshot or GIF, stack, architecture note, run instructions. A repo without a README reads as abandoned.

### The portfolio chatbot

You already ship "Hey, I'm Rohan's AI assistant." Most portfolios don't have this — make it a feature instead of a widget:

- Seed 4 suggested questions ("What's his RAG experience?", "Is he open to roles?", "Walk me through TechPluse")
- Ground it strictly in your resume and case studies; have it cite which project an answer came from
- **Log the questions.** You'll learn exactly what recruiters want to know, and that becomes your next round of copy edits. This is free, and almost nobody does it.

---

## 8. Deployment & infrastructure plan

### For the portfolio itself

- **Fix the rendering.** Move to Next.js with SSR/SSG, or pre-render at build. Right now the page is invisible to non-JS crawlers, which increasingly includes AI search. Everything else in this document depends on the content being readable.
- Host on Vercel or Cloudflare Pages — free, fast, and lets you spend VPS resources on products
- Add per-page OG images so shared links preview properly on LinkedIn
- Add `sitemap.xml`, `robots.txt`, and JSON-LD `Person` + `SoftwareApplication` schema
- Plausible or Umami for analytics — you need to know whether `/work/techpluse` actually gets read
- Lighthouse target: 95+ on performance and accessibility. Watch Three.js bundle weight; lazy-load anything 3D and give it a static fallback on mobile.

### For your products — document the setup as an asset

You're already running Docker + Dokploy + VPS across multiple deployments. Write it down, on `/uses`:

- Reverse proxy and TLS approach
- One-service-per-container layout and how you handle env/secrets
- Postgres backup schedule and restore procedure _(if you don't have a tested restore, build one this month — it's the most common gap and the most damaging)_
- Uptime monitoring and alerting
- Actual monthly cost

Two reasons this matters: it's genuinely useful to you, and "here's my production setup, here's what it costs, here's how I recover from failure" is a sentence that separates you from every other 2026 CSE graduate.

---

## 9. Execution roadmap

### Weeks 1–2 — Foundation

- [ ] Fix client-side rendering (SSR/SSG) — everything depends on this
- [ ] Full typo and consistency pass (§6)
- [ ] New hero, About, and proof strip
- [ ] Regroup skills; delete the Core Competencies block
- [ ] Reorder projects into tiers; demote the CodSoft/Oasis bullets
- [ ] Align resume and LinkedIn headline to the new title

### Weeks 3–4 — Depth

- [ ] Build the case study template
- [ ] Write TechPluse and MyLedger case studies, with architecture diagrams
- [ ] Add the Design Intelligence pipeline project (NDA-checked)
- [ ] Add TechPluse and MyLedger cards to the site — currently missing entirely
- [ ] Upgrade the portfolio chatbot; start logging questions

### Month 2 — Distribution

- [ ] Ship `/notes` with the first three posts
- [ ] GitHub cleanup: pin six, README each
- [ ] Ship `/uses`
- [ ] Two LinkedIn posts a week, each linking back to the site
- [ ] Ask Gate of India Food for two sentences you can quote — a real customer testimonial outweighs any amount of self-description

### Month 3 — Compound

- [ ] Name and launch the AI workspace platform; write the launch case study
- [ ] Posts 4–6 on `/notes`
- [ ] 60–90 second demo video for each flagship project
- [ ] Review analytics and chatbot logs; rewrite whatever nobody reads

---

## 10. What to measure

| Metric                            | Where              | Target by month 3 |
| --------------------------------- | ------------------ | ----------------- |
| Case study page views             | Plausible/Umami    | 200+/mo           |
| Contact form + email conversions  | Analytics          | 5+/mo             |
| Chatbot conversations             | Your own logs      | 50+/mo            |
| LinkedIn search appearances       | LinkedIn Analytics | 11 → 100+         |
| Inbound opportunity conversations | Manual count       | 3+/mo             |

If case study views stay flat while LinkedIn engagement rises, the problem is your call-to-action, not your content — every post should end with a link to a specific page, not a general "check out my portfolio."

---

## 11. The five things that matter most

Everything above, ranked. If you only do five:

1. **Fix server-side rendering.** Your portfolio is currently blank to a large share of automated readers.
2. **Add TechPluse and MyLedger to the site.** Your two best proof points aren't on your portfolio at all.
3. **Write three real case studies.** Depth on three beats surface on nine, for recruiters and for LLM-based search.
4. **Add the Design Intelligence pipeline work.** Your strongest engineering is invisible.
5. **Move the Adani story to your homepage.** It's your most memorable sentence and it's stranded on LinkedIn.
