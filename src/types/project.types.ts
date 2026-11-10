/**
 * Project frontmatter schema (docs/redesign/BRIEF.md, "Frontmatter schema").
 * Validated at load time by src/utils/projects.ts.
 */

export type ProjectFormat = "case-study" | "short";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type GalleryImage = ProjectImage & {
  device: "desktop" | "mobile";
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type DiagramStep = {
  label?: string;
  title?: string;
  text?: string;
  dark?: boolean;
  /** Steps shown in a column in place of a single box. */
  stack?: DiagramStep[];
};

export type Diagram = {
  label?: string;
  steps: DiagramStep[];
  footnote?: string;
};

export type ProjectHero = {
  image?: ProjectImage;
  diagram?: Diagram;
};

export type Highlight = {
  title: string;
  text: string;
};

export type Result = {
  value: string;
  label: string;
};

/** A deep-dive row: either image and paragraphs, or a diagram. */
export type ProjectSection = {
  title: string;
  paragraphs?: string[];
  image?: ProjectImage;
  imageSide?: "left" | "right";
  /** Dark background behind the image (logs, terminals). */
  dark?: boolean;
  diagram?: Diagram;
};

export type ProjectFrontmatter = {
  title: string;
  format: ProjectFormat;
  order: number;
  headline: string;
  kind: string;
  featured?: boolean;
  tags?: string[];
  period?: string;
  cover?: string;
  panel?: string;
  roleSummary?: string;
  team?: string;
  stack?: string[];
  links?: ProjectLink[];
  hero?: ProjectHero;
  summary?: string[];
  highlights?: Highlight[];
  gallery?: GalleryImage[];
  results?: Result[];
  sections?: ProjectSection[];
  contributionsTitle?: string;
  contributions?: string[];
  beyond?: string;
  /** Short projects. */
  images?: ProjectImage[];
};

export type Project = {
  /** File name without extension. Used as the URL. */
  slug: string;
  metadata: ProjectFrontmatter;
};
