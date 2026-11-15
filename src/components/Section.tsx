import classNames from "classnames";

import { Column, Heading } from "@once-ui-system/core";

import { Eyebrow } from "./Eyebrow";
import styles from "./Section.module.scss";

type SectionProps = {
  /** Serif title in the left column. */
  title?: React.ReactNode;
  /** Optional uppercase label above the title (e.g. "CONTACT"). */
  label?: React.ReactNode;
  /** Left column content in place of the title (About intro: photo and facts). */
  aside?: React.ReactNode;
  id?: string;
  /** "wide" uses a 48px column gap (About intro), "default" 32px. */
  gap?: "default" | "wide";
  /** "compact" uses 56px block padding (home About strip, contact), "default" 72px. */
  spacing?: "default" | "compact";
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
  aside,
  id,
  gap = "default",
  spacing = "default",
  bordered = true,
  className,
  children,
}: SectionProps) => (
  <section
    id={id}
    className={classNames(
      styles.section,
      gap === "wide" && styles.wide,
      spacing === "compact" && styles.compact,
      bordered && styles.bordered,
      className,
    )}
  >
    {aside ?? (
      <Column gap="12">
        {label && <Eyebrow size="m">{label}</Eyebrow>}
        {title && (
          <Heading as="h2" className={styles.title}>
            {title}
          </Heading>
        )}
      </Column>
    )}
    <Column gap="20" className={styles.content}>
      {children}
    </Column>
  </section>
);
