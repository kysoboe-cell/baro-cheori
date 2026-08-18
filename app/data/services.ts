import type { CategoryId, Company } from "./types";

import { coupang } from "./companies/coupang";
import { naverSmartstore } from "./companies/naverSmartstore";
import { gmarket } from "./companies/gmarket";
import { elevenst } from "./companies/elevenst";

import { skt } from "./companies/skt";
import { kt } from "./companies/kt";
import { lguplus } from "./companies/lguplus";
import { cjLogistics } from "./companies/cjLogistics";
import { hanjin } from "./companies/hanjin";
import { lotteDelivery } from "./companies/lotteDelivery";
import { kbCard } from "./companies/kbCard";
import { shinhanCard } from "./companies/shinhanCard";
import { samsungCard } from "./companies/samsungCard";
import { netflix } from "./companies/netflix";
import { youtubePremium } from "./companies/youtubePremium";
import { naverPlus } from "./companies/naverPlus";

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

  {
    id: "delivery" as const,
    name: "택배",
    icon: "📦",
  },

  {
    id: "card" as const,
    name: "카드",
    icon: "💳",
  },
  {
    id: "subscription" as const,
    name: "구독",
    icon: "▶️",
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

  // 택배
  cjLogistics,
  hanjin,
  lotteDelivery,

  // 카드
  kbCard,
  shinhanCard,
  samsungCard,

  // 구독·자동결제
  netflix,
  youtubePremium,
  naverPlus,
];

export function getCompaniesByCategory(categoryId: CategoryId) {
  return companies.filter(
    (company) =>
      company.categoryId === categoryId ||
      (categoryId === "subscription" && company.slug === "coupang")
  );
}

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
