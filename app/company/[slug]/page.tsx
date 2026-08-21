import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceCard from "../../components/ServiceCard";
import { companies, getCompany } from "../../data/services";
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

        <p className="mt-8 break-keep border-t border-line-soft pt-5 text-caption text-ink-600">
          바로처리는 {company.name}의 공식 서비스가 아닌 독립 안내 서비스입니다. 마지막 단계에서는 연결된 공식 페이지의 최신 조건을 확인하세요.
        </p>
      </section>
    </main>
  );
}
