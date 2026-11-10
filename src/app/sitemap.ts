import { baseURL, routes as routesConfig } from "@/resources";
import { getProjects } from "@/utils/projects";

export default async function sitemap() {
  const works = getProjects().map((project) => ({
    url: `${baseURL}/work/${project.slug}`,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...works];
}
