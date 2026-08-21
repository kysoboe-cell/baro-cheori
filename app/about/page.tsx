import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 소개",
  description: "바로처리가 어떤 문제를 해결하고 어떤 원칙으로 운영되는지 소개합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="bg-bg-soft">
      <article className="mx-auto max-w-[42.5rem] px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-caption font-semibold text-primary">서비스 소개</p>
        <h1 className="mt-2 break-keep text-h1 text-ink-900 md:text-h1-md">바로처리는 왜 만들었나요?</h1>
        <p className="mt-5 break-keep text-body text-ink-700 md:text-body-md">
          반품이나 구독 해지 하나를 하려 해도 어디를 눌러야 하는지 몰라 여러 화면과 ARS를 헤매게 됩니다. 바로처리는 그 과정을 전화 없이 먼저 따라 할 수 있는 한 화면의 실행 순서로 바꿉니다.
        </p>

        <div className="mt-8 space-y-3">
          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">하는 일</h2>
            <ul className="mt-3 space-y-2 break-keep text-body text-ink-700">
              <li>• 공식 안내를 바탕으로 준비물과 처리 순서를 쉽게 풀어씁니다.</li>
              <li>• 공식 처리 화면을 먼저 보여주고, 온라인에서 안 될 때만 연락처를 안내합니다.</li>
              <li>• 회사와 업무별로 고유한 주소를 제공해 다시 찾기 쉽게 합니다.</li>
            </ul>
          </section>
          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">하지 않는 일</h2>
            <ul className="mt-3 space-y-2 break-keep text-body text-ink-700">
              <li>• 업체를 대신해 신청하거나 개인정보를 받지 않습니다.</li>
              <li>• 특정 업체의 공식 고객센터인 것처럼 안내하지 않습니다.</li>
              <li>• 공식 화면에서 확정해야 할 비용이나 처리 결과를 보장하지 않습니다.</li>
            </ul>
          </section>
          {/* 홈 다크 밴드(01/02/03)에 있던 3원칙을 v6 2-3에 따라 여기로 옮겼습니다. */}
          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">바로처리가 일하는 방식</h2>
            <dl className="mt-3 space-y-3">
              {[
                ["01", "공식 메뉴부터", "전화 대기보다 먼저 해볼 수 있는 실제 처리 화면을 엽니다."],
                ["02", "현실적인 순서만", "규정 전체가 아니라 지금 필요한 준비와 행동만 남깁니다."],
                ["03", "전화는 마지막에", "온라인으로 끝낼 수 없는 마지막 단계에서만 맞는 번호를 보여드립니다."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-3">
                  <dt className="tnum shrink-0 font-bold text-primary">
                    {number}
                  </dt>
                  <dd>
                    <p className="text-h3 text-ink-900">{title}</p>
                    <p className="mt-1 break-keep text-body text-ink-700">
                      {description}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            prefetch={false}
            href="/"
            className="inline-flex min-h-12 items-center rounded-[10px] bg-primary px-5 text-button text-white hover:bg-primary-strong"
          >
            업무 찾기
          </Link>
          <Link
            prefetch={false}
            href="/information-policy"
            className="inline-flex min-h-12 items-center rounded-[10px] border border-line bg-white px-5 text-button text-ink-800 hover:bg-bg-soft"
          >
            정보 관리 원칙
          </Link>
        </div>
      </article>
    </main>
  );
}
