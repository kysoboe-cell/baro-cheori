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
      <div className="flex h-14 overflow-hidden rounded-lg border border-line bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
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
          placeholder="예: 삼성 세탁기 고장, LG 출장수리"
          className="min-w-0 flex-1 px-4 text-body text-ink-900 outline-none placeholder:text-ink-500 sm:px-5"
        />
        <button
          type="button"
          onClick={runSearch}
          className="shrink-0 bg-accent px-6 text-button text-white transition hover:bg-accent-dark sm:px-8"
        >
          검색
        </button>
      </div>

      {isOpen && filteredSuggestions.length > 0 && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-lg"
        >
          {filteredSuggestions.map((item, index) => (
            <button
              key={`${item.company.slug}-${item.service.slug}`}
              type="button"
              role="option"
              aria-selected={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectSuggestion(item)}
              className={`flex w-full items-start gap-3 border-b border-line-soft px-4 py-3 text-left last:border-b-0 sm:px-5 ${
                activeIndex === index
                  ? "bg-primary-soft"
                  : "bg-white hover:bg-bg-soft"
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-caption text-primary">
                  {item.company.name}
                </span>
                <span className="mt-0.5 block text-body font-semibold text-ink-900">
                  {item.service.title}
                </span>
                {item.service.quickSummary?.[0] && (
                  <span className="mt-1 block truncate text-body-sm text-ink-600">
                    {item.service.quickSummary[0]}
                  </span>
                )}
              </span>
              <span aria-hidden="true" className="mt-1 shrink-0 text-ink-500">
                ›
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
