import type { Project } from "@/types";
import { showMedia } from "@/utils/projects";

import shared from "./Project.module.scss";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectMedia } from "./ProjectMedia";
import { PrevNextNav } from "./ProjectNav";
import styles from "./ShortProject.module.scss";

type ShortProjectProps = {
  project: Project;
  previous?: Project;
  next?: Project;
};

/** Short project template (docs/redesign/BRIEF.md, "Short project"). */
export const ShortProject = ({ project, previous, next }: ShortProjectProps) => {
  const m = project.metadata;
  // Without a shown image the row is the body alone, in one column.
  const first = m.images?.[0];
  const image = first && showMedia(first.src) ? first : undefined;
  const label = [m.kind, ...(m.tags ?? [])].join(" · ");

  return (
    <article className={shared.page}>
      <ProjectHeader label={label} title={m.title} headline={m.headline} variant="short" />

      <section className={styles.row}>
        {image && (
          <ProjectMedia
            src={image.src}
            alt={image.alt}
            ratio="4 / 3"
            // Terminal recordings sit on dark unless the project has its own panel;
            // a contained diagram without a panel sits on white, not in black bars.
            tone={m.panel ? "panel" : image.fit === "contain" ? "white" : "dark"}
            sizes="(max-width: 700px) 100vw, 50vw"
            fit={image.fit}
            priority
          />
        )}
        <div className={styles.body}>
          {m.summary && (
            <div className={styles.summary}>
              {m.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
          {m.highlights && (
            <ul className={styles.highlights}>
              {m.highlights.map(({ title, text }) => (
                <li key={title}>
                  <span className={styles.highlightTitle}>{title}</span>
                  <span className={styles.highlightText}>{text}</span>
                </li>
              ))}
            </ul>
          )}
          {(m.stack || m.links) && (
            <div className={styles.footer}>
              {m.stack && <span className={styles.stack}>{m.stack.join(" · ")}</span>}
              {m.links?.map(({ label: linkLabel, url }) => (
                <a
                  key={url}
                  href={url}
                  className={shared.arrowLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkLabel} →
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <PrevNextNav previous={previous} next={next} />
    </article>
  );
};
