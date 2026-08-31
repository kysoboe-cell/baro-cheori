import type { Metadata } from "next";
import Link from "next/link";
import AppIcon, { type IconName } from "./components/AppIcon";
import CategoryFinder from "./components/CategoryFinder";
import HomeSearch from "./components/HomeSearch";
import { getProblem } from "./data/problems";
import { allServices, companies, getService } from "./data/services";
import { SITE_NAME, SITE_URL, problemPath, servicePath } from "./lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * 홈에서 누르는 문구 하나가 도착하는 곳입니다.
 * - kind: "company" — 문구에 업체명이 들어 있어 그 업체로 바로 보내도 되는 진입점
 * - kind: "problem" — 업체를 안 물어봤으므로 상황 허브에서 고르게 하는 진입점
 * 이 구분은 아래 assertHomeEntries가 빌드 때 강제합니다.
 */
type HomeEntry =
  | {
      kind: "company";
      companySlug: string;
      serviceSlug: string;
      question: string;
      answer: string;
      icon?: IconName;
      category?: string;
    }
  | {
      kind: "problem";
      problemSlug: string;
      question: string;
      answer: string;
      icon?: IconName;
      category?: string;
    };

const quickStarts: HomeEntry[] = [
  {
    kind: "company",
    companySlug: "coupang",
    serviceSlug: "wow-membership-cancel",
    question: "쿠팡 와우, 그만 쓰고 싶어요",
    answer: "다음 결제 전 해지 순서",
    icon: "shopping-cart",
  },
  {
    kind: "problem",
    problemSlug: "repair-cost",
    question: "가전 수리비, 부르기 전에 궁금해요",
    answer: "삼성·LG 중에서 고르세요",
    icon: "wrench",
  },
  {
    kind: "problem",
    problemSlug: "charged-after-cancel",
    question: "해지했는데 또 결제됐어요",
    answer: "결제된 곳부터 고르세요",
    icon: "receipt-text",
  },
  {
    kind: "problem",
    problemSlug: "lost-card",
    question: "카드를 잃어버렸어요",
    answer: "카드사 고르고 즉시 정지",
    icon: "lock",
  },
];

const situationTasks: HomeEntry[] = [
  {
    kind: "problem",
    problemSlug: "return-refund",
    question: "반품 신청이 막혔을 때",
    answer: "포장·회수·환불 시점까지",
    category: "쇼핑",
  },
  {
    kind: "problem",
    problemSlug: "delivery-tracking",
    question: "택배가 어디 있는지 모를 때",
    answer: "운송장 조회와 멈춤 대응",
    category: "택배",
  },
  {
    kind: "problem",
    problemSlug: "termination-fee",
    question: "인터넷 해지 전에 돈이 얼마나 나올지 궁금할 때",
    answer: "위약금·할인반환금·장비 비용까지",
    category: "통신",
  },
  {
    kind: "problem",
    problemSlug: "card-reissue",
    question: "카드를 다시 받아야 할 때",
    answer: "정지와 재발급 차이부터",
    category: "카드",
  },
  {
    kind: "problem",
    problemSlug: "lost-phone",
    question: "휴대폰을 잃어버렸을 때",
    answer: "정지·위치찾기 순서부터",
    category: "통신",
  },
  {
    kind: "problem",
    problemSlug: "appliance-broken",
    question: "가전제품이 갑자기 안 될 때",
    answer: "기사 부르기 전 오류 글자로 먼저 확인",
    category: "전자·가전",
  },
];

/**
 * 원칙 1 — 업체를 안 물어봤으면 업체를 고르게 한다.
 * 문구에 업체명이 없는 진입점이 특정 업체 상세로 직결되면 빌드를 깨뜨립니다.
 */
(function assertHomeEntries() {
  for (const entry of [...quickStarts, ...situationTasks]) {
    if (entry.kind !== "company") {
      if (!getProblem(entry.problemSlug)) {
        throw new Error(`[home] 없는 상황 허브: ${entry.problemSlug}`);
      }
      continue;
    }
    const company = companies.find((c) => c.slug === entry.companySlug);
    if (!company) throw new Error(`[home] 없는 업체: ${entry.companySlug}`);
    const names = [company.name, ...company.aliases];
    if (!names.some((name) => entry.question.includes(name))) {
      throw new Error(
        `[home] "${entry.question}"에는 업체명이 없는데 ${company.name}로 직결됩니다. ` +
          `/problem/ 허브로 보내거나 문구에 업체명을 넣으세요.`
      );
    }
  }
})();

/** 업체 직결 진입점만 도착지 업체명을 부제 끝에 붙입니다(허브는 붙일 업체가 없음). */
function resolveHomeEntry(entry: HomeEntry) {
  if (entry.kind === "problem") {
    return { href: problemPath(entry.problemSlug), answer: entry.answer };
  }

  const item = getService(entry.companySlug, entry.serviceSlug);
  if (!item) return null;

  return {
    href: servicePath(entry.companySlug, entry.serviceSlug),
    answer: `${entry.answer} · ${item.company.name}`,
  };
}

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

      <section className="overflow-hidden border-b border-line bg-[linear-gradient(180deg,#f0fdfa_0%,#ffffff_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
          <div className="max-w-2xl">
            <h1 className="text-display text-ink-900 md:text-display-md">
              복잡한 ARS 싫으셨죠?
            </h1>
            <p className="mt-3 max-w-xl text-body text-ink-700 md:text-body-md">
              처리 순서와 진짜 필요한 연락처까지,
              <br className="sm:hidden" /> 검색 한 번이면 바로 나와요.
            </p>
            <p className="mt-3">
              <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1.5 text-body-sm font-semibold text-primary">
                완전 무료입니다
              </span>
            </p>

            <HomeSearch />

            <p className="mt-3 text-caption text-ink-600">
              {companies.length}개 업체 · {allServices.length}개 실제 업무 · 공식
              링크·확인일 표시
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-h2 text-ink-900 md:text-h2-md">
                다들 이것부터 찾아요
              </h2>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-caption font-semibold text-primary">
                많이 찾는 해결
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              {quickStarts.map((task) => {
                const resolved = resolveHomeEntry(task);
                if (!resolved) return null;

                return (
                  <Link prefetch={false}
                    key={resolved.href}
                    href={resolved.href}
                    className="rounded-xl border border-line bg-white p-4 transition hover:border-primary/40 hover:bg-primary-soft/30"
                  >
                    <p className="break-keep text-h3 text-ink-900 md:text-h3-md">
                      {task.icon && (
                        <AppIcon
                          name={task.icon}
                          size={20}
                          tone="primary"
                          className="mr-1.5 inline-block align-[-0.2em]"
                        />
                      )}
                      {task.question}
                    </p>
                    <p className="mt-1 break-keep text-caption text-ink-600">
                      {resolved.answer}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 업체로 바로 찾기 — 히어로·카드 4개 아래 독립 섹션(검수 개선 1차 B1) */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">

        <CategoryFinder />

      </div>


      <section id="quick-start" className="mx-auto max-w-7xl border-t border-line-soft px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="break-keep text-h2 text-ink-900 md:text-h2-md">
            내 상황과 <span className="text-primary">같은 문장부터</span> 누르세요
          </h2>
          <p className="text-caption text-ink-600">
            긴 설명 대신 필요한 행동부터 보여드립니다.
          </p>
        </div>

        <ul className="mt-4 border-t border-line-soft sm:grid sm:grid-cols-2 sm:gap-x-10">
          {situationTasks.map((task) => {
            const resolved = resolveHomeEntry(task);
            if (!resolved) return null;

            return (
              <li key={resolved.href} className="border-b border-line-soft">
                <Link prefetch={false}
                  href={resolved.href}
                  className="group flex min-h-16 items-center gap-3 py-4"
                >
                  <span className="shrink-0 rounded-full bg-line-soft px-2.5 py-1 text-caption text-ink-600">
                    {task.category}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block break-keep text-h3 text-ink-900 group-hover:text-primary">
                      {task.question}
                    </span>
                    <span className="mt-0.5 block break-keep text-caption text-ink-600">
                      {resolved.answer}
                    </span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-ink-500">
                    ›
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/*
        v6 2-3: 홈 다크 밴드(01/02/03 자기소개 선언문)는 삭제했습니다.
        잘되는 사이트(토스 고객센터·삼쩜삼)는 과업 흐름 중간에 회사 이야기를
        두지 않습니다. 세 항목의 내용은 /about "바로처리가 일하는 방식"으로
        옮겼습니다.
      */}

      {/*
        애드센스 재심사 대비 지시서 2, 3단계 — 홈이 링크판으로만 보이는 인상을
        줄이기 위한 사용법 안내. 히어로(1뷰) 아래, 상황별 목록 다음에 둬서
        첫 화면 스크롤량은 그대로 유지합니다.
      */}
      <section className="border-t border-line-soft bg-bg-soft py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-h2 text-ink-900 md:text-h2-md">
            바로처리 이렇게 쓰세요
          </h2>
          <div className="mt-4 space-y-3">
            <p className="break-keep text-body-sm leading-7 text-ink-700">
              지금 겪는 문제를 그대로 검색창에 입력하면 관련 페이지로 바로
              연결됩니다. 예를 들어 검색창에 &lsquo;쿠팡 와우 해지&rsquo;를
              입력하면 쿠팡 와우 멤버십 해지 페이지로 바로 이동해, 지금 눌러야
              할 메뉴부터 확인할 수 있어요.
            </p>
            <p className="break-keep text-body-sm leading-7 text-ink-700">
              아직 어느 업체인지 정하지 않았다면 위의 &lsquo;다들 이것부터
              찾아요&rsquo;나 아래 상황별 목록에서 지금 상황과 같은 문장을
              먼저 고르세요. 업체 목록이 나오면 그중 하나를 선택해 처리
              순서로 넘어갑니다.
            </p>
            <p className="break-keep text-body-sm leading-7 text-ink-700">
              각 페이지는 지금 눌러야 할 메뉴 → 처리 순서 → 화면으로 안 될
              때 연락할 곳 순서로 정리돼 있어, 전화를 걸기 전에 먼저 시도해볼
              수 있습니다. &lsquo;화면 그대로 따라하기&rsquo;가 있는 페이지는
              실제 화면 캡처를 보며 따라 할 수 있어요.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-h2 text-ink-900">공식 정보를 바탕으로 쉽게 풀어씁니다</h2>
            <p className="mt-2 max-w-3xl break-keep text-body-sm text-ink-700">
              바로처리는 각 업체와 독립된 안내 서비스입니다. 확인 날짜와 공식 링크를 표시하고,
              실제 신청 전에는 연결된 공식 화면의 최신 조건을 다시 확인합니다.
            </p>
          </div>
          <Link prefetch={false}
            href="/information-policy"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[10px] border border-line px-5 text-body-sm font-semibold text-ink-800 hover:bg-bg-soft"
          >
            정보 관리 원칙 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
