import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideLinkLine, Pitfalls } from "../../components/Pitfalls";
import ServiceCard from "../../components/ServiceCard";
import { companies, getCompany } from "../../data/services";
import { resolveGuideLink } from "../../lib/guide-links";
import { absoluteUrl, companyPath, servicePath } from "../../lib/site";

// 실제 검색 수요(콘텐츠_보강_우선순위.md의 구글 트렌드 조사) 기준 재정렬.
// 데이터가 없는 카테고리는 "구독·분실 등 지금 당장 급한 해지·정지류가 상위"라는
// 상식적 기준을 적용했습니다. (2026-08-21, 스크린샷 피드백 v4 반영)
const servicePriority: Record<string, number> = {
  // 쇼핑몰 — 환불(반품·환불)이 가장 많이 찾는 항목, 취소·교환·주문조회는 후순위
  "return-refund": 1,
  "delivery-not-received": 2,
  cancel: 3,
  exchange: 4,
  "order-check": 5,
  "return-pickup-delay": 6,

  // 쿠팡 와우 멤버십 — 유석 님 지시로 전 카테고리 통틀어 최우선
  "wow-membership-cancel": -1,
  "wow-membership-refund": 0,

  // 택배
  "delivery-tracking": 1,
  "parcel-not-received": 2,
  "return-reservation": 3,

  // 카드 — 분실이 압도적 1위
  "lost-card": 1,
  "unrecognized-charge": 2,
  "card-reissue": 3,

  // 통신
  "lost-phone": 1,
  "internet-trouble": 2,
  "internet-moving": 3,
  "termination-fee": 4,
  "internet-cancel": 5,
  "account-transfer": 6,
  billing: 7,
  "slow-internet": 8,

  // 가전 — "수리비"가 조사에서 가장 검색량이 많았던 항목
  "repair-cost-warranty": 1,
  "service-center": 2,
  "home-service": 3,
  "self-check": 4,

  // 구독 — 해지가 최우선, 그다음 환불·모르는 결제
  "membership-cancel": 1,
  "recurring-payment-cancel": 1,
  "refund-request": 2,
  "immediate-cancel-refund": 2,
  "charged-after-cancel": 3,
  "unexpected-membership-charge": 3,
  "unknown-charge": 3,
  "payment-method": 4,

  "home-customer-center": 90,
  "mobile-customer-center": 91,
  "customer-center": 99,
};

type CompanyPageProps = {
  params: Promise<{ slug: string }>;
};



export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);

  if (!company) return { title: "업체를 찾을 수 없습니다" };

  return {
    title: `${company.name} 업무 처리 방법·고객센터`,
    description: `${company.name}의 ${company.services
      .map((service) => service.title)
      .join(", ")} 처리 순서와 공식 고객센터 정보를 확인하세요.`,
    alternates: { canonical: companyPath(company.slug) },
    openGraph: {
      title: `${company.name} 업무 처리 방법`,
      description: `${company.name}의 주요 업무를 순서대로 쉽게 확인하세요.`,
      url: companyPath(company.slug),
    },
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = getCompany(slug);

  if (!company) notFound();

  const orderedServices = company.services
    .filter((service) => service.slug !== "customer-center")
    .sort(
      (a, b) =>
        (servicePriority[a.slug] ?? 50) - (servicePriority[b.slug] ?? 50)
    );
  const path = companyPath(company.slug);
  // 고객센터 페이지는 위 목록에서 빠져 있어서, 업체 허브에서 그리로 가는 링크가
  // 아예 없었습니다(사이트 안에서 클릭으로 못 가는 고아 페이지). 목록 맨 아래에
  // 한 줄로 둡니다 — 고객센터 업무가 있는 업체에만 나옵니다.
  const hasCustomerCenter = company.services.some(
    (service) => service.slug === "customer-center"
  );
  const guideLink = resolveGuideLink(company.guideLink);
  const faqJsonLd =
    company.faq && company.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: company.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: company.name,
        item: absoluteUrl(path),
      },
    ],
  };

  return (
    <main className="bg-bg-soft">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <nav
          aria-label="현재 위치"
          className="flex flex-wrap items-center gap-2 text-caption text-ink-600"
        >
          <Link
            prefetch={false}
            href="/"
            className="inline-flex min-h-12 items-center hover:text-ink-900"
          >
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <span>{company.name}</span>
        </nav>

        <p className="mt-4 text-caption font-semibold text-primary">업체별 업무 안내</p>
        <h1 className="mt-2 break-keep text-h1 text-ink-900 md:text-h1-md">
          {company.name}
        </h1>
        <p className="mt-4 break-keep text-body text-ink-700 md:text-body-md">
          처리하려는 업무를 선택하면 <strong className="font-bold text-ink-900">지금 누를 메뉴</strong>,
          <strong className="font-bold text-primary"> 꼭 놓치면 안 되는 단계</strong>,
          직접 해결이 막혔을 때만 연락처를 보여드려요.
        </p>

        {company.overview && company.overview.length > 0 && (
          <div className="mt-4 space-y-3">
            {company.overview.map((paragraph, index) => (
              <p
                key={index}
                className="break-keep text-body-sm leading-7 text-ink-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* 모바일: 인기 상위 6개를 2열×3행 압축 그리드로 먼저 보여줍니다. */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:hidden">
          {orderedServices.slice(0, 6).map((service) => (
            <ServiceCard
              key={`compact-${service.slug}`}
              href={servicePath(company.slug, service.slug)}
              title={service.title}
              summary={service.quickSummary?.[0] ?? "처리 방법 확인"}
              variant="compact"
            />
          ))}
        </div>
        {orderedServices.length > 6 && (
          <div className="mt-2 flex flex-col gap-2 sm:hidden">
            {orderedServices.slice(6).map((service) => (
              <ServiceCard
                key={`rest-${service.slug}`}
                href={servicePath(company.slug, service.slug)}
                title={service.title}
                summary={
                  service.quickSummary?.[0] ??
                  "처리 방법과 필요한 정보를 확인하세요."
                }
                variant="compact"
              />
            ))}
          </div>
        )}

        {/* 데스크톱: 기존 전체 카드 그리드(모든 항목) */}
        <div className="mt-8 hidden gap-3 sm:grid sm:grid-cols-2">
          {orderedServices.map((service) => (
            <ServiceCard
              key={service.slug}
              href={servicePath(company.slug, service.slug)}
              title={service.title}
              summary={
                service.quickSummary?.[0] ??
                "처리 방법과 필요한 정보를 확인하세요."
              }
            />
          ))}
        </div>

        {hasCustomerCenter && (
          <div className="mt-3">
            <Link
              prefetch={false}
              href={servicePath(company.slug, "customer-center")}
              className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 transition hover:border-primary/40 hover:bg-primary-soft/30"
            >
              <span className="break-keep text-body-sm font-semibold text-ink-900">
                고객센터 전화·처리 방법
              </span>
              <span aria-hidden="true" className="shrink-0 text-ink-500">
                ›
              </span>
            </Link>
          </div>
        )}

        {company.pitfalls && company.pitfalls.items.length > 0 && (
          <div className="mt-10 max-w-[42.5rem]">
            <Pitfalls pitfalls={company.pitfalls} />
          </div>
        )}

        {company.faq && company.faq.length > 0 && (
          <section
            id="faq"
            aria-label="자주 묻는 질문"
            className="mt-10 max-w-[42.5rem] scroll-mt-20"
          >
            <h2 className="text-h2 text-ink-900 md:text-h2-md">
              자주 묻는 질문
            </h2>
            <div className="mt-2 border-t border-line-soft">
              {company.faq.map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-line-soft"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-2 text-body font-semibold text-ink-900 marker:content-none">
                    <span className="break-keep">{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-ink-500 transition-transform group-open:rotate-180"
                    >
                      ⌄
                    </span>
                  </summary>
                  <p className="break-keep pb-4 text-body text-ink-700">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {guideLink && (
          <div className="mt-8 max-w-[42.5rem]">
            <GuideLinkLine
              href={guideLink.href}
              title={guideLink.title}
              text={guideLink.text}
            />
          </div>
        )}

      </section>
    </main>
  );
}
