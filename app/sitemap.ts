import type { MetadataRoute } from "next";
import { allServices, companies } from "./data/services";
import { absoluteUrl, companyPath, servicePath } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-08-19",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: "2026-08-18",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/information-policy"),
      lastModified: "2026-08-18",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: "2026-08-18",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
  const companyPages: MetadataRoute.Sitemap = companies.map((company) => ({
    url: absoluteUrl(companyPath(company.slug)),
    lastModified:
      company.services.map((service) => service.lastChecked).filter(Boolean).sort().at(-1) ??
      "2026-08-18",
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const servicePages: MetadataRoute.Sitemap = allServices.map(
    ({ company, service }) => ({
      url: absoluteUrl(servicePath(company.slug, service.slug)),
      lastModified: service.lastChecked ?? "2026-08-18",
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...companyPages, ...servicePages];
}
