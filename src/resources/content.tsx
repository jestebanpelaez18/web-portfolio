import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Juan Esteban",
  lastName: "Pelaez",
  name: `Juan Esteban Pelaez`,
  role: "Software Engineer",
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
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
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
  headline: <>Building reliable products across web and data systems</>,
  featured: {
    display: false,
    title: <>Featured project</>,
    href: "/work/transcendence-real-time-multiplayer-platform",
  },
  subline: (
    <>
      I'm Juan Esteban, a software engineer based in Helsinki. I build full-stack
      products, APIs, and data pipelines with a focus on reliability, performance,
      and clean architecture.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
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
        I am a Helsinki-based software engineer with hands-on experience building
        production web applications and data platforms. I work comfortably across
        frontend, backend, and data engineering, integrating APIs, managing
        databases, and deploying containerized systems with CI/CD.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Arabian Fragrance Company Ltd Oy",
        timeframe: "July 2025 - Present",
        role: "Freelance Full Stack Developer",
        achievements: [
          <>
            Designed and developed a full-stack e-commerce web application from
            scratch using Next.js, TypeScript, and Tailwind CSS.
          </>,
          <>
            Built reusable components and integrated Shopify Storefront API via
            GraphQL to power product data, cart logic, and dynamic rendering.
          </>,
          <>
            Managed deployments, environment configuration, and CI/CD workflows
            with GitHub Actions to keep a stable production environment.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Arabian Fragance Company Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Transcendence Project",
        timeframe: "2024 - 2025",
        role: "Full Stack Developer (Team Project)",
        achievements: [
          <>
            Owned backend development in a team of five, building REST APIs with
            Django and PostgreSQL for authentication, matchmaking, and game logic.
          </>,
          <>
            Implemented WebSockets for real-time multiplayer interaction and
            deployed services with Docker and Nginx.
          </>,
          <>
            Built automated API tests with Postman to validate core flows and
            improve release confidence.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Hive Helsinki",
        description: (
          <>
            Software Engineering (Oct 2022 - Nov 2025), project-based curriculum
            focused on C/C++, systems programming, data structures, and software
            architecture.
          </>
        ),
      },
      {
        name: "University of Antioquia",
        description: (
          <>
            B.Sc. Mechanical Engineering (2017 - 2022), with strong foundations in
            mathematics, statistics, and data analysis.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Full Stack Development",
        description: (
          <>
            Production-ready web development with Next.js, TypeScript, Node.js,
            Django, GraphQL, REST APIs, and WebSockets.
          </>
        ),
        tags: [
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Node.js",
            icon: "nodejs",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Data Engineering",
        description: (
          <>
            Built end-to-end pipelines using Python, PySpark, Airflow, PostgreSQL,
            dbt, and Azure Blob Storage for batch and analytical workloads.
          </>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "PySpark",
            icon: "apacheSpark",
          },
          {
            name: "PostgreSQL",
            icon: "postgresql",
          },
          {
            name: "Docker",
            icon: "docker",
          },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Data engineering project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Infrastructure and Quality",
        description: (
          <>
            Containerized deployments, CI/CD automation, testing, and debugging
            workflows focused on shipping reliable software.
          </>
        ),
        tags: [
          {
            name: "GitHub Actions",
            icon: "github",
          },
          {
            name: "Linux",
            icon: "linux",
          },
          {
            name: "Testing",
            icon: "check",
          },
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
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Full-stack and data engineering projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `Snapshots, experiments, and visual notes by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
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
