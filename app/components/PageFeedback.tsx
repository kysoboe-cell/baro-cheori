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
  // null = 아직 안 누름 / true = 도움됐어요 / false = 아쉬워요
  const [sentHelpful, setSentHelpful] = useState<boolean | null>(null);

  function send(helpful: boolean) {
    if (typeof window !== "undefined") {
      const payload = { helpful, page_path: window.location.pathname };

      if (typeof window.gtag === "function") {
        window.gtag("event", "page_feedback", payload);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: "page_feedback", ...payload });
      }
    }

    setSentHelpful(helpful);
  }

  return (
    <section aria-label="페이지 피드백" className="border-t border-line-soft pt-6">
      <p className="break-keep text-body font-semibold text-ink-900">
        이 안내가 도움이 됐나요?
      </p>
      {/* 클릭 후 같은 높이의 한 줄로 바뀌도록 min-h를 고정해 레이아웃 밀림을 막습니다. */}
      <div className="mt-3 flex min-h-12 flex-wrap items-center gap-2">
        {sentHelpful !== null ? (
          <p className="break-keep text-body-sm text-ink-700">
            의견 감사합니다.
            {/*
              후원 한 줄은 "도움됐어요"에만 붙입니다. 도움이 안 됐다는 사람에게
              후원을 권하는 건 무례합니다. 새 창을 열지 않고 푸터 후원 블록으로
              점프만 합니다.
            */}
            {sentHelpful && (
              <>
                {" "}
                <a
                  href="#support"
                  className="-my-2.5 inline-flex min-h-12 items-center align-middle font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  ☕ 커피 한잔 후원하기
                </a>
              </>
            )}
          </p>
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
