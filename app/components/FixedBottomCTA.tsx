"use client";

import { useEffect, useRef, useState } from "react";

type FixedBottomCTAProps = {
  phone?: string;
  officialUrl?: string;
  officialLabel?: string;
};

/**
 * 모바일 하단 고정 CTA — 스펙 v3 4-7 (TDS FixedBottomCTA 방식).
 * 스크롤을 내리면 숨고 올리면 다시 보이며, 페이지 아래 연락처 블록
 * (#contact-block)이 화면에 들어오면 숨습니다. lg 이상에서는 렌더링만 하고
 * 숨깁니다(사이드 연락처 카드가 있으므로).
 */
export default function FixedBottomCTA({
  phone,
  officialUrl,
  officialLabel = "공식 페이지 열기",
}: FixedBottomCTAProps) {
  const [hidden, setHidden] = useState(false);
  const [nearContact, setNearContact] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && currentY > 160);
        lastScrollY.current = currentY;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 연락처 블록(#contact-block)이나 푸터 후원 블록(#support)이 화면에 들어오면
  // 숨습니다. 후원 블록을 가리면 모바일 후원 경로가 다시 막히기 때문입니다(v8).
  useEffect(() => {
    const targets = ["contact-block", "support"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setNearContact(visible.size > 0);
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  if (!phone && !officialUrl) return null;

  const telNumber = phone?.replace(/[^0-9+]/g, "");
  const isHidden = hidden || nearContact;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-200 lg:hidden ${
        isHidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex gap-2">
        {phone && (
          <a
            href={`tel:${telNumber}`}
            className="tnum flex h-14 flex-1 items-center justify-center rounded-[10px] bg-ink-900 text-cta text-white"
          >
            전화 걸기
          </a>
        )}
        {officialUrl && (
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 flex-1 items-center justify-center gap-1 rounded-[10px] bg-primary text-cta text-white"
          >
            {officialLabel} ↗
          </a>
        )}
      </div>
    </div>
  );
}
