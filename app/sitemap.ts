import type { MetadataRoute } from "next";
import { guides } from "./data/guides";
import { problems } from "./data/problems";
import { allServices, companies } from "./data/services";
import {
  absoluteUrl,
  companyPath,
  guidePath,
  problemPath,
  servicePath,
} from "./lib/site";

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
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/guide"),
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.8,
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
  // 상황 허브는 홈(1)과 업체 상세(0.7) 사이 — 업체명 없는 검색어의 착지점입니다.
  const problemPages: MetadataRoute.Sitemap = problems.map((problem) => ({
    url: absoluteUrl(problemPath(problem.slug)),
    lastModified: problem.lastChecked,
    changeFrequency: "weekly",
    priority: 0.9,
  }));
  // 기둥 글은 업체 상세(0.7)보다 위, 상황 허브(0.9)보다 아래에 둡니다.
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(guidePath(guide.slug)),
    lastModified: guide.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
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

  return [
    ...staticPages,
    ...problemPages,
    ...guidePages,
    ...companyPages,
    ...servicePages,
  ];
}
