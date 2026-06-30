import type { MetadataRoute } from "next";
import { site } from "@/data/content";
import { products } from "@/data/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/services",
    "/accreditation-services",
    "/projects",
    "/it-accreditation",
    ...products.map((p) => `/products/${p.slug}`),
  ];

  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
