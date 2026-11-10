import classNames from "classnames";
import Link from "next/link";

import { Eyebrow } from "@/components/Eyebrow";
import type { Project } from "@/types";

import styles from "./Project.module.scss";

/** Case studies: the next case study, or "All projects" after the last one. */
export const NextProjectLink = ({ next }: { next?: Project }) => (
  <Link href={next ? `/work/${next.slug}` : "/work"} className={styles.nextLink}>
    <Eyebrow size="m">{next ? "Next project" : "More work"}</Eyebrow>
    <span className={styles.nextTitle}>{next ? next.metadata.title : "All projects"} →</span>
  </Link>
);

/** Short projects: previous and next short project. Missing ends are left out. */
export const PrevNextNav = ({ previous, next }: { previous?: Project; next?: Project }) => {
  if (!previous && !next) return null;

  return (
    <nav aria-label="More projects" className={styles.prevNext}>
      {previous && (
        <Link href={`/work/${previous.slug}`} className={styles.prevNextLink}>
          <Eyebrow size="m">Previous</Eyebrow>
          <span className={styles.prevNextTitle}>← {previous.metadata.title}</span>
        </Link>
      )}
      {next && (
        <Link
          href={`/work/${next.slug}`}
          className={classNames(styles.prevNextLink, styles.prevNextNext)}
        >
          <Eyebrow size="m">Next</Eyebrow>
          <span className={styles.prevNextTitle}>{next.metadata.title} →</span>
        </Link>
      )}
    </nav>
  );
};
