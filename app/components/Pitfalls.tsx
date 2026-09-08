import Link from "next/link";
import StepText from "./StepText";

/**
 * 본문 문장 안에 "/guide/<슬러그>" 주소가 그대로 적혀 있으면 그 부분만 링크로
 * 그립니다. 보이는 글자는 하나도 바뀌지 않고 주소가 눌리기만 합니다 — 문장을
 * 고치지 않으면서 내부 링크를 살리기 위한 처리입니다.
 */
function PitfallBody({ text }: { text: string }) {
  const parts = text.split(/(\/guide\/[a-z0-9-]+)/g);

  return (
    <>
      {parts.map((part, index) =>
        /^\/guide\/[a-z0-9-]+$/.test(part) ? (
          <Link
            key={index}
            prefetch={false}
            href={part}
            className="font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {part}
          </Link>
        ) : (
          <StepText key={index} text={part} />
        )
      )}
    </>
  );
}

/**
 * "이런 경우 주의하세요" 섹션 — 2026-09-02 지시서 2장.
 *
 * 데이터의 `tips`가 한 줄짜리 경고라면 이쪽은 실수·예외 하나를 제목과 설명으로
 * 풀어 쓴 묶음입니다. 소제목(heading)은 데이터가 들고 있고 페이지마다 다르게
 * 씁니다 — 같은 제목이 여러 페이지에 반복되면 템플릿 인상이 다시 생깁니다.
 */
export function Pitfalls({
  pitfalls,
}: {
  pitfalls: { heading: string; items: { title: string; body: string }[] };
}) {
  return (
    <section id="pitfalls" aria-label={pitfalls.heading} className="scroll-mt-20">
      <h2 className="break-keep text-h2 text-ink-900 md:text-h2-md">
        {pitfalls.heading}
      </h2>
      <div className="mt-4 space-y-4">
        {pitfalls.items.map((item) => (
          <div key={item.title} className="border-l-4 border-line pl-4">
            <p className="break-keep text-h3 text-ink-900">{item.title}</p>
            <p className="mt-1 break-keep text-body-sm leading-7 text-ink-700">
              <PitfallBody text={item.body} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** 관련 기둥 글 한 편으로 보내는 줄. 본문이 끝난 자리에 한 번만 둡니다. */
export function GuideLinkLine({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <p className="break-keep text-body-sm leading-7 text-ink-700">
      {text}{" "}
      <Link
        prefetch={false}
        href={href}
        className="font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
      >
        {title}
      </Link>
    </p>
  );
}
