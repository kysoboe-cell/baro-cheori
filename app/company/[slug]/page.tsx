import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companies, getCompany } from "../../data/services";
import { absoluteUrl, companyPath, servicePath } from "../../lib/site";

const servicePriority: Record<string, number> = {
  cancel: 1,
  "return-refund": 2,
  "delivery-not-received": 3,
  exchange: 4,
  "order-check": 5,
  "delivery-tracking": 1,
  "parcel-not-received": 2,
  "return-reservation": 3,
  "lost-card": 1,
  "unrecognized-charge": 2,
  "card-reissue": 3,
  "lost-phone": 1,
  "internet-trouble": 2,
  "internet-moving": 3,
  "termination-fee": 4,
  "internet-cancel": 5,
  "account-transfer": 6,
  billing: 7,
  "membership-cancel": 1,
  "recurring-payment-cancel": 1,
  "wow-membership-cancel": 1,
  "refund-request": 2,
  "unknown-charge": 3,
  "immediate-cancel-refund": 2,
  "wow-membership-refund": 2,
  "charged-after-cancel": 3,
  "unexpected-membership-charge": 3,
  "payment-method": 4,
  "home-customer-center": 90,
  "mobile-customer-center": 91,
  "customer-center": 99,
};

type CompanyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

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

  const orderedServices = [...company.services].sort(
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
    <main className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="현재 위치" className="text-sm text-gray-500">
          <Link href="/" className="hover:text-black">홈</Link>
          <span aria-hidden="true"> / </span>
          <span>{company.name}</span>
        </nav>

        <p className="mt-8 text-sm font-bold text-blue-700">업체별 업무 안내</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          {company.name}
        </h1>
        <p className="mt-4 leading-7 text-gray-600">
          처리하려는 업무를 선택하면 지금 누를 메뉴, 짧은 해결 순서, 안 될 때 연락처를 보여드려요.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {orderedServices.map((service) => (
            <Link
              key={service.slug}
              href={servicePath(company.slug, service.slug)}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md"
            >
              <p className="text-xl font-bold">{service.title}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                {service.quickSummary?.[0] ?? "처리 방법과 필요한 정보를 확인하세요."}
              </p>
              <p className="mt-6 text-sm font-bold">순서대로 확인하기 →</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-gray-700">
          바로처리는 {company.name}의 공식 서비스가 아닌 독립 안내 서비스입니다. 마지막 단계에서는 연결된 공식 페이지의 최신 조건을 확인하세요.
        </div>
      </section>
    </main>
  );
}
