export type CaseStudy = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  stack: string;
  timeline: string;
  status: string;
  link?: string;
  image?: string;
  problem: string[];
  constraints: string[];
  architecture: string;
  architectureBullets: string[];
  decisions: { title: string; body: string }[];
  results: { value: string; caption: string }[];
  whatIdRedo: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  techpluse: {
    slug: "techpluse",
    name: "TechPluse",
    summary:
      "An end-to-end pipeline that turns raw internet noise into a structured AI newsroom — discovered, deduplicated, summarized, and stored without a human in the loop.",
    role: "Sole builder",
    stack: "Python · FastAPI · Brave MCP · LangChain · PostgreSQL · React",
    timeline: "2025 — ongoing",
    status: "Live",
    link: "https://techpluse.in/",
    image: "/image/ai_news.png",
    problem: [
      "AI/ML news is scattered across hundreds of sources and most of it is noise — reposts, marketing, and duplicate coverage of the same paper from five different outlets. Following it manually doesn't scale, and generic news aggregators don't understand what counts as signal in this specific space.",
      "I wanted a system that reads the internet so I don't have to, and hands back a structured, deduplicated, summarized feed — updated daily, without a manual review step.",
    ],
    constraints: [
      "Solo build, ran alongside a full-time job — no room for a heavyweight ops setup",
      "No budget for a dedicated search index; had to lean on an existing discovery API rather than building a crawler",
      "Needed same-day coverage: a 24-hour freshness window, not a weekly digest",
      "Everything had to run unattended — no manual review step in the loop",
    ],
    architecture:
      "A six-stage pipeline: discovery, filtering, dedup, rewrite, storage, and a scheduled trigger. Nothing in the chain waits on a human.",
    architectureBullets: [
      "Discovery — Brave MCP search across AI/ML/LLM queries, run every 24 hours",
      "Relevance filter — drops off-topic and low-signal results before they cost an LLM call",
      "Dedup — checks new items against recent entries for semantic overlap, not just title matching",
      "Rewrite — an LLM generates a clean headline and a structured summary per item",
      "Storage — PostgreSQL, with source links and direct PDF access preserved for research papers",
      "Schedule — the whole chain runs on a timer; nothing depends on me showing up",
    ],
    decisions: [
      {
        title: "A search API over a custom crawler",
        body: "A hand-rolled scraper means maintaining selectors for every source and getting blocked constantly. Brave's MCP integration gave structured search results without owning that maintenance burden — the tradeoff is less control over source coverage, which is an acceptable cost for a first version.",
      },
      {
        title: "Dedup on meaning, not on title text",
        body: "Title matching alone lets near-duplicate coverage of the same story through, since different outlets phrase headlines differently. Comparing semantic similarity against recent entries catches those without needing an exact string match.",
      },
      {
        title: "Fully automated, no manual queue",
        body: "A review step would have been the easy way to keep quality high, but it also means the pipeline stops being autonomous — someone has to show up every day. Instead the filtering and dedup logic has to be trustworthy on its own, which is a harder bar to hit but the only one that actually scales.",
      },
    ],
    results: [
      { value: "24/7", caption: "Runs unattended" },
      { value: "0", caption: "Manual review steps" },
      { value: "Daily", caption: "Fresh coverage window" },
    ],
    whatIdRedo:
      "The dedup logic today compares against a rolling window of recent entries; at real scale that comparison gets expensive. I'd move to a proper vector index for the dedup step from day one instead of retrofitting it later.",
  },
  myledger: {
    slug: "myledger",
    name: "MyLedger",
    summary:
      "A wholesale ledger replacing the paper notebook — stock tracking, per-buyer rates, due tracking, and instant invoices, live with a real distributor.",
    role: "Product design & engineering, built with Claude Code as an engineering partner",
    stack: "Flutter · Firestore · AWS · Claude Code",
    timeline: "Live 3+ months",
    status: "Live — Gate of India Food",
    problem: [
      "Every wholesale business I looked at runs on a paper notebook — stock, dues, and per-buyer pricing tracked by hand. That doesn't scale past a certain size, and it's opaque: the owner can't see profit in real time, and staff mistakes are invisible until a reconciliation goes wrong.",
      "MyLedger replaces the notebook: stock tracking with real average cost, per-buyer custom rates, automatic due tracking, instant PDF invoices, staff accounts with activity logs, and profit reporting.",
    ],
    constraints: [
      "Real, non-technical end user — every screen has to be usable without training",
      "Multi-staff access on one shared business account, so permissions and activity logs matter",
      "Needed to launch fast enough to test with a real distributor, not a demo",
      "Data model has to support per-buyer custom rates without turning pricing into spreadsheet chaos",
    ],
    architecture:
      "Flutter client talking directly to Firestore, with security rules doing the access control work a backend service would otherwise handle. AWS for document and PDF storage, subscription logic gating premium features.",
    architectureBullets: [
      "Flutter — single codebase for the app the owner and staff both use",
      "Firestore — primary data store, average-cost stock valuation computed on write",
      "Security rules — enforce per-staff, per-business data isolation directly in Firestore",
      "AWS — invoice PDFs and document storage",
      "Subscription layer — gates features by plan without a separate billing service",
    ],
    decisions: [
      {
        title: "Average cost over FIFO",
        body: "Real wholesale stock doesn't arrive in clean batches — a true FIFO model needs lot tracking most buyers don't do by hand either. A running average cost is close enough to reality and dramatically simpler to compute and explain to a non-technical owner.",
      },
      {
        title: "Firestore security rules over a custom backend",
        body: "A dedicated backend would have meant more infrastructure to run and patch for a single-tenant-per-business app. Firestore's rules engine can express \"staff can only touch their business's data\" directly, which cut out an entire service.",
      },
      {
        title: "Built with Claude Code as an engineering partner",
        body: "I specified the data model, security rules, and UX; Claude Code handled a large share of implementation. The judgment call was knowing what to specify precisely — schema, access rules, pricing logic — and what to delegate. Not outsourcing the thinking, just the typing.",
      },
    ],
    results: [
      { value: "2,000+", caption: "Bills processed" },
      { value: "3+ mo", caption: "Live with a real distributor" },
      { value: "1", caption: "Business fully migrated off paper" },
    ],
    whatIdRedo:
      "I'd build the activity log from day one instead of adding it after the first \"who changed this price\" question from the owner. Multi-staff systems need an audit trail before they need almost anything else.",
  },
  "ai-workspace": {
    slug: "ai-workspace",
    name: "AI Workspace",
    summary:
      "A unified AI workspace for startups: a RAG-powered support agent trained on your own documents, per-employee assistants, and the operational plumbing underneath.",
    role: "Co-building with Anubhab Das",
    stack: "Python · Django · FastAPI · React · LangChain · RAG · PostgreSQL · Docker · AWS",
    timeline: "Building — not yet launched",
    status: "Building",
    image: "/image/auth_hero.png",
    problem: [
      "Startups without a dedicated engineering team end up buying five separate tools for support, HR, and billing, none of which talk to each other, and none of which know anything about the company's own documents.",
      "We wanted one workspace: a support agent trained on a company's actual docs (PDF, DOCX, TXT, or just a URL) with lead extraction and a public hosted URL for teams without a website, per-employee AI assistants, automated billing and HR tracking, and full conversation oversight for founders.",
    ],
    constraints: [
      "Multi-tenant from the start — every customer's documents and conversations have to stay isolated from every other customer's",
      "Needs to work for a team with zero website — a hosted public URL has to be part of the product, not an add-on",
      "Two-person team, so scope has to be sequenced, not built all at once",
      "Founders need full conversation oversight without that turning into a second full-time job",
    ],
    architecture:
      "Django handles the CRUD-heavy business logic — billing, HR, tenancy. FastAPI serves the RAG and agent layer. Per-tenant documents are ingested into isolated vector stores; the frontend is React, deployed on Docker.",
    architectureBullets: [
      "Django — auth, tenancy, billing, HR tracking",
      "FastAPI — RAG retrieval and agent serving, async by default",
      "Per-tenant ingestion — PDF / DOCX / TXT / URL, into isolated vector stores",
      "React — frontend for both the founder dashboard and the public-facing agent",
      "Docker — one service per container, deployed the same way as everything else I run",
    ],
    decisions: [
      {
        title: "Tenant isolation at the retrieval layer, not just the database",
        body: "Row-level tenant IDs in Postgres aren't enough once a vector store is in the mix — a leaked retrieval means one customer's support agent could quote another customer's private documents. Isolation has to be enforced at the embedding and retrieval boundary itself, not just in the SQL layer.",
      },
      {
        title: "Django and FastAPI, not one framework for everything",
        body: "Django's batteries — admin, auth, ORM — are the right fit for billing and HR, which are CRUD-heavy and benefit from convention. The RAG and agent layer is a different shape of problem, async and LLM-call-heavy, where FastAPI's lighter footprint fit better. Running both costs more ops overhead, but each piece does the job it's actually good at.",
      },
      {
        title: "Ship the support agent first",
        body: "Of the four pieces — support agent, assistants, billing, oversight — the support agent is the one a prospective customer can evaluate in five minutes. Sequencing it first gets a demonstrable product in front of people before the harder-to-explain pieces are done.",
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
  "data-pipeline": {
    slug: "data-pipeline",
    name: "Asset & ERP Pipeline",
    summary:
      "A FastAPI integration layer connecting QuickBase to SAP, plus an asset pipeline serving media from S3 with EXIF geolocation, video-frame extraction, and credential-isolating proxy APIs.",
    role: "Backend engineer, Design Intelligence LLP",
    stack: "FastAPI · S3 · Wasabi · Python",
    timeline: "2025 — ongoing",
    status: "Shipped, in production",
    problem: [
      "The team needed QuickBase — a low-code operations platform — talking to SAP, and needed a media pipeline that could take raw assets from field work and serve them to a frontend with useful metadata attached, without exposing third-party credentials to the browser.",
      "This is described at the architecture level only — client identity and schema details are under NDA.",
    ],
    constraints: [
      "No client-identifying details or schemas could be exposed, including in this write-up",
      "Media pipeline had to handle both images and video, at volume, from field-collected sources",
      "Frontend needed on-demand previews without every client request touching third-party APIs directly",
      "QuickBase and SAP have very different data models — the integration has to reconcile that, not just move bytes",
    ],
    architecture:
      "A FastAPI service sits between QuickBase and SAP. A separate asset pipeline pulls from S3 and Wasabi, extracts EXIF-based geolocation, converts video to frames for previews, and serves 3D/image previews on demand — all behind a proxy layer that keeps third-party credentials off the client.",
    architectureBullets: [
      "Integration service — FastAPI, reconciles QuickBase and SAP data models",
      "Asset pipeline — EXIF geolocation extraction, video-to-frame conversion",
      "Proxy layer — every third-party call routes through the backend; no keys ship to the browser",
      "Bulk operations — scripted, unattended Wasabi storage management",
    ],
    decisions: [
      {
        title: "A proxy layer instead of client-side API calls",
        body: "The frontend originally would have called third-party services directly, which means shipping credentials to the browser. Routing every external call through a backend proxy keeps every secret server-side — the frontend only ever talks to our own API.",
      },
      {
        title: "EXIF extraction, but with a validation pass",
        body: "Location metadata from field-collected photos isn't reliable on its own — phones and cameras write EXIF data inconsistently, and it can be stripped or wrong. Extraction has to be paired with sanity-checking against plausible bounds rather than trusted blindly.",
      },
      {
        title: "Bulk operations against Wasabi in Python, not manual per-file handling",
        body: "The team was doing asset organization by hand before this. Scripting the bulk operations meant the same task went from a manual chore to something that runs unattended.",
      },
    ],
    results: [
      { value: "2", caption: "Enterprise systems integrated" },
      { value: "Automated", caption: "Bulk asset operations" },
      { value: "0", caption: "Client credentials exposed to frontend" },
    ],
    whatIdRedo:
      "Nothing further to disclose at the architecture level beyond the above — this one stays intentionally high-level given the NDA.",
  },
};
