import type { Metadata } from "next";
import Link from "next/link";
import CategoryFinder from "./components/CategoryFinder";
import HomeSearch from "./components/HomeSearch";
import { getService } from "./data/services";
import { servicePath } from "./lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const popularTasks = [
  ["coupang", "return-refund"],
  ["naver-smartstore", "cancel"],
  ["kt", "lost-phone"],
  ["lguplus", "internet-moving"],
].map(([companySlug, serviceSlug]) => getService(companySlug, serviceSlug));

export default function Home() {
  return (
    <main>
      <CategoryFinder />

      <section className="overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-12">
          <p className="text-sm font-bold text-blue-700">
            어디에 전화해야 할지, 뭘 눌러야 할지 헷갈릴 때
          </p>
          <h1 className="mt-3 break-keep text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            해야 할 일을 검색하면
            <br />
            순서대로 바로 알려드려요
          </h1>
          <p className="mx-auto mt-4 max-w-2xl break-keep text-base leading-7 text-gray-600 sm:text-lg">
            준비물, 처리 순서, 고객센터 운영시간과 공식 링크를 한 화면에서 확인하세요.
          </p>

          <HomeSearch />
          <p className="mt-3 text-sm text-gray-500">
            현재 쇼핑몰 4곳과 통신사 3곳의 주요 업무를 안내합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-9">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-blue-700">자주 찾는 업무</p>
            <h2 className="mt-1 text-2xl font-bold">한 번에 바로 확인하세요</h2>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popularTasks.map((item) =>
            item ? (
              <Link
                key={`${item.company.slug}-${item.service.slug}`}
                href={servicePath(item.company.slug, item.service.slug)}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-gray-500">{item.company.name}</p>
                <p className="mt-1 text-lg font-bold">{item.service.title}</p>
                <p className="mt-3 text-sm font-semibold">처리 순서 보기 →</p>
              </Link>
            ) : null
          )}
        </div>
      </section>

      <section id="how-to" className="scroll-mt-20 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">이렇게 이용해요</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["01", "업무 검색", "회사명과 처리할 일을 함께 입력합니다."],
              ["02", "준비물 확인", "전화나 신청 전에 필요한 정보를 챙깁니다."],
              ["03", "순서대로 처리", "공식 페이지나 고객센터를 이용해 마무리합니다."],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-2xl bg-white p-7 shadow-sm">
                <p className="text-sm font-black text-blue-700">{number}</p>
                <h3 className="mt-3 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold">공식 정보를 바탕으로 쉽게 풀어씁니다</h2>
          <p className="mx-auto mt-4 max-w-2xl break-keep leading-7 text-gray-600">
            바로처리는 각 업체와 독립된 안내 서비스입니다. 확인 날짜와 공식 링크를 함께 표시하고, 실제 신청 전에는 공식 화면의 최신 조건을 다시 확인하도록 안내합니다.
          </p>
          <Link
            href="/information-policy"
            className="mt-6 inline-flex rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold hover:bg-gray-50"
          >
            정보 관리 원칙 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
