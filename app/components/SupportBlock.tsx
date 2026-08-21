"use client";

import { SUPPORT_ACCOUNT, useAccountCopy } from "./useAccountCopy";

/**
 * 푸터 후원 블록 — 스펙 v8 1장 ①.
 *
 * 모바일·데스크톱 공통의 기본 후원 경로입니다. v3에서 없앤 모바일 플로팅
 * 버튼은 되살리지 않습니다(본문을 가리고 상세 페이지의 FixedBottomCTA와
 * 겹칩니다). 대신 스크롤 끝까지 읽은 사람만 보는 이 자리에 둡니다.
 *
 * 복사 로직은 헤더 pill(CoffeeSupport)과 같은 useAccountCopy 훅을 씁니다.
 * 푸터는 다크 배경이라 글자는 gray-300 체계를 따르고 계좌번호만 흰색입니다.
 * PageFeedback의 "커피 한잔 후원하기"가 #support로 점프해 옵니다.
 */
export default function SupportBlock() {
  const { copyAccount, copyLabel } = useAccountCopy();

  return (
    <section
      id="support"
      aria-label="개발자 후원"
      className="mt-8 scroll-mt-20 border-t border-gray-800 pt-6"
    >
      <h2 className="text-h3 text-white">
        <span aria-hidden="true">☕</span> 도움이 되셨다면 개발자에게 커피 한잔을
      </h2>
      <p className="mt-2 max-w-xl break-keep text-body-sm text-gray-300">
        바로처리는 광고 없이 무료로 운영됩니다. 후원 여부는 서비스 이용에 아무
        영향이 없어요.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-caption text-gray-300">
            {SUPPORT_ACCOUNT.bank} · 예금주 {SUPPORT_ACCOUNT.holder}
          </p>
          <p className="tnum mt-1 break-all text-body font-semibold text-white">
            {SUPPORT_ACCOUNT.number}
          </p>
        </div>
        <button
          type="button"
          onClick={copyAccount}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[10px] border border-gray-800 bg-gray-900 px-4 text-body-sm font-semibold text-white hover:bg-gray-800"
        >
          {copyLabel}
        </button>
      </div>
    </section>
  );
}
