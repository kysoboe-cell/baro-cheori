"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 커피 후원 — 스펙 v3 4-7: 플로팅 버튼은 모바일에서 제거하고,
 * 데스크톱은 헤더 우측 작은 텍스트 pill로만 노출합니다.
 */
export default function CoffeeSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const accountNumber = "1002-053-103-089";

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    window.setTimeout(() => setCopyStatus("idle"), 1800);
  };

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
    <div ref={rootRef} className="relative hidden sm:block">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="coffee-support-panel"
        onClick={() => setIsOpen((current) => !current)}
        className="flex min-h-12 items-center gap-1.5 rounded-full border border-line px-3 text-caption font-semibold text-ink-700 hover:bg-line-soft"
      >
        <span aria-hidden="true">☕</span>
        <span>커피 후원</span>
      </button>

      {isOpen && (
        <div
          id="coffee-support-panel"
          className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-line bg-white p-5 shadow-lg"
        >
          <p className="font-semibold text-ink-900">개발자에게 커피 한잔 ☕</p>
          <p className="mt-2 text-body-sm text-ink-700">
            바로처리가 도움이 되셨다면 자발적으로 후원할 수 있어요. 후원 여부는
            서비스 이용에 아무 영향이 없습니다.
          </p>

          <div className="mt-4 rounded-lg bg-bg-soft p-4">
            <p className="text-caption text-ink-600">우리은행 · 예금주 김X석</p>
            <p className="tnum mt-1 break-all text-body font-semibold text-ink-900">
              {accountNumber}
            </p>
            <button
              type="button"
              onClick={copyAccount}
              className="mt-3 flex min-h-12 w-full items-center justify-center rounded-lg border border-line bg-white px-3 text-body-sm font-semibold text-ink-800 hover:bg-line-soft"
            >
              {copyStatus === "copied"
                ? "계좌번호 복사됨 ✓"
                : copyStatus === "error"
                  ? "복사 실패 · 길게 눌러 복사"
                  : "계좌번호 복사"}
            </button>
          </div>

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
