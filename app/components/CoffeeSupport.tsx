"use client";

import { useState } from "react";

export default function CoffeeSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );
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

  return (
    <div className="coffee-support fixed z-50 max-w-[calc(100vw-2rem)] text-black">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="coffee-support-panel"
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-bold shadow-[0_12px_32px_-12px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
      >
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-50 text-base"
        >
          ☕
        </span>
        <span className="hidden sm:inline">도움이 되셨다면 커피 한잔</span>
        <span className="sm:hidden">커피 후원</span>
      </button>

      {isOpen && (
        <div
          id="coffee-support-panel"
          className="coffee-support-panel absolute right-0 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl"
        >
          <p className="font-bold">개발자에게 커피 한잔 ☕</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            바로처리가 도움이 되셨다면 자발적으로 후원할 수 있어요. 후원 여부는 서비스 이용에 아무 영향이 없습니다.
          </p>

          <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm">
            <p className="text-gray-500">우리은행 · 예금주 김X석</p>
            <p className="mt-2 break-all text-base font-bold">{accountNumber}</p>
            <button
              type="button"
              onClick={copyAccount}
              className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-semibold hover:bg-gray-100"
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
            className="mt-3 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
