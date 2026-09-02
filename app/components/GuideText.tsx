import Link from "next/link";

/**
 * 기둥 글(app/data/guides.ts) 본문 렌더러입니다.
 *
 * 데이터 파일에는 HTML을 넣지 않고 아주 가벼운 표시만 씁니다.
 * - `**단어**`            → 굵게
 * - `[[문구|/경로]]`      → 사이트 안 링크(문장 속에 자연스럽게 들어갑니다)
 *
 * 링크 경로가 실제로 존재하는지는 guides.ts의 assertGuideLinks가 빌드 때
 * 검사합니다. 여기서는 그리기만 합니다.
 */
export default function GuideText({
  text,
  strongClassName = "font-semibold text-ink-900",
}: {
  text: string;
  strongClassName?: string;
}) {
  const parts = text.split(/(\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("[[") && part.endsWith("]]")) {
          const [label, href] = part.slice(2, -2).split("|");
          return (
            <Link
              key={index}
              prefetch={false}
              href={href}
              className="font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              {label}
            </Link>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className={strongClassName}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
