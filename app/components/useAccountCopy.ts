"use client";

import { useState } from "react";

/** 후원 계좌 정보 — 바꿀 일이 생기면 여기 한 곳만 고칩니다. */
export const SUPPORT_ACCOUNT = {
  bank: "우리은행",
  holder: "김X석",
  number: "1002-053-103-089",
};

/**
 * 계좌번호 복사 로직 — 헤더 pill(CoffeeSupport)과 푸터 후원 블록(SupportBlock)이
 * 같은 코드를 씁니다. 복사 코드를 두 벌로 만들지 않기 위한 공용 훅입니다.
 */
export function useAccountCopy() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_ACCOUNT.number);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    window.setTimeout(() => setCopyStatus("idle"), 1800);
  };

  const copyLabel =
    copyStatus === "copied"
      ? "계좌번호 복사됨 ✓"
      : copyStatus === "error"
        ? "복사 실패 · 길게 눌러 복사"
        : "계좌번호 복사";

  return { copyStatus, copyAccount, copyLabel };
}
