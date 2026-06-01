import {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";

const person: Person = {
  firstName: "Juan Esteban",
  lastName: "Pelaez",
  name: `Juan Esteban Pelaez`,
  role: "Full-Stack Engineer | Backend and Data",
  avatar: "/images/avatar.png",
  email: "juanes.pelaez18@gmail.com",
  location: "Europe/Helsinki", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Spanish"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Engineering notes, experiments, and project updates</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/jestebanpelaez18",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/jestebanpelaez18/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>I build production software, end to end.</>,
  featured: {
    display: false,
    title: <>Featured project</>,
    href: "/work/transcendence-real-time-multiplayer-platform",
  },
  subline: (
    <>
      I'm Juan Esteban, a software engineer based in Helsinki. I work across
      full-stack development and data engineering, from backend APIs and data
      pipelines to frontend interfaces and deployment. My foundation comes from
      intensive systems programming in C and C++ at Hive Helsinki, and I have
      since built real products using TypeScript, React, Python, and modern data
      tools. I enjoy working on technically challenging problems and taking full
      ownership of what I build. Currently open to full-time roles and freelance
      projects.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `${person.name} is a ${person.role} based in Helsinki`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm Juan Esteban, a software engineer based in Helsinki, originally 
        from Spain. My path into software started during my Mechanical 
        Engineering studies, where different engineering projects brought me 
        into contact with programming for the first time, through electronics, 
        embedded systems, and data work. That curiosity led me to make a full 
        transition into software. I moved to Finland and spent three years at 
        Hive Helsinki, a project-based engineering school part of the global 
        42 network, where I built strong foundations in C and C++, systems 
        programming, and solving hard problems from scratch.

        Since completing the program in November 2025, I have been working as a
        freelance full-stack developer and building personal projects in data
        engineering. I enjoy technically challenging work and taking full
        ownership of what I build. Outside of work I stay active with football,
        gym, running, and snowboarding. Currently open to full-time roles and
        freelance projects.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Arabian Fragrance Company Ltd Oy",
        timeframe: "July 2025 - Present",
        role: "Freelance Full Stack Developer",
        achievements: [
          <>
            Designed and developed a full-stack e-commerce web application from
            scratch for a luxury fragrance brand launching in Helsinki, covering
            a catalogue of 20+ products across perfumes, body mists, and
            traditional oud blends.
          </>,
          <>
            Built the full storefront with Next.js, TypeScript, and Tailwind
            CSS, handling UI design and implementation end to end across
            multiple sections including landing page, collections, shop, and
            about pages.
          </>,
          <>
            Integrated the Shopify Storefront API via GraphQL to manage product
            data, cart logic, and dynamic rendering, connecting the custom
            frontend to a headless Shopify backend.
          </>,
          <>
            Managed deployments, environment configuration, and CI/CD workflows
            using GitHub Actions, maintaining a stable live system from
            development to production.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Hive Helsinki",
        title: "Software Engineering",
        timeframe: "Oct 2022 - Nov 2025",
        description: (
          <>
            Hive is a project-based engineering school funded by Supercell and part of the global 42
            network. The curriculum has no traditional lectures — everything is
            built through hands-on projects, peer reviews, and self-directed
            learning. Core focus on C and C++ programming, systems architecture,
            data structures, algorithms, memory management, and problem solving.
            Projects range from building a shell in C to a full IRC server in
            C++ and a real-time multiplayer web platform in a team of five.
          </>
        ),
      },
      {
        name: "University of Antioquia",
        title: "Mechanical Engineering",
        timeframe: "2017 - 2022",
        description: (
          <>
            Strong foundations in advanced mathematics, calculus, linear algebra,
            statistics, and data analysis. Coursework also included electronics,
            circuit design, Arduino programming, PLC automation with Siemens TIA
            Portal, and 3D mechanical design with Autodesk Inventor.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Languages",
        description: <>Python, TypeScript, JavaScript, SQL, C, C++, Bash</>,
        tags: [
          { name: "Python", icon: "python" },
          { name: "TypeScript", icon: "typescript" },
          { name: "JavaScript", icon: "javascript" },
          { name: "C/C++", icon: "cpp" },
          { name: "SQL", icon: "sql" },
          { name: "Bash", icon: "bash" },
        ],
        images: [],
      },
      {
        title: "Web & APIs",
        description: (
          <>
            React, Next.js, Node.js, Django, REST APIs, WebSockets, GraphQL,
            Nginx, Tailwind CSS
          </>
        ),
        tags: [
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Node.js", icon: "nodejs" },
          { name: "Django", icon: "django" },
          { name: "GraphQL", icon: "graphql" },
          { name: "Tailwind CSS", icon: "tailwindcss" },
        ],
        images: [],
      },
      {
        title: "Data Engineering",
        description: (
          <>
            PostgreSQL, PySpark, Airflow, dbt, Azure Blob Storage, MySQL,
            SQLite, MariaDB, Pandas, NumPy
          </>
        ),
        tags: [
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "PySpark", icon: "apacheSpark" },
          { name: "Airflow", icon: "apacheAirflow" },
          { name: "dbt", icon: "dbt" },
          { name: "Azure", icon: "azure" },
        ],
        images: [],
      },
      {
        title: "Infrastructure & Tooling",
        description: (
          <>
            Docker, CI/CD, GitHub Actions, Linux, Git, Shell Scripting, Agile,
            Scrum, Jira
          </>
        ),
        tags: [
          { name: "Docker", icon: "docker" },
          { name: "GitHub Actions", icon: "github" },
          { name: "Linux", icon: "linux" },
          { name: "Git", icon: "git" },
        ],
        images: [],
      },
      {
        title: "Testing & QA",
        description: (
          <>
            Automated testing, unit testing, CI/CD pipelines, debugging, log
            analysis, Postman, and Playwright
          </>
        ),
        tags: [
          { name: "Postman", icon: "postman" },
          { name: "Playwright", icon: "playwright" },
        ],
        images: [],
      },
      {
        title: "AI Tools",
        description: (
          <>
            Actively uses Claude, GitHub Copilot, and Gemini as core parts of
            the development workflow; for code generation, agentic code, debugging,
            architecture decisions, and accelerating delivery.
          </>
        ),
        tags: [
          { name: "Claude", icon: "anthropic" },
          { name: "GitHub Copilot", icon: "github" },
          { name: "Gemini", icon: "google" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Engineering notes and project learnings",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: "Selected Projects",
  description: `Backend, full-stack, and data engineering projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `Snapshots, experiments, and visual notes by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
