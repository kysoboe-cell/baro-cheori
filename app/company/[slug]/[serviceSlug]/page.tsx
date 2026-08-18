import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhoneActions from "../../../components/PhoneActions";
import { allServices, getService } from "../../../data/services";
import {
  getCustomerCenterFallback,
  getPreparations,
} from "../../../lib/service-content";
import {
  absoluteUrl,
  companyPath,
  servicePath,
} from "../../../lib/site";

type ServicePageProps = {
  params: Promise<{ slug: string; serviceSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return allServices.map(({ company, service }) => ({
    slug: company.slug,
    serviceSlug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug, serviceSlug } = await params;
  const item = getService(slug, serviceSlug);

  if (!item) return { title: "업무를 찾을 수 없습니다" };

  const { company, service } = item;
  const path = servicePath(company.slug, service.slug);
  const description = `${company.name} ${service.title} 준비물과 처리 순서, 고객센터 및 공식 링크를 한 화면에서 확인하세요.`;

  return {
    title: `${company.name} ${service.title} 방법·고객센터`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${company.name} ${service.title} 처리 방법`,
      description,
      url: path,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, serviceSlug } = await params;
  const item = getService(slug, serviceSlug);

  if (!item) notFound();

  const { company, service } = item;
  const preparations = getPreparations(service);
  const customerCenter = getCustomerCenterFallback(company.services);
  const phone = service.phone ?? customerCenter?.phone;
  const hours = service.hours ?? customerCenter?.hours;
  const usesCustomerCenterFallback = !service.phone && Boolean(phone);
  const path = servicePath(company.slug, service.slug);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: company.name,
        item: absoluteUrl(companyPath(company.slug)),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
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

      <article className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6 sm:py-8">
        <nav
          aria-label="현재 위치"
          className="flex flex-wrap gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="hover:text-black">
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={companyPath(company.slug)} className="hover:text-black">
            {company.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{service.title}</span>
        </nav>

        <header className="mt-4 border-b border-gray-200 pb-5">
          <p className="text-sm font-bold text-blue-700">
            {company.name} 업무 안내
          </p>
          <h1 className="mt-1 break-keep text-3xl font-black tracking-tight sm:text-4xl">
            {company.name} {service.title} 처리 방법
          </h1>
          <div className="mt-3 flex flex-col gap-2 text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            <p className="break-keep leading-7">
              전화부터 하지 않아도 되도록, 준비할 것과 직접 처리하는 순서를 정리했어요.
            </p>
            {service.lastChecked && (
              <p className="shrink-0 text-sm text-gray-500">
                정보 확인일 {service.lastChecked}
              </p>
            )}
          </div>
        </header>

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.8fr)_19rem]">
          <div className="space-y-4">
            {service.quickSummary && service.quickSummary.length > 0 && (
              <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <h2 className="font-bold text-blue-900">
                  먼저 이것부터 확인하세요
                </h2>
                <ul className="mt-2 space-y-2">
                  {service.quickSummary.map((summary) => (
                    <li
                      key={summary}
                      className="flex gap-2 text-sm leading-6 text-gray-900 sm:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="font-bold text-blue-700"
                      >
                        ✓
                      </span>
                      <span>{summary}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {service.steps && service.steps.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-gray-500">처리 순서</p>
                    <h2 className="mt-1 text-xl font-bold">
                      위에서부터 따라 하세요
                    </h2>
                  </div>
                  <p className="shrink-0 text-xs text-gray-400">
                    총 {service.steps.length}단계
                  </p>
                </div>
                <ol className="mt-4 space-y-3">
                  {service.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 text-sm leading-7 text-gray-800 sm:text-base">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <div className="space-y-4">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-500">시작 전 준비</p>
              <h2 className="mt-1 text-xl font-bold">이것을 준비하세요</h2>
              <ul className="mt-4 space-y-2">
                {preparations.map((preparation) => (
                  <li
                    key={preparation}
                    className="rounded-xl bg-gray-50 px-3 py-2.5 text-sm font-semibold leading-6"
                  >
                    □ {preparation}
                  </li>
                ))}
              </ul>
            </section>

            {service.tips && service.tips.length > 0 && (
              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <h2 className="font-bold">💡 헷갈리기 쉬운 부분</h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-700">
                  {service.tips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="xl:sticky xl:top-24 xl:self-start">
            {(phone || hours || service.officialUrl) && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold">직접 해결이 어렵다면</h2>
                {phone && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-gray-500">
                      {usesCustomerCenterFallback
                        ? "대표 고객센터"
                        : "안내 전화"}
                    </p>
                    <p className="mt-1 text-2xl font-black">{phone.number}</p>
                    {phone.feeNote && (
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {phone.feeNote}
                      </p>
                    )}
                    <div className="mt-3">
                      <PhoneActions phone={phone.number} />
                    </div>
                  </div>
                )}
                {hours && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-gray-500">
                      상담 가능 시간
                    </p>
                    <p className="mt-1 font-bold leading-6">{hours}</p>
                  </div>
                )}
                {service.officialUrl && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <a
                      href={service.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white hover:bg-blue-800"
                    >
                      공식 페이지에서 계속하기 ↗
                    </a>
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      신청 조건과 비용은 공식 화면에서 마지막으로 확인하세요.
                    </p>
                  </div>
                )}
              </section>
            )}
          </aside>
        </div>

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-xs leading-5 text-gray-600">
          <p>
            <span className="font-bold text-gray-900">안내 범위 · </span>
            바로처리는 {company.name}와 제휴·대행 관계가 없는 독립 안내 서비스입니다. 업체 정책이나 화면은 정보 확인일 이후 변경될 수 있습니다.
          </p>
        </section>
      </article>
    </main>
  );
}
