"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  categories,
  getCompaniesByCategory,
  type CategoryId,
} from "../data/services";
import { companyPath } from "../lib/site";
import AppIcon from "./AppIcon";

/**
 * "업체로 바로 찾기" — 검수 개선 1차(B1).
 *
 * 예전엔 헤더 아래 고정 밴드(데스크톱) + 히어로 안 가로 스크롤 칩(모바일)으로
 * 나뉘어 있어서 좁은 화면에서 간판 문구보다 업체 칩이 먼저 보였습니다.
 * 이제는 히어로·카드 4개 **아래**의 독립 섹션 하나로 합치고, 칩을 누르면
 * 오버레이 대신 칩 바로 아래에 업체 목록이 펼쳐집니다(모바일·PC 공통).
 */
export default function CategoryFinder() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const activeData = categories.find(
    (category) => category.id === activeCategory
  );
  const activeCompanies = activeCategory
    ? getCompaniesByCategory(activeCategory)
    : [];

  // ESC 키로 닫기
  useEffect(() => {
    if (!activeCategory) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveCategory(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeCategory]);

  return (
    <section id="services" className="scroll-mt-20" aria-label="업체로 바로 찾기">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-h2 text-ink-900 md:text-h2-md">업체로 바로 찾기</h2>
        <p className="text-caption text-ink-600">
          업체를 고르면 업무가 바로 보입니다
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              aria-expanded={isActive}
              aria-controls="company-list"
              onClick={() =>
                setActiveCategory((current) =>
                  current === category.id ? null : category.id
                )
              }
              className={`flex min-h-12 items-center gap-1.5 rounded-lg border px-4 text-body-sm font-semibold transition sm:min-h-10 ${
                isActive
                  ? "border-primary/40 bg-primary-soft text-primary"
                  : "border-line bg-white text-ink-700 hover:bg-line-soft"
              }`}
            >
              <AppIcon name={category.icon} size={20} />
              <span className="whitespace-nowrap">{category.name}</span>
            </button>
          );
        })}
      </div>

      {activeData && (
        <div
          id="company-list"
          className="mt-3 rounded-xl border border-line bg-white p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className="flex items-center gap-2 text-h3 text-ink-900">
              <AppIcon name={activeData.icon} size={24} tone="primary" />
              {activeData.name} 업체
            </h3>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="flex min-h-12 items-center rounded-lg px-3 text-body-sm font-semibold text-ink-600 hover:bg-line-soft"
            >
              닫기
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {activeCompanies.map((company) => (
              <Link
                prefetch={false}
                key={company.slug}
                href={companyPath(company.slug)}
                className="flex min-h-12 items-center justify-between gap-2 rounded-lg border border-line bg-bg-soft px-3 text-body-sm font-semibold text-ink-800 transition hover:border-primary/40 hover:bg-white"
              >
                <span className="break-keep">{company.name}</span>
                <span aria-hidden="true" className="shrink-0 text-ink-500">
                  ›
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
