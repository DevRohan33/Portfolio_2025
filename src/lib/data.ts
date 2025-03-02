
export const personalInfo = {
  name: "SK Rohan Parveag",
  title: "Full-Stack Developer",
  email: "skrohanparveag@gmail.com",
  phone: "+9185858059644",
  github: "https://github.com/DevRohan33",
  about: "I am a passionate Full-Stack Developer with expertise in Python, SQL, PHP, and JavaScript. My technical skills span across backend development, database management, and UI/UX design. I have experience in designing and developing innovative web applications, automation tools, and GUI-based software. Currently, I am an intern at Design Intelligence LLP, where I work on cutting-edge projects to build efficient and scalable applications."
};

export const skills = {
  languages: [
    { name: "Python", level: 90 },
    { name: "C", level: 70 },
    { name: "JavaScript", level: 85 },
    { name: "PHP", level: 80 }
  ],
  frontend: [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 90 },
    { name: "React.js", level: 85 },
    { name: "Tailwind CSS", level: 90 }
  ],
  backend: [
    { name: "Django", level: 85 },
    { name: "Flask", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "PHP", level: 80 }
  ],
  database: [
    { name: "SQL", level: 85 },
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 75 },
    { name: "PostgreSQL", level: 70 }
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Figma", level: 85 },
    { name: "Power BI", level: 80 },
    { name: "Docker", level: 70 }
  ],
  other: [
    { name: "OOP", level: 90 },
    { name: "Data Structures", level: 85 },
    { name: "Algorithms", level: 85 },
    { name: "GUI Development", level: 80 }
  ]
};

export const projects = [
  {
    id: 1,
    title: "Infiw3b Website",
    description: "Designed and developed a responsive website using Next.js and Tailwind CSS with interactive UI elements for seamless user experience. Implemented server-side rendering (SSR) for fast loading times.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Next.js", "Tailwind CSS", "React", "SSR"],
    demoLink: "https://infiw3bwebsite.vercel.app/",
    githubLink: "https://github.com/DevRohan33"
  },
  {
    id: 2,
    title: "Jarves (AI-Powered Assistant)",
    description: "Built an advanced AI-powered virtual assistant using Python and OpenAI's API. Integrated features like voice commands, task automation, and chatbot functionality. Designed a user-friendly GUI with Tkinter for easy interaction.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad0f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Python", "OpenAI API", "Tkinter", "AI"],
    demoLink: "#",
    githubLink: "https://github.com/DevRohan33"
  },
  {
    id: 3,
    title: "Beam Calculator",
    description: "Developed a structural beam calculator for engineers and architects. Implemented complex mathematical algorithms for accurate load calculations. Designed an intuitive GUI with real-time result updates.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Python", "Mathematics", "GUI", "Engineering"],
    demoLink: "#",
    githubLink: "https://github.com/DevRohan33"
  },
  {
    id: 4,
    title: "Invoice Generator",
    description: "Created a fully functional invoice generator using Python and Flask. Features include customizable templates, automatic tax calculations, and PDF generation. Integrated database support to store invoices securely.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Python", "Flask", "PDF", "Database"],
    demoLink: "#",
    githubLink: "https://github.com/DevRohan33"
  },
  {
    id: 5,
    title: "Konva Project",
    description: "Built an interactive graphics editor using Konva.js and JavaScript. Features include drag-and-drop elements, shape manipulation, and layering options. Optimized for high-performance rendering in modern browsers.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["JavaScript", "Konva.js", "Canvas", "UI/UX"],
    demoLink: "#",
    githubLink: "https://github.com/DevRohan33"
  }
];

export const experience = [
  {
    id: 1,
    role: "Intern",
    company: "Design Intelligence LLP",
    period: "Feb 2025 - Present",
    description: [
      "Developing scalable web applications using React.js, Next.js, and Django.",
      "Implementing RESTful APIs and database management for efficient backend operations.",
      "Enhancing user experience by optimizing UI/UX design in Figma.",
      "Working on automation tools, calculators, and AI-based applications."
    ]
  },
  {
    id: 2,
    role: "Python Programming Intern",
    company: "CodSoft",
    period: "Jul - Aug 2024",
    description: [
      "Developed To-Do List Application",
      "Created Calculator GUI",
      "Built Password Generator",
      "Designed Contact Book Application"
    ]
  },
  {
    id: 3,
    role: "Python Programming Intern",
    company: "Oasis Infobyte",
    period: "Aug - Sep 2024",
    description: [
      "Created Voice Assistant",
      "Developed Weather App",
      "Built Chat Application",
      "Designed BMI Calculator"
    ]
  }
];

export const certifications = [
  { id: 1, title: "LeetCode 100+ Problems Solved" },
  { id: 2, title: "Full-Stack Web Development Course Completion" },
  { id: 3, title: "Figma UI/UX Design Certification" }
];

export const navLinks = [
  { id: "home", title: "Home" },
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "contact", title: "Contact" }
];
