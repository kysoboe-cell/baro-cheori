import type { Metadata } from "next";
import Link from "next/link";
import CategoryFinder from "./components/CategoryFinder";
import HomeSearch from "./components/HomeSearch";
import { getService } from "./data/services";
import { SITE_NAME, SITE_URL, servicePath } from "./lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const popularTasks = [
  ["coupang", "delivery-not-received"],
  ["naver-smartstore", "return-pickup-delay"],
  ["kt", "lost-phone"],
  ["lguplus", "slow-internet"],
].map(([companySlug, serviceSlug]) => getService(companySlug, serviceSlug));

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "바로처리 생활업무 안내",
    url: SITE_URL,
    description:
      "쇼핑몰 배송·반품 문제와 통신사 분실·인터넷 문제를 바로 처리할 공식 메뉴와 해결 순서로 안내합니다.",
    inLanguage: "ko-KR",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />

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
            지금 누를 공식 메뉴, 혼자 해볼 1분 확인, 안 될 때 연락처를 한 화면에서 확인하세요.
          </p>

          <HomeSearch />
          <p className="mt-3 text-sm text-gray-500">
            현재 7개 업체의 42개 업무를 안내합니다.
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
              ["01", "문제 그대로 검색", "예: 쿠팡 배송 안 옴, KT 인터넷 안 됨처럼 입력합니다."],
              ["02", "첫 버튼부터 처리", "긴 설명보다 주문내역·고장진단 같은 공식 메뉴를 먼저 엽니다."],
              ["03", "안 되면 바로 연결", "셀프로 해결되지 않을 때 맞는 고객센터 번호로 이어갑니다."],
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
