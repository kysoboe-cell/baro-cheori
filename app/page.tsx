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
    companySlug: "kb-card",
    serviceSlug: "lost-card",
    question: "카드를 잃어버렸어요",
    answer: "분실신고부터 바로",
    icon: "🔒",
  },
  {
    companySlug: "kb-card",
    serviceSlug: "unrecognized-charge",
    question: "모르는 결제가 있어요",
    answer: "카드 정지와 이의신청",
    icon: "💳",
  },
  {
    companySlug: "coupang",
    serviceSlug: "delivery-not-received",
    question: "쿠팡 배송이 안 왔어요",
    answer: "배송상태별 다음 행동",
    icon: "📦",
  },
  {
    companySlug: "kt",
    serviceSlug: "lost-phone",
    question: "휴대폰을 잃어버렸어요",
    answer: "정지·위치찾기 순서",
    icon: "📱",
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
    companySlug: "disney-plus",
    serviceSlug: "charged-after-cancel",
    label: "디즈니+ 해지 뒤 돈이 또 빠졌을 때",
    description: "계정 삭제·다른 결제처부터 확인",
    category: "구독",
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

      <section className="overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#f7f9ff_0%,#eef5ff_48%,#ffffff_100%)]">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-9 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:items-center lg:gap-10 lg:py-14">
          <div>
            <p className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-sm font-bold text-blue-700 shadow-sm">
              전화 돌리기 전에, 지금 할 수 있는 것부터
            </p>
            <h1 className="mt-4 max-w-3xl break-keep text-4xl font-black leading-[1.13] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.45rem]">
              카드 분실·배송 안 옴·<span className="whitespace-nowrap">가전 고장,</span>
              <br className="hidden sm:block" />
              <span className="text-blue-700 underline decoration-blue-200 decoration-[0.16em] underline-offset-[0.12em]">
                지금 할 일만 바로
              </span>
            </h1>
            <p className="mt-4 max-w-2xl break-keep text-base leading-7 text-slate-600 sm:text-lg">
              긴 고객센터 설명을 뒤지지 마세요. 문제를 검색하면
              <strong className="font-black text-slate-900"> 공식 처리 메뉴</strong>,
              <strong className="font-black text-slate-900"> 현실적인 순서</strong>,
              <strong className="font-black text-blue-700"> 꼭 필요할 때만 연락처</strong>까지
              한 화면에 정리해 드립니다.
            </p>

            <HomeSearch />

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              <span><strong className="text-slate-950">{companies.length}개</strong> 업체</span>
              <span><strong className="text-slate-950">{allServices.length}개</strong> 실제 업무</span>
              <span><strong className="text-slate-950">공식 링크·확인일</strong> 표시</span>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.4)] backdrop-blur sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black tracking-wide text-blue-700">바로 시작하기</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">지금 급한 문제인가요?</h2>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                많이 찾는 해결
              </span>
            </div>

            <div className="mt-4 grid gap-2">
              {quickStarts.map((task) => {
                const item = getService(task.companySlug, task.serviceSlug);
                if (!item) return null;

                return (
                  <Link
                    key={`${task.companySlug}-${task.serviceSlug}`}
                    href={servicePath(task.companySlug, task.serviceSlug)}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg"
                    >
                      {task.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block break-keep font-bold text-slate-950">
                        {task.question}
                      </span>
                      <span className="mt-0.5 block text-sm text-slate-500">
                        {task.answer}
                      </span>
                    </span>
                    <span aria-hidden="true" className="font-bold text-blue-700 transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section id="quick-start" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">상황별 빠른 해결</p>
            <h2 className="mt-1 break-keep text-2xl font-black text-slate-950 sm:text-3xl">
              내 상황과 <span className="text-blue-700">같은 문장부터</span> 누르세요
            </h2>
          </div>
          <p className="text-sm text-slate-500">긴 설명 대신 필요한 행동부터 보여드립니다.</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {situationTasks.map((task) => {
            const item = getService(task.companySlug, task.serviceSlug);
            if (!item) return null;

            return (
              <Link
                key={`${task.companySlug}-${task.serviceSlug}`}
                href={servicePath(task.companySlug, task.serviceSlug)}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                    {task.category} · {item.company.name}
                  </span>
                  <span aria-hidden="true" className="font-bold text-blue-700 transition group-hover:translate-x-0.5">
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
              <span className="font-black text-blue-400">{number}</span>
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
          <Link
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
