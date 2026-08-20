"use client";

import { useState } from "react";

/**
 * "도움이 됐나요?" 피드백 위젯 — 스펙 v6 2-2.
 * 서버·저장소 없이 GA4가 저장소다. 스샷 가이드 성과를 2~4주 뒤 비교할 때
 * 체류시간보다 정직한 신호로 쓴다.
 *
 * GA4는 layout.tsx의 <GoogleAnalytics>가 심는 인라인 스니펫이 window.gtag를
 * 전역 함수로 만든다. 다만 광고/추적 차단기나 스크립트 로딩 실패로 없을 수
 * 있으므로 typeof 가드를 두고, gtag가 없으면 dataLayer로 대체 전송한다.
 * 둘 다 없으면 조용히 UI만 바뀐다(에러 없음).
 */
export default function PageFeedback() {
  const [sent, setSent] = useState(false);

  function send(helpful: boolean) {
    if (typeof window !== "undefined") {
      const payload = { helpful, page_path: window.location.pathname };

      if (typeof window.gtag === "function") {
        window.gtag("event", "page_feedback", payload);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: "page_feedback", ...payload });
      }
    }

    setSent(true);
  }

  return (
    <section aria-label="페이지 피드백" className="border-t border-line-soft pt-6">
      <p className="break-keep text-body font-semibold text-ink-900">
        이 안내가 도움이 됐나요?
      </p>
      {/* 클릭 후 같은 높이의 한 줄로 바뀌도록 min-h를 고정해 레이아웃 밀림을 막습니다. */}
      <div className="mt-3 flex min-h-12 flex-wrap items-center gap-2">
        {sent ? (
          <p className="text-body-sm text-ink-700">의견 감사합니다.</p>
        ) : (
          <>
            <button
              type="button"
              onClick={() => send(true)}
              className="inline-flex min-h-12 items-center rounded-[10px] border border-line bg-white px-4 text-body-sm font-semibold text-ink-800 hover:border-primary/40 hover:text-primary"
            >
              도움됐어요
            </button>
            <button
              type="button"
              onClick={() => send(false)}
              className="inline-flex min-h-12 items-center rounded-[10px] border border-line bg-white px-4 text-body-sm font-semibold text-ink-800 hover:border-primary/40 hover:text-primary"
            >
              아쉬워요
            </button>
          </>
        )}
      </div>
    </section>
  );
}
