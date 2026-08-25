"use client";

import { useEffect, useRef, useState } from "react";
import AppIcon from "./AppIcon";
import { SUPPORT_ACCOUNT, SUPPORT_COPY, useAccountCopy } from "./useAccountCopy";

/**
 * 커피 후원 — 스펙 v3 4-7: position:fixed로 콘텐츠 위에 떠 있는 플로팅
 * 버튼은 금지, 대신 헤더 바 안의 정적 요소로 둡니다(스크롤과 같이 움직임).
 *
 * v13: 예전엔 이 컴포넌트 루트가 `hidden sm:block`이라 640px 미만에서
 * 버튼째로 사라져 모바일에서 후원 진입점이 통째로 없었습니다(버그).
 * 이제 버튼은 항상 보이고, "커피 후원" 글자만 sm 이상에서 붙습니다
 * — 모바일은 아이콘만 있는 pill, 데스크톱은 아이콘+글자 pill.
 */
export default function CoffeeSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { copyAccount, copyLabel } = useAccountCopy();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    function handlePointerDown(event: PointerEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="coffee-support-panel"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="커피 후원"
        className="flex min-h-12 min-w-12 items-center justify-center gap-1.5 rounded-full border border-line px-3 text-caption font-semibold text-ink-700 hover:bg-line-soft"
      >
        <AppIcon name="coffee" size={20} />
        <span className="hidden sm:inline">커피 후원</span>
      </button>

      {isOpen && (
        <div
          id="coffee-support-panel"
          className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-line bg-white p-5 shadow-lg"
        >
          <p className="flex items-center gap-1.5 font-semibold text-ink-900">
            <AppIcon name="coffee" size={16} tone="primary" />
            {SUPPORT_COPY.title}
          </p>
          <p className="mt-2 text-body-sm text-ink-700">
            {SUPPORT_COPY.description}
          </p>

          <div className="mt-4 rounded-lg bg-bg-soft p-4">
            <p className="text-caption text-ink-600">
              {SUPPORT_ACCOUNT.bank} · 예금주 {SUPPORT_ACCOUNT.holder}
            </p>
            <p className="tnum mt-1 break-all text-body font-semibold text-ink-900">
              {SUPPORT_ACCOUNT.number}
            </p>
            <button
              type="button"
              onClick={copyAccount}
              className="mt-3 flex min-h-12 w-full items-center justify-center rounded-lg border border-line bg-white px-3 text-body-sm font-semibold text-ink-800 hover:bg-line-soft"
            >
              {copyLabel}
            </button>
          </div>

          <p className="mt-3 text-caption text-ink-600">
            {SUPPORT_COPY.disclaimer}
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex min-h-12 w-full items-center justify-center rounded-lg bg-ink-900 text-body-sm font-semibold text-white hover:bg-black"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
