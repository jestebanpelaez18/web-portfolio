import Link from "next/link";
import type { CSSProperties } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import type { Project } from "@/types";

import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

/** Cover, title, headline and kind. Phase 4 builds the final large and small cards. */
export const ProjectCard = ({ project, priority }: ProjectCardProps) => {
  const { slug, metadata } = project;
  const panelStyle = metadata.panel ? ({ "--panel": metadata.panel } as CSSProperties) : undefined;

  return (
    <Link href={`/work/${slug}`} className={styles.card} style={panelStyle}>
      {metadata.cover && (
        <ProjectMedia
          src={metadata.cover}
          alt={metadata.title}
          ratio="16 / 9"
          sizes="(max-width: 700px) 100vw, 33vw"
          priority={priority}
        />
      )}
      <span className={styles.title}>{metadata.title}</span>
      <span className={styles.headline}>{metadata.headline}</span>
      <Eyebrow>{metadata.kind}</Eyebrow>
    </Link>
  );
};
