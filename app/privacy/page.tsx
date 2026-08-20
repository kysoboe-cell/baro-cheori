import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보 안내",
  description: "바로처리의 개인정보 및 외부 링크 관련 안내입니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="bg-gray-50">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-bold text-primary-700">개인정보 안내</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">현재 바로처리는 개인정보를 직접 입력받지 않습니다</h1>
        <div className="mt-8 space-y-5 leading-7 text-gray-700">
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-950">사이트에서 받지 않는 정보</h2>
            <p className="mt-3">
              회원가입, 문의 폼, 주문 대행 기능이 없으며 이름·전화번호·주문번호 같은 개인정보를 사이트에 입력받아 저장하지 않습니다. 방문 통계는 Google Analytics로 익명 집계만 하며, 이용자를 식별할 수 있는 정보와 연결하지 않습니다.
            </p>
          </section>
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-950">호스팅 기술 기록</h2>
            <p className="mt-3">
              사이트 운영과 보안을 위해 호스팅 제공자가 접속 시각, IP 주소, 브라우저 정보 같은 기술 기록을 처리할 수 있습니다. 이는 호스팅 제공자의 정책과 보관 기준을 따릅니다.
            </p>
          </section>
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-950">외부 공식 링크와 전화</h2>
            <p className="mt-3">
              공식 페이지로 이동하거나 전화를 걸면 해당 업체의 개인정보 처리방침과 이용 조건이 적용됩니다. 본인인증 정보는 반드시 연결된 공식 화면에서만 입력하세요.
            </p>
          </section>
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-950">광고와 쿠키</h2>
            <p className="mt-3">
              바로처리는 서비스 운영을 위해 Google AdSense 광고 게재를 준비하고 있습니다. 광고가 게재되는 경우:
            </p>
            <ul className="mt-3 space-y-3">
              <li>• Google을 포함한 제3자 광고 사업자는 쿠키를 사용하여 이용자가 이 사이트 또는 다른 웹사이트를 방문한 기록을 바탕으로 광고를 표시할 수 있습니다.</li>
              <li>
                • 맞춤 광고는 Google 광고 설정(
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-my-2.5 inline-flex min-h-12 items-center align-middle font-semibold text-primary-700 underline underline-offset-4"
                >
                  adssettings.google.com
                </a>
                )에서 해제할 수 있습니다.
              </li>
              <li>
                • 자세한 내용은 Google 광고 정책(
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-my-2.5 inline-flex min-h-12 items-center align-middle font-semibold text-primary-700 underline underline-offset-4"
                >
                  policies.google.com/technologies/ads
                </a>
                )을 참고하세요.
              </li>
            </ul>
            <p className="mt-3">
              바로처리는 이 외에 이용자를 식별할 수 있는 개인정보를 직접 수집하지 않으며, 방문 통계는 Google Analytics를 통해 익명으로 집계됩니다.
            </p>
          </section>
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-950">자발적 후원</h2>
            <p className="mt-3">
              커피 후원은 계좌번호를 복사할 수 있게 제공하는 선택 기능입니다. 바로처리는 이 기능을 통해 후원자의 개인정보를 별도로 수집하거나 서비스 이용과 연결하지 않습니다.
            </p>
          </section>
        </div>
        <p className="mt-8 text-sm text-ink-600">
          문의:{" "}
          <a
            href="mailto:kysoboe@gmail.com"
            className="-my-2.5 inline-flex min-h-12 items-center align-middle font-semibold text-primary-700 underline underline-offset-4"
          >
            kysoboe@gmail.com
          </a>
        </p>
        <p className="mt-2 text-sm text-ink-600">시행일: 2026-08-21</p>
      </article>
    </main>
  );
}
