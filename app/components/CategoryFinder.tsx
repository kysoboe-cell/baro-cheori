"use client";

import Link from "next/link";
import { useState } from "react";
import {
  categories,
  companies,
  type CategoryId,
} from "../data/services";
import { companyPath } from "../lib/site";

export default function CategoryFinder() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const activeData = categories.find(
    (category) => category.id === activeCategory
  );
  const activeCompanies = activeCategory
    ? companies.filter((company) => company.categoryId === activeCategory)
    : [];

  return (
    <section
      id="services"
      className="relative z-30 scroll-mt-20 border-b border-slate-200 bg-white"
    >
      <div className="relative mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <p className="mr-2 hidden shrink-0 text-sm font-bold text-slate-700 sm:block">
          업체로 바로 찾기
        </p>

        <div className="flex min-w-0 flex-1 gap-2 sm:flex-none">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                aria-expanded={isActive}
                aria-controls="company-list"
                onMouseEnter={() => setActiveCategory(category.id)}
                onFocus={() => setActiveCategory(category.id)}
                onClick={() => setActiveCategory(category.id)}
                className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-xl border px-1.5 py-2.5 text-left text-[13px] font-bold transition sm:min-w-40 sm:justify-between sm:gap-4 sm:px-4 sm:text-sm ${
                  isActive
                    ? "border-blue-700 bg-blue-700 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden="true">{category.icon}</span>
                  <span className="truncate">{category.name}</span>
                </span>
                <span aria-hidden="true" className="hidden shrink-0 text-xs sm:inline">
                  {isActive ? "▲" : "▼"}
                </span>
              </button>
            );
          })}
        </div>

        <p className="ml-auto hidden text-xs text-slate-500 lg:block">
          업체를 고르면 업무가 바로 보입니다
        </p>

        {activeData && (
          <div
            id="company-list"
            className="absolute left-4 right-4 top-full z-50 mt-2 max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:left-6 sm:right-auto sm:w-[40rem]"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-bold">
                {activeData.icon} {activeData.name} 업체
              </h2>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 hover:text-black"
              >
                닫기
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {activeCompanies.map((company) => (
                <Link
                  key={company.slug}
                  href={companyPath(company.slug)}
                  className="flex min-h-14 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold transition hover:border-blue-400 hover:bg-white"
                >
                  <span className="break-keep">{company.name}</span>
                  <span aria-hidden="true" className="shrink-0 text-blue-600">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
