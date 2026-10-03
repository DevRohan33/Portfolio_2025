export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  stack: string;
  timeline: string;
  status: string;
  links?: { label: string; href: string }[];
  notice?: string;
  image?: string;
  gallery?: GalleryImage[];
  problem: string[];
  constraints: string[];
  architecture: string;
  architectureBullets: string[];
  decisions: { title: string; body: string }[];
  results: { value: string; caption: string }[];
  whatIdRedo: string;
};

const desktop = (src: string, alt: string, caption?: string): GalleryImage => ({
  src,
  alt,
  caption,
  width: 1600,
  height: 1000,
});

const phone = (src: string, alt: string, caption?: string): GalleryImage => ({
  src,
  alt,
  caption,
  width: 780,
  height: 1688,
});

export const caseStudies: Record<string, CaseStudy> = {
  rybo: {
    slug: "rybo",
    name: "RYBO",
    summary:
      "Run Your Business Operation - billing, stock, dues, deliveries and team for wholesale distributors, on Android and the web. Formerly MyLedger, and running a real distributor's business every day.",
    role: "Product & systems design, built with Claude Code as an engineering partner",
    stack:
      "Flutter · Riverpod · Firebase (Firestore, Cloud Functions) · Razorpay · S3",
    timeline: "2026 - ongoing · v1.3.7",
    status: "Live - Gate of India Food",
    links: [
      { label: "rybo.rohanparveag.in", href: "https://rybo.rohanparveag.in" },
      { label: "Web app", href: "https://app.rybo.rohanparveag.in" },
    ],
    image: "/projects/rybo/cover.webp",
    gallery: [
      phone(
        "/projects/rybo/sell-items.webp",
        "RYBO new sale screen with agreed customer rates",
        "Billing applies each buyer's agreed rate and quantity tier",
      ),
      phone(
        "/projects/rybo/bill-sheet.webp",
        "RYBO bill summary sheet",
        "A bill is saved whole on the server, or not at all",
      ),
      phone(
        "/projects/rybo/delivery-task.webp",
        "RYBO delivery task steps",
        "Couriers tap through each delivery step",
      ),
      phone(
        "/projects/rybo/customers.webp",
        "RYBO customer list with dues",
        "Live dues per customer, from stored totals",
      ),
      desktop(
        "/projects/rybo/collections.webp",
        "RYBO collections book on desktop",
        "Collections: overdue balances, promises and follow-ups",
      ),
      desktop(
        "/projects/rybo/deliveries.webp",
        "RYBO deliveries board on desktop",
        "Deliveries board for owners and admins",
      ),
      desktop(
        "/projects/rybo/reports.webp",
        "RYBO reports on desktop",
        "Reports: revenue, top products, collection rate",
      ),
      desktop(
        "/projects/rybo/profit.webp",
        "RYBO profit and loss on desktop",
        "Profit & loss from the real cost of goods",
      ),
    ],
    problem: [
      "Every wholesale business I looked at runs on a paper notebook - stock, dues, and per-buyer pricing tracked by hand. Goods go out with a delivery boy, every buyer has their own rate, and every unpaid rupee has to be remembered and chased. The owner can't see profit in real time, and staff mistakes stay invisible until a reconciliation goes wrong.",
      "RYBO replaces the notebook. One bill saves the sale, moves the stock, records the money, starts the delivery and updates the customer's due - at once, on every phone and PC in the shop.",
    ],
    constraints: [
      "Real, non-technical end users - every screen has to work without training",
      "Several staff billing at the same time on one shared company account",
      "Patchy connectivity on the shop floor - billing can't stop when the signal drops",
      "Real money: a double tap or a retry must never count a payment twice",
      "Old app versions stay installed in the field, so backend changes have to roll out in steps",
    ],
    architecture:
      "Flutter clients (Android and web) read live from Firestore, but every write that moves money, stock or plan usage goes through Cloud Functions - one Firestore transaction per call, carrying an ID made on the device. Triggers keep running totals, so screens read stored figures instead of adding up history.",
    architectureBullets: [
      "Flutter + Riverpod - one codebase for the Android app and the web app",
      "Cloud Functions (asia-south1) - createBill, recordPayment, addStock, deliveries, plans; each one transaction",
      "Idempotent writes - device-made request IDs, so a retry, double tap or offline replay lands exactly once",
      "Offline queue - bills made without signal wait on the device and sync themselves; nothing is silently lost",
      "Stored aggregates - triggers maintain customer dues, daily stats and bill counters, so reads stay flat as data grows",
      "Security rules - per-company isolation and Owner / Admin / Staff roles; purchase cost lives in a private ledger staff can't read",
      "Razorpay - checkout in the app, pricing and verification on the server",
    ],
    decisions: [
      {
        title: "Moving money writes from the client to the server",
        body: "The first version wrote straight to Firestore, with security rules doing the access control - it cut out a whole backend and got the product in front of a real distributor fast. Once several people billed at once over patchy connections, that stopped being enough. Now the server is the authority for bills, payments, stock and plan limits, and the rules refuse direct money writes once old app versions are retired.",
      },
      {
        title: "Average cost over FIFO",
        body: "Real wholesale stock doesn't arrive in clean batches - a true FIFO model needs lot tracking most buyers don't do by hand either. A running average cost is close enough to reality and dramatically simpler to compute and explain to a non-technical owner.",
      },
      {
        title: "Read stored totals, not history",
        body: "Dashboard figures and customer dues come from aggregates kept up to date by triggers, so the customer list is one small live read whether the business has fifty bills or fifty thousand.",
      },
      {
        title: "Built with Claude Code as an engineering partner",
        body: "I specified the data model, the server's transaction boundaries, the security rules and the UX; Claude Code handled a large share of implementation. The judgment call was knowing what to specify precisely - schema, access rules, pricing logic - and what to delegate. Not outsourcing the thinking, just the typing.",
      },
    ],
    results: [
      { value: "2,000+", caption: "Bills processed" },
      { value: "4+ mo", caption: "Live with a real distributor" },
      { value: "2", caption: "Platforms - Android and web" },
    ],
    whatIdRedo:
      "I'd make the server the authority for money from day one. Starting with client-side writes was the right call for speed, but moving off them with old app versions still installed meant a staged rollout - feature switches and a minimum-build gate - that a server-first design would never have needed.",
  },
  "agentic-assistant": {
    slug: "agentic-assistant",
    name: "Agentic Engineering Assistant",
    summary:
      "A production RAG and tool-calling platform: a three-pass request architecture that keeps prompt size flat as tools are added, with correctness enforced by the backend instead of the prompt.",
    role: "Backend & AI engineer, Design Intelligence LLP",
    stack: "FastAPI · OpenAI function calling · Pinecone · Pydantic",
    timeline: "2025 - ongoing",
    status: "In production",
    image: "/projects/agentic-assistant/cover.webp",
    problem: [
      "An engineering assistant has to call the right tool for calculations where a wrong answer matters. The naive design attaches every tool schema to every request: prompts grow with each tool you add, and tool selection gets worse as the list gets longer.",
      "The harder problem is trust. A model told to confirm inputs before a safety-critical calculation will usually do it - and occasionally won't. \"Usually\" isn't acceptable there. This is described at the architecture level only; client and domain details are under NDA.",
    ],
    constraints: [
      "Safety-critical calculations need explicit user confirmation, every time",
      "The tool catalogue keeps growing - cost and accuracy can't degrade with it",
      "Multi-turn configuration flows, but the service has to stay stateless",
      "Re-ingesting a document must replace its chunks, never duplicate them",
    ],
    architecture:
      "Each request runs in three passes. A routing call with no tool schemas attached picks one active tool; execution sees only that tool's schemas; a dedicated zero-temperature call formats the result. Deterministic gates in the backend sit between the model and anything it wants to run.",
    architectureBullets: [
      "Route - one call with no tool schemas resolves a single active tool",
      "Execute - only that tool's schemas are sent, so prompt size doesn't depend on tool count",
      "Gate - backend checks re-derive tool disambiguation and user confirmation from the transcript",
      "Format - a dedicated temperature-0 call shapes the final answer",
      "State - recovered from markers and embedded JSON in the transcript; no session store, no database",
      "RAG - Pinecone, text-embedding-3-small (1536-d), 700-word chunks with 120-word overlap",
      "Rerank - blended score, 0.7 vector similarity + 0.3 lexical overlap",
    ],
    decisions: [
      {
        title: "Route before you execute",
        body: "Splitting tool selection from tool execution means the expensive, schema-heavy call only ever carries one tool. Adding the twentieth tool costs the router a line of description, not every request a full schema.",
      },
      {
        title: "Enforce correctness in the backend, not the prompt",
        body: "The backend re-derives from the conversation whether the user actually confirmed the inputs. A model that skips the confirmation ritual on a safety-critical calculation is rejected rather than trusted - the prompt asks for good behaviour, the code guarantees it.",
      },
      {
        title: "Stateless, with state recovered from the transcript",
        body: "Multi-turn configuration flows rebuild their in-progress state by parsing markers and embedded JSON from the transcript itself. No session store means nothing to expire, migrate or keep in sync across instances.",
      },
      {
        title: "Retrieval as a tool, not a pre-step",
        body: "RAG is exposed as a tool the model invokes when it needs documents, rather than an unconditional lookup before every call. Deterministic document IDs make re-ingestion idempotent.",
      },
    ],
    results: [
      { value: "3-pass", caption: "Route · execute · format" },
      { value: "0", caption: "Session stores or databases" },
      { value: "0.7 / 0.3", caption: "Vector / lexical rerank blend" },
    ],
    whatIdRedo:
      "I'd build a labelled set of real requests for the router in the first week. Routing is the one call every request depends on, and without an evaluation set every change to its prompt is a guess.",
  },
  abhyas: {
    slug: "abhyas",
    name: "Abhyas Voice Coach",
    summary:
      "A real-time voice agent that interviews you and coaches your English - sub-second streaming replies, real interruption, and a coach that scores every answer without ever slowing the conversation.",
    role: "Sole builder",
    stack:
      "Python · FastAPI · asyncio · WebSockets · Sarvam STT / LLM / TTS · SQLite · vanilla JS",
    timeline: "2026",
    status: "Open source · MIT",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DevRohan33/Abhyas-Voice-Coach",
      },
    ],
    image: "/projects/abhyas/cover.webp",
    gallery: [
      desktop(
        "/projects/abhyas/practice.webp",
        "Abhyas practice screen with persona and dials",
        "Pick a persona and its dials, then just talk",
      ),
      {
        src: "/projects/abhyas/insights.webp",
        alt: "Abhyas recurring language errors and response latency",
        width: 1160,
        height: 415,
        caption: "Recurring language errors and p50 / p95 latency per hop",
      },
    ],
    problem: [
      "Mock-interview practice needs either another person or a chatbot with a voice bolted on. Neither tracks how you actually perform - filler words, tense errors, whether your answers have structure - and neither uses that history to decide what to ask next.",
      "Abhyas is a hard systems-design interviewer, a warm HR panellist or a patient English tutor, chosen in the browser and changeable mid-session. It runs on your own machine, and your API key never leaves the Python process.",
    ],
    constraints: [
      "Latency - a spoken reply that takes three seconds feels broken",
      "Real interruption - talking over it has to stop it mid-word",
      "Text-to-speech is billed per character, so speech nobody hears is wasted money",
      "Runs locally: no cloud backend, the key never reaches the browser",
    ],
    architecture:
      "Two loops that share state but never share a deadline. The fast loop owns the microphone-to-speaker path and awaits nothing except speech recognition, the model and speech synthesis. Scoring, memory and database writes run on a slow loop, fired and forgotten.",
    architectureBullets: [
      "Fast loop - mic → STT + VAD (saaras:v4) → turn engine → streaming LLM → TTS (bulbul:v3) → jitter buffer → speaker",
      "Clause-level chunking and sockets pre-warmed at session start, for sub-second replies",
      "Barge-in state machine - stops mid-word, drops queued audio, keeps only what you actually heard",
      "Slow loop - a second model scores clarity, structure, depth and correctness, and updates your profile",
      "Personas as YAML - role, voice, VAD timing, tools and dials, hot-reloaded on save",
      "SQLite (WAL) - transcripts, scores, tasks and latency marks, all stored locally",
    ],
    decisions: [
      {
        title: "Nothing on the fast path waits for intelligence",
        body: "Scoring, corrections and summarisation are create_task'd and forgotten while you're already hearing the reply. Adding more analysis therefore costs zero latency - the rule that keeps the conversation fast is structural, not a matter of tuning.",
      },
      {
        title: "Remember only what was heard",
        body: "When you interrupt, the history is truncated to the words that actually played. Otherwise the model believes it said things you never heard, and the next turn answers a conversation that didn't happen.",
      },
      {
        title: "Pace speech synthesis to playback",
        body: "A chunk only goes to TTS once the browser is close to needing it, and the browser drops silent microphone frames before upload. Interrupt the coach and the spend stops near what you heard, not at the end of the whole reply.",
      },
      {
        title: "Backchannels don't interrupt",
        body: '"mm", "yeah" and "haan" while it\'s talking are you nodding along, not an objection. Rejecting them - and rejoining a mid-sentence pause instead of splitting it into two answers - is what makes it feel like a person is listening.',
      },
    ],
    results: [
      { value: "<1 s", caption: "Spoken reply, streamed end to end" },
      { value: "42", caption: "Tests, no key or network needed" },
      { value: "3", caption: "Personas, hot-reloaded from YAML" },
    ],
    whatIdRedo:
      "I'd add per-hop latency marks before the first feature, not after. Every tuning decision - silence duration, clause size, socket pre-warming - depended on knowing which hop the time was going to, and measuring is cheaper than guessing.",
  },
  techpluse: {
    slug: "techpluse",
    name: "TechPluse",
    summary:
      "An automated AI newsroom: discovers, clusters, deduplicates, summarizes and publishes AI news, blogs and research daily, with no human in the loop.",
    role: "Sole builder",
    stack:
      "Python · FastAPI · Brave Search · arXiv · OpenAI · Firestore · Next.js",
    timeline: "2026",
    status: "Backend paused",
    links: [{ label: "techpluse.in", href: "https://techpluse.in/" }],
    notice:
      "The ingestion backend is paused for now to save on hosting bills, so the site isn't receiving new stories. The pipeline below ran daily in production.",
    image: "/projects/techpluse/cover.webp",
    gallery: [
      {
        src: "/projects/techpluse/newsroom.webp",
        alt: "TechPluse newsroom on mobile",
        width: 385,
        height: 785,
        caption: "The newsroom timeline",
      },
      {
        src: "/projects/techpluse/research.webp",
        alt: "TechPluse research section on mobile",
        width: 378,
        height: 783,
        caption: "Research papers with direct PDF links",
      },
      {
        src: "/projects/techpluse/blogs.webp",
        alt: "TechPluse technical blogs on mobile",
        width: 382,
        height: 790,
        caption: "Technical blogs, filtered by freshness",
      },
      {
        src: "/projects/techpluse/pipeline-log.webp",
        alt: "TechPluse pipeline run log",
        width: 1466,
        height: 722,
        caption:
          "A production run: dedup, 24-hour freshness checks, Brave discovery",
      },
      {
        src: "/projects/techpluse/search-console.webp",
        alt: "TechPluse Google Search Console performance",
        width: 1450,
        height: 732,
        caption: "4.35k search impressions and 94 clicks from Google",
      },
    ],
    problem: [
      "AI/ML news is scattered across hundreds of sources and most of it is noise - reposts, marketing, and the same paper covered by five different outlets. Following it manually doesn't scale, and generic aggregators don't understand what counts as signal in this space.",
      "I wanted a system that reads the internet so I don't have to, and hands back a structured, deduplicated, summarized feed - updated daily, without a manual review step.",
    ],
    constraints: [
      "Solo build, alongside a full-time job - no room for a heavyweight ops setup",
      "No budget for a search index; had to lean on an existing discovery API rather than a crawler",
      "Same-day coverage: a 24-hour freshness window, not a weekly digest",
      "LLM cost has to scale with the number of real events, not the number of articles",
    ],
    architecture:
      "A FastAPI service runs the pipeline on a schedule: discover, filter, scrape, cluster, deduplicate, rewrite, store. A Next.js site reads straight from Firestore. Nothing in the chain waits on a human.",
    architectureBullets: [
      "Discover - Brave News and Web search across event queries and outlet sweeps, plus arXiv for papers",
      "Filter - keyword relevance and a strict 24-hour freshness check",
      "Scrape - full article text with trafilatura, run concurrently behind a semaphore",
      "Cluster - text-embedding-3-small vectors grouped at cosine 0.88, keeping the top 12 unique events",
      "Dedup - URL match, then fuzzy title (RapidFuzz), then embedding cosine > 0.90, with an LLM tiebreak for 0.85–0.90",
      "Rewrite - gpt-4o-mini writes a clean headline, a structured summary and a category",
      "Store - Firestore, with the source link and direct PDF links for papers",
    ],
    decisions: [
      {
        title: "A search API over a custom crawler",
        body: "A hand-rolled scraper means maintaining selectors for every source and getting blocked constantly. Brave's search API gave structured, date-sorted results without owning that maintenance burden - the tradeoff is less control over source coverage, an acceptable cost for a first version.",
      },
      {
        title: "Dedup in layers, cheapest first",
        body: "An exact URL match costs nothing, a fuzzy title match costs a string comparison, an embedding costs an API call, and an LLM judgement costs the most. Each layer only sees what the cheaper ones couldn't decide, so the LLM is reserved for the genuinely ambiguous band.",
      },
      {
        title: "Cluster before you summarize",
        body: "Five outlets covering one launch are one event. Grouping articles by embedding similarity before the rewrite step means the LLM is called once per event, so cost tracks signal rather than volume.",
      },
      {
        title: "Fully automated, no manual queue",
        body: "A review step would have been the easy way to keep quality high, but then someone has to show up every day. Instead the filtering and dedup logic has to be trustworthy on its own - a harder bar, but the only one that scales.",
      },
    ],
    results: [
      { value: "4.35k", caption: "Google search impressions" },
      { value: "0", caption: "Manual review steps" },
      { value: "24h", caption: "Freshness window" },
    ],
    whatIdRedo:
      "The embedding dedup compares a new item against recent entries one by one, and articles stored before embeddings were added have none, so that layer silently skips them. I'd start with a proper vector index and a backfill instead of retrofitting both later.",
  },
  "job-radar": {
    slug: "job-radar",
    name: "Job Radar",
    summary:
      "A daily pipeline that reads LinkedIn's own job-alert emails, scores every opening against my CV, and appends the ranked result to a Google Sheet - no scraping, ₹0 a month.",
    role: "Sole builder",
    stack:
      "Python · IMAP · selectolax · TF-IDF · OpenAI (optional) · Google Sheets API · GitHub Actions",
    timeline: "2026",
    status: "Open source · runs daily",
    links: [
      { label: "GitHub", href: "https://github.com/DevRohan33/job-radar" },
    ],
    image: "/projects/job-radar/cover.webp",
    problem: [
      'You want the ten jobs worth your morning, not the two hundred a job board thinks you should see. Tools that promise this either scrape LinkedIn - which breaks its terms and risks the account a job search depends on - or rank by keyword count, which puts a job that says "Python" five times above the one that actually fits.',
      "Job Radar takes the legitimate path: LinkedIn will email you matching jobs every day if you ask. That email is a permission-granted feed. The pipeline reads it, enriches the shortlist, scores each role against my own skill tiers and CV, and writes one row per job into a sheet I own.",
    ],
    constraints: [
      "No scraping and no browser automation - only data I was already sent",
      "Runs unattended on GitHub's datacenter IPs, which LinkedIn rate-limits fast",
      "Free to run, with the AI layer optional",
      "Has to fail loudly - a silent cron job looks exactly like a slow hiring week",
    ],
    architecture:
      "Five stages, each handing a normalized Job record to the next, so any one can be replaced without touching the others: Gmail IMAP, alert parsing, gating and enrichment, scoring, and the Google Sheet - which doubles as the pipeline's memory.",
    architectureBullets: [
      "Read - Gmail IMAP with an App Password, read-only BODY.PEEK",
      "Parse - alert HTML to cards with selectolax, a plain-text fallback, never raises",
      "Gate + enrich - hard filters first; only the top 15 JDs fetched, each cached forever",
      "Score - a 7-part weighted rubric with TF-IDF against the CV; optional OpenAI rescoring of the top ~15",
      "Write - append to Google Sheets, dedup on job_id, never touch the user's status and notes columns",
      "Run - GitHub Actions at 07:15 IST, with a heartbeat commit and an auto-opened issue on failure",
    ],
    decisions: [
      {
        title: "Gate first, then weigh",
        body: "A job that fails a hard filter - seniority, location, unpaid - is rejected before it's scored, enriched or sent to a model. That keeps every expensive step, and the LinkedIn request budget, for jobs that could actually fit.",
      },
      {
        title: "Freshness weighted like a skill",
        body: 'A 90-point match posted four days ago with 200 applicants is a worse use of today\'s hour than a 70-point match posted this morning. The score answers "where do I spend the next hour", not "what is the best job in the abstract".',
      },
      {
        title: "AI as an upgrade, never a dependency",
        body: "The rule scorer is free and needs no key. The OpenAI layer rescores only the day's top ~15 with strict JSON output, and falls back to the rule score on any failure - rate limit, bad request or a non-JSON reply.",
      },
      {
        title: "Fail loudly",
        body: "Zero jobs parsed from real emails exits with code 2 and opens a GitHub issue, because LinkedIn will change its email HTML. A heartbeat commit stops GitHub disabling the cron after 60 quiet days.",
      },
    ],
    results: [
      { value: "₹0", caption: "Monthly running cost" },
      { value: "57", caption: "Tests, fully offline" },
      { value: "07:15", caption: "IST, every morning" },
    ],
    whatIdRedo:
      "I'd log outcomes from the very first application. The status column is training data: with around thirty resolved applications, callback rate by score band shows whether the weights are right - and starting that log on day one is the cheapest way to make the score earn trust.",
  },
  "data-pipeline": {
    slug: "data-pipeline",
    name: "Asset & ERP Pipeline",
    summary:
      "A FastAPI integration layer connecting QuickBase to SAP, plus an asset pipeline serving media from S3 with EXIF geolocation, video-frame extraction, and credential-isolating proxy APIs.",
    role: "Backend engineer, Design Intelligence LLP",
    stack: "FastAPI · S3 · Wasabi · Python",
    timeline: "2025 - ongoing",
    status: "Shipped, in production",
    image: "/projects/data-pipeline/cover.webp",
    problem: [
      "The team needed QuickBase - a low-code operations platform - talking to SAP, and needed a media pipeline that could take raw assets from field work and serve them to a frontend with useful metadata attached, without exposing third-party credentials to the browser.",
      "This is described at the architecture level only - client identity and schema details are under NDA.",
    ],
    constraints: [
      "No client-identifying details or schemas could be exposed, including in this write-up",
      "Media pipeline had to handle both images and video, at volume, from field-collected sources",
      "Frontend needed on-demand previews without every client request touching third-party APIs directly",
      "QuickBase and SAP have very different data models - the integration has to reconcile that, not just move bytes",
    ],
    architecture:
      "A FastAPI service sits between QuickBase and SAP. A separate asset pipeline pulls from S3 and Wasabi, extracts EXIF-based geolocation, converts video to frames for previews, and serves 3D/image previews on demand - all behind a proxy layer that keeps third-party credentials off the client.",
    architectureBullets: [
      "Integration service - FastAPI, reconciles QuickBase and SAP data models",
      "Asset pipeline - EXIF geolocation extraction, video-to-frame conversion",
      "Proxy layer - every third-party call routes through the backend; no keys ship to the browser",
      "Bulk operations - scripted, unattended Wasabi storage management",
    ],
    decisions: [
      {
        title: "A proxy layer instead of client-side API calls",
        body: "The frontend originally would have called third-party services directly, which means shipping credentials to the browser. Routing every external call through a backend proxy keeps every secret server-side - the frontend only ever talks to our own API.",
      },
      {
        title: "EXIF extraction, but with a validation pass",
        body: "Location metadata from field-collected photos isn't reliable on its own - phones and cameras write EXIF data inconsistently, and it can be stripped or wrong. Extraction has to be paired with sanity-checking against plausible bounds rather than trusted blindly.",
      },
      {
        title:
          "Bulk operations against Wasabi in Python, not manual per-file handling",
        body: "The team was doing asset organization by hand before this. Scripting the bulk operations meant the same task went from a manual chore to something that runs unattended.",
      },
    ],
    results: [
      { value: "2", caption: "Enterprise systems integrated" },
      { value: "Automated", caption: "Bulk asset operations" },
      { value: "0", caption: "Client credentials exposed to frontend" },
    ],
    whatIdRedo:
      "Nothing further to disclose at the architecture level beyond the above - this one stays intentionally high-level given the NDA.",
  },
  "ai-workspace": {
    slug: "ai-workspace",
    name: "AI Workspace",
    summary:
      "A unified AI workspace for startups: a RAG-powered support agent trained on your own documents, per-employee assistants, and the operational plumbing underneath.",
    role: "Co-building with Anubhab Das",
    stack:
      "Python · Django · FastAPI · React · LangChain · RAG · PostgreSQL · Docker · AWS",
    timeline: "Building - not yet launched",
    status: "Building",
    image: "/image/auth_hero.png",
    problem: [
      "Startups without a dedicated engineering team end up buying five separate tools for support, HR, and billing, none of which talk to each other, and none of which know anything about the company's own documents.",
      "We wanted one workspace: a support agent trained on a company's actual docs (PDF, DOCX, TXT, or just a URL) with lead extraction and a public hosted URL for teams without a website, per-employee AI assistants, automated billing and HR tracking, and full conversation oversight for founders.",
    ],
    constraints: [
      "Multi-tenant from the start - every customer's documents and conversations have to stay isolated from every other customer's",
      "Needs to work for a team with zero website - a hosted public URL has to be part of the product, not an add-on",
      "Two-person team, so scope has to be sequenced, not built all at once",
      "Founders need full conversation oversight without that turning into a second full-time job",
    ],
    architecture:
      "Django handles the CRUD-heavy business logic - billing, HR, tenancy. FastAPI serves the RAG and agent layer. Per-tenant documents are ingested into isolated vector stores; the frontend is React, deployed on Docker.",
    architectureBullets: [
      "Django - auth, tenancy, billing, HR tracking",
      "FastAPI - RAG retrieval and agent serving, async by default",
      "Per-tenant ingestion - PDF / DOCX / TXT / URL, into isolated vector stores",
      "React - frontend for both the founder dashboard and the public-facing agent",
      "Docker - one service per container, deployed the same way as everything else I run",
    ],
    decisions: [
      {
        title: "Tenant isolation at the retrieval layer, not just the database",
        body: "Row-level tenant IDs in Postgres aren't enough once a vector store is in the mix - a leaked retrieval means one customer's support agent could quote another customer's private documents. Isolation has to be enforced at the embedding and retrieval boundary itself, not just in the SQL layer.",
      },
      {
        title: "Django and FastAPI, not one framework for everything",
        body: "Django's batteries - admin, auth, ORM - are the right fit for billing and HR, which are CRUD-heavy and benefit from convention. The RAG and agent layer is a different shape of problem, async and LLM-call-heavy, where FastAPI's lighter footprint fit better. Running both costs more ops overhead, but each piece does the job it's actually good at.",
      },
      {
        title: "Ship the support agent first",
        body: "Of the four pieces - support agent, assistants, billing, oversight - the support agent is the one a prospective customer can evaluate in five minutes. Sequencing it first gets a demonstrable product in front of people before the harder-to-explain pieces are done.",
      },
    ],
    results: [
      { value: "4", caption: "Core modules in scope" },
      { value: "2", caption: "Founders building it" },
      { value: "Pre-launch", caption: "Current status" },
    ],
    whatIdRedo:
      "I'd nail down tenant isolation testing before writing the first line of the retrieval layer, not after. It's the kind of bug that's invisible in a demo with one test account and very visible the day a second customer signs up.",
  },
};
