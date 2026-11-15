import type { IconName } from "@/resources/icons";
import type { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
  /** Whether this social link is essential and should be displayed on the about page */
  essential?: boolean;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/** A text link, e.g. "More about me →". */
export type TextLink = {
  label: string;
  href: string;
};

/** Page h1 and its serif subline. */
export type PageHeader = {
  title: string;
  subline: string;
};

/**
 * Home page configuration (docs/redesign/content/home-and-about.md).
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  hero: PageHeader;
  /** Two-column "About" strip with a link to /about. */
  aboutStrip: {
    title: string;
    paragraphs: string[];
    link: TextLink;
  };
}

/**
 * About page configuration (docs/redesign/content/home-and-about.md).
 * Sections render in this order: intro, experience, education, skills,
 * certifications, languages, outside work, contact.
 */
export interface About extends BasePageConfig {
  header: PageHeader;
  intro: {
    photo: { src: string; alt: string };
    /** Small labelled facts under the photo ("BASED IN", "AVAILABLE"). */
    facts: Array<{ label: string; value: string }>;
    /** Shown only once the file exists in public/. */
    cv: TextLink;
    paragraphs: string[];
  };
  experience: {
    title: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      bullets: string[];
      link?: TextLink;
    }>;
  };
  education: {
    title: string;
    items: Array<{
      school: string;
      programme: string;
      period: string;
      text: string;
    }>;
  };
  skills: {
    title: string;
    groups: Array<{ label: string; items: string }>;
  };
  certifications: {
    title: string;
    /** Newest first. */
    items: Array<{ name: string; issuer: string; date: string }>;
  };
  languages: {
    title: string;
    items: Array<{ name: string; level: string }>;
  };
  outsideWork: {
    title: string;
    text: string;
  };
}

/** "Let's talk" strip on home and About. Links come from `person` and `social`. */
export type Contact = {
  label: string;
  title: string;
};

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
export interface Work extends BasePageConfig {}
