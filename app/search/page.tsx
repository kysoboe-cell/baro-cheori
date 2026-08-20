import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  findExactCompany,
  findMentionedCompanies,
  findProblemMatches,
  findServiceMatches,
  getPopularServices,
  getProblemChooseHint,
} from "../lib/search";
import { companyPath, problemPath, servicePath } from "../lib/site";

export const metadata: Metadata = {
  title: "업무 검색",
  description: "회사명이나 처리할 업무로 바로처리의 안내를 검색합니다.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q ?? "";
  const query = rawQuery.trim();

  const exactCompany = findExactCompany(query);
  if (exactCompany) redirect(companyPath(exactCompany.slug));

  const mentionedCompanies = findMentionedCompanies(query);
  const results = query ? findServiceMatches(query) : [];
  const problemMatches = query ? findProblemMatches(query) : [];
  const popularServices = getPopularServices();

  if (mentionedCompanies.length === 1 && results.length === 1) {
    redirect(servicePath(results[0].company.slug, results[0].service.slug));
  }

  return (
    <main className="bg-bg-soft">
      <section className="mx-auto min-h-[60vh] max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          prefetch={false}
          href="/"
          className="inline-flex min-h-12 items-center text-body-sm font-semibold text-ink-700 hover:text-primary"
        >
          ← 다시 검색
        </Link>

        <h1 className="mt-4 break-keep text-h1 text-ink-900 md:text-h1-md">
          {query ? (
            <>
              <span className="text-primary">“{query}”</span> 검색 결과
            </>
          ) : (
            "검색어를 입력해주세요"
          )}
        </h1>

        {problemMatches.length > 0 && (
          <ul className="mt-6 space-y-2">
            {problemMatches.map(({ problem }) => (
              <li key={problem.slug}>
                <Link
                  prefetch={false}
                  href={problemPath(problem.slug)}
                  className="group flex min-h-14 items-center gap-3 rounded-xl border border-line bg-primary-soft px-5 py-3 transition hover:border-primary/40"
                >
                  <span aria-hidden="true" className="shrink-0 text-lg">
                    {problem.icon}
                  </span>
                  <span className="min-w-0 flex-1 break-keep text-h3 text-ink-900 group-hover:text-primary">
                    {problem.title}
                    <span className="font-normal text-ink-600">
                      {" "}
                      — {getProblemChooseHint(problem)}
                    </span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-ink-500">
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {results.length > 0 ? (
          <>
            <p className="mt-4 break-keep text-body text-ink-700">
              전화번호부터 찾지 않아도 됩니다. 내 상황과 가장 가까운 문장을 눌러
              1번부터 따라 하세요.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {results.map(({ company, service }) => (
                <Link
                  prefetch={false}
                  key={`${company.slug}-${service.slug}`}
                  href={servicePath(company.slug, service.slug)}
                  className="group rounded-xl border border-line bg-white p-5 transition hover:border-primary/40"
                >
                  <p className="text-caption font-semibold text-primary">
                    {company.name}
                  </p>
                  <h2 className="mt-1 break-keep text-h3 text-ink-900 md:text-h3-md group-hover:text-primary">
                    {service.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 break-keep text-body-sm text-ink-700">
                    {service.quickSummary?.[0] ??
                      "처리 방법과 필요한 정보를 확인하세요."}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.officialUrl && (
                      <span className="rounded-full bg-primary-soft px-2.5 py-1 text-caption font-semibold text-primary">
                        전화 전에 공식 메뉴 확인
                      </span>
                    )}
                    {service.steps && (
                      <span className="tnum rounded-full bg-line-soft px-2.5 py-1 text-caption text-ink-600">
                        {service.steps.length}단계
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-body-sm font-semibold text-ink-900 group-hover:text-primary">
                    이대로 해결하기 →
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 rounded-xl border-l-4 border-warn-line bg-warn-bg p-5">
              <p className="break-keep text-h3 text-warn-text md:text-h3-md">
                이 문장과 똑같은 안내는 아직 없어요
              </p>
              <p className="mt-2 break-keep text-body-sm text-warn-text">
                전화부터 하지 마세요.{" "}
                <strong className="font-semibold">회사 이름을 붙여 다시 검색</strong>
                하거나, 아래에서 가장 비슷한 상황을 먼저 눌러보세요.
              </p>
              <p className="mt-2 text-caption text-warn-text">
                예: 삼성 세탁기 고장 · LG 출장수리 · 국민카드 잃어버림
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-caption font-semibold text-primary">
                  바로 해결할 수 있는 문제
                </p>
                <h2 className="mt-1 break-keep text-h2 text-ink-900 md:text-h2-md">
                  많이 찾는 상황부터 확인하세요
                </h2>
              </div>
              <Link
                prefetch={false}
                href="/#services"
                className="hidden min-h-12 items-center text-body-sm font-semibold text-ink-700 hover:text-primary sm:inline-flex"
              >
                업체 목록 보기 →
              </Link>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {popularServices.map(({ company, service }) => (
                <Link
                  prefetch={false}
                  key={`${company.slug}-${service.slug}`}
                  href={servicePath(company.slug, service.slug)}
                  className="group rounded-xl border border-line bg-white p-5 transition hover:border-primary/40"
                >
                  <p className="text-caption font-semibold text-primary">
                    {company.name}
                  </p>
                  <p className="mt-1 break-keep text-h3 text-ink-900 group-hover:text-primary">
                    {service.title}
                  </p>
                  <p className="mt-3 text-body-sm font-semibold text-ink-900">
                    1번부터 따라 하기 →
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
