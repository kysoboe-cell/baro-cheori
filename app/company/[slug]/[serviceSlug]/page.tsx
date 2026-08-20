import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BoldText from "../../../components/BoldText";
import PhoneActions from "../../../components/PhoneActions";
import { allServices, getService } from "../../../data/services";
import {
  getCustomerCenterFallback,
  getKeyStepIndexes,
  getOfficialActionLabel,
  getOfficialLinkHeading,
  getOfficialNextStep,
  getPreparations,
  getUsefulOfficialUrl,
} from "../../../lib/service-content";
import {
  absoluteUrl,
  companyPath,
  servicePath,
} from "../../../lib/site";

type ServicePageProps = {
  params: Promise<{ slug: string; serviceSlug: string }>;
};



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
  const phoneGuide = service.phoneGuide ?? customerCenter?.phoneGuide;
  const isCustomerCenter = service.slug === "customer-center";
  const needsImmediateBlock = [
    "lost-card",
    "unrecognized-charge",
    "lost-phone",
  ].includes(service.slug);
  const keyStepIndexes = new Set(getKeyStepIndexes(service));
  const usefulOfficialUrl = getUsefulOfficialUrl(service);
  const officialActionLabel = getOfficialActionLabel(service);
  const officialLinkHeading = getOfficialLinkHeading(service);
  const officialNextStep =
    service.officialNextStep ?? getOfficialNextStep(company.categoryId);
  const path = servicePath(company.slug, service.slug);
  const relatedCompanyServices = company.services
    .filter(
      (item) =>
        item.slug !== service.slug && item.slug !== "customer-center"
    )
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
  const faqJsonLd =
    service.faq && service.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;
  const howToJsonLd =
    service.screenshotGuide && service.screenshotGuide.steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `${company.name} ${service.title}`,
          step: service.screenshotGuide.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            text: step.caption.replace(/\*\*/g, ""),
            image: absoluteUrl(
              `/images/guides/${service.screenshotGuide!.folder}/${step.image}`
            ),
          })),
        }
      : null;

  return (
    <main className="bg-slate-50">
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
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <article className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6 sm:py-8">
        <nav
          aria-label="현재 위치"
          className="flex flex-wrap gap-2 text-sm text-gray-500"
        >
          <Link prefetch={false} href="/" className="hover:text-black">
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <Link prefetch={false} href={companyPath(company.slug)} className="hover:text-black">
            {company.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{service.title}</span>
        </nav>

        <header className="mt-4 border-b border-slate-200 pb-5">
          <p className="inline-flex rounded-full bg-primary-100 px-3 py-1 text-sm font-bold text-primary-800">
            {company.name} 업무 안내
          </p>
          <h1 className="mt-1 break-keep text-3xl font-black tracking-tight sm:text-4xl">
            {company.name}{" "}
            <span className="text-primary-700">{service.title}</span> 처리 방법
          </h1>
          <div className="mt-3 flex flex-col gap-2 text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            <p className="break-keep leading-7">
              {isCustomerCenter ? (
                <>전화해야 할 때 필요한 <strong className="font-black text-slate-900">번호와 준비할 말</strong>만 짧게 모았어요.</>
              ) : (
                <>위에서 아래로 따라가세요. <strong className="font-black text-primary-700 underline decoration-primary-300 decoration-4 underline-offset-4">강조된 핵심 단계</strong>는 꼭 확인하세요.</>
              )}
            </p>
            {service.lastChecked && (
              <p className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                정보 확인일 {service.lastChecked}
              </p>
            )}
          </div>
        </header>

        <div className="mt-5 grid items-start gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.78fr)]">
          <div className="space-y-4">
            {service.quickSummary && service.quickSummary.length > 0 && (
              <section className="rounded-2xl border border-primary-200 border-l-4 border-l-primary-700 bg-primary-50 p-4 sm:p-5">
                <h2 className="text-lg font-black text-primary-950">
                  지금 이것부터 하세요
                </h2>
                <ul className="mt-2 space-y-2">
                  {service.quickSummary.map((summary, index) => (
                    <li
                      key={summary}
                      className={`flex items-start gap-2.5 rounded-xl leading-6 text-gray-900 ${
                        index === 0
                          ? "bg-white/80 px-3 py-3 text-base font-black text-primary-950 shadow-sm"
                          : "px-1 py-1 text-sm sm:text-base"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex shrink-0 items-center justify-center font-black ${
                          index === 0
                            ? "h-6 rounded-full bg-accent px-2 text-[11px] text-white"
                            : "h-5 w-5 text-primary-700"
                        }`}
                      >
                        {index === 0 ? "먼저" : "✓"}
                      </span>
                      <span
                        className={
                          index === 0
                            ? "underline decoration-accent-line decoration-4 underline-offset-4"
                            : undefined
                        }
                      >
                        {summary}
                      </span>
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
                      순서대로 하되, 강조 표시된 단계는 꼭 보세요
                    </h2>
                  </div>
                  <p className="shrink-0 text-xs text-gray-400">
                    총 {service.steps.length}단계
                  </p>
                </div>
                <ol className="mt-4 space-y-3">
                  {service.steps.map((step, index) => {
                    const isKeyStep = keyStepIndexes.has(index);

                    return (
                      <li
                        key={step}
                        className={`flex items-start gap-3 rounded-xl p-3 ${
                          isKeyStep
                            ? "border border-primary-200 bg-primary-50"
                            : "border border-transparent"
                        }`}
                      >
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${
                          isKeyStep
                            ? index === 0
                              ? "bg-accent"
                              : "bg-primary-700"
                            : "bg-slate-950"
                        }`}>
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          {isKeyStep && (
                            <p className={`mb-0.5 text-xs font-black ${
                              index === 0 ? "text-accent-dark" : "text-primary-700"
                            }`}>
                              {index === 0 ? "가장 먼저" : "꼭 확인"}
                            </p>
                          )}
                          <p className={`break-keep text-sm leading-7 sm:text-base ${
                            isKeyStep
                              ? `font-black text-slate-950 underline decoration-4 underline-offset-4 ${
                                  index === 0 ? "decoration-accent-line" : "decoration-primary-300"
                                }`
                              : "text-gray-800"
                          }`}>
                            {step}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {service.screenshotGuide && service.screenshotGuide.steps.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-gray-500">
                      화면 그대로 따라하기
                    </p>
                    <h2 className="mt-1 text-xl font-bold">모바일 앱 캡처로 보기</h2>
                  </div>
                  {(service.guideCheckedAt ?? service.lastChecked) && (
                    <p className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
                      {(service.guideCheckedAt ?? service.lastChecked)!.replace(
                        /(\d{4})-(\d{2})-(\d{2})/,
                        "$1년 $2월 $3일"
                      )}{" "}
                      · {service.screenshotGuide.platform}
                    </p>
                  )}
                </div>

                <ol className="mt-4 space-y-5">
                  {service.screenshotGuide.steps.map((step, index) => (
                    <li key={step.image}>
                      <figure
                        className={`overflow-hidden rounded-2xl border sm:flex sm:items-center ${
                          step.emphasize
                            ? "border-primary-300 bg-primary-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="sm:w-[340px] sm:max-w-[340px] sm:flex-none">
                          <Image
                            src={`/images/guides/${service.screenshotGuide!.folder}/${step.image}`}
                            alt={step.alt}
                            width={step.width}
                            height={step.height}
                            loading={index === 0 ? "eager" : "lazy"}
                            sizes="(min-width: 640px) 340px, 100vw"
                            className="w-full"
                          />
                        </div>
                        <figcaption
                          className={`break-keep p-4 text-sm leading-6 sm:flex-1 sm:px-6 sm:py-5 sm:text-base sm:leading-7 ${
                            step.emphasize
                              ? "font-bold text-primary-950"
                              : "text-gray-800"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className="mb-2.5 hidden h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-black text-white sm:flex"
                          >
                            {index + 1}
                          </span>
                          <BoldText
                            text={step.caption}
                            strongClassName={
                              step.emphasize
                                ? "font-black text-primary-700"
                                : "font-black text-slate-950"
                            }
                          />
                        </figcaption>
                      </figure>

                      {step.warningAfter && (
                        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
                          <p className="text-sm font-semibold leading-6 text-amber-950">
                            <span aria-hidden="true" className="mr-1 font-black text-amber-700">
                              ⚠️
                            </span>
                            <BoldText
                              text={step.warningAfter}
                              strongClassName="font-black text-amber-950"
                            />
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {service.priceTable && service.priceTable.length > 0 && (() => {
              const priceTable = service.priceTable;
              const hasVisitFee = priceTable.some((row) => row.visitFee);

              return (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-gray-500">
                  {service.priceTableHeading?.label ?? "수리비 참고"}
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  {service.priceTableHeading?.title ??
                    "품목별 대략 수리비 참고표"}
                </h2>
                <p className="mt-2 break-keep text-xs leading-5 text-gray-500">
                  {service.priceTableNote ??
                    "아래 금액은 부품 종류·모델·지역에 따라 달라지는 대략적인 참고 범위입니다. 정확한 금액은 방문 점검 후 견적으로 확정돼요."}
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[32rem] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-xs font-bold text-gray-500">
                        <th scope="col" className="py-2 pr-3">
                          {service.priceTableHeading?.columns?.item ?? "제품"}
                        </th>
                        <th scope="col" className="py-2 pr-3">
                          {service.priceTableHeading?.columns?.issue ??
                            "흔한 고장 유형"}
                        </th>
                        {hasVisitFee && (
                          <th scope="col" className="py-2 pr-3">
                            {service.priceTableHeading?.columns?.visitFee ??
                              "출장비(참고)"}
                          </th>
                        )}
                        <th scope="col" className="py-2">
                          {service.priceTableHeading?.columns?.priceRange ??
                            "수리비 대략 범위(참고)"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceTable.map((row) => (
                        <tr
                          key={`${row.item}-${row.issue}`}
                          className="border-b border-gray-100 align-top"
                        >
                          <td className="py-2.5 pr-3 font-bold text-slate-900">
                            {row.item}
                          </td>
                          <td className="py-2.5 pr-3 text-gray-700">
                            {row.issue}
                          </td>
                          {hasVisitFee && (
                            <td className="py-2.5 pr-3 text-gray-700">
                              {row.visitFee}
                            </td>
                          )}
                          <td className="py-2.5 text-gray-700">
                            {row.priceRange}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              );
            })()}

            {service.faq && service.faq.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-gray-500">자주 묻는 질문</p>
                <h2 className="mt-1 text-xl font-bold">
                  이런 것도 궁금하실 거예요
                </h2>
                <div className="mt-4 space-y-2">
                  {service.faq.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-xl border border-gray-200 bg-gray-50 p-4 open:bg-white"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-bold text-slate-900 marker:content-none">
                        <span>Q. {item.question}</span>
                        <span
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                        >
                          ⌄
                        </span>
                      </summary>
                      <p className="mt-3 border-t border-gray-100 pt-3 text-sm leading-6 text-gray-700">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-4 lg:col-start-2">
            <div className="space-y-4">
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-gray-500">시작 전 준비</p>
                <h2 className="mt-1 text-xl font-bold">이것만 챙기세요</h2>
                <ul className="mt-3 space-y-2">
                  {preparations.map((preparation) => (
                    <li
                      key={preparation}
                      className="flex items-start gap-2 rounded-xl bg-gray-50 px-3 py-2.5 text-sm font-bold leading-6 text-slate-800"
                    >
                      <span
                        aria-hidden="true"
                        className="font-black text-primary-700"
                      >
                        ✓
                      </span>
                      <span>{preparation}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {service.tips && service.tips.length > 0 && (
                <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <h2 className="font-bold">💡 이것만 주의하세요</h2>
                  <ul className="mt-3 space-y-2.5 text-sm leading-6 text-gray-700">
                    {service.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <span aria-hidden="true" className="font-black text-amber-700">!</span>
                        <span className="font-semibold text-amber-950">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside>
              {(phone || hours || usefulOfficialUrl) && (
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-black">
                      {isCustomerCenter
                        ? "전화할 때 이것만 확인"
                        : "직접 해결이 막혔을 때"}
                    </h2>
                    <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-700">
                      마지막 수단
                    </span>
                  </div>

                  {!isCustomerCenter && usefulOfficialUrl && (
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <p className="mb-3 text-sm font-semibold text-gray-500">
                        {officialLinkHeading}
                      </p>
                      <a
                        href={usefulOfficialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full justify-center rounded-xl bg-primary-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-primary-800"
                      >
                        {officialActionLabel} ↗
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
                      <p className="mt-1 text-2xl font-black">
                        {phone.number}
                      </p>
                      {phone.feeNote && (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {phone.feeNote}
                        </p>
                      )}
                      <div className="mt-3">
                        <PhoneActions phone={phone.number} />
                      </div>
                      {phoneGuide && phoneGuide.length > 0 && (
                        <div className="mt-4 rounded-xl bg-slate-50 p-3">
                          <p className="text-xs font-black text-slate-700">
                            전화해야 한다면 이렇게 하세요
                          </p>
                          <ol className="mt-2 space-y-2 text-sm font-semibold leading-6 text-slate-800">
                            {phoneGuide.map((guide, index) => (
                              <li key={guide} className="flex items-start gap-2">
                                <span className="font-black text-primary-700">
                                  {index + 1}.
                                </span>
                                <span>{guide}</span>
                              </li>
                            ))}
                          </ol>
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
                    </div>
                  )}
                </section>
              )}
            </aside>
          </div>
        </div>

        {(relatedCompanyServices.length > 0 ||
          relatedSameTaskServices.length > 0) && (
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold text-primary-700">관련 업무</p>
            <h2 className="mt-1 text-xl font-bold">
              이어서 필요한 안내도 확인하세요
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCompanyServices.map((relatedService) => (
                <Link prefetch={false}
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
                <Link prefetch={false}
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
