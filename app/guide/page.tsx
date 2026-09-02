import type { Metadata } from "next";
import Link from "next/link";
import AppIcon from "../components/AppIcon";
import { guides } from "../data/guides";
import { absoluteUrl, guidePath } from "../lib/site";

export const metadata: Metadata = {
  title: "알아두면 좋은 글 — 해지·위약금·구독 정리",
  description:
    "해지 전에 확인할 것, 통신 위약금이 정해지는 원리, 전화 없이 해지하는 방법처럼 개별 업무 화면만으로는 알기 어려운 내용을 길게 풀어 쓴 글 모음입니다.",
  alternates: { canonical: "/guide" },
};

export default function GuideIndexPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "바로처리 알아두면 좋은 글",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: absoluteUrl(guidePath(guide.slug)),
    })),
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto max-w-[42.5rem] px-4 py-6 sm:px-6 sm:py-8">
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
          <span>알아두면 좋은 글</span>
        </nav>

        <h1 className="mt-4 break-keep text-h1 text-ink-900 md:text-h1-md">
          알아두면 좋은 글
        </h1>
        <p className="mt-5 break-keep text-body text-ink-700 md:text-body-md">
          업무 페이지가 &lsquo;지금 이 화면에서 무엇을 누를지&rsquo;를 알려준다면,
          여기 있는 글들은 &lsquo;왜 그렇게 되어 있고 무엇부터 확인해야 하는지&rsquo;를
          다룹니다. 해지 버튼을 누르기 전에 한 번 읽어두면 손해를 줄일 수 있는
          내용을 모았습니다.
        </p>

        <ul className="mt-8 space-y-3">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                prefetch={false}
                href={guidePath(guide.slug)}
                className="group block rounded-xl border border-line bg-white p-5 transition hover:border-primary/40 hover:bg-primary-soft/30"
              >
                <p className="flex items-start gap-2 break-keep text-h3 text-ink-900 group-hover:text-primary md:text-h3-md">
                  <AppIcon
                    name={guide.icon}
                    size={20}
                    tone="primary"
                    className="mt-0.5"
                  />
                  <span>{guide.title}</span>
                </p>
                <p className="mt-2 break-keep text-body-sm leading-7 text-ink-700">
                  {guide.description}
                </p>
                <p className="tnum mt-2 text-caption text-ink-600">
                  마지막 정리 {guide.updatedAt}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 break-keep text-body-sm text-ink-600">
          찾는 내용이 없다면{" "}
          <Link
            prefetch={false}
            href="/"
            className="font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            홈 검색창
          </Link>
          에 지금 겪는 문제를 그대로 입력해 보세요. 업체별 처리 순서로 바로
          연결됩니다.
        </p>
      </section>
    </main>
  );
}
