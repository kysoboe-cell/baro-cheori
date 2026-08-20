"use client";

import { useState } from "react";

type PhoneActionsProps = {
  phone: string;
};

export default function PhoneActions({ phone }: PhoneActionsProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const telNumber = phone.replace(/[^0-9+]/g, "");

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    window.setTimeout(() => setCopyStatus("idle"), 1800);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`tel:${telNumber}`}
        className="flex min-h-12 items-center rounded-[10px] bg-ink-900 px-5 text-button text-white hover:bg-black"
      >
        전화 걸기
      </a>
      <button
        type="button"
        onClick={copyPhone}
        className="flex min-h-12 items-center rounded-[10px] border border-line bg-white px-5 text-body-sm font-semibold text-ink-800 hover:bg-line-soft"
      >
        {copyStatus === "copied"
          ? "복사됨 ✓"
          : copyStatus === "error"
            ? "복사 실패"
            : "번호 복사"}
      </button>
    </div>
  );
}
