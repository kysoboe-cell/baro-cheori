"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  findBestService,
  findExactCompany,
  findMentionedCompanies,
  findServiceMatches,
  type ServiceSearchResult,
} from "../lib/search";
import { companyPath, servicePath } from "../lib/site";

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const filteredSuggestions = query.trim()
    ? findServiceMatches(query, 6)
    : [];

  const navigateForQuery = (value: string) => {
    const trimmedQuery = value.trim();
    if (!trimmedQuery) return;

    const exactCompany = findExactCompany(trimmedQuery);
    if (exactCompany) {
      router.push(companyPath(exactCompany.slug));
      return;
    }

    const mentionedCompanies = findMentionedCompanies(trimmedQuery);
    const bestService = findBestService(trimmedQuery);
    if (mentionedCompanies.length === 1 && bestService) {
      router.push(
        servicePath(bestService.company.slug, bestService.service.slug)
      );
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const runSearch = () => {
    setIsOpen(false);
    navigateForQuery(query);
  };

  const selectSuggestion = ({ company, service }: ServiceSearchResult) => {
    setQuery(`${company.name} ${service.title}`);
    setActiveIndex(-1);
    setIsOpen(false);
    router.push(servicePath(company.slug, service.slug));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const selected = filteredSuggestions[activeIndex];
      if (selected) {
        selectSuggestion(selected);
      } else {
        runSearch();
      }
      return;
    }

    if (!isOpen || filteredSuggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        current < filteredSuggestions.length - 1 ? current + 1 : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        current > 0 ? current - 1 : filteredSuggestions.length - 1
      );
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative mt-6 max-w-2xl text-left">
      <label htmlFor="task-search" className="sr-only">
        회사명 또는 처리할 업무
      </label>
      <div className="flex overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_14px_35px_-18px_rgba(15,23,42,0.45)] focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
        <input
          id="task-search"
          type="search"
          role="combobox"
          value={query}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-expanded={isOpen && filteredSuggestions.length > 0}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="예: 카드 잃어버림, 구독 끊고 싶음"
          className="min-w-0 flex-1 px-4 py-4 text-base text-slate-950 outline-none placeholder:text-slate-400 sm:px-6"
        />
        <button
          type="button"
          onClick={runSearch}
          className="shrink-0 bg-blue-700 px-5 font-bold text-white transition hover:bg-blue-800 sm:px-8"
        >
          검색
        </button>
      </div>

      {isOpen && filteredSuggestions.length > 0 && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
        >
          {filteredSuggestions.map((item, index) => (
            <button
              key={`${item.company.slug}-${item.service.slug}`}
              type="button"
              role="option"
              aria-selected={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectSuggestion(item)}
              className={`flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left last:border-b-0 sm:px-5 ${
                activeIndex === index
                  ? "bg-blue-50"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm"
              >
                →
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold text-blue-700">
                  {item.company.name}
                </span>
                <span className="mt-0.5 block font-bold text-slate-950">
                  {item.service.title}
                </span>
                {item.service.quickSummary?.[0] && (
                  <span className="mt-1 block truncate text-sm text-slate-500">
                    {item.service.quickSummary[0]}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
