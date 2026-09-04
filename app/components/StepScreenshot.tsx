"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ServiceTask } from "../data/types";
import BoldText from "./BoldText";

type GuideStep = NonNullable<ServiceTask["screenshotGuide"]>["steps"][number];

const CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳";

/**
 * 처리 순서 단계 안에서 그 단계의 화면 캡처를 펼쳐 보여줍니다.
 *
 * 예전에는 본문 아래 "화면 그대로 따라하기" 격자 섹션이 라이트박스(dialog)를
 * 들고 있고 단계의 "화면 보기" 버튼은 거기에 클릭을 위임했습니다. 그 섹션을
 * 없애면서, 캡처를 단계 안에서 바로 펼치는 방식으로 바꿨습니다. 별도 섹션에
 * 기대지 않으므로 연결이 끊길 일이 없습니다.
 *
 * "방법 절차 한눈에 보기" 아코디언의 썸네일(data-guide-open="n")도 계속
 * 동작합니다 — 같은 번호를 가진 이 컴포넌트가 펼쳐지며 그 단계로 스크롤합니다.
 *
 * <p> 안에 들어가므로 바깥 태그는 전부 span·button·img(문구 콘텐츠)입니다.
 */
export default function StepScreenshot({
  step,
  showNumber,
  basis,
  checkedAt,
}: {
  step: GuideStep;
  /** 한 단계에 캡처가 2장 이상일 때만 버튼에 번호를 붙입니다. */
  showNumber: boolean;
  basis: string;
  checkedAt: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);

  // 아코디언 썸네일(data-guide-open)에서 이 번호를 부르면 펼치고 그리로 이동합니다.
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const trigger = (event.target as HTMLElement).closest?.(
        "[data-guide-open]"
      );
      if (!trigger) return;
      if (Number(trigger.getAttribute("data-guide-open")) !== step.n) return;

      setOpen(true);
      // 이미 펼쳐져 있던 단계를 다시 부른 경우에는 상태가 바뀌지 않아 화면에
      // 아무 일도 일어나지 않습니다. 그래서 펼치는 것과 별개로 항상 그 자리로
      // 이동시킵니다(두 번의 rAF = 펼쳐진 뒤 그려진 다음).
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          wrapRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        )
      );
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [step.n]);

  const formattedDate = checkedAt.replace(
    /(\d{4})-(\d{2})-(\d{2})/,
    "$1년 $2월 $3일"
  );
  const numberLabel = showNumber ? ` ${CIRCLED[step.n - 1] ?? step.n}` : "";

  return (
    <span ref={wrapRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${step.n}번 화면 ${open ? "접기" : "보기"}`}
        onClick={() => setOpen((value) => !value)}
        className="-my-2.5 ml-1.5 inline-flex min-h-12 items-center px-1.5 align-middle text-caption font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
      >
        {open ? "화면 접기" : "화면 보기"}
        {numberLabel}
      </button>

      <span
        id={panelId}
        hidden={!open}
        className="mt-3 block overflow-hidden rounded-xl border border-line bg-bg-soft"
      >
        <span className="flex items-center justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- 캡처 원본은 이미 720px ≤100KB WebP */}
          <img
            src={step.img}
            alt={step.alt}
            loading="lazy"
            className="max-h-[60vh] w-auto rounded-lg"
          />
        </span>

        <span className="block border-t border-line bg-white p-4">
          <span className="block text-body text-ink-800">
            <span
              aria-hidden="true"
              className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent align-[-0.2em] text-caption font-bold text-white"
            >
              {step.n}
            </span>
            <BoldText
              text={step.caption}
              strongClassName="font-semibold text-ink-900"
            />
          </span>

          {step.warning && (
            <span className="mt-3 block rounded-lg border-l-4 border-warn-line bg-warn-bg p-3 text-body-sm text-warn-text">
              {step.warning}
            </span>
          )}

          <span className="tnum mt-3 block text-caption text-ink-600">
            {formattedDate} · {basis}
          </span>
        </span>
      </span>
    </span>
  );
}
