import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  findExactCompany,
  findMentionedCompanies,
  findServiceMatches,
  getPopularServices,
} from "../lib/search";
import { companyPath, servicePath } from "../lib/site";

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
  const popularServices = getPopularServices();

  if (mentionedCompanies.length === 1 && results.length === 1) {
    redirect(servicePath(results[0].company.slug, results[0].service.slug));
  }

  return (
    <main className="bg-slate-50">
      <section className="mx-auto min-h-[60vh] max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-700">
          ← 다시 검색
        </Link>

        <h1 className="mt-6 break-words text-3xl font-black text-slate-950 sm:text-4xl">
          {query ? (
            <><span className="text-blue-700">“{query}”</span> 검색 결과</>
          ) : (
            "검색어를 입력해주세요"
          )}
        </h1>
        {results.length > 0 ? (
          <>
            <p className="mt-3 break-keep leading-7 text-slate-600">
              전화번호부터 찾지 않아도 됩니다. 내 상황과 가장 가까운 문장을 눌러 1번부터 따라 하세요.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {results.map(({ company, service }) => (
                <Link
                  key={`${company.slug}-${service.slug}`}
                  href={servicePath(company.slug, service.slug)}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md sm:p-6"
                >
                  <p className="text-sm font-bold text-blue-700">{company.name}</p>
                  <h2 className="mt-1 break-keep text-xl font-black text-slate-950">
                    {service.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {service.quickSummary?.[0] ?? "처리 방법과 필요한 정보를 확인하세요."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                    {service.officialUrl && (
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                        전화 전에 공식 메뉴 확인
                      </span>
                    )}
                    {service.steps && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                        {service.steps.length}단계
                      </span>
                    )}
                  </div>
                  <p className="mt-5 text-sm font-black text-slate-950 group-hover:text-blue-700">
                    이대로 해결하기 →
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <p className="text-xl font-black text-slate-950">
                이 문장과 똑같은 안내는 아직 없어요
              </p>
              <p className="mt-2 break-keep leading-7 text-slate-700">
                전화부터 하지 마세요. <strong className="font-black text-blue-700">회사 이름을 붙여 다시 검색</strong>하거나,
                아래에서 가장 비슷한 상황을 먼저 눌러보세요.
              </p>
              <p className="mt-3 text-sm font-bold text-slate-600">
                예: 삼성 세탁기 고장 · LG 출장수리 · 국민카드 잃어버림
              </p>
            </div>

            <div className="mt-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-blue-700">바로 해결할 수 있는 문제</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">
                  많이 찾는 상황부터 확인하세요
                </h2>
              </div>
              <Link
                href="/#services"
                className="hidden text-sm font-bold text-slate-600 hover:text-blue-700 sm:block"
              >
                업체 목록 보기 →
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {popularServices.map(({ company, service }) => (
                <Link
                  key={`${company.slug}-${service.slug}`}
                  href={servicePath(company.slug, service.slug)}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <p className="text-xs font-bold text-blue-700">{company.name}</p>
                  <p className="mt-1 text-lg font-black text-slate-950">
                    {service.title}
                  </p>
                  <p className="mt-3 text-sm font-bold">1번부터 따라 하기 →</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
