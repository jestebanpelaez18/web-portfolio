import { Meta, Schema } from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { CaseStudy, ShortProject } from "@/components";
import { about, baseURL, person, work } from "@/resources";
import type { Project } from "@/types";
import {
  getAdjacentShortProjects,
  getNextCaseStudy,
  getProject,
  getProjects,
  imageSize,
} from "@/utils/projects";

type Params = { params: Promise<{ slug: string }> };

// Only the project files exist as pages; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getProjects().map((project) => ({ slug: project.slug }));
}

/**
 * Share image: the hero image when it exists and is landscape (it fits the
 * wide preview cards), otherwise the generated OG card.
 */
const ogImage = ({ metadata }: Project) => {
  const hero = metadata.hero?.image?.src;
  const size = hero ? imageSize(hero) : undefined;
  return hero && size && size.width > size.height
    ? hero
    : `/api/og/generate?title=${encodeURIComponent(metadata.title)}`;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return Meta.generate({
    title: project.metadata.title,
    description: project.metadata.headline,
    baseURL,
    image: ogImage(project),
    path: `${work.path}/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { metadata } = project;
  // Per-project panel colour, read by ProjectMedia, Diagram and the gallery.
  const panelStyle = metadata.panel ? ({ "--panel": metadata.panel } as CSSProperties) : undefined;

  return (
    <div style={{ width: "100%", ...panelStyle }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${work.path}/${project.slug}`}
        title={metadata.title}
        description={metadata.headline}
        image={ogImage(project)}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {metadata.format === "case-study" ? (
        <CaseStudy project={project} next={getNextCaseStudy(project.slug)} />
      ) : (
        <ShortProject project={project} {...getAdjacentShortProjects(project.slug)} />
      )}
    </div>
  );
}
