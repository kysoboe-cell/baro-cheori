"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryFinder from "./components/CategoryFinder";
import { companies } from "./data/services";
import {
  findExactCompany,
  rankSuggestions,
} from "./lib/search";
const suggestions = Array.from(
  new Set(
    companies.flatMap((company) => [
      company.name,

      ...company.services.flatMap((service) => [
        `${company.name} ${service.title}`,
        ...service.keywords,
      ]),
    ])
  )
);
export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const runSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    setIsOpen(false);

    const matchedCompany =
      findExactCompany(trimmedQuery);

    if (matchedCompany) {
      router.push(`/company/${matchedCompany.slug}`);
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(true);

  const filteredSuggestions = rankSuggestions(
    query,
    suggestions
  );

  const selectSuggestion = (item: string) => {
    setQuery(item);
    setActiveIndex(-1);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // 연관검색어가 선택되어 있으면 첫 Enter는 선택만
      if (
        isOpen &&
        filteredSuggestions.length > 0 &&
        activeIndex >= 0
      ) {
        selectSuggestion(filteredSuggestions[activeIndex]);
        return;
      }

      // 두 번째 Enter부터는 검색 실행
      runSearch();
      return;
    }

    if (!isOpen || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* 상단 메뉴 */}
      <header className="border-b border-gray-200">
        <div className="flex w-full items-center justify-between px-4 py-5 sm:px-6 lg:px-10 xl:px-12">
          <div className="text-2xl font-bold">바로처리</div>

          <nav className="flex items-center gap-8 text-sm">
            <button className="hover:text-gray-500">서비스</button>
            <button className="hover:text-gray-500">이용방법</button>
            <button className="hover:text-gray-500">문의</button>
          </nav>
        </div>
      </header>
      <CategoryFinder />

      {/* 메인 검색 영역 */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold text-gray-500">
          어디에 전화해야 할지, 뭘 해야 할지 헷갈릴 때
        </p>

        <h1 className="text-5xl font-bold leading-tight">
          필요한 업무를 검색하면
          <br />
          바로 알려드려요.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
          전화번호부터 처리 순서, 운영시간, 공식 링크까지
          <br />
          필요한 정보만 한눈에 확인하세요.
        </p>

        {/* 검색창 */}
        <div className="relative mx-auto mt-10 max-w-2xl text-left">
          <div className="flex overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(-1);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="예: 쿠팡 반품, 국민연금 문의, KT 해지"
              className="flex-1 px-6 py-5 text-base outline-none"
            />

            <button
              onClick={runSearch}
              className="bg-black px-8 font-semibold text-white hover:bg-gray-800"
            >
              검색
            </button>
          </div>

          {/* 자동완성 */}
          {isOpen && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
              {filteredSuggestions.map((item, index) => (
                <button
                  key={item}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectSuggestion(item)}
                  className={`block w-full border-b border-gray-100 px-6 py-4 text-left last:border-b-0 ${activeIndex === index
                    ? "bg-gray-100 font-semibold"
                    : "bg-white hover:bg-gray-50"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-400">
          회사명이나 처리하려는 업무를 입력해보세요.
        </p>
      </section>

      {/* 이용 방법 */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">
            이렇게 이용해요
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 text-sm font-bold text-gray-400">01</div>
              <h3 className="text-xl font-bold">업무 검색</h3>
              <p className="mt-3 text-gray-500">
                회사명이나 처리하려는 업무를 검색합니다.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 text-sm font-bold text-gray-400">02</div>
              <h3 className="text-xl font-bold">정보 확인</h3>
              <p className="mt-3 text-gray-500">
                전화번호, 운영시간, 처리 방법을 확인합니다.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 text-sm font-bold text-gray-400">03</div>
              <h3 className="text-xl font-bold">바로 처리</h3>
              <p className="mt-3 text-gray-500">
                공식 링크나 안내에 따라 바로 업무를 처리합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}