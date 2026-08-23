"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 푸터의 '커피 후원' 텍스트 링크 한 줄 — 검수 개선 1차(A4).
 * 업무 상세 페이지(/company/<업체>/<업무>)에서는 같은 페이지의 후원 카드로,
 * 그 밖의 페이지에서는 서비스 소개 페이지의 후원 카드로 보냅니다.
 */
export default function SupportFooterLink() {
  const pathname = usePathname();
  const hasInlineCard = /^\/company\/[^/]+\/[^/]+/.test(pathname ?? "");
  const href = hasInlineCard ? "#support" : "/about#support";

  return (
    <Link
      prefetch={false}
      href={href}
      className="inline-flex min-h-12 items-center text-body-sm text-gray-300 underline underline-offset-4 hover:text-white"
    >
      커피 후원
    </Link>
  );
}
