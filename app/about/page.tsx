import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 소개",
  description: "바로처리가 어떤 문제를 해결하고 어떤 원칙으로 운영되는지 소개합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="bg-gray-50">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-bold text-primary-700">서비스 소개</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">바로처리는 왜 만들었나요?</h1>
        <p className="mt-6 text-lg leading-8 text-gray-700">
          반품이나 구독 해지 하나를 하려 해도 어디를 눌러야 하는지 몰라 여러 화면과 ARS를 헤매게 됩니다. 바로처리는 그 과정을 전화 없이 먼저 따라 할 수 있는 한 화면의 실행 순서로 바꿉니다.
        </p>

        <div className="mt-10 space-y-5">
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold">하는 일</h2>
            <ul className="mt-4 space-y-3 leading-7 text-gray-700">
              <li>• 공식 안내를 바탕으로 준비물과 처리 순서를 쉽게 풀어씁니다.</li>
              <li>• 공식 처리 화면을 먼저 보여주고, 온라인에서 안 될 때만 연락처를 안내합니다.</li>
              <li>• 회사와 업무별로 고유한 주소를 제공해 다시 찾기 쉽게 합니다.</li>
            </ul>
          </section>
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold">하지 않는 일</h2>
            <ul className="mt-4 space-y-3 leading-7 text-gray-700">
              <li>• 업체를 대신해 신청하거나 개인정보를 받지 않습니다.</li>
              <li>• 특정 업체의 공식 고객센터인 것처럼 안내하지 않습니다.</li>
              <li>• 공식 화면에서 확정해야 할 비용이나 처리 결과를 보장하지 않습니다.</li>
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link prefetch={false} href="/" className="rounded-xl bg-black px-5 py-3 font-semibold text-white">
            업무 찾기
          </Link>
          <Link prefetch={false} href="/information-policy" className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold">
            정보 관리 원칙
          </Link>
        </div>
      </article>
    </main>
  );
}
