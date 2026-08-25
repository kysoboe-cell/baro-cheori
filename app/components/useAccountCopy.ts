"use client";

import { useState } from "react";

/** 후원 계좌 정보 — 바꿀 일이 생기면 여기 한 곳만 고칩니다. */
export const SUPPORT_ACCOUNT = {
  bank: "우리은행",
  holder: "김X석",
  number: "1002-053-103-089",
};

/**
 * 후원 문구 — v14: 잘버리기(jalbeorigi.com) 후원 팝업 톤 참고, 이모지는 빼고
 * 사이트명을 넣어 바꿈. 헤더 팝업(CoffeeSupport)과 상세 페이지 카드
 * (SupportBlock) 두 곳에 문구가 따로 박혀 있던 걸 여기 한 곳으로 합쳤습니다
 * — 다음에 문구를 또 바꿀 땐 여기만 고치면 됩니다.
 */
export const SUPPORT_COPY = {
  title: "도움이 되셨다면 개발자에게 커피 한잔을~",
  description: "여러분의 커피 한 잔이 바로처리를 계속 무료로 운영되게 합니다",
  disclaimer:
    "후원은 선택이며, 안내 내용은 후원 여부와 무관합니다. 입력·전송되는 정보는 없습니다.",
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
