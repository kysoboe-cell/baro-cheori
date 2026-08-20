import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "../../components/AdSlot";
import JumpNav, { type JumpItem } from "../../components/JumpNav";
import PageFeedback from "../../components/PageFeedback";
import { getProblem, problems } from "../../data/problems";
import { getService } from "../../data/services";
import {
  absoluteUrl,
  problemPath,
  servicePath,
} from "../../lib/site";

type ProblemPageProps = {
  params: Promise<{ problemSlug: string }>;
};

export function generateStaticParams() {
  return problems.map((problem) => ({ problemSlug: problem.slug }));
}

export async function generateMetadata({
  params,
}: ProblemPageProps): Promise<Metadata> {
  const { problemSlug } = await params;
  const problem = getProblem(problemSlug);

  if (!problem) return { title: "상황을 찾을 수 없습니다" };

  return {
    title: `${problem.title} — 업체별 처리 방법`,
    description: `${problem.lead} 업체를 고르면 처리 순서와 공식 링크가 바로 나옵니다.`,
    alternates: { canonical: problemPath(problem.slug) },
    openGraph: {
      title: `${problem.title} — 업체별 처리 방법`,
      description: problem.lead,
      url: problemPath(problem.slug),
    },
  };
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { problemSlug } = await params;
  const problem = getProblem(problemSlug);

  if (!problem) notFound();

  const path = problemPath(problem.slug);
  const options = problem.options.flatMap((option) => {
    const item = getService(option.companySlug, option.serviceSlug);
    return item ? [{ ...option, ...item }] : [];
  });
  const relatedProblems = (problem.related ?? []).flatMap((slug) => {
    const related = getProblem(slug);
    return related ? [related] : [];
  });
  // 점프 목차 — 이 허브에 실제로 있는 섹션만 담습니다(없는 섹션 링크 금지).
  const jumpItems: JumpItem[] = [
    { href: "#companies", label: "업체 고르기" },
    ...(problem.fallback
      ? [{ href: "#other-case", label: problem.fallback.label }]
      : []),
    ...(problem.faq && problem.faq.length > 0
      ? [{ href: "#faq", label: "자주 묻는 질문" }]
      : []),
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "상황별", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 3,
        name: problem.title,
        item: absoluteUrl(path),
      },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: problem.heading,
    itemListElement: options.map((option, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${option.company.name} ${option.service.title}`,
      url: absoluteUrl(servicePath(option.company.slug, option.service.slug)),
    })),
  };
  const faqJsonLd =
    problem.faq && problem.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: problem.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
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

      <article className="mx-auto max-w-[42.5rem] px-4 py-6 sm:px-6 sm:py-8">
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
            href="/#quick-start"
            className="inline-flex min-h-12 items-center hover:text-ink-900"
          >
            상황별
          </Link>
          <span aria-hidden="true">/</span>
          <span>{problem.title}</span>
        </nav>

        <header className="mt-4">
          <h1 className="break-keep text-h1 text-ink-900 md:text-h1-md">
            <span aria-hidden="true" className="mr-2">
              {problem.icon}
            </span>
            {problem.heading}
          </h1>
          <p className="mt-3">
            <span className="tnum inline-flex items-center rounded-full border border-line px-3 py-1 text-caption text-ink-600">
              정보 확인일 {problem.lastChecked} · 바로처리 직접 확인
            </span>
          </p>
        </header>

        <p className="mt-5 break-keep text-body text-ink-700 md:text-body-md">
          {problem.lead}
        </p>

        <section className="mt-8 border-l-4 border-primary pl-4">
          <p className="text-caption font-semibold text-primary">
            업체를 고르기 전에
          </p>
          <ul className="mt-2 space-y-2">
            {problem.firstAid.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 break-keep text-body text-ink-700"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 font-semibold text-success"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6">
          <JumpNav items={jumpItems} />
        </div>

        <section
          id="companies"
          className="mt-8 scroll-mt-20 md:mt-12"
          aria-label="업체 고르기"
        >
          <h2 className="text-h2 text-ink-900 md:text-h2-md">
            {problem.chooseLabel}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {options.map((option, index) => (
              <li key={`${option.company.slug}-${option.service.slug}`}>
                <Link
                  prefetch={false}
                  href={servicePath(option.company.slug, option.service.slug)}
                  className="group flex min-h-14 items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 transition hover:border-primary/40 hover:bg-primary-soft/30"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="break-keep text-h3 text-ink-900 group-hover:text-primary">
                        {option.company.name}
                      </span>
                      {index === 0 && (
                        <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-0.5 text-caption font-semibold text-primary">
                          많이 찾는 곳
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block break-keep text-caption text-ink-600">
                      {option.service.title}
                    </span>
                    {option.note && (
                      <span className="mt-0.5 block break-keep text-caption text-ink-600">
                        {option.note}
                      </span>
                    )}
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-ink-500">
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 업체 선택 목록이 끝난 경계 */}
        <AdSlot id="in-article-1" />

        {problem.fallback && (
          <section id="other-case" className="mt-6 scroll-mt-20 rounded-xl bg-bg-soft p-5">
            <h2 className="break-keep text-h3 text-ink-900">
              {problem.fallback.label}
            </h2>
            <p className="mt-2 break-keep text-body-sm text-ink-700">
              {problem.fallback.note}
            </p>
            {problem.fallback.links.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {problem.fallback.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      prefetch={false}
                      href={link.href}
                      className="inline-flex min-h-12 items-center rounded-[10px] border border-line bg-white px-4 text-body-sm font-semibold text-ink-800 hover:border-primary/40 hover:text-primary"
                    >
                      {link.label} ›
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {problem.faq && problem.faq.length > 0 && (
          <section
            id="faq"
            className="mt-8 scroll-mt-20 md:mt-12"
            aria-label="자주 묻는 질문"
          >
            <h2 className="text-h2 text-ink-900 md:text-h2-md">
              자주 묻는 질문
            </h2>
            <div className="mt-2 border-t border-line-soft">
              {problem.faq.map((item) => (
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

        <div className="mt-8 md:mt-12">
          <PageFeedback />
        </div>

        {/* 면책 한 줄 — 관련 링크 위. 박스 치지 않습니다. */}
        <p className="mt-8 break-keep text-caption text-ink-600">
          이 안내는 이해를 돕기 위한 정리이며, 실제 신청·처리는 연결된 공식
          화면의 최신 조건 기준입니다.
        </p>

        {relatedProblems.length > 0 && (
          <section className="mt-6 border-t border-line-soft pt-6">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">
              이런 상황도 있어요
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {relatedProblems.map((related) => (
                <li key={related.slug}>
                  <Link
                    prefetch={false}
                    href={problemPath(related.slug)}
                    className="inline-flex min-h-12 items-center rounded-[10px] border border-line bg-white px-4 text-body-sm font-semibold text-ink-800 hover:border-primary/40 hover:text-primary"
                  >
                    <span aria-hidden="true" className="mr-1.5">
                      {related.icon}
                    </span>
                    {related.title} ›
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-8 border-t border-line-soft pt-5 text-caption text-ink-600">
          <span className="font-semibold text-ink-800">안내 범위 · </span>
          바로처리는 위 업체들의 공식 서비스가 아니며 제휴·대행 관계가 없습니다.
          업체 정책이나 화면은 정보 확인일 이후 변경될 수 있습니다.
        </p>
      </article>
    </main>
  );
}
