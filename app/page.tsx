import type { Metadata } from "next";
import Link from "next/link";
import CategoryFinder from "./components/CategoryFinder";
import HomeSearch from "./components/HomeSearch";
import { allServices, companies, getService } from "./data/services";
import { SITE_NAME, SITE_URL, servicePath } from "./lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const quickStarts = [
  {
    companySlug: "coupang",
    serviceSlug: "wow-membership-cancel",
    question: "쿠팡 와우, 그만 쓰고 싶어요",
    answer: "다음 결제 전 해지 순서",
    icon: "🛒",
  },
  {
    companySlug: "samsung-electronics",
    serviceSlug: "repair-cost-warranty",
    question: "가전 수리비, 부르기 전에 궁금해요",
    answer: "출장비·무상보증 기준 먼저",
    icon: "🔧",
  },
  {
    companySlug: "netflix",
    serviceSlug: "charged-after-cancel",
    question: "해지했는데 또 결제됐어요",
    answer: "원인 확인과 환불 순서",
    icon: "💸",
  },
  {
    companySlug: "kb-card",
    serviceSlug: "lost-card",
    question: "카드를 잃어버렸어요",
    answer: "분실신고부터 바로",
    icon: "🔒",
  },
];

const situationTasks = [
  {
    companySlug: "coupang",
    serviceSlug: "return-refund",
    label: "반품 신청이 막혔을 때",
    description: "포장·회수·환불 시점까지",
    category: "쇼핑",
  },
  {
    companySlug: "cj-logistics",
    serviceSlug: "delivery-tracking",
    label: "택배가 어디 있는지 모를 때",
    description: "운송장 조회와 멈춤 대응",
    category: "택배",
  },
  {
    companySlug: "kt",
    serviceSlug: "termination-fee",
    label: "인터넷 해지 전에 돈이 얼마나 나올지 궁금할 때",
    description: "위약금·결합 할인·장비 비용 먼저 확인",
    category: "통신",
  },
  {
    companySlug: "samsung-card",
    serviceSlug: "card-reissue",
    label: "카드를 다시 받아야 할 때",
    description: "정지와 재발급 차이부터",
    category: "카드",
  },
  {
    companySlug: "kt",
    serviceSlug: "lost-phone",
    label: "휴대폰을 잃어버렸을 때",
    description: "정지·위치찾기 순서부터",
    category: "통신",
  },
  {
    companySlug: "samsung-electronics",
    serviceSlug: "self-check",
    label: "가전제품이 갑자기 안 될 때",
    description: "기사 부르기 전 오류 글자로 먼저 확인",
    category: "전자·가전",
  },
];

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "바로처리 생활업무 안내",
    url: SITE_URL,
    description:
      "카드 분실·모르는 결제, 구독 해지·환불, 쇼핑몰 배송·반품, 통신사·택배 문제, 가전 고장을 바로 처리할 공식 메뉴와 해결 순서로 안내합니다.",
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

      <section className="overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#f0fdfa_0%,#ffffff_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:py-14">
          <div className="max-w-2xl">
            <h1 className="break-keep text-4xl font-black leading-[1.15] tracking-tight text-slate-950 sm:text-5xl">
              복잡한 ARS 싫으셨죠?
            </h1>
            <p className="mt-4 max-w-xl break-keep text-base leading-7 text-slate-600 sm:text-lg">
              처리 순서와 진짜 필요한 연락처까지, 검색 한 번이면 바로 나와요.{" "}
              <strong className="font-black text-accent">완전 무료입니다.</strong>
            </p>

            <HomeSearch />

            <p className="mt-3 text-xs text-slate-400">
              {companies.length}개 업체 · {allServices.length}개 실제 업무 · 공식
              링크·확인일 표시
            </p>
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-black text-slate-950">
                다들 이것부터 찾아요
              </h2>
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                많이 찾는 해결
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickStarts.map((task) => {
                const item = getService(task.companySlug, task.serviceSlug);
                if (!item) return null;

                return (
                  <Link prefetch={false}
                    key={`${task.companySlug}-${task.serviceSlug}`}
                    href={servicePath(task.companySlug, task.serviceSlug)}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg"
                      >
                        {task.icon}
                      </span>
                      <span aria-hidden="true" className="font-bold text-primary-700 transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                    <p className="mt-4 break-keep font-black text-slate-950">
                      {task.question}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{task.answer}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="quick-start" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-primary-700">상황별 빠른 해결</p>
            <h2 className="mt-1 break-keep text-2xl font-black text-slate-950 sm:text-3xl">
              내 상황과 <span className="text-primary-700">같은 문장부터</span> 누르세요
            </h2>
          </div>
          <p className="text-sm text-slate-500">긴 설명 대신 필요한 행동부터 보여드립니다.</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {situationTasks.map((task) => {
            const item = getService(task.companySlug, task.serviceSlug);
            if (!item) return null;

            return (
              <Link prefetch={false}
                key={`${task.companySlug}-${task.serviceSlug}`}
                href={servicePath(task.companySlug, task.serviceSlug)}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                    {task.category} · {item.company.name}
                  </span>
                  <span aria-hidden="true" className="font-bold text-primary-700 transition group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
                <h3 className="mt-4 break-keep text-lg font-black text-slate-950">
                  {task.label}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">{task.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 sm:py-9">
          {[
            ["01", "공식 메뉴부터", "전화 대기보다 먼저 해볼 수 있는 실제 처리 화면을 엽니다."],
            ["02", "현실적인 순서만", "규정 전체가 아니라 지금 필요한 준비와 행동만 남깁니다."],
            ["03", "전화는 마지막에", "온라인으로 끝낼 수 없는 마지막 단계에서만 맞는 번호를 보여드립니다."],
          ].map(([number, title, description]) => (
            <div key={number} className="flex gap-3">
              <span className="font-black text-primary-400">{number}</span>
              <div>
                <h2 className="font-bold">{title}</h2>
                <p className="mt-1 break-keep text-sm leading-6 text-slate-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-xl font-black text-slate-950">공식 정보를 바탕으로 쉽게 풀어씁니다</h2>
            <p className="mt-2 max-w-3xl break-keep text-sm leading-6 text-slate-600 sm:text-base">
              바로처리는 각 업체와 독립된 안내 서비스입니다. 확인 날짜와 공식 링크를 표시하고,
              실제 신청 전에는 연결된 공식 화면의 최신 조건을 다시 확인합니다.
            </p>
          </div>
          <Link prefetch={false}
            href="/information-policy"
            className="inline-flex shrink-0 justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold hover:bg-slate-50"
          >
            정보 관리 원칙 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
