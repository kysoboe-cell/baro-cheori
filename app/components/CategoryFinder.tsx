"use client";

import { useState } from "react";
import Link from "next/link";
import {
  categories,
  companies,
  type CategoryId,
} from "../data/services";

export default function CategoryFinder() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryId | null>(null);

  const activeData = categories.find(
    (category) => category.id === activeCategory
  );

  const activeCompanies = activeCategory
    ? companies.filter(
      (company) => company.categoryId === activeCategory
    )
    : [];

  return (
    <section className="relative z-40 border-b border-gray-100 bg-white">
      <div className="px-4 py-3 sm:px-6 lg:px-10 xl:px-12">
        <div className="relative w-fit lg:ml-8 xl:ml-12">
          {/* 카테고리 버튼 */}
          <div className="flex gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onMouseEnter={() =>
                    setActiveCategory(category.id)
                  }
                  onFocus={() =>
                    setActiveCategory(category.id)
                  }
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.id
                        ? null
                        : category.id
                    )
                  }
                  className={`flex min-w-44 items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${isActive
                    ? "border-black bg-black text-white shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-400"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {category.icon}
                    </span>

                    <span className="font-bold">
                      {category.name}
                    </span>
                  </div>

                  <span className="ml-5 text-xs">
                    {isActive ? "▲" : "▼"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 펼쳐지는 업체 목록 */}
          {activeData && (
            <div className="absolute left-0 top-full z-50 mt-3 max-h-[60vh] w-[36rem] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-xl">
              <div className="mb-4 flex items-center gap-2">
                <span>{activeData.icon}</span>

                <h3 className="font-bold">
                  {activeData.name}
                </h3>
              </div>

              {activeCompanies.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {activeCompanies.map((company) => (
                    <Link
                      key={company.slug}
                      href={`/company/${company.slug}`}
                      className="flex h-[76px] items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left font-semibold transition hover:border-black hover:bg-gray-100"
                    >
                      <span className="line-clamp-2 leading-snug break-keep">
                        {company.name}
                      </span>
                      <span className="shrink-0 text-gray-400">→</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-sm text-gray-400">
                  등록된 업체가 없습니다.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}