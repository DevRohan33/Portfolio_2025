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
  status: "LIVE" | "BUILDING" | "SHIPPED";
  summary: string;
  tags: string[];
  link?: string;
  image?: string;
};

export const flagshipProjects: FlagshipProject[] = [
  {
    slug: "techpluse",
    name: "TechPluse",
    category: "AI Pipeline",
    status: "LIVE",
    summary:
      "An automated newsroom: discovers, deduplicates, summarizes and stores AI research every 24 hours.",
    tags: ["Python", "FastAPI", "Brave MCP", "PostgreSQL"],
    link: "https://techpluse.in/",
    image: "/image/ai_news.png",
  },
  {
    slug: "myledger",
    name: "MyLedger",
    category: "Product",
    status: "LIVE",
    summary:
      "End-to-end product build: real-time data architecture, security-rule access control, and average-cost inventory logic — shipped and running live.",
    tags: ["Flutter", "Firestore", "AWS"],
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
  {
    slug: "data-pipeline",
    name: "Asset & ERP Pipeline",
    category: "Data Engineering",
    status: "SHIPPED",
    summary:
      "QuickBase to SAP integration with an S3 media pipeline: EXIF geolocation, video frame extraction, credential-isolating proxy APIs.",
    tags: ["FastAPI", "S3", "Wasabi", "Python"],
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
    description: "Python/Flask invoice generator with PDF export and tax calculation.",
    image: "/image/invoice.jpg",
    tags: ["Python", "Flask", "PDF"],
    demoLink: "https://invoice-generator-liard-three.vercel.app/",
    githubLink: "https://github.com/DevRohan33/invoice_generator",
  },
  {
    title: "Stock Market Analysis",
    description: "Fetches and analyzes NSE stock data, rendered to formatted HTML.",
    image: "/image/stock.png",
    tags: ["Python", "Twelve Data API"],
    demoLink: "https://github.com/DevRohan33/Stock_Market_Analysis",
    githubLink: "https://github.com/DevRohan33/Stock_Market_Analysis",
  },
  {
    title: "GPT Jugad",
    description: "A multi-model chatbot with free API key retrieval for each model.",
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
    tags: ["RAG", "Multi-agent", "LangChain", "LangGraph", "MCP", "Vector DBs", "Evals"],
  },
  {
    number: "02",
    title: "Data & Backend",
    tagline: "Moving and shaping real data at volume.",
    tags: ["Python", "FastAPI", "Django", "Postgres", "ETL", "S3", "Wasabi", "REST"],
  },
  {
    number: "03",
    title: "System Design",
    tagline: "Turning a loose requirement into an architecture, then a working product.",
    tags: ["System Architecture", "Docker", "Dokploy", "Vercel", "CI/CD", "Kubernetes", "Monitoring"],
  },
];

export const experience = [
  {
    role: "Junior Software Engineer",
    company: "Design Intelligence LLP",
    period: "Jun 2025 — Present",
    description:
      "FastAPI services, RAG pipelines, multi-agent systems, and the data plumbing underneath them. Own deployment on Docker and VPS infrastructure I manage myself.",
  },
  {
    role: "Full-Stack Intern",
    company: "Design Intelligence LLP",
    period: "Feb 2025 — Jun 2025",
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
  period: "Oct 2023 — Jun 2024",
  note: "Pre-software background, before moving into engineering full-time.",
};

export const education = {
  degree: "BTech, Computer Science and Engineering",
  institution: "MAKAUT / Elitte College of Engineering",
  period: "2023 — 2026",
};

export const aboutStory = `I build backend and AI systems: RAG pipelines, multi-agent and tool-calling agents, and the data infrastructure underneath them. At Design Intelligence LLP I work across FastAPI services, LangChain/LangGraph agent workflows, and the ETL and storage pipelines that feed them — QuickBase-to-SAP integration, S3/Wasabi asset processing, proxy layers for credential isolation.

What I actually care about is system design: taking a loosely defined requirement and turning it into an architecture, then a working product. Deployment is part of owning that end to end, not the point of it on its own — I use Docker, Dokploy, and Vercel to ship what I build, and I'm comfortable with CI/CD and Kubernetes, but I'm not positioning myself as a dedicated deployment engineer. I'd rather be the person who can take a requirement and carry it the whole way through.

Two side projects push that further: TechPluse, a fully automated RAG and LLM pipeline that discovers, deduplicates, and summarizes AI research daily with no manual step; and MyLedger, where I designed the data architecture, security rules, and inventory logic end to end and shipped it to a live, real-world user.

Before software, I worked as a maintenance engineer on solar plant systems — different domain, same instinct: a system either holds up under real conditions or it doesn't.`;

export const skillGroups = [
  {
    title: "AI Systems",
    items: [
      "RAG pipelines (multi-tenant, hybrid retrieval)",
      "Multi-agent systems & tool-calling agents",
      "LangChain · LangGraph · MCP",
      "Vector databases — FAISS, Pinecone, Chroma",
      "LLM integration & evaluation",
    ],
  },
  {
    title: "Data & Backend",
    items: [
      "Python · FastAPI · Django · Flask",
      "PostgreSQL · MongoDB · Firestore · schema design",
      "ETL & pipeline design — dedup, filtering, enrichment",
      "Object storage pipelines — S3, Wasabi",
      "Media processing — EXIF extraction, video frame extraction",
      "REST API design · third-party & proxy API integration",
      "QuickBase — low-code app development & ERP integration",
    ],
  },
  {
    title: "System Design & Delivery",
    items: [
      "System & solution architecture — requirement to working product",
      "Git & GitHub — version control, CI/CD workflows",
      "Docker · Dokploy · VPS administration",
      "Vercel / Cloudflare Pages",
      "CI/CD — GitHub Actions",
      "Kubernetes (working knowledge)",
      "AWS — EC2, S3, RDS, IAM (working knowledge)",
      "Credential isolation & secrets handling",
      "Production monitoring & maintenance",
    ],
  },
  {
    title: "Frontend & 3D",
    items: [
      "React · Next.js · TypeScript · Tailwind",
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
    screenshots: ["/app/img1.jpg", "/app/img2.jpg", "/app/img3.jpg", "/app/img4.jpg", "/app/img5.jpg"],
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
    { label: "Languages", value: "Python · TypeScript/JS · C" },
    { label: "Backend", value: "FastAPI · Django · Flask" },
    { label: "AI orchestration", value: "LangChain · LangGraph · MCP" },
    { label: "Frontend", value: "React · Next.js · Tailwind" },
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
    { label: "Vector", value: "Chroma + Pinecone" },
    { label: "Backups", value: "Nightly" },
    { label: "Restore drill", value: "Monthly" },
  ],
  operations: [
    { label: "Monitoring", value: "Uptime Kuma" },
    { label: "Alerts", value: "Telegram" },
    { label: "Secrets", value: "Env-isolated" },
    { label: "CI/CD", value: "GitHub Actions" },
  ],
  tooling: [
    { label: "Version control", value: "Git + GitHub" },
    { label: "Low-code / ERP", value: "QuickBase" },
    { label: "AI pair programming", value: "Claude Code" },
    { label: "3D on the web", value: "Three.js" },
  ],
};
