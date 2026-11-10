import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type {
  Diagram,
  DiagramStep,
  GalleryImage,
  Highlight,
  Project,
  ProjectFrontmatter,
  ProjectHero,
  ProjectImage,
  ProjectLink,
  ProjectSection,
  Result,
} from "@/types";

const PROJECTS_DIR = path.join(process.cwd(), "src", "app", "work", "projects");

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

/** Pushes a message to `errors` for every problem found at `at`. */
type Check = (value: unknown, at: string, errors: string[]) => void;
type Field = { check: Check; required?: boolean };

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const str: Check = (value, at, errors) => {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${at} must be a non-empty string`);
  } else if (value.includes(String.fromCharCode(0x2014))) {
    errors.push(`${at} contains an em dash (U+2014); use a comma, colon, full stop or hyphen`);
  }
};

const num: Check = (value, at, errors) => {
  if (typeof value !== "number" || !Number.isFinite(value)) errors.push(`${at} must be a number`);
};

const bool: Check = (value, at, errors) => {
  if (typeof value !== "boolean") errors.push(`${at} must be true or false`);
};

const hex: Check = (value, at, errors) => {
  if (typeof value !== "string" || !/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
    errors.push(`${at} must be a hex colour like "#EDE6DA"`);
  }
};

const oneOf =
  (...options: string[]): Check =>
  (value, at, errors) => {
    if (typeof value !== "string" || !options.includes(value)) {
      errors.push(`${at} must be one of ${options.map((o) => `"${o}"`).join(", ")}`);
    }
  };

const arr =
  (item: Check): Check =>
  (value, at, errors) => {
    if (!Array.isArray(value) || value.length === 0) {
      errors.push(`${at} must be a non-empty list`);
      return;
    }
    value.forEach((entry, i) => item(entry, `${at}[${i}]`, errors));
  };

const req = (check: Check): Field => ({ check, required: true });
const opt = (check: Check): Field => ({ check });

/**
 * Checks a plain object against a field map. Unknown keys are errors, so a
 * typo in a project file (e.g. "hightlights") fails instead of being ignored.
 * `Required<T>` makes the compiler insist every field of the type is listed.
 */
function shape<T>(
  fields: { [K in keyof Required<T>]: Field },
  extra?: (value: Record<string, unknown>, at: string, errors: string[]) => void,
): Check {
  const spec = fields as Record<string, Field>;
  return (value, at, errors) => {
    const prefix = at ? `${at}.` : "";
    if (!isObject(value)) {
      errors.push(`${at || "frontmatter"} must be an object`);
      return;
    }
    for (const key of Object.keys(value)) {
      if (!(key in spec)) {
        errors.push(
          `${prefix}${key} is not a known field (allowed: ${Object.keys(spec).join(", ")})`,
        );
      }
    }
    for (const [key, field] of Object.entries(spec)) {
      const fieldValue = value[key];
      if (fieldValue === undefined || fieldValue === null) {
        if (field.required) errors.push(`${prefix}${key} is required`);
        continue;
      }
      field.check(fieldValue, `${prefix}${key}`, errors);
    }
    extra?.(value, at, errors);
  };
}

const image = shape<ProjectImage>({ src: req(str), alt: req(str) });

const step: Check = shape<DiagramStep>(
  {
    label: opt(str),
    title: opt(str),
    text: opt(str),
    dark: opt(bool),
    // Resolved lazily: a step can contain a stack of steps.
    stack: opt((value, at, errors) => arr(step)(value, at, errors)),
  },
  (value, at, errors) => {
    if (value.stack === undefined && value.title === undefined) {
      errors.push(`${at} needs a title or a stack`);
    }
  },
);

const diagram = shape<Diagram>({
  label: opt(str),
  steps: req(arr(step)),
  footnote: opt(str),
});

const exactlyOne =
  (a: string, b: string) => (value: Record<string, unknown>, at: string, errors: string[]) => {
    const count = Number(value[a] !== undefined) + Number(value[b] !== undefined);
    if (count !== 1) errors.push(`${at} needs exactly one of ${a} or ${b}`);
  };

const frontmatter = shape<ProjectFrontmatter>({
  title: req(str),
  format: req(oneOf("case-study", "short")),
  order: req(num),
  headline: req(str),
  kind: req(str),
  featured: opt(bool),
  tags: opt(arr(str)),
  period: opt(str),
  cover: opt(str),
  panel: opt(hex),
  roleSummary: opt(str),
  team: opt(str),
  stack: opt(arr(str)),
  links: opt(arr(shape<ProjectLink>({ label: req(str), url: req(str) }))),
  hero: opt(
    shape<ProjectHero>(
      { image: opt(image), diagram: opt(diagram) },
      exactlyOne("image", "diagram"),
    ),
  ),
  summary: opt(arr(str)),
  highlights: opt(arr(shape<Highlight>({ title: req(str), text: req(str) }))),
  gallery: opt(
    arr(
      shape<GalleryImage>({
        src: req(str),
        alt: req(str),
        device: req(oneOf("desktop", "mobile")),
      }),
    ),
  ),
  results: opt(arr(shape<Result>({ value: req(str), label: req(str) }))),
  sections: opt(
    arr(
      shape<ProjectSection>(
        {
          title: req(str),
          paragraphs: opt(arr(str)),
          image: opt(image),
          imageSide: opt(oneOf("left", "right")),
          dark: opt(bool),
          diagram: opt(diagram),
        },
        exactlyOne("image", "diagram"),
      ),
    ),
  ),
  contributionsTitle: opt(str),
  contributions: opt(arr(str)),
  beyond: opt(str),
  images: opt(arr(image)),
});

/** Returns the error messages for one file's frontmatter (empty if valid). */
export function validateProject(data: unknown): string[] {
  const errors: string[] = [];
  frontmatter(data, "", errors);
  return errors;
}

/* -------------------------------------------------------------------------- */
/* Loading                                                                    */
/* -------------------------------------------------------------------------- */

function loadProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((file) => path.extname(file) === ".mdx");
  const problems: string[] = [];
  const projects: Project[] = [];

  for (const file of files) {
    const { data } = matter(fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8"));
    const errors = validateProject(data);
    if (errors.length > 0) {
      problems.push(...errors.map((error) => `  ${file}: ${error}`));
      continue;
    }
    projects.push({ slug: path.basename(file, ".mdx"), metadata: data as ProjectFrontmatter });
  }

  const byOrder = new Map<number, string>();
  for (const { slug, metadata } of projects) {
    const other = byOrder.get(metadata.order);
    if (other) problems.push(`  ${slug}.mdx: order ${metadata.order} is also used by ${other}.mdx`);
    byOrder.set(metadata.order, slug);
  }

  if (problems.length > 0) {
    throw new Error(
      `Invalid project frontmatter in src/app/work/projects (schema: docs/redesign/BRIEF.md):\n${problems.join("\n")}`,
    );
  }

  return projects.sort((a, b) => a.metadata.order - b.metadata.order);
}

let cache: Project[] | undefined;

/** Every project, validated and sorted by `order`. Throws on invalid frontmatter. */
export function getProjects(): Project[] {
  // Re-read in development so edits to project files show up without a restart.
  if (process.env.NODE_ENV !== "production") return loadProjects();
  cache ??= loadProjects();
  return cache;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

/** The next case study by `order`, or undefined after the last one. */
export function getNextCaseStudy(slug: string): Project | undefined {
  const caseStudies = getProjects().filter((p) => p.metadata.format === "case-study");
  const index = caseStudies.findIndex((p) => p.slug === slug);
  return index === -1 ? undefined : caseStudies[index + 1];
}

/** The previous and next short projects by `order`. */
export function getAdjacentShortProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const shorts = getProjects().filter((p) => p.metadata.format === "short");
  const index = shorts.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return { previous: shorts[index - 1], next: shorts[index + 1] };
}

/** Whether a site path like "/images/x.png" exists in public/. */
export function publicFileExists(src: string): boolean {
  if (/^https?:\/\//.test(src)) return true;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
