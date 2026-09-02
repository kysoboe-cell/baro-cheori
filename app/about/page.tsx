import type { Metadata } from "next";
import Link from "next/link";
import SupportBlock from "../components/SupportBlock";

export const metadata: Metadata = {
  title: "서비스 소개 — 누가 왜 만드나요",
  description:
    "바로처리를 누가 왜 만들고 있는지, 안내에 적힌 내용을 어떻게 확인하는지, 하지 않는 일은 무엇인지 과장 없이 설명합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="bg-bg-soft">
      <article className="mx-auto max-w-[42.5rem] px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-caption font-semibold text-primary">서비스 소개</p>
        <h1 className="mt-2 break-keep text-h1 text-ink-900 md:text-h1-md">
          바로처리는 왜 만들었나요?
        </h1>
        <p className="mt-5 break-keep text-body text-ink-700 md:text-body-md">
          반품 하나, 구독 해지 하나를 하려 해도 어디를 눌러야 하는지 몰라 여러
          화면을 헤매다 결국 전화를 겁니다. 그리고 안내 음성을 따라가며 한참을
          기다립니다. 바로처리는 그 앞 단계를 대신 정리해 두는 곳입니다. 전화를
          걸기 전에 화면에서 먼저 해볼 수 있는 순서를 한 페이지에 모아 둡니다.
        </p>

        <div className="mt-8 space-y-3">
          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">
              시작은 대기음이었습니다
            </h2>
            <p className="mt-3 break-keep text-body leading-7 text-ink-700">
              해지나 취소는 대개 급할 때 필요합니다. 그런데 정작 급할수록 메뉴는
              깊은 곳에 있고, 버튼 이름은 화면마다 다릅니다. 결국 상담 전화를
              걸어 순서를 기다리게 되는데, 알고 보면 화면에서 몇 번만 눌러도 끝나는
              일인 경우가 많았습니다. 한 번 찾아본 순서를 메모해 두던 것이 이
              사이트의 시작입니다.
            </p>
            <p className="mt-3 break-keep text-body leading-7 text-ink-700">
              그래서 바로처리의 페이지는 설명이 아니라 순서로 되어 있습니다. 지금
              눌러야 할 메뉴, 놓치기 쉬운 단계, 화면으로 안 될 때만 쓰는 연락처
              순으로 정리합니다. 규정 전체를 옮겨 적는 대신, 지금 그 일을 끝내는 데
              필요한 것만 남기려고 합니다.
            </p>
          </section>

          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">하는 일</h2>
            <ul className="mt-3 space-y-2 break-keep text-body text-ink-700">
              <li>• 공식 안내를 바탕으로 준비물과 처리 순서를 쉽게 풀어씁니다.</li>
              <li>• 공식 처리 화면을 먼저 보여주고, 온라인에서 안 될 때만 연락처를 안내합니다.</li>
              <li>• 회사와 업무별로 고유한 주소를 제공해 다시 찾기 쉽게 합니다.</li>
              <li>• 화면만으로는 알기 어려운 배경은 따로 긴 글로 정리해 둡니다.</li>
            </ul>
          </section>

          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">하지 않는 일</h2>
            <ul className="mt-3 space-y-2 break-keep text-body text-ink-700">
              <li>• 업체를 대신해 신청하거나 개인정보를 받지 않습니다.</li>
              <li>• 특정 업체의 공식 고객센터인 것처럼 안내하지 않습니다.</li>
              <li>• 공식 화면에서 확정해야 할 비용이나 처리 결과를 보장하지 않습니다.</li>
              <li>• 확인하지 못한 금액이나 기간을 그럴듯하게 지어내지 않습니다.</li>
            </ul>
          </section>

          {/* 애드센스 재심사 대비 지시서 2, 3단계 — 신뢰 신호(운영·검증 방식)를 명시. 전부 이미 사실인 내용만. */}
          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">누가 만드나요</h2>
            <p className="mt-3 break-keep text-body leading-7 text-ink-700">
              바로처리는 한 사람이 운영하는 독립 서비스입니다. 회사 조직이나
              편집팀이 따로 있지 않고, 페이지를 쓰는 사람과 화면을 확인하는 사람이
              같습니다. 어느 업체와도 제휴하거나 대행 계약을 맺고 있지 않아서, 특정
              업체를 유리하게 쓸 이유도 없습니다.
            </p>
            <p className="mt-3 break-keep text-body leading-7 text-ink-700">
              이용은 무료입니다. 필요하실 때 오셔서 순서만 보고 가셔도 됩니다.
              도움이 되었다면 후원으로 응원해 주실 수 있지만, 후원 여부에 따라
              안내 내용이 달라지지 않습니다.
            </p>
          </section>

          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="text-h2 text-ink-900 md:text-h2-md">
              정보는 이렇게 확인합니다
            </h2>
            <ul className="mt-3 space-y-3 break-keep text-body leading-7 text-ink-700">
              <li>
                <strong className="font-semibold text-ink-900">
                  공식 화면을 직접 엽니다.
                </strong>{" "}
                각 업체가 홈페이지와 앱에 올려둔 안내를 직접 열어보고, 실제로 그
                순서대로 눌러지는지 확인한 내용만 적습니다. 다른 곳에서 본
                이야기를 옮겨 적지 않습니다.
              </li>
              <li>
                <strong className="font-semibold text-ink-900">
                  확인한 날짜를 표시합니다.
                </strong>{" "}
                업체 화면은 예고 없이 바뀝니다. 그래서 페이지마다 언제 마지막으로
                확인했는지 &lsquo;정보 확인일&rsquo;을 적어 둡니다. 날짜가 오래된
                페이지라면 공식 화면에서 한 번 더 확인해 주세요.
              </li>
              <li>
                <strong className="font-semibold text-ink-900">
                  모르는 것은 모른다고 씁니다.
                </strong>{" "}
                위약금이나 수리비처럼 사람마다 달라지는 금액은 임의로 적지 않고,
                어디에서 내 금액을 조회하는지로 안내합니다.
              </li>
              <li>
                <strong className="font-semibold text-ink-900">
                  틀린 곳은 고칩니다.
                </strong>{" "}
                안내와 실제 화면이 다르거나 잘못된 내용을 발견하셨다면{" "}
                <a
                  href="mailto:contact@barocheori.com"
                  className="font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  contact@barocheori.com
                </a>
                으로 알려주세요. 확인해서 고치고, 확인한 날짜도 함께 갱신합니다.
              </li>
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

        <div className="mt-8">

          <SupportBlock />

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
            href="/guide"
            className="inline-flex min-h-12 items-center rounded-[10px] border border-line bg-white px-5 text-button text-ink-800 hover:bg-bg-soft"
          >
            알아두면 좋은 글
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
