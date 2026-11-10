import classNames from "classnames";
import { Fragment, type ReactNode } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import type { Project } from "@/types";

import styles from "./CaseStudy.module.scss";
import { Diagram } from "./Diagram";
import shared from "./Project.module.scss";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectMedia } from "./ProjectMedia";
import { NextProjectLink } from "./ProjectNav";

type CaseStudyProps = {
  project: Project;
  next?: Project;
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Case study template (docs/redesign/BRIEF.md, "Case study").
 * Each block renders only when its field exists, in the brief's order.
 */
export const CaseStudy = ({ project, next }: CaseStudyProps) => {
  const m = project.metadata;

  // Blocks in page order. "panel" blocks are full-width colour fields; the
  // block right after one drops its hairline and gets more top space.
  const blocks: { key: string; panel?: boolean; render: (afterPanel: boolean) => ReactNode }[] = [];

  if (m.hero?.image) {
    const { src, alt } = m.hero.image;
    blocks.push({
      key: "hero",
      panel: true,
      render: () => <ProjectMedia src={src} alt={alt} ratio="16 / 8" priority />,
    });
  } else if (m.hero?.diagram) {
    const diagram = m.hero.diagram;
    blocks.push({ key: "hero", panel: true, render: () => <Diagram diagram={diagram} /> });
  }

  if (m.summary) {
    const summary = m.summary;
    blocks.push({
      key: "summary",
      render: (afterPanel) => (
        <Section
          title="Summary"
          bordered={!afterPanel}
          className={classNames(afterPanel && styles.afterPanel)}
        >
          <div className={styles.lead}>
            {summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ),
    });
  }

  if (m.highlights) {
    const highlights = m.highlights;
    blocks.push({
      key: "highlights",
      render: (afterPanel) => (
        <Section
          title="Highlights"
          bordered={!afterPanel}
          className={classNames(afterPanel && styles.afterPanel)}
        >
          <div className={styles.highlights}>
            {highlights.map(({ title, text }) => (
              <div key={title} className={styles.highlight}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </Section>
      ),
    });
  }

  if (m.gallery) {
    const desktop = m.gallery.filter((image) => image.device === "desktop");
    const mobile = m.gallery.filter((image) => image.device === "mobile");
    blocks.push({
      key: "gallery",
      panel: true,
      render: () => (
        <div className={styles.gallery}>
          {desktop.map(({ src, alt }, i) => (
            <ProjectMedia
              key={src}
              src={src}
              alt={alt}
              tone="white"
              ratio={i === 0 ? "16 / 9" : "4 / 3"}
              sizes={
                i === 0 ? "(max-width: 1440px) 100vw, 1440px" : "(max-width: 700px) 100vw, 50vw"
              }
              className={i === 0 ? styles.galleryWide : undefined}
            />
          ))}
          {mobile.length > 0 && (
            <div className={styles.galleryMobile}>
              {mobile.map(({ src, alt }) => (
                <ProjectMedia
                  key={src}
                  src={src}
                  alt={alt}
                  tone="white"
                  ratio="9 / 19"
                  sizes="300px"
                  className={styles.phone}
                />
              ))}
            </div>
          )}
        </div>
      ),
    });
  }

  if (m.results) {
    const results = m.results;
    blocks.push({
      key: "results",
      render: (afterPanel) => (
        <Section
          title="In numbers"
          bordered={!afterPanel}
          className={classNames(afterPanel && styles.afterPanel)}
        >
          <dl className={styles.numbers}>
            {results.map(({ value, label }) => (
              <div key={label} className={styles.number}>
                <dt className={styles.numberLabel}>{label}</dt>
                <dd className={styles.numberValue}>{value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ),
    });
  }

  m.sections?.forEach((section, i) => {
    const key = `section-${i}`;
    if (section.diagram) {
      const diagram = section.diagram;
      blocks.push({
        key,
        panel: true,
        render: () => <Diagram diagram={diagram} fallbackLabel={section.title} labelAs="h2" />,
      });
      return;
    }
    const image = section.image;
    blocks.push({
      key,
      render: (afterPanel) => (
        <section
          className={classNames(
            styles.row,
            !afterPanel && styles.rowBordered,
            afterPanel && styles.afterPanel,
            section.imageSide === "right" && styles.imageRight,
          )}
        >
          {image && (
            <ProjectMedia
              src={image.src}
              alt={image.alt}
              ratio="4 / 3"
              tone={section.dark ? "dark" : "panel"}
              sizes="(max-width: 700px) 100vw, 50vw"
              className={styles.rowMedia}
            />
          )}
          <div className={styles.rowText}>
            <h2 className={styles.rowTitle}>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ),
    });
  });

  if (m.contributions || m.beyond) {
    const { contributions, beyond } = m;
    blocks.push({
      key: "contributions",
      render: (afterPanel) => (
        <Section
          title={m.contributionsTitle ?? "My role"}
          bordered={!afterPanel}
          className={classNames(afterPanel && styles.afterPanel)}
        >
          <div className={styles.contributionsBody}>
            {contributions && (
              <ul className={styles.arrowList}>
                {contributions.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true" className={styles.arrow}>
                      →
                    </span>{" "}
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {beyond && (
              <aside className={styles.beyond}>
                <Eyebrow>Beyond the code</Eyebrow>
                <p>{beyond}</p>
              </aside>
            )}
          </div>
        </Section>
      ),
    });
  }

  const label = [m.kind, m.period].filter(Boolean).join(" · ");

  return (
    <article className={shared.page}>
      <ProjectHeader label={label} title={m.title} headline={m.headline} />

      {(m.roleSummary || m.team || m.stack || m.links) && (
        <dl className={shared.meta}>
          {m.roleSummary && (
            <div className={shared.metaItem}>
              <dt>
                <Eyebrow>Role</Eyebrow>
              </dt>
              <dd>{m.roleSummary}</dd>
            </div>
          )}
          {m.team && (
            <div className={shared.metaItem}>
              <dt>
                <Eyebrow>Team</Eyebrow>
              </dt>
              <dd>{m.team}</dd>
            </div>
          )}
          {m.stack && (
            <div className={shared.metaItem}>
              <dt>
                <Eyebrow>Stack</Eyebrow>
              </dt>
              <dd>{m.stack.join(", ")}</dd>
            </div>
          )}
          {m.links && (
            <div className={shared.metaItem}>
              <dt>
                <Eyebrow>Links</Eyebrow>
              </dt>
              {m.links.map(({ label: linkLabel, url }) => (
                <dd key={url}>
                  <a href={url} className={shared.arrowLink} {...external}>
                    {linkLabel} →
                  </a>
                </dd>
              ))}
            </div>
          )}
        </dl>
      )}

      {blocks.map((block, i) => (
        <Fragment key={block.key}>{block.render(i > 0 && Boolean(blocks[i - 1].panel))}</Fragment>
      ))}

      <NextProjectLink next={next} />
    </article>
  );
};
