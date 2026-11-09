import classNames from "classnames";

import { Column, Heading } from "@once-ui-system/core";

import { Eyebrow } from "./Eyebrow";
import styles from "./Section.module.scss";

type SectionProps = {
  /** Serif title in the left column. */
  title: React.ReactNode;
  /** Optional uppercase label above the title (e.g. "CONTACT"). */
  label?: React.ReactNode;
  id?: string;
  /** "wide" uses a 48px column gap (About intro), "default" 32px. */
  gap?: "default" | "wide";
  /** Hairline above the section. On by default. */
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Two-column section: title on the left, content on the right.
 * Stacks to one column below ~632px through auto-fit, without media queries.
 */
export const Section = ({
  title,
  label,
  id,
  gap = "default",
  bordered = true,
  className,
  children,
}: SectionProps) => (
  <section
    id={id}
    className={classNames(
      styles.section,
      gap === "wide" && styles.wide,
      bordered && styles.bordered,
      className,
    )}
  >
    <Column gap="12">
      {label && <Eyebrow size="m">{label}</Eyebrow>}
      <Heading as="h2" className={styles.title}>
        {title}
      </Heading>
    </Column>
    <Column gap="20" className={styles.content}>
      {children}
    </Column>
  </section>
);
