import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  findExactCompany,
  findMentionedCompanies,
  findServiceMatches,
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

  if (mentionedCompanies.length === 1 && results.length === 1) {
    redirect(servicePath(results[0].company.slug, results[0].service.slug));
  }

  return (
    <main className="bg-gray-50">
      <section className="mx-auto min-h-[60vh] max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-black">
          ← 다시 검색
        </Link>

        <h1 className="mt-8 break-all text-3xl font-black sm:text-4xl">
          {query ? `“${query}” 검색 결과` : "검색어를 입력해주세요"}
        </h1>
        {results.length > 0 ? (
          <>
            <p className="mt-3 text-gray-600">
              업체를 확인한 뒤 원하는 업무를 선택하세요. 총 {results.length}개를 찾았습니다.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {results.map(({ company, service }) => (
                <Link
                  key={`${company.slug}-${service.slug}`}
                  href={servicePath(company.slug, service.slug)}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-blue-700">{company.name}</p>
                  <h2 className="mt-1 text-xl font-bold">{service.title}</h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                    {service.quickSummary?.[0] ?? "처리 방법과 필요한 정보를 확인하세요."}
                  </p>
                  <p className="mt-5 text-sm font-bold">처리 순서 보기 →</p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <p className="text-xl font-bold">아직 등록되지 않은 업무예요.</p>
            <p className="mt-3 leading-7 text-gray-600">
              회사명과 업무를 함께 입력해보세요. 예: 국민카드 분실, 쿠팡 반품
            </p>
            <Link
              href="/#services"
              className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              업체 목록에서 찾기
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
