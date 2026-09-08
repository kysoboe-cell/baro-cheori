"use client";

import Image from "next/image";
import type { ServiceTask } from "../data/types";

type Guide = NonNullable<ServiceTask["screenshotGuide"]>;

/**
 * "방법 절차 한눈에 보기" 아코디언(모바일·데스크톱 사이드바)에서 쓰는 격자입니다.
 *
 * 썸네일은 data-guide-open="n" 으로 클릭을 위임하고, 같은 번호를 가진
 * StepScreenshot(처리 순서 단계 안)이 그 캡처를 펼칩니다. 예전에는 이 파일의
 * 기본 컴포넌트가 라이트박스를 들고 있었지만, 그 섹션을 없애면서(2026-09-04)
 * 캡처를 단계 안에서 펼치는 방식으로 바뀌었고 기본 컴포넌트는 지웠습니다.
 */
export function ScreenshotGuideGrid({ guide }: { guide: Guide }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {guide.steps.map((item) => (
        <button
          key={item.img}
          type="button"
          data-guide-open={item.n}
          aria-label={`${item.n}단계 화면 크게 보기: ${item.label}`}
          className="group text-left"
        >
          <span className="relative block overflow-hidden rounded-lg border border-line bg-line-soft transition group-hover:border-primary/50">
            <Image
              src={item.thumb ?? item.img}
              alt={item.alt}
              width={480}
              height={600}
              loading="lazy"
              sizes="150px"
              className={`aspect-[4/5] w-full object-cover ${
                item.thumb ? "" : "object-top"
              }`}
            />
            <span
              aria-hidden="true"
              className="absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-caption font-bold text-white"
            >
              {item.n}
            </span>
          </span>
          <span className="mt-1 block truncate text-caption font-semibold text-ink-800">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
