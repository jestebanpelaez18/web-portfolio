/**
 * Project frontmatter schema (docs/redesign/BRIEF.md, "Frontmatter schema").
 * Validated at load time by src/utils/projects.ts.
 */

export type ProjectFormat = "case-study" | "short";

export type ProjectImage = {
  src: string;
  alt: string;
};

/** How an image fills its box: "cover" crops (default), "contain" shows all of it. */
export type MediaFit = "cover" | "contain";

/** Short-project image. `fit: "contain"` keeps diagrams uncropped. */
export type ShortProjectImage = ProjectImage & {
  fit?: MediaFit;
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

/** A deep-dive row: image and paragraphs, paragraphs only, or a diagram. */
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
  /** "contain" shows the whole cover on the panel colour instead of cropping it. */
  coverFit?: MediaFit;
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
  images?: ShortProjectImage[];
};

export type Project = {
  /** File name without extension. Used as the URL. */
  slug: string;
  metadata: ProjectFrontmatter;
};
