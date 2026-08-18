import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhoneActions from "../../../components/PhoneActions";
import { allServices, getService } from "../../../data/services";
import {
  getCustomerCenterFallback,
  getOfficialActionLabel,
  getOfficialNextStep,
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
  const description = `${company.name} ${service.title}: 지금 눌러야 할 메뉴, 실제 처리 순서, 안 될 때 고객센터를 확인하세요.`;

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
  const isCustomerCenter = service.slug === "customer-center";
  const needsImmediateBlock = [
    "lost-card",
    "unrecognized-charge",
    "lost-phone",
  ].includes(service.slug);
  const officialActionLabel = getOfficialActionLabel(service);
  const officialNextStep = getOfficialNextStep(company.categoryId);
  const pageLead = isCustomerCenter
    ? "전화해야 할 때 필요한 번호와 준비할 말만 짧게 모았어요."
    : "긴 설명은 건너뛰세요. 아래에 나온 1번부터 그대로 하면 됩니다.";
  const path = servicePath(company.slug, service.slug);
  const relatedCompanyServices = company.services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);
  const relatedSameTaskServices = allServices
    .filter(
      (item) =>
        item.company.slug !== company.slug && item.service.slug === service.slug
    )
    .slice(0, 4);
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
    <main className="bg-slate-50">
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

        <header className="mt-4 border-b border-slate-200 pb-5">
          <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">
            {company.name} 업무 안내
          </p>
          <h1 className="mt-1 break-keep text-3xl font-black tracking-tight sm:text-4xl">
            {company.name} {service.title} 처리 방법
          </h1>
          <div className="mt-3 flex flex-col gap-2 text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            <p className="break-keep leading-7">
              {pageLead}
            </p>
            {service.lastChecked && (
              <p className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                정보 확인일 {service.lastChecked}
              </p>
            )}
          </div>
        </header>

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.8fr)_19rem]">
          <div className="space-y-4">
            {service.quickSummary && service.quickSummary.length > 0 && (
              <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
                <h2 className="font-black text-blue-950">
                  지금 이것부터 하세요
                </h2>
                <ul className="mt-2 space-y-2">
                  {service.quickSummary.map((summary, index) => (
                    <li
                      key={summary}
                      className={`flex gap-2 leading-6 text-gray-900 ${
                        index === 0
                          ? "text-base font-bold"
                          : "text-sm sm:text-base"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="font-bold text-blue-700"
                      >
                        {index === 0 ? "→" : "✓"}
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
                      1번부터 그대로 따라 하세요
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
              <h2 className="mt-1 text-xl font-bold">이것만 챙기세요</h2>
              <ul className="mt-3 space-y-2">
                {preparations.map((preparation) => (
                  <li
                    key={preparation}
                    className="rounded-xl bg-gray-50 px-3 py-2 text-sm font-semibold leading-6"
                  >
                    □ {preparation}
                  </li>
                ))}
              </ul>
            </section>

            {service.tips && service.tips.length > 0 && (
              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <h2 className="font-bold">💡 이것만 주의하세요</h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-700">
                  {service.tips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="order-first xl:order-none xl:sticky xl:top-24 xl:self-start">
            {(phone || hours || service.officialUrl) && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-black">
                    {isCustomerCenter ? "전화할 때 이것만 확인" : "전화 전에 여기부터"}
                  </h2>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                    공식 메뉴
                  </span>
                </div>

                {!isCustomerCenter && service.officialUrl && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="mb-3 text-sm font-semibold text-gray-500">
                      ARS 없이 먼저 처리
                    </p>
                    <a
                      href={service.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full justify-center rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-800"
                    >
                      공식 · {officialActionLabel} ↗
                    </a>
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {officialNextStep}
                    </p>
                  </div>
                )}

                {phone && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-gray-500">
                      {isCustomerCenter
                        ? "안내 전화"
                        : needsImmediateBlock
                          ? "지금 바로 막아야 할 때"
                          : usesCustomerCenterFallback
                            ? "위 방법으로 해결되지 않을 때만"
                            : "그래도 해결되지 않을 때만"}
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
                    {hours && (
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <p className="text-sm font-semibold text-gray-500">
                          상담 가능 시간
                        </p>
                        <p className="mt-1 font-bold leading-6">{hours}</p>
                      </div>
                    )}
                  </div>
                )}

                {isCustomerCenter && service.officialUrl && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <a
                      href={service.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full justify-center rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-800"
                    >
                      {officialActionLabel} ↗
                    </a>
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      전화가 부담되면 공식 페이지의 온라인 문의나 자주 묻는 질문을 먼저 확인하세요.
                    </p>
                  </div>
                )}
              </section>
            )}
          </aside>
        </div>

        {(relatedCompanyServices.length > 0 ||
          relatedSameTaskServices.length > 0) && (
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold text-blue-700">관련 업무</p>
            <h2 className="mt-1 text-xl font-bold">
              이어서 필요한 안내도 확인하세요
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCompanyServices.map((relatedService) => (
                <Link
                  key={`${company.slug}-${relatedService.slug}`}
                  href={servicePath(company.slug, relatedService.slug)}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-gray-500 hover:bg-white"
                >
                  <span className="text-xs font-semibold text-gray-500">
                    {company.name}
                  </span>
                  <span className="mt-1 block font-bold">
                    {relatedService.title} 처리 방법 →
                  </span>
                </Link>
              ))}
              {relatedSameTaskServices.map((related) => (
                <Link
                  key={`${related.company.slug}-${related.service.slug}`}
                  href={servicePath(related.company.slug, related.service.slug)}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-gray-500 hover:bg-white"
                >
                  <span className="text-xs font-semibold text-gray-500">
                    다른 업체 비교
                  </span>
                  <span className="mt-1 block font-bold">
                    {related.company.name} {related.service.title} →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-xs leading-5 text-gray-600">
          <p>
            <span className="font-bold text-gray-900">안내 범위 · </span>
            바로처리는 {company.name}의 공식 서비스가 아니며 제휴·대행 관계가 없습니다. 업체 정책이나 화면은 정보 확인일 이후 변경될 수 있습니다.
          </p>
        </section>
      </article>
    </main>
  );
}
