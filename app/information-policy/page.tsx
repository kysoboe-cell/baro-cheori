import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "정보 관리 원칙",
  description: "바로처리의 출처 확인, 작성, 검토 및 수정 원칙을 안내합니다.",
  alternates: { canonical: "/information-policy" },
};

export default function InformationPolicyPage() {
  return (
    <main className="bg-gray-50">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-bold text-primary-700">정보 관리 원칙</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">쉽게 쓰되, 출처는 공식 정보로 확인합니다</h1>
        <p className="mt-6 text-lg leading-8 text-gray-700">
          바로처리는 사용자가 실제로 다음 행동을 할 수 있도록 긴 안내를 짧은 순서로 정리합니다. 마지막 확인은 언제나 해당 업체의 공식 페이지에서 할 수 있게 연결합니다.
        </p>

        <div className="mt-10 space-y-4">
          {[
            ["1. 공식 출처 우선", "업체의 공식 고객센터, 도움말, 서비스 안내 페이지를 먼저 확인합니다."],
            ["2. 실행 순서로 재작성", "사용자가 준비할 것, 누를 메뉴, 다음 단계가 드러나도록 쉬운 문장으로 정리합니다."],
            ["3. 확인 날짜 표시", "업무 안내마다 마지막으로 정보를 확인한 날짜를 표시합니다."],
            ["4. 불확실한 결과는 보장하지 않기", "비용, 가능 여부, 환불 완료일처럼 상황에 따라 달라지는 내용은 공식 신청 화면에서 재확인하도록 안내합니다."],
            ["5. 변경 가능성 알리기", "업체 정책과 화면은 예고 없이 바뀔 수 있으므로 공식 링크를 함께 제공합니다."],
          ].map(([title, description]) => (
            <section key={title} className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="mt-2 leading-7 text-gray-700">{description}</p>
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-gray-500">
          정책 최종 정리일: 2026-08-19 · 바로처리는 안내 정보의 정확성을 높이기 위해 지속해서 검토하지만, 각 업체와 제휴·대행 관계는 없습니다.
        </p>
      </article>
    </main>
  );
}
