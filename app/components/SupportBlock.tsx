"use client";

import { SUPPORT_ACCOUNT, SUPPORT_COPY, useAccountCopy } from "./useAccountCopy";
import AppIcon from "./AppIcon";

/**
 * 커피 후원 카드 — 검수 개선 1차(A4).
 *
 * 원칙: 후원은 **도움이 끝난 자리**에서만 보여줍니다. 그래서 모든 페이지 푸터가
 * 아니라 업무 상세 페이지의 처리 순서 맨 아래(와 서비스 소개 페이지)에만 둡니다.
 * 푸터에는 '커피 후원' 텍스트 링크 한 줄만 남기고, 그 링크가 이 카드(#support)로
 * 옵니다. PageFeedback의 "커피 한잔 후원하기"도 같은 곳으로 점프합니다.
 *
 * 복사 로직·후원 문구(SUPPORT_COPY)는 헤더 pill(CoffeeSupport)과 공유합니다.
 */
export default function SupportBlock() {
  const { copyAccount, copyLabel } = useAccountCopy();

  return (
    <section
      id="support"
      aria-label="개발자 후원"
      className="scroll-mt-20 rounded-xl border border-line bg-bg-soft p-5"
    >
      <h2 className="flex items-center gap-2 text-h3 text-ink-900">
        <AppIcon name="coffee" size={24} tone="primary" />
        {SUPPORT_COPY.title}
      </h2>
      <p className="mt-2 max-w-xl break-keep text-body-sm text-ink-700">
        {SUPPORT_COPY.description}
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-caption text-ink-600">
            {SUPPORT_ACCOUNT.bank} · 예금주 {SUPPORT_ACCOUNT.holder}
          </p>
          <p className="tnum mt-1 break-all text-body font-semibold text-ink-900">
            {SUPPORT_ACCOUNT.number}
          </p>
        </div>
        <button
          type="button"
          onClick={copyAccount}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[10px] border border-line bg-white px-4 text-body-sm font-semibold text-ink-800 hover:bg-line-soft"
        >
          {copyLabel}
        </button>
      </div>

      <p className="mt-3 max-w-xl break-keep text-caption text-ink-600">
        {SUPPORT_COPY.disclaimer}
      </p>
    </section>
  );
}
