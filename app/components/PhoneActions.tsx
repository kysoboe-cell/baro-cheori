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
        className="min-h-12 rounded-xl bg-black px-5 py-3.5 text-base font-black text-white hover:bg-gray-800 sm:text-sm sm:font-semibold"
      >
        전화 걸기
      </a>
      <button
        type="button"
        onClick={copyPhone}
        className="min-h-12 rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold hover:bg-gray-50"
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
