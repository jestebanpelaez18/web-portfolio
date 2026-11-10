import { ProjectCard } from "@/components";
import { getProjects } from "@/utils/projects";

/**
 * Project list for /work, ordered by `order`.
 * Phase 4 of the redesign replaces this with the home page card grids.
 */
export function Projects() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
        gap: "48px 32px",
        width: "100%",
      }}
    >
      {getProjects().map((project, index) => (
        <ProjectCard key={project.slug} project={project} priority={index < 3} />
      ))}
    </div>
  );
}
