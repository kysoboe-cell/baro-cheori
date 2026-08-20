"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  categories,
  getCompaniesByCategory,
  type CategoryId,
} from "../data/services";
import { companyPath } from "../lib/site";

type CategoryFinderProps = {
  /**
   * bar: 데스크톱(sm 이상) 헤더 아래 칩 한 줄 — 스펙 v3 4-1.
   * chips: 모바일(sm 미만) 히어로 안 가로 스크롤 칩 한 줄 + 바텀시트.
   */
  variant: "bar" | "chips";
};

export default function CategoryFinder({ variant }: CategoryFinderProps) {
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

  const panelId = `company-list-${variant}`;

  const chipButtons = categories.map((category) => {
    const isActive = activeCategory === category.id;

    return (
      <button
        key={category.id}
        type="button"
        aria-expanded={isActive}
        aria-controls={panelId}
        onClick={() =>
          setActiveCategory((current) =>
            current === category.id ? null : category.id
          )
        }
        className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-4 text-body-sm font-semibold transition ${
          variant === "bar" ? "h-10" : "min-h-12 snap-start"
        } ${
          isActive
            ? "border-primary/40 bg-primary-soft text-primary"
            : "border-line bg-white text-ink-700 hover:bg-line-soft"
        }`}
      >
        <span aria-hidden="true">{category.icon}</span>
        <span className="whitespace-nowrap">{category.name}</span>
      </button>
    );
  });

  const companyLinks = activeCompanies.map((company) => (
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
  ));

  if (variant === "chips") {
    return (
      <div className="mt-4 sm:hidden">
        <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1">
          {chipButtons}
        </div>

        {activeData && (
          <>
            <button
              type="button"
              aria-label="업체 목록 닫기"
              onClick={() => setActiveCategory(null)}
              className="fixed inset-0 z-40 cursor-default bg-slate-950/30 backdrop-blur-[1px]"
            />
            <div
              id={panelId}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-line bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-h3 text-ink-900">
                  {activeData.icon} {activeData.name} 업체
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className="flex min-h-12 items-center rounded-lg px-3 text-body-sm font-semibold text-ink-600 hover:bg-line-soft"
                >
                  닫기
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">{companyLinks}</div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <section
      id="services"
      className="relative z-30 hidden scroll-mt-20 border-b border-line bg-white sm:block"
    >
      <div className="relative mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <p className="mr-1 shrink-0 text-body-sm font-semibold text-ink-700">
          업체로 바로 찾기
        </p>

        <div className="relative z-50 flex min-w-0 flex-1 flex-wrap gap-2">
          {chipButtons}
        </div>

        <p className="ml-auto hidden text-caption text-ink-600 xl:block">
          업체를 고르면 업무가 바로 보입니다
        </p>

        {activeData && (
          <button
            type="button"
            aria-label="업체 목록 닫기"
            onClick={() => setActiveCategory(null)}
            className="fixed inset-0 z-40 cursor-default bg-slate-950/30 backdrop-blur-[1px]"
          />
        )}

        {activeData && (
          <div
            id={panelId}
            className="absolute left-4 top-full z-50 mt-2 w-[40rem] max-w-[calc(100vw-2rem)] rounded-xl border border-line bg-white p-4 shadow-lg sm:left-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-h3 text-ink-900">
                {activeData.icon} {activeData.name} 업체
              </h2>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="flex min-h-12 items-center rounded-lg px-3 text-body-sm font-semibold text-ink-600 hover:bg-line-soft"
              >
                닫기
              </button>
            </div>

            <div className="mt-3 grid max-h-[60vh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-4">
              {companyLinks}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
