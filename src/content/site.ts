export const personalInfo = {
  name: "SK Rohan Parveag",
  title: "AI Systems Engineer",
  subtitle: "Backend, RAG & Data Pipelines",
  location: "Kolkata, IN",
  email: "skrohanparveag@gmail.com",
  github: "https://github.com/DevRohan33",
  githubHandle: "/DevRohan33",
  linkedin: "https://linkedin.com/in/skrohanparveag",
  linkedinHandle: "/in/skrohanparveag",
  leetcode: "https://leetcode.com/u/rp-/",
  leetcodeHandle: "/u/rp-",
  heroLines: ["I build AI systems", "that survive contact", "with production."],
  heroSub:
    "RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running. Currently backend and AI at Design Intelligence.",
};

/**
 * Answer-first FAQ, shown on /about and marked up as FAQPage. Written the way
 * people (and AI answer engines) actually ask- every answer must stay true to
 * the CV and the case studies.
 */
export const faqs = [
  {
    q: "Who is SK Rohan Parveag?",
    a: "SK Rohan Parveag is an AI systems engineer based in Kolkata, India. He builds RAG pipelines, tool-calling agents and the backend and data infrastructure underneath them, and works as a Junior Software Engineer at Design Intelligence LLP.",
  },
  {
    q: "What has Rohan built?",
    a: "His main projects are RYBO, a wholesale billing and operations app live with a real distributor (2,000+ bills); an Agentic Engineering Assistant in production at Design Intelligence; Abhyas, an open-source real-time voice interview coach; Job Radar, an open-source daily job-matching pipeline; and TechPluse, an automated AI news pipeline.",
  },
  {
    q: "What technologies does Rohan work with?",
    a: "Python, FastAPI and Django for backends; OpenAI function calling, LangChain, LangGraph and MCP for AI systems; Pinecone, Weaviate and Chroma for vector search; PostgreSQL and Firestore for data; and Docker, Dokploy, Firebase and Vercel to ship and run it.",
  },
  {
    q: "How much experience does Rohan have?",
    a: "He has worked in backend and AI since February 2025 at Design Intelligence LLP- as an intern, then full-time as a Junior Software Engineer from June 2025. Before software he was a maintenance engineer on solar plant systems at Adani Solar.",
  },
  {
    q: "What is Rohan's education?",
    a: "A BTech in Computer Science and Engineering from Elitte College of Engineering (MAKAUT, 2023–2026), and a Diploma in Electronics and Telecommunication Engineering (2020–2023).",
  },
  {
    q: "Is Rohan open to new opportunities?",
    a: "Yes. He is open to backend, applied AI and AI platform roles, is based in Kolkata and open to relocation. The best way to reach him is email at skrohanparveag@gmail.com.",
  },
];

export const proofStats = [
  { value: "4", suffix: "", caption: "Production systems shipped" },
  { value: "3+", suffix: "", caption: "RAG & agent pipelines built" },
  { value: "6", suffix: "+", caption: "Products designed end to end" },
  { value: "1.7", suffix: " yrs", caption: "Backend and AI, professionally" },
];

export type FlagshipProject = {
  slug: string;
  name: string;
  category: string;
  status: "LIVE" | "BUILDING" | "SHIPPED" | "PAUSED" | "OPEN SOURCE";
  summary: string;
  tags: string[];
  link?: string;
  image?: string;
  /** Shown in the home page's Selected Work section. */
  featured?: boolean;
};

export const flagshipProjects: FlagshipProject[] = [
  {
    slug: "rybo",
    name: "RYBO",
    category: "Product",
    status: "LIVE",
    summary:
      "Billing, stock, dues and deliveries for wholesale distributors, on Android and the web. Formerly MyLedger - 2,000+ bills with a real distributor.",
    tags: ["Flutter", "Cloud Functions", "Firestore", "Razorpay"],
    link: "https://rybo.rohanparveag.in",
    image: "/projects/rybo/cover.webp",
    featured: true,
  },
  {
    slug: "agentic-assistant",
    name: "Agentic Engineering Assistant",
    category: "AI Systems",
    status: "SHIPPED",
    summary:
      "A production tool-calling and RAG platform: three-pass requests keep prompts flat as tools grow, and the backend - not the prompt - enforces correctness.",
    tags: ["FastAPI", "OpenAI tools", "Pinecone", "Pydantic"],
    image: "/projects/agentic-assistant/cover.webp",
    featured: true,
  },
  {
    slug: "abhyas",
    name: "Abhyas Voice Coach",
    category: "Voice AI",
    status: "OPEN SOURCE",
    summary:
      "A real-time voice agent that interviews you and coaches your English - sub-second streaming replies, real barge-in, scoring on a separate loop.",
    tags: ["FastAPI", "WebSockets", "STT / TTS", "SQLite"],
    link: "https://github.com/DevRohan33/Abhyas-Voice-Coach",
    image: "/projects/abhyas/cover.webp",
    featured: true,
  },
  {
    slug: "techpluse",
    name: "TechPluse",
    category: "AI Pipeline",
    status: "PAUSED",
    summary:
      "An automated AI newsroom: discovers, clusters, deduplicates and summarizes AI news and research daily. Backend paused to save hosting costs.",
    tags: ["FastAPI", "Brave Search", "OpenAI", "Firestore"],
    link: "https://techpluse.in/",
    image: "/projects/techpluse/cover.webp",
    featured: true,
  },
  {
    slug: "job-radar",
    name: "Job Radar",
    category: "Data Pipeline",
    status: "OPEN SOURCE",
    summary:
      "Reads LinkedIn's own alert emails, scores every job against my CV, and writes a ranked Google Sheet every morning - no scraping, ₹0 a month.",
    tags: ["Python", "IMAP", "GitHub Actions", "Sheets API"],
    link: "https://github.com/DevRohan33/job-radar",
    image: "/projects/job-radar/cover.webp",
  },
  {
    slug: "data-pipeline",
    name: "Asset & ERP Pipeline",
    category: "Data Engineering",
    status: "SHIPPED",
    summary:
      "QuickBase to SAP integration with an S3 media pipeline: EXIF geolocation, video frame extraction, credential-isolating proxy APIs.",
    tags: ["FastAPI", "S3", "Wasabi", "Python"],
    image: "/projects/data-pipeline/cover.webp",
  },
  {
    slug: "ai-workspace",
    name: "AI Workspace",
    category: "Platform",
    status: "BUILDING",
    summary:
      "Multi-tenant RAG support agents, per-employee assistants, and automated billing for startups.",
    tags: ["Django", "LangChain", "RAG", "Docker"],
    image: "/image/auth_hero.png",
  },
];

export type SupportingProject = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
};

export const tier2Projects: SupportingProject[] = [
  {
    title: "Krishi Sathi",
    description: "A responsive AI assistant web app for farmers.",
    image: "/image/krishiSakhi.png",
    tags: ["Next.js", "Tailwind CSS", "React", "SSR"],
    githubLink: "https://github.com/DevRohan33",
  },
  {
    title: "College Management Portal",
    description:
      "An all-in-one college management system integrating attendance, assignments, results, clubs, notes-sharing, and a merch store.",
    image: "/image/clg_img.png",
    tags: ["Full-Stack", "LMS", "ERP", "E-commerce"],
    githubLink: "https://github.com/DevRohan33",
  },
  {
    title: "FytTrk",
    description: "An installable web app for daily gym tracking.",
    image: "/image/FYTTRK.png",
    tags: ["Next.js", "Tailwind CSS", "React", "SSR"],
    demoLink: "https://fittrk.vercel.app/",
    githubLink: "https://github.com/DevRohan33",
  },
  {
    title: "SMG Energy Website",
    description:
      "A responsive marketing site with interactive UI and smooth animation.",
    image: "/image/smg.jpg",
    tags: ["React", "Tailwind", "UI/UX"],
    demoLink: "https://www.smgenergyandengineering.com/",
    githubLink: "https://github.com/DevRohan33/",
  },
];

export const tier3Projects: SupportingProject[] = [
  {
    title: "Invoice Generator",
    description:
      "Python/Flask invoice generator with PDF export and tax calculation.",
    image: "/image/invoice.jpg",
    tags: ["Python", "Flask", "PDF"],
    demoLink: "https://invoice-generator-liard-three.vercel.app/",
    githubLink: "https://github.com/DevRohan33/invoice_generator",
  },
  {
    title: "Stock Market Analysis",
    description:
      "Fetches and analyzes NSE stock data, rendered to formatted HTML.",
    image: "/image/stock.png",
    tags: ["Python", "Twelve Data API"],
    demoLink: "https://github.com/DevRohan33/Stock_Market_Analysis",
    githubLink: "https://github.com/DevRohan33/Stock_Market_Analysis",
  },
  {
    title: "GPT Jugad",
    description:
      "A multi-model chatbot with free API key retrieval for each model.",
    image: "/image/gpt.png",
    tags: ["React", "JavaScript", "AI API"],
    demoLink: "https://gpt-jugaad.vercel.app/",
    githubLink: "https://github.com/DevRohan33/",
  },
];

export const pillars = [
  {
    number: "01",
    title: "Applied AI",
    tagline: "AI that does work, not demos.",
    tags: [
      "RAG",
      "Tool calling",
      "Multi-agent",
      "Voice agents",
      "LangChain",
      "LangGraph",
      "MCP",
      "Vector DBs",
      "Evals",
    ],
  },
  {
    number: "02",
    title: "Data & Backend",
    tagline: "Moving and shaping real data at volume.",
    tags: [
      "Python",
      "FastAPI",
      "Django",
      "Postgres",
      "ETL",
      "S3",
      "Wasabi",
      "REST",
    ],
  },
  {
    number: "03",
    title: "System Design",
    tagline:
      "Turning a loose requirement into an architecture, then a working product.",
    tags: [
      "System Architecture",
      "Docker",
      "Dokploy",
      "Vercel",
      "CI/CD",
      "Kubernetes",
      "Monitoring",
    ],
  },
];

export const experience = [
  {
    role: "Junior Software Engineer",
    company: "Design Intelligence LLP",
    period: "Jun 2025 - Present",
    description:
      "Design and ship production LLM systems - an agentic engineering assistant on OpenAI function calling, RAG retrieval, multi-agent workflows - plus the FastAPI integrations and asset pipelines underneath. Own deployment on Docker and VPS infrastructure I manage myself.",
  },
  {
    role: "Full-Stack Intern",
    company: "Design Intelligence LLP",
    period: "Feb 2025 - Jun 2025",
    description:
      "React and Next.js frontend work, Python backend and automation, early Three.js visualization features.",
  },
  {
    role: "Python Programming Intern",
    company: "CodSoft & Oasis Infobyte",
    period: "2024",
    description: "Early Python fundamentals across GUI and API projects.",
  },
];

export const priorRole = {
  role: "Maintenance Engineer, Adani Solar",
  period: "Oct 2023 - Jun 2024",
  note: "Pre-software background, before moving into engineering full-time.",
};

export const education = {
  degree: "BTech, Computer Science and Engineering",
  institution: "MAKAUT / Elitte College of Engineering",
  period: "2023 - 2026",
  diploma: "Diploma, Electronics & Telecommunication Engineering",
  diplomaInstitution: "Engineering Institute for Junior Executives, Howrah",
  diplomaPeriod: "2020 - 2023",
};

export const aboutStory = `I build backend and AI systems: RAG pipelines, multi-agent and tool-calling agents, and the data infrastructure underneath them. At Design Intelligence LLP I design and ship production LLM systems - an agentic engineering assistant built on OpenAI function calling, RAG retrieval pipelines, and the FastAPI, ETL and storage plumbing that feeds them: QuickBase-to-SAP integration, S3/Wasabi asset processing, proxy layers for credential isolation.

What I actually care about is system design: taking a loosely defined requirement and turning it into an architecture, then a working product. I design for the ways LLM systems fail, enforcing correctness with rules in the backend instead of relying on prompt instructions. Deployment is part of owning that end to end - I use Docker, Dokploy, Vercel and Firebase to ship what I build - but I'd rather be known as the person who can take a requirement and carry it the whole way through.

Side projects push that further. RYBO (formerly MyLedger) runs a real wholesale distributor's billing, stock and collections on Android and the web. Abhyas is a real-time voice agent that interviews you with sub-second streaming replies. Job Radar ranks LinkedIn's job alerts against my CV every morning for ₹0 a month. And TechPluse was a fully automated AI newsroom - its backend is paused for now to save on hosting costs.

Before software, I worked as a maintenance engineer on solar plant systems - different domain, same instinct: a system either holds up under real conditions or it doesn't.`;

export const aboutLead =
  "I build backend and AI systems- RAG pipelines, tool-calling agents and the data infrastructure underneath them- and I carry them from a loose requirement all the way to something running in production.";

export const aboutFacts = [
  { label: "Based in", value: "Kolkata, IN · open to relocation" },
  { label: "Currently", value: "Backend & AI, Design Intelligence" },
  { label: "Focus", value: "LLM systems that hold up in production" },
];

export const principles = [
  {
    number: "01",
    title: "Start from the requirement",
    body: "A loose requirement becomes an architecture, then a working product. I'd rather carry one system the whole way through than hand off half of three.",
  },
  {
    number: "02",
    title: "Correctness lives in the backend",
    body: "Models skip steps. Anything that has to be true- a confirmation before a calculation, a payment counted exactly once- is enforced in code, not requested in a prompt.",
  },
  {
    number: "03",
    title: "Ship it, then run it",
    body: "Deployment, monitoring and the failure alerts are part of the job. Everything on this site is something I've run with real users or real data, not just built.",
  },
];

export const journey = [
  {
    period: "2020- 2023",
    title: "Diploma, Electronics & Telecom",
    body: "Circuits, embedded systems, and my first Python and C.",
  },
  {
    period: "Oct 2023",
    title: "Maintenance Engineer, Adani Solar",
    body: "Large-scale solar plant systems- where a fault means real downtime.",
  },
  {
    period: "2024",
    title: "Moved into software",
    body: "Python internships at CodSoft and Oasis Infobyte, alongside a BTech in CSE.",
  },
  {
    period: "Feb 2025",
    title: "Intern, Design Intelligence",
    body: "React, Python APIs, data pipelines and Three.js- converted to full-time in five months.",
  },
  {
    period: "Jun 2025",
    title: "Junior Software Engineer",
    body: "Production LLM systems: an agentic engineering assistant, RAG, ERP and asset pipelines.",
  },
  {
    period: "2026- now",
    title: "Shipping my own products",
    body: "RYBO live with a real distributor; Abhyas and Job Radar open-sourced.",
  },
];

export const skillGroups = [
  {
    title: "AI Systems",
    items: [
      "RAG pipelines (multi-tenant, hybrid retrieval & reranking)",
      "OpenAI function calling · tool-calling & multi-agent systems",
      "LangChain · LangGraph · MCP",
      "Vector databases - Pinecone, Weaviate, FAISS, Chroma",
      "Real-time voice agents - streaming STT / LLM / TTS over WebSockets",
      "LLM integration & evaluation",
    ],
  },
  {
    title: "Data & Backend",
    items: [
      "Python · FastAPI · Django · Pydantic",
      "Pandas · NumPy",
      "PostgreSQL · MongoDB · Firestore · schema design",
      "ETL & pipeline design - dedup, filtering, enrichment",
      "Object storage pipelines - S3, Wasabi",
      "Media processing - EXIF extraction, video frame extraction",
      "REST API design · third-party & proxy API integration",
      "QuickBase - low-code app development & ERP integration",
    ],
  },
  {
    title: "System Design & Delivery",
    items: [
      "System & solution architecture - requirement to working product",
      "Git & GitHub - version control, CI/CD workflows",
      "Docker · Dokploy · VPS administration",
      "Vercel / Cloudflare Pages",
      "CI/CD - GitHub Actions",
      "Kubernetes (working knowledge)",
      "AWS - EC2, S3, RDS, IAM (working knowledge)",
      "Credential isolation & secrets handling",
      "Production monitoring & maintenance",
    ],
  },
  {
    title: "Frontend & 3D",
    items: [
      "React · Next.js · TypeScript · Tailwind",
      "Flutter · Firebase (Firestore, Cloud Functions)",
      "Three.js · React Three Fiber",
      "Claude Code as an engineering partner",
    ],
  },
];

export const appsStoreData = [
  {
    id: "prompt-converter",
    title: "Prompt Converter",
    developer: "SK Rohan Parveag",
    category: "Productivity",
    rating: 4.8,
    reviews: "100+",
    downloads: "10+",
    size: "3.9 MB",
    version: "1.1.0",
    lastUpdated: "April 2026",
    safetyNotice: "This APK is safe to install and has been verified.",
    compatibility: "Compatible with Android 5.0+",
    icon: "/app/app_logo.png",
    downloadLink: "/downloads/app-release.apk",
    description:
      "Transform your ideas into structured AI prompts in seconds. An intuitive AI-powered app that converts your natural language into optimized prompts for better AI responses. Perfect for content creators, developers, and AI enthusiasts.",
    screenshots: [
      "/app/img1.jpg",
      "/app/img2.jpg",
      "/app/img3.jpg",
      "/app/img4.jpg",
      "/app/img5.jpg",
    ],
    features: [
      "Natural Language Processing for prompt structuring",
      "One-click to copy to clipboard",
      "Dark Mode and Light Mode support",
      "History of generated prompts",
      "Multiple AI model templates",
    ],
  },
  {
    id: "fyttrk",
    title: "FytTrk",
    developer: "SK Rohan Parveag",
    category: "Health & Fitness",
    rating: 4.7,
    reviews: "5k",
    downloads: "50+",
    size: "12 MB",
    version: "2.0.0",
    lastUpdated: "January 2026",
    safetyNotice: "Verified safe app. Syncs securely with cloud.",
    compatibility: "Compatible with Android 8.0+ and Web",
    icon: "/image/FYTTRK.png",
    downloadLink: "https://fittrk.vercel.app/",
    description:
      "Designed and developed a responsive webapp with install features for daily GYM tracking. Keep track of your sets, reps, weights, and overall fitness progress over time.",
    screenshots: ["/image/FYTTRK.png"],
    features: [
      "PWA Installable on Desktop & Mobile",
      "Detailed exercise library",
      "Rest timer",
      "Progress analytics & charts",
      "Cloud sync",
    ],
  },
];

export const usesData = {
  stack: [
    { label: "Languages", value: "Python · SQL" },
    { label: "Backend", value: "FastAPI · Django · Pydantic" },
    { label: "AI orchestration", value: "LangChain · LangGraph · MCP" },
    { label: "LLM APIs", value: "OpenAI · Cohere · Sarvam" },
    { label: "Frontend", value: "React · Next.js · Tailwind" },
    { label: "Mobile", value: "Flutter" },
  ],
  firebase: [
    { label: "Auth", value: "Firebase Auth" },
    { label: "Database", value: "Firestore + rules" },
    { label: "Server logic", value: "Cloud Functions" },
    { label: "Hosting", value: "Firebase Hosting" },
    { label: "Push", value: "Cloud Messaging" },
    { label: "Quality", value: "Crashlytics + Performance" },
    { label: "Analytics", value: "Google Analytics for Firebase" },
  ],
  infrastructure: [
    { label: "VPS", value: "Hetzner" },
    { label: "Orchestration", value: "Docker + Dokploy" },
    { label: "Static/edge", value: "Vercel" },
    { label: "Proxy", value: "Caddy" },
    { label: "TLS", value: "Auto" },
    { label: "Storage", value: "S3 + Wasabi" },
  ],
  data: [
    { label: "Primary", value: "PostgreSQL" },
    { label: "Vector", value: "Pinecone · Weaviate · Chroma" },
    { label: "App data", value: "Firestore" },
    { label: "Backups", value: "Nightly" },
    { label: "Restore drill", value: "Monthly" },
  ],
  operations: [
    { label: "Monitoring", value: "Uptime Kuma" },
    { label: "Alerts", value: "Telegram" },
    { label: "Secrets", value: "Env-isolated" },
    { label: "CI/CD", value: "GitHub Actions" },
  ],
  seo: [
    { label: "Search", value: "Google Search Console" },
    { label: "Analytics", value: "Google Analytics" },
    { label: "Performance", value: "Lighthouse · Core Web Vitals" },
    { label: "Technical SEO", value: "Sitemaps · JSON-LD" },
    { label: "Monetisation", value: "Google AdSense" },
  ],
  tooling: [
    { label: "AI coding", value: "Claude Code · Codex" },
    { label: "AI video", value: "Text & image-to-video generation" },
    { label: "Automation", value: "Python scripts · scheduled AI workflows" },
    { label: "Low-code / ERP", value: "QuickBase" },
    { label: "Version control", value: "Git + GitHub" },
    { label: "3D on the web", value: "Three.js" },
  ],
};
