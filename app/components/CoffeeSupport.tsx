"use client";

import { useState } from "react";

export default function CoffeeSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const accountNumber = "1002-053-103-089";

  const copyAccount = async () => {
    await navigator.clipboard.writeText(accountNumber);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="fixed right-6 top-40 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <span className="text-lg">☕</span>
        <span>도움이 되셨다면 개발자에게 커피 한잔을</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">
          <div className="mb-4">
            <p className="text-base font-bold">
              개발자에게 커피 한잔 ☕
            </p>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              바로처리가 도움이 되셨다면 감사히 받겠습니다.
            </p>
          </div>

          <div className="space-y-4 rounded-xl bg-gray-50 p-4 text-sm">
            <div>
              <p className="text-gray-400">은행</p>
              <p className="mt-1 font-semibold">우리은행</p>
            </div>

            <div>
              <p className="text-gray-400">계좌번호</p>

              <div className="mt-1 flex items-center justify-between gap-3">
                <p className="font-semibold">
                  {accountNumber}
                </p>

                <button
                  onClick={copyAccount}
                  className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-100"
                >
                  {copied ? "복사됨 ✓" : "복사"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-gray-400">예금주</p>
              <p className="mt-1 font-semibold">김X석</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}