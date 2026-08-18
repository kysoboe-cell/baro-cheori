import type { Company } from "./types";

import { coupang } from "./companies/coupang";
import { naverSmartstore } from "./companies/naverSmartstore";
import { gmarket } from "./companies/gmarket";
import { elevenst } from "./companies/elevenst";

import { skt } from "./companies/skt";
import { kt } from "./companies/kt";
import { lguplus } from "./companies/lguplus";

export type { CategoryId, Company, ServiceTask } from "./types";

export const categories = [
  {
    id: "shopping" as const,
    name: "쇼핑몰",
    icon: "🛒",
  },

  {
    id: "telecom" as const,
    name: "통신사",
    icon: "📱",
  },
];

export const companies: Company[] = [
  // 쇼핑몰 - 실제 내용이 있는 업체만 표시
  coupang,
  naverSmartstore,
  gmarket,
  elevenst,

  // 통신사
  skt,
  kt,
  lguplus,
];

export const allServices = companies.flatMap((company) =>
  company.services.map((service) => ({ company, service }))
);

export function getCompany(slug: string) {
  return companies.find((company) => company.slug === slug);
}

export function getService(companySlug: string, serviceSlug: string) {
  const company = getCompany(companySlug);
  const service = company?.services.find((item) => item.slug === serviceSlug);

  return company && service ? { company, service } : null;
}
