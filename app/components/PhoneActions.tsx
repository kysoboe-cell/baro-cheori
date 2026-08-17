"use client";

import { useState } from "react";

type PhoneActionsProps = {
  phone: string;
};

export default function PhoneActions({
  phone,
}: PhoneActionsProps) {
  const [copied, setCopied] = useState(false);

  const telNumber = phone.replace(/[^0-9+]/g, "");

  const copyPhone = async () => {
    await navigator.clipboard.writeText(phone);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="mt-6 flex gap-2">
      <a
        href={`tel:${telNumber}`}
        className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
      >
        전화 걸기
      </a>

      <button
        onClick={copyPhone}
        className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-gray-50"
      >
        {copied ? "복사됨 ✓" : "번호 복사"}
      </button>
    </div>
  );
}