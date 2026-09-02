import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "../../components/AdSlot";
import AppIcon from "../../components/AppIcon";
import GuideText from "../../components/GuideText";
import JumpNav, { type JumpItem } from "../../components/JumpNav";
import PageFeedback from "../../components/PageFeedback";
import { getGuide, guides } from "../../data/guides";
import { SITE_NAME, absoluteUrl, guidePath } from "../../lib/site";

type GuidePageProps = {
  params: Promise<{ guideSlug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ guideSlug: guide.slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { guideSlug } = await params;
  const guide = getGuide(guideSlug);

  if (!guide) return { title: "글을 찾을 수 없습니다" };

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: guidePath(guide.slug) },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: guidePath(guide.slug),
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { guideSlug } = await params;
  const guide = getGuide(guideSlug);

  if (!guide) notFound();

  const path = guidePath(guide.slug);
  const relatedGuides = (guide.relatedGuides ?? []).flatMap((slug) => {
    const related = getGuide(slug);
    return related ? [related] : [];
  });
  // 점프 목차 — 이 글에 실제로 있는 섹션만 담습니다(없는 섹션 링크 금지).
  const jumpItems: JumpItem[] = [
    ...guide.sections.map((section) => ({
      href: `#${section.id}`,
      label: section.navLabel,
    })),
    ...(guide.faq && guide.faq.length > 0
      ? [{ href: "#faq", label: "자주 묻는 질문" }]
      : []),
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "알아두면 좋은 글",
        item: absoluteUrl("/guide"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.navTitle,
        item: absoluteUrl(path),
      },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    inLanguage: "ko-KR",
    dateModified: guide.updatedAt,
    mainEntityOfPage: absoluteUrl(path),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
  const faqJsonLd =
    guide.faq && guide.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
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
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
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
            href="/guide"
            className="inline-flex min-h-12 items-center hover:text-ink-900"
          >
            알아두면 좋은 글
          </Link>
          <span aria-hidden="true">/</span>
          <span>{guide.navTitle}</span>
        </nav>

        <header className="mt-4">
          <h1 className="flex items-start gap-2 break-keep text-h1 text-ink-900 md:text-h1-md">
            <AppIcon
              name={guide.icon}
              size={24}
              tone="primary"
              className="mt-1 md:mt-2"
            />
            <span>{guide.title}</span>
          </h1>
          <p className="mt-3">
            <span className="tnum inline-flex items-center rounded-full border border-line px-3 py-1 text-caption text-ink-600">
              마지막 정리 {guide.updatedAt} · 바로처리 직접 작성
            </span>
          </p>
        </header>

        <p className="mt-5 break-keep text-body text-ink-700 md:text-body-md">
          {guide.lead}
        </p>

        <div className="mt-6">
          <JumpNav items={jumpItems} />
        </div>

        <div className="mt-8 space-y-8 md:space-y-12">
          {guide.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-20"
              aria-label={section.heading}
            >
              <h2 className="break-keep text-h2 text-ink-900 md:text-h2-md">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, index) => {
                  if (block.type === "p") {
                    return (
                      <p
                        key={index}
                        className="break-keep text-body leading-7 text-ink-700 md:text-body-md"
                      >
                        <GuideText text={block.text} />
                      </p>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={index} className="space-y-3">
                        {block.items.map((row) => (
                          <li
                            key={row}
                            className="flex items-start gap-2 break-keep text-body leading-7 text-ink-700"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-0.5 shrink-0 font-semibold text-success"
                            >
                              ✓
                            </span>
                            <span>
                              <GuideText text={row} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (block.type === "steps") {
                    return (
                      <ol key={index} className="space-y-3">
                        {block.items.map((row, rowIndex) => (
                          <li
                            key={row}
                            className="flex items-start gap-3 break-keep text-body leading-7 text-ink-700"
                          >
                            <span
                              aria-hidden="true"
                              className="tnum mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-white text-caption font-bold text-ink-800"
                            >
                              {rowIndex + 1}
                            </span>
                            <span>
                              <GuideText text={row} />
                            </span>
                          </li>
                        ))}
                      </ol>
                    );
                  }

                  return (
                    <div
                      key={index}
                      className="rounded-lg border-l-4 border-warn-line bg-warn-bg p-4"
                    >
                      <p className="text-body font-bold text-warn-text">
                        {block.title}
                      </p>
                      <p className="mt-1 break-keep text-body-sm leading-7 text-warn-text">
                        <GuideText
                          text={block.text}
                          strongClassName="font-bold text-warn-text"
                        />
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* 본문이 끝난 경계 */}
        <div className="mt-8">
          <AdSlot id="in-article-1" />
        </div>

        {guide.faq && guide.faq.length > 0 && (
          <section
            id="faq"
            className="mt-8 scroll-mt-20 md:mt-12"
            aria-label="자주 묻는 질문"
          >
            <h2 className="text-h2 text-ink-900 md:text-h2-md">
              자주 묻는 질문
            </h2>
            <div className="mt-2 border-t border-line-soft">
              {guide.faq.map((item) => (
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

        {guide.related && guide.related.length > 0 && (
          <section className="mt-8 md:mt-12" aria-label="바로 처리하기">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">
              읽으셨으면 여기서 바로 처리하세요
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {guide.related.map((link) => (
                <li key={link.href}>
                  <Link
                    prefetch={false}
                    href={link.href}
                    className="group flex min-h-14 items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 transition hover:border-primary/40 hover:bg-primary-soft/30"
                  >
                    <span className="min-w-0 flex-1 break-keep text-body-sm font-semibold text-ink-900 group-hover:text-primary">
                      {link.label}
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-ink-500">
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-8 text-caption text-ink-600">
          이 글은 2026년 9월 기준입니다.
        </p>

        <div className="mt-8 md:mt-12">
          <PageFeedback />
        </div>

        {relatedGuides.length > 0 && (
          <section className="mt-6 border-t border-line-soft pt-6">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">
              이어서 읽으면 좋은 글
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {relatedGuides.map((related) => (
                <li key={related.slug}>
                  <Link
                    prefetch={false}
                    href={guidePath(related.slug)}
                    className="inline-flex min-h-12 items-center rounded-[10px] border border-line bg-white px-4 text-body-sm font-semibold text-ink-800 hover:border-primary/40 hover:text-primary"
                  >
                    <AppIcon name={related.icon} size={20} className="mr-1.5" />
                    {related.navTitle} ›
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
