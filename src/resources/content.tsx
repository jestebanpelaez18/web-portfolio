import type { About, Contact, Home, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Juan Esteban",
  lastName: "Pelaez",
  name: "Juan Esteban Pelaez",
  role: "Software Engineer",
  avatar: "/images/avatar-v2.png",
  email: "juanes.pelaez18@gmail.com",
  location: "Europe/Helsinki", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
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
  image: "/images/og/home.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description:
    "Based in Helsinki. I build web applications and data pipelines, with a systems background in C and C++.",
  hero: {
    title: "Software Engineer",
    subline:
      "Based in Helsinki. I build web applications and data pipelines, with a systems background in C and C++.",
  },
  aboutStrip: {
    title: "About",
    paragraphs: [
      "I studied Mechanical Engineering, where projects with electronics and embedded systems got me into programming. I moved to Finland and completed the Software Engineering programme at Hive Helsinki, building everything from a Unix shell in C to a real-time multiplayer backend.",
      "Since then I have designed and shipped an e-commerce platform for a client and built data engineering projects on my own.",
    ],
    link: { label: "More about me →", href: "/about" },
  },
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: "From mechanical engineering to C, and from C to the web and data.",
  header: {
    title: "About",
    subline: "From mechanical engineering to C, and from C to the web and data.",
  },
  intro: {
    photo: { src: person.avatar, alt: `Portrait of ${person.name}` },
    facts: [
      { label: "Based in", value: "Helsinki, Finland" },
      { label: "Available", value: "Full-time roles" },
    ],
    cv: { label: "Download CV (PDF)", href: "/cv/JuanEsteban_Pelaez_CV.pdf" },
    paragraphs: [
      "I'm Juan Esteban, a software engineer based in Helsinki.",
      "I first got into programming during Mechanical Engineering, through projects with electronics, embedded systems and PLC automation. I moved to Finland and completed the Software Engineering programme at Hive Helsinki, where I built a Unix shell, an IRC server, a raycasting engine and a multiplayer backend from scratch, in C, C++ and Python.",
      "After Hive I worked as a freelance software engineer for Arabian Fragrance, a perfume company in Helsinki. I built their online store end to end and ended up setting up a large part of the business around it. On my own, I build data engineering projects, like a pipeline on HSL's realtime transit data.",
    ],
  },
  experience: {
    title: "Experience",
    items: [
      {
        company: "Arabian Fragrance Company",
        role: "Freelance Software Engineer",
        period: "Jul 2025 - Oct 2026",
        bullets: [
          "Built the full storefront with Next.js, TypeScript, and Tailwind CSS, owning UI/UX design and implementation across all sections.",
          "Built a custom, type-safe GraphQL fetcher to integrate the Shopify Storefront API directly, avoiding a heavy third-party SDK.",
          "Built the internationalization system for English, Finnish, and Swedish from scratch, including locale-based routing and per-page metadata.",
          "Identified that the online store and physical shop ran as disconnected systems, and independently built a unified Shopify-based architecture to fix it.",
          "Implemented cross-browser and automated testing with Playwright to catch regressions before shipping.",
          "Took full ownership of the project with no roadmap handed down, leading scope that spanned e-commerce, physical retail, import operations, and staff training.",
        ],
        link: {
          label: "Read the case study →",
          href: "/work/ArabianFragance-Headless-E-Commerce-Platform",
        },
      },
    ],
  },
  education: {
    title: "Education",
    items: [
      {
        school: "Hive Helsinki",
        programme: "Software Engineering",
        period: "Oct 2022 - Oct 2024",
        text: "Completed a project-based Software Engineering programme. Focused on C and C++ programming, algorithms, data structures, systems architecture, and networking, all built through real projects and peer review.",
      },
      {
        school: "University of Antioquia",
        programme: "Mechanical Engineering",
        period: "2017 - 2022",
        text: "Studied Mechanical Engineering with coursework in mathematics, electronics, Arduino programming, and PLC automation.",
      },
    ],
  },
  skills: {
    title: "Skills",
    groups: [
      { label: "Programming", items: "Python, SQL, TypeScript, JavaScript, Bash, C, C++" },
      {
        label: "Web and APIs",
        items:
          "React, Next.js, Node.js, Django, FastAPI, REST APIs, WebSockets, GraphQL, Tailwind CSS, Nginx",
      },
      {
        label: "Data",
        items: "PostgreSQL, dbt, PySpark, Spark SQL, SparkML, Airflow, Azure Blob Storage",
      },
      {
        label: "Cloud and infrastructure",
        items: "Docker, Docker Compose, GitHub Actions, Linux, Git, Terraform, GCP",
      },
      { label: "Testing", items: "Playwright, Postman, unit testing" },
      {
        label: "AI",
        items: "Anthropic API, structured LLM output, Claude, Codex, GitHub Copilot",
      },
    ],
  },
  certifications: {
    title: "Certifications",
    items: [
      { name: "Machine Learning with Apache Spark", issuer: "IBM", date: "Feb 2026" },
      { name: "Introduction to Big Data with Spark and Hadoop", issuer: "IBM", date: "Jan 2026" },
      {
        name: "ETL and Data Pipelines with Shell, Airflow, and Kafka",
        issuer: "IBM",
        date: "Mar 2025",
      },
      {
        name: "Databases and SQL for Data Science with Python",
        issuer: "IBM",
        date: "Jan 2025",
      },
    ],
  },
  languages: {
    title: "Languages",
    items: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Professional" },
      { name: "Italian", level: "Intermediate" },
      { name: "Finnish", level: "Beginner" },
    ],
  },
  outsideWork: {
    title: "Outside work",
    text: "Football, the gym, running, and snowboarding when the Finnish winter allows it.",
  },
};

const contact: Contact = {
  label: "Contact",
  title: "Let's talk",
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: "Selected Projects",
  description: `Backend, full-stack, and data engineering projects by ${person.name}`,
};

export { person, social, home, about, contact, work };
