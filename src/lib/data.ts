export const personalInfo = {
  name: "SK Rohan Parveag",
  title: "Web Developer",
  email: "skrohanparveag@gmail.com",
  phone: "+918585059644",
  github: "https://github.com/DevRohan33",
  about:
    "I am a Web Developer and AI Enthusiast with expertise in Python, React, 3js and data-driven development. My work bridges front-end engineering and intelligent backend systems, combining modern web technologies with AI automation, RAG, and data science principles. Currently, I work as a Junior Software Developer at Design Intelligence, where I build scalable web and AI-powered applications, Quickbase app and design 3D visualizations using Three.js.",
};

export const skills = {
  ai_ml: [
    { name: "Large Language Models (LLMs)" },
    { name: "Retrieval-Augmented Generation (RAG)" },
    { name: "LangChain & LangGraph" },
    { name: "Hugging Face Ecosystem" },
    { name: "OpenAI API Integration" },
    { name: "Prompt Engineering & AI Agents" },
    { name: "Vector Databases (FAISS, Pinecone, Chroma)" },
  ],
  languages: [
    { name: "Python (Backend, AI, Automation)" },
    { name: "JavaScript (Frontend & Backend)" },
    { name: "C (Core Programming & Fundamentals)" },
  ],
  web_frameworks: [
    { name: "React.js (Modern Frontend Development)" },
    { name: "FastAPI (High-performance APIs)" },
    { name: "Django (Full-stack Web Applications)" },
    { name: "Flask (Lightweight Backend Services)" },
    { name: "RESTful API Design" },
  ],
  databases: [
    { name: "PostgreSQL (Relational Databases)" },
    { name: "MongoDB (NoSQL Databases)" },
    { name: "SQL (Schema Design & Query Optimization)" },
  ],
  data_science: [
    { name: "NumPy (Numerical Computing)" },
    { name: "Pandas (Data Manipulation & Analysis)" },
    { name: "Matplotlib (Data Visualization)" },
    { name: "Data Cleaning & Exploratory Data Analysis (EDA)" },
  ],
  tools_platforms: [
    { name: "Git & GitHub (Version Control)" },
    { name: "Docker (Containerization)" },
    { name: "AWS (EC2, RDS, S3, IAM – Fundamentals)" },
    { name: "CI/CD Basics" },
    { name: "Three.js (3D Web Experiences)" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Unified AI Business Operations Platform for Startups (Ongoing)",
    description:
      "Engineered an integrated AI workspace combining CRM functionality, LLM-powered RAG chatbot, multi-agent automation system, intelligent billing, and business analytics. Implemented AI-driven lead summarization and multi-agent chatbot for comprehensive workspace support. Designed scalable architecture to streamline end-to-end business operations for startup environments.",
    image: "/image/auth_hero.png",
    tags: [
      "Python",
      "Django",
      "FastAPI",
      "React.js",
      "LangChain",
      "RAG",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
    demoLink: "https://pmai-kappa.vercel.app/",
    githubLink: "https://github.com/DevRohan33",
  },
  {
    id: 2,
    title: "AI News Intelligence Platform (Brave MCP + LLM Pipeline)",
    description:
      "Developed automated AI news aggregation system using Brave MCP and Large Language Models for real-time content extraction, classification, and summarization. Built responsive dashboard delivering curated, AI-processed daily news from structured database storage. Implemented end-to-end pipeline for intelligent news delivery with automated content processing.",
    image: "/image/ai_news.png",
    tags: [
      "Python",
      "FastAPI",
      "Large Language Models",
      "Brave MCP",
      "LangChain",
      "PostgreSQL",
      "React.js",
    ],
    demoLink: "https://techpluse.in/",
    githubLink: "https://github.com/DevRohan33",
  },
  {
    id: 3,
    title: "College Management Portal",
    description:
      "College Management Portal is an all-in-one College Management System (CMS) designed to integrate core academic functions with comprehensive campus life management. This robust platform streamlines administration tasks—including attendance, assignments, and results—while fostering student engagement through dedicated modules for clubs, resource sharing (notes), and a bespoke e-commerce store for university merchandise.",
    image: "/image/clg_img.png",
    tags: [
      "Full-Stack Development",
      "LMS",
      "ERP",
      "E-commerce",
      "Database Management",
      "RAG",
    ],
    demoLink: "#",
    githubLink: "https://github.com/DevRohan33",
  },
  {
    id: 4,
    title: "Krishi Sathi",
    description:
      "Designed and developed a responsive webapp for farmers ai assistace ",
    image: "/image/krishiSakhi.png",
    tags: ["Next.js", "Tailwind CSS", "React", "SSR"],
    demoLink: "#",
    githubLink: "https://github.com/DevRohan33",
  },
  {
    id: 5,
    title: "FytTrk WebApp",
    description:
      "Designed and developed a responsive webapp with install features for daily GYM tracking ",
    image: "/image/FYTTRK.png",
    tags: ["Next.js", "Tailwind CSS", "React", "SSR"],
    demoLink: "https://fittrk.vercel.app/",
    githubLink: "https://github.com/DevRohan33",
  },
  {
    id: 6,
    title: "SMG Energy Website",
    description:
      "Designed and developed a responsive website using React and Tailwind CSS with interactive UI elements for seamless user experience. Implemented smooth animation and backend .",
    image: "/image/smg.jpg",
    tags: ["js", "React", "Talwind", "UI/UX"],
    demoLink: "https://www.smgenergyandengineering.com/",
    githubLink: "https://github.com/DevRohan33/",
  },
  {
    id: 7,
    title: "Stock Market Analysis",
    description:
      "NSE Stock Analysis is a Python-based project that fetches real-time stock market data, analyzes trends, and presents the results in a beautifully formatted HTML table.",
    image: "/image/stock.png",
    tags: ["Python", "Twelve Data API", "Mathematics", "GUI"],
    demoLink: "https://github.com/DevRohan33/Stock_Market_Analysis",
    githubLink: "https://github.com/DevRohan33/Stock_Market_Analysis",
  },
  {
    id: 8,
    title: "Gpt Jugad",
    description:
      "Developed a ChatBot with using multiple model  and abel to get free api key for those model",
    image: "/image/gpt.png",
    tags: ["React", "javaScript", " Talwind CSS", "ai api"],
    demoLink: "https://gpt-jugaad.vercel.app/",
    githubLink: "https://github.com/DevRohan33/",
  },
  {
    id: 9,
    title: "Invoice Generator",
    description:
      "Created a fully functional invoice generator using Python and Flask. Features include customizable templates, automatic tax calculations, and PDF generation. Integrated database support to store invoices securely.",
    image: "/image/invoice.jpg",
    tags: ["Python", "typeScript", "Flask", "PDF", "Database"],
    demoLink: "https://invoice-generator-liard-three.vercel.app/",
    githubLink: "https://github.com/DevRohan33/invoice_generator",
  },
];

export const experience = [
  {
    id: 1,
    role: "Junior Software Developer",
    company: "Design Intelligence LLP",
    period: "Jul 2025 - Present",
    description: [
      "Working on Python scripting for automation and backend services.",
      "Contributing to front-end and full-stack development tasks.",
      "Designing minimal 3D visuals using Three.js.",
      "Developing AI-powered tools and agents for various use cases.",
      "Handling deployment processes for web applications and AI agents.",
    ],
    employmentType: "Permanent (Remote)",
  },
  {
    id: 2,
    role: "Intern",
    company: "Design Intelligence LLP",
    period: "Feb 2025 - Jun 2025",
    description: [
      "Worked on front-end development using React.js and Next.js.",
      "Assisted in backend development and automation with Python.",
      "Explored and implemented basic 3D design features using Three.js.",
      "Collaborated with the design team for UI/UX improvements.",
    ],
  },
  {
    id: 4,
    role: "Python Programming Intern",
    company: "CodSoft",
    period: "Jul - Aug 2024",
    description: [
      "Developed To-Do List Application.",
      "Created Calculator GUI.",
      "Built Password Generator.",
      "Designed Contact Book Application.",
    ],
  },
  {
    id: 3,
    role: "Python Programming Intern",
    company: "Oasis Infobyte",
    period: "Aug - Sep 2024",
    description: [
      "Created Voice Assistant.",
      "Developed Weather App.",
      "Built Chat Application.",
      "Designed BMI Calculator.",
    ],
  },
  {
    id: 5,
    role: "Junior Maintanence Engineer",
    company: "Adani Solar",
    period: "Oct 2023 - Jun 2024",
    description: [
      "Maintained solar plant equipment and systems to ensure optimal performance.",
      "Conducted regular inspections and preventive maintenance tasks.",
      "Troubleshot and resolved technical issues promptly to minimize downtime.",
      "Collaborated with the engineering team to implement improvements and upgrades.",
    ],
  },
];

export const certifications = [
  { id: 1, title: "Full Stack with Django Backend" },
  { id: 2, title: "Data Science with Python by CodeWithHarry" },
  { id: 3, title: "LeetCode 100+ Problems Solved" },
  { id: 4, title: "Full-Stack Web Development Course Completion" },
];

export const navLinks = [
  { id: "home", title: "Home" },
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "contact", title: "Contact" },
  { id: "/", title: "", type: "page" },
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    institution: "Elitte College of Engineering",
    period: "Oct 2023 - Apr 2026",
    description: [
      "Focused on software development, algorithms, and data science.",
      "Hands-on projects in Python, C, HTML, and SQL.",
      "Studied data structures, engineering principles, and programming fundamentals.",
    ],
  },
  {
    id: 2,
    degree: "Diploma in Electronics and Telecommunication Engineering",
    field: "Electronics and Telecommunication",
    institution: "Engineering Institute for Junior Executives",
    period: "Sep 2020 - Sep 2023",
    description: [
      "Gained practical knowledge in electronics, circuits, and embedded systems.",
      "Developed programming skills in Python and C.",
      "Built a strong foundation in engineering problem-solving.",
    ],
  },
];
