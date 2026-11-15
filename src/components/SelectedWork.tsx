import { getProjects } from "@/utils/projects";

import { Eyebrow } from "./Eyebrow";
import { ProjectCard } from "./ProjectCard";
import styles from "./SelectedWork.module.scss";

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

type SelectedWorkProps = {
  /** "h1" on /work, where this block is the whole page. */
  headingLevel?: "h1" | "h2";
};

/**
 * "Selected work": featured projects as large cards, the rest as small cards
 * below a hairline. Both lists follow `order`. Used on home and /work.
 */
export const SelectedWork = ({ headingLevel = "h2" }: SelectedWorkProps) => {
  const projects = getProjects();
  const featured = projects.filter((p) => p.metadata.featured);
  const others = projects.filter((p) => !p.metadata.featured);
  const caseStudies = projects.filter((p) => p.metadata.format === "case-study").length;
  const shorts = projects.length - caseStudies;
  const summary = `${count(caseStudies, "case study", "case studies")} · ${count(shorts, "project", "projects")}`;
  const Heading = headingLevel;

  return (
    <section id="work" className={styles.section}>
      <div className={styles.head}>
        <Heading className={styles.title}>Selected work</Heading>
        <Eyebrow size="m">{summary}</Eyebrow>
      </div>

      {featured.length > 0 && (
        <div className={styles.grid}>
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} size="large" priority={index < 3} />
          ))}
        </div>
      )}

      {others.length > 0 && (
        <div className={`${styles.grid} ${styles.others}`}>
          {others.map((project) => (
            <ProjectCard key={project.slug} project={project} size="small" />
          ))}
        </div>
      )}
    </section>
  );
};
