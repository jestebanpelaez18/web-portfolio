import classNames from "classnames";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import type { Project } from "@/types";
import { publicFileExists, showMedia } from "@/utils/projects";

import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  project: Project;
  /** "large" for featured projects (4:5 cover, kind label), "small" for the rest (16:9, tags). */
  size?: "large" | "small";
  priority?: boolean;
};

/** Home and /work card: cover, title, headline and a caps label. Links to the project page. */
export const ProjectCard = ({ project, size = "small", priority }: ProjectCardProps) => {
  const { slug, metadata } = project;
  const large = size === "large";
  const panelStyle = metadata.panel ? ({ "--panel": metadata.panel } as CSSProperties) : undefined;
  const label = large ? metadata.kind : (metadata.tags ?? []).join(" · ");
  const tone = large || metadata.panel ? "panel" : "dark";
  // Small cards keep their 16:9 box when the cover file is missing, so the grid stays even.
  const titleBox = !large && !(metadata.cover && publicFileExists(metadata.cover));

  return (
    <Link
      href={`/work/${slug}`}
      className={classNames(styles.card, large ? styles.large : styles.small)}
      style={panelStyle}
    >
      {titleBox ? (
        <span aria-hidden="true" className={classNames(styles.titleBox, styles[tone])}>
          {metadata.title}
        </span>
      ) : (
        showMedia(metadata.cover) && (
          <ProjectMedia
            src={metadata.cover}
            alt={metadata.title}
            ratio={large ? "4 / 5" : "16 / 9"}
            tone={tone}
            sizes="(max-width: 700px) 100vw, 33vw"
            fit={metadata.coverFit}
            priority={priority}
          />
        )
      )}
      <span className={styles.title}>{metadata.title}</span>
      <span className={styles.headline}>{metadata.headline}</span>
      {label && (
        <Eyebrow size={large ? "m" : "s"} className={styles.label}>
          {label}
        </Eyebrow>
      )}
    </Link>
  );
};
