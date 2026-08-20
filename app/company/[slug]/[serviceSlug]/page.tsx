import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "../../../components/AdSlot";
import FixedBottomCTA from "../../../components/FixedBottomCTA";
import JumpNav, { type JumpItem } from "../../../components/JumpNav";
import PageFeedback from "../../../components/PageFeedback";
import PhoneActions from "../../../components/PhoneActions";
import ScreenshotGuide, {
  ScreenshotGuideGrid,
} from "../../../components/ScreenshotGuide";
import StepText from "../../../components/StepText";
import { problems } from "../../../data/problems";
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
  problemPath,
  servicePath,
} from "../../../lib/site";

type ServicePageProps = {
  params: Promise<{ slug: string; serviceSlug: string }>;
};

const CIRCLED_NUMBERS = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳";

/** 한 단계에 스샷이 2장 이상 붙었을 때 "화면 보기 ③"처럼 스샷 번호를 붙입니다. */
function circledNumber(n: number) {
  return CIRCLED_NUMBERS[n - 1] ?? String(n);
}

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
  const guide = service.screenshotGuide;
  const guideSteps = guide?.steps ?? [];
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
  const hasContactBlock = Boolean(phone || hours || usefulOfficialUrl);
  // 점프 목차 — 이 페이지에 실제로 있는 섹션만 담습니다(없는 섹션 링크 금지).
  const jumpItems: JumpItem[] = [
    ...(service.steps && service.steps.length > 0
      ? [{ href: "#steps", label: "처리 순서" }]
      : []),
    ...(guide && guide.steps.length > 0
      ? [{ href: "#screens", label: "화면 따라하기" }]
      : []),
    ...(service.priceTable && service.priceTable.length > 0
      ? [{ href: "#price-table", label: "참고표" }]
      : []),
    ...(service.faq && service.faq.length > 0
      ? [{ href: "#faq", label: "자주 묻는 질문" }]
      : []),
    ...(hasContactBlock
      ? [{ href: "#contact-block", label: "전화·공식 링크" }]
      : []),
  ];
  // 이 업무를 담고 있는 상황 허브가 있으면 "업체 고르기" 화면으로 되돌아갈 길을 둡니다.
  const parentProblem = problems.find((problem) =>
    problem.options.some(
      (option) =>
        option.companySlug === company.slug &&
        option.serviceSlug === service.slug
    )
  );
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
    guide && service.steps && service.steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `${company.name} ${service.title}`,
          step: service.steps.map((text, index) => {
            const linkedImage = guideSteps.find(
              (guideStep) =>
                guideStep.howToImage && guideStep.linkedStep === index + 1
            );

            return {
              "@type": "HowToStep",
              position: index + 1,
              text: text.replace(/\*\*/g, ""),
              ...(linkedImage
                ? { image: absoluteUrl(linkedImage.img) }
                : {}),
            };
          }),
        }
      : null;

  return (
    <main className="bg-white">
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

      <article className="mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:pb-8">
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
          <Link
            prefetch={false}
            href={companyPath(company.slug)}
            className="inline-flex min-h-12 items-center hover:text-ink-900"
          >
            {company.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{service.title}</span>
        </nav>

        <header className="mt-4">
          <h1 className="break-keep text-h1 text-ink-900 md:text-h1-md">
            {company.name} {service.title} 처리 방법
          </h1>
          {service.lastChecked && (
            <p className="mt-3">
              <span className="tnum inline-flex items-center rounded-full border border-line px-3 py-1 text-caption text-ink-600">
                정보 확인일 {service.lastChecked} · 바로처리 직접 확인
              </span>
            </p>
          )}
        </header>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,42.5rem)_minmax(18rem,1fr)] lg:gap-12">
          <div className="min-w-0 space-y-8 md:space-y-12">
            {service.quickSummary && service.quickSummary.length > 0 && (
              <section className="border-l-4 border-primary pl-4">
                <p className="text-caption font-semibold text-primary">
                  지금 이것부터 하세요
                </p>
                <p className="mt-1 break-keep text-h3 text-ink-900 md:text-h3-md">
                  <StepText text={service.quickSummary[0]} />
                </p>
                {service.quickSummary.length > 1 && (
                  <ul className="mt-2 space-y-1">
                    {service.quickSummary.slice(1).map((summary) => (
                      <li
                        key={summary}
                        className="flex items-start gap-2 break-keep text-body-sm text-ink-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 font-semibold text-success"
                        >
                          ✓
                        </span>
                        <span>
                          <StepText text={summary} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            <JumpNav items={jumpItems} />

            <section className="lg:hidden" aria-label="시작 전 준비물">
              <div className="flex flex-wrap gap-2">
                {preparations.map((preparation) => (
                  <span
                    key={preparation}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-caption text-ink-700"
                  >
                    <span aria-hidden="true" className="text-success">
                      ✓
                    </span>
                    {preparation}
                  </span>
                ))}
              </div>
            </section>

            {service.steps && service.steps.length > 0 && (
              <>
                {/* 모바일은 스샷 격자가 본문 한참 아래라, 처리 순서 바로 위에 접힌 채로 한 번 더 둡니다. */}
                {guide && guide.steps.length > 0 && (
                  <details className="group rounded-xl border border-line bg-white lg:hidden">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-xl p-4 text-h3 text-ink-900 marker:content-none">
                      <span>방법 절차 한눈에 보기</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-ink-500 transition-transform group-open:rotate-180"
                      >
                        ⌄
                      </span>
                    </summary>
                    <div className="border-t border-line-soft p-4 pt-3">
                      <ScreenshotGuideGrid guide={guide} />
                    </div>
                  </details>
                )}
                <section id="steps" aria-label="처리 순서" className="scroll-mt-20">
                  <h2 className="text-h2 text-ink-900 md:text-h2-md">
                    처리 순서
                  </h2>
                  <ol className="mt-4">
                    {service.steps.map((step, index) => {
                    const isKeyStep = keyStepIndexes.has(index);
                    const linkedGuideSteps = guideSteps.filter(
                      (guideStep) => guideStep.linkedStep === index + 1
                    );
                    const isLast = index === service.steps!.length - 1;

                    return (
                      <li
                        key={step}
                        className="relative py-4 pl-[52px]"
                      >
                        {!isLast && (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-[-20px] left-[17px] top-[56px] w-px bg-line"
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className={`tnum absolute left-0 top-4 flex h-9 w-9 items-center justify-center rounded-full text-body font-bold ${
                            isKeyStep
                              ? "bg-accent text-white"
                              : "border border-line bg-white text-ink-800"
                          }`}
                        >
                          {index + 1}
                        </span>
                        {isKeyStep && (
                          <p className="mb-1">
                            <span className="inline-flex rounded-full bg-accent-soft px-2.5 py-0.5 text-caption font-semibold text-accent">
                              {index === 0 ? "가장 먼저" : "꼭 확인"}
                            </span>
                          </p>
                        )}
                        <p
                          className={`break-keep text-body md:text-body-md ${
                            isKeyStep
                              ? "font-bold text-ink-900"
                              : "text-ink-700"
                          }`}
                        >
                          <StepText
                            text={step}
                            strongClassName={
                              isKeyStep
                                ? "font-bold text-ink-900"
                                : "font-semibold text-ink-900"
                            }
                          />
                          {linkedGuideSteps.map((linkedGuideStep) => (
                            <button
                              key={linkedGuideStep.n}
                              type="button"
                              data-guide-open={linkedGuideStep.n}
                              aria-label={`${linkedGuideStep.n}번 화면 보기`}
                              className="-my-2.5 ml-1.5 inline-flex min-h-12 items-center px-1.5 align-middle text-caption font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
                            >
                              {linkedGuideSteps.length > 1
                                ? `화면 보기 ${circledNumber(linkedGuideStep.n)}`
                                : "화면 보기"}
                            </button>
                          ))}
                        </p>
                      </li>
                    );
                  })}
                  </ol>
                </section>
              </>
            )}

            {service.tips && service.tips.length > 0 && (
              <section
                className="rounded-lg border-l-4 border-warn-line bg-warn-bg p-4 lg:hidden"
                aria-label="주의"
              >
                <h2 className="text-body font-bold text-warn-text">주의</h2>
                <ul className="mt-2 space-y-2">
                  {service.tips.map((tip) => (
                    <li
                      key={tip}
                      className="break-keep text-body-sm text-warn-text"
                    >
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 처리 순서 섹션이 끝난 경계 — 리스트 내부가 아니라 여기에만 둡니다. */}
            <AdSlot id="in-article-1" />

            {guide && guide.steps.length > 0 && (
              <ScreenshotGuide guide={guide} />
            )}

            {service.priceTable && service.priceTable.length > 0 && (() => {
              const priceTable = service.priceTable;
              const hasVisitFee = priceTable.some((row) => row.visitFee);

              return (
                <section id="price-table" aria-label="참고 비용표" className="scroll-mt-20">
                  <h2 className="text-h2 text-ink-900 md:text-h2-md">
                    {service.priceTableHeading?.title ??
                      "품목별 대략 수리비 참고표"}
                  </h2>
                  <p className="mt-2 break-keep text-caption text-ink-600">
                    {service.priceTableNote ??
                      "아래 금액은 부품 종류·모델·지역에 따라 달라지는 대략적인 참고 범위입니다. 정확한 금액은 방문 점검 후 견적으로 확정돼요."}
                  </p>
                  <div className="mt-4 overflow-x-auto">
                    <table className="tnum w-full min-w-[32rem] border-collapse text-body-sm">
                      <thead>
                        <tr className="border-b border-line text-left text-caption text-ink-600">
                          <th scope="col" className="py-2 pr-3 font-medium">
                            {service.priceTableHeading?.columns?.item ?? "제품"}
                          </th>
                          <th scope="col" className="py-2 pr-3 font-medium">
                            {service.priceTableHeading?.columns?.issue ??
                              "흔한 고장 유형"}
                          </th>
                          {hasVisitFee && (
                            <th scope="col" className="py-2 pr-3 font-medium">
                              {service.priceTableHeading?.columns?.visitFee ??
                                "출장비(참고)"}
                            </th>
                          )}
                          <th scope="col" className="py-2 font-medium">
                            {service.priceTableHeading?.columns?.priceRange ??
                              "수리비 대략 범위(참고)"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {priceTable.map((row) => (
                          <tr
                            key={`${row.item}-${row.issue}`}
                            className="border-b border-line-soft align-top"
                          >
                            <td className="py-2.5 pr-3 font-semibold text-ink-900">
                              {row.item}
                            </td>
                            <td className="py-2.5 pr-3 text-ink-700">
                              {row.issue}
                            </td>
                            {hasVisitFee && (
                              <td className="py-2.5 pr-3 text-ink-700">
                                {row.visitFee}
                              </td>
                            )}
                            <td className="py-2.5 text-ink-700">
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
              <section id="faq" aria-label="자주 묻는 질문" className="scroll-mt-20">
                <h2 className="text-h2 text-ink-900 md:text-h2-md">
                  자주 묻는 질문
                </h2>
                <div className="mt-2 border-t border-line-soft">
                  {service.faq.map((item) => (
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

            {/* FAQ 섹션이 끝난 경계 */}
            <AdSlot id="in-article-2" />

            <PageFeedback />
          </div>

          <div className="min-w-0 space-y-4 lg:col-start-2">
            {guide && guide.steps.length > 0 && (
              <details className="group hidden rounded-xl border border-line bg-white lg:block">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-xl p-5 text-h3 text-ink-900 marker:content-none">
                  <span>방법 절차 한눈에 보기</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-ink-500 transition-transform group-open:rotate-180"
                  >
                    ⌄
                  </span>
                </summary>
                <div className="border-t border-line-soft p-5 pt-4">
                  <ScreenshotGuideGrid guide={guide} />
                </div>
              </details>
            )}

            <section className="hidden rounded-xl border border-line bg-white p-5 lg:block">
              <h2 className="text-h3 text-ink-900">시작 전 준비</h2>
              <ul className="mt-3 space-y-2">
                {preparations.map((preparation) => (
                  <li
                    key={preparation}
                    className="flex items-start gap-2 break-keep text-body-sm text-ink-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-semibold text-success"
                    >
                      ✓
                    </span>
                    <span>{preparation}</span>
                  </li>
                ))}
              </ul>
            </section>

            {service.tips && service.tips.length > 0 && (
              <section className="hidden rounded-xl border-l-4 border-warn-line bg-warn-bg p-5 lg:block">
                <h2 className="text-h3 text-warn-text">주의</h2>
                <ul className="mt-2 space-y-2">
                  {service.tips.map((tip) => (
                    <li
                      key={tip}
                      className="break-keep text-body-sm text-warn-text"
                    >
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(phone || hours || usefulOfficialUrl) && (
              <section
                id="contact-block"
                className="scroll-mt-20 rounded-xl border border-line bg-white p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-h3 text-ink-900">
                    {isCustomerCenter
                      ? "전화할 때 이것만 확인"
                      : "직접 해결이 막혔을 때"}
                  </h2>
                  <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 text-caption font-semibold text-primary">
                    마지막 수단
                  </span>
                </div>

                {!isCustomerCenter && usefulOfficialUrl && (
                  <div className="mt-4 border-t border-line-soft pt-4">
                    <p className="mb-3 text-caption text-ink-600">
                      {officialLinkHeading}
                    </p>
                    <a
                      href={usefulOfficialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 w-full items-center justify-center rounded-[10px] bg-primary px-4 text-center text-button text-white hover:bg-primary-strong"
                    >
                      {officialActionLabel} ↗
                    </a>
                    <p className="mt-2 break-keep text-caption text-ink-600">
                      {officialNextStep}
                    </p>
                  </div>
                )}

                {phone && (
                  <div className="mt-4 border-t border-line-soft pt-4">
                    <p className="text-caption text-ink-600">
                      {isCustomerCenter
                        ? "안내 전화"
                        : needsImmediateBlock
                          ? "지금 바로 막아야 할 때"
                          : usesCustomerCenterFallback
                            ? "위 방법으로 해결되지 않을 때만"
                            : "그래도 해결되지 않을 때만"}
                    </p>
                    <p className="tnum mt-1 text-h2 text-ink-900 md:text-h2-md">
                      {phone.number}
                    </p>
                    {phone.feeNote && (
                      <p className="mt-1 break-keep text-caption text-ink-600">
                        {phone.feeNote}
                      </p>
                    )}
                    <div className="mt-3">
                      <PhoneActions phone={phone.number} />
                    </div>
                    {phoneGuide && phoneGuide.length > 0 && (
                      <div className="mt-4 rounded-lg bg-bg-soft p-3">
                        <p className="text-caption font-semibold text-ink-800">
                          전화해야 한다면 이렇게 하세요
                        </p>
                        <ol className="mt-2 space-y-2">
                          {phoneGuide.map((guideLine, index) => (
                            <li
                              key={guideLine}
                              className="flex items-start gap-2 break-keep text-body-sm text-ink-700"
                            >
                              <span className="tnum font-semibold text-primary">
                                {index + 1}.
                              </span>
                              <span>{guideLine}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {hours && (
                      <div className="mt-4 border-t border-line-soft pt-4">
                        <p className="text-caption text-ink-600">
                          상담 가능 시간
                        </p>
                        <p className="tnum mt-1 break-keep text-body-sm font-semibold text-ink-800">
                          {hours}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* 사이드바 광고 자리 — 전화·공식 버튼과 붙지 않도록 카드 바깥 아래에 둡니다. */}
            <AdSlot id="sidebar-1" minHeight={250} />
          </div>
        </div>

        {/* 면책 한 줄 — 관련 링크 위. 박스 치지 않습니다. */}
        <p className="mt-8 break-keep text-caption text-ink-600 md:mt-12">
          이 안내는 이해를 돕기 위한 정리이며, 실제 신청·처리는 연결된 공식
          화면의 최신 조건 기준입니다.
        </p>

        {(relatedCompanyServices.length > 0 ||
          relatedSameTaskServices.length > 0 ||
          parentProblem) && (
          <section className="mt-6 border-t border-line-soft pt-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h2 className="text-h2 text-ink-900 md:text-h2-md">관련 업무</h2>
              {parentProblem && (
                <Link
                  prefetch={false}
                  href={problemPath(parentProblem.slug)}
                  className="inline-flex min-h-12 items-center break-keep text-body-sm font-semibold text-primary hover:underline"
                >
                  {parentProblem.chooseLabel} → {parentProblem.title}
                </Link>
              )}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCompanyServices.map((relatedService) => (
                <Link prefetch={false}
                  key={`${company.slug}-${relatedService.slug}`}
                  href={servicePath(company.slug, relatedService.slug)}
                  className="rounded-xl border border-line bg-white px-4 py-3 transition hover:border-primary/40"
                >
                  <span className="block text-caption text-ink-600">
                    {company.name}
                  </span>
                  <span className="mt-0.5 block break-keep text-body-sm font-semibold text-ink-900">
                    {relatedService.title} 처리 방법 ›
                  </span>
                </Link>
              ))}
              {relatedSameTaskServices.map((related) => (
                <Link prefetch={false}
                  key={`${related.company.slug}-${related.service.slug}`}
                  href={servicePath(related.company.slug, related.service.slug)}
                  className="rounded-xl border border-line bg-white px-4 py-3 transition hover:border-primary/40"
                >
                  <span className="block text-caption text-ink-600">
                    다른 업체 비교
                  </span>
                  <span className="mt-0.5 block break-keep text-body-sm font-semibold text-ink-900">
                    {related.company.name} {related.service.title} ›
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="mt-8 border-t border-line-soft pt-5 text-caption text-ink-600 md:mt-12">
          <span className="font-semibold text-ink-800">안내 범위 · </span>
          바로처리는 {company.name}의 공식 서비스가 아니며 제휴·대행 관계가
          없습니다. 업체 정책이나 화면은 정보 확인일 이후 변경될 수 있습니다.
        </p>
      </article>

      <FixedBottomCTA
        phone={phone?.number}
        officialUrl={usefulOfficialUrl ?? undefined}
        officialLabel="공식 페이지 열기"
      />
    </main>
  );
}
