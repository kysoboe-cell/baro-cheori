"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ServiceTask } from "../data/types";
import BoldText from "./BoldText";

type Guide = NonNullable<ServiceTask["screenshotGuide"]>;

/**
 * "방법 절차 한눈에 보기" 사이드바 아코디언 등에서 쓰는 격자 전용 버전입니다.
 * 라이트박스(dialog)는 만들지 않고 data-guide-open으로 클릭을 위임하므로,
 * 같은 페이지에 본체 <ScreenshotGuide>가 함께 마운트돼 있어야 열립니다
 * (본체와 노출 조건이 항상 같으므로 실제로는 늘 함께 있습니다).
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
          <span className="relative block overflow-hidden rounded-lg border border-line transition group-hover:border-primary/50">
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

/**
 * 스샷 가이드 v2 — 스펙 v3 5절 "한 화면에 흐름 전체".
 * 모바일 3열 격자(썸네일만 로드) + <dialog> 라이트박스.
 * 텍스트 단계의 "화면 보기" 버튼(data-guide-open="n")도 같은 라이트박스를 엽니다.
 */
export default function ScreenshotGuide({ guide }: { guide: Guide }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [current, setCurrent] = useState(0);
  const steps = guide.steps;
  const step = steps[current];

  const openAt = useCallback(
    (index: number) => {
      setCurrent(Math.min(Math.max(index, 0), steps.length - 1));
      dialogRef.current?.showModal();
    },
    [steps.length]
  );

  const close = () => dialogRef.current?.close();
  const goPrev = useCallback(
    () => setCurrent((value) => (value > 0 ? value - 1 : steps.length - 1)),
    [steps.length]
  );
  const goNext = useCallback(
    () => setCurrent((value) => (value < steps.length - 1 ? value + 1 : 0)),
    [steps.length]
  );

  // 텍스트 단계 리스트의 "화면 보기" 버튼(data-guide-open) 위임 처리
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const trigger = (event.target as HTMLElement).closest?.(
        "[data-guide-open]"
      );
      if (!trigger) return;
      const n = Number(trigger.getAttribute("data-guide-open"));
      const index = steps.findIndex((item) => item.n === n);
      if (index >= 0) openAt(index);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [steps, openAt]);

  // 라이트박스 키보드 ←/→ (Esc는 dialog 기본 동작)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (!dialogRef.current?.open) return;
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  const formattedDate = guide.checkedAt.replace(
    /(\d{4})-(\d{2})-(\d{2})/,
    "$1년 $2월 $3일"
  );

  return (
    <section
      id="screens"
      aria-label="화면 그대로 따라하기"
      className="scroll-mt-20"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-h2 text-ink-900 md:text-h2-md">
          화면 그대로 따라하기
        </h2>
        <p className="text-caption text-ink-600">
          {formattedDate} · {guide.basis}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {steps.map((item, index) => (
          <button
            key={item.img}
            type="button"
            onClick={() => openAt(index)}
            aria-label={`${item.n}단계 화면 크게 보기: ${item.label}`}
            className="group text-left"
          >
            <span className="relative block overflow-hidden rounded-lg border border-line transition group-hover:border-primary/50">
              <Image
                src={item.thumb ?? item.img}
                alt={item.alt}
                width={480}
                height={600}
                loading="lazy"
                sizes="(min-width: 1024px) 160px, (min-width: 640px) 25vw, 33vw"
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

      <dialog
        ref={dialogRef}
        aria-label="화면 캡처 크게 보기"
        className="m-auto w-[min(92vw,30rem)] rounded-xl p-0 backdrop:bg-slate-950/70"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        {step && (
          <div className="flex flex-col bg-white">
            <div className="flex items-center justify-between pl-4">
              <p className="tnum text-caption text-ink-600">
                {current + 1} / {steps.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="닫기"
                className="flex min-h-12 min-w-12 items-center justify-center text-lg text-ink-600 hover:text-ink-900"
              >
                ✕
              </button>
            </div>

            <div
              className="flex items-center justify-center bg-bg-soft"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return;
                const delta =
                  event.changedTouches[0].clientX - touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(delta) < 40) return;
                if (delta > 0) goPrev();
                else goNext();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- 라이트박스 원본은 이미 720px ≤100KB WebP */}
              <img
                src={step.img}
                alt={step.alt}
                loading="lazy"
                className="max-h-[min(85vh,calc(100vh-16rem))] w-auto object-contain"
              />
            </div>

            <div className="p-4">
              <p className="text-body text-ink-800">
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
              </p>

              {step.warning && (
                <p className="mt-3 rounded-lg border-l-4 border-warn-line bg-warn-bg p-3 text-body-sm text-warn-text">
                  {step.warning}
                </p>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex min-h-12 flex-1 items-center justify-center rounded-[10px] border border-line text-body-sm font-semibold text-ink-800 hover:bg-line-soft"
                >
                  ← 이전
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex min-h-12 flex-1 items-center justify-center rounded-[10px] bg-ink-900 text-body-sm font-semibold text-white hover:bg-black"
                >
                  다음 →
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
