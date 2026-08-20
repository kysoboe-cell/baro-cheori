/**
 * 단계 문장 렌더러 — 스펙 v3 4-5.
 * [대괄호] 안의 메뉴·버튼 이름만 굵게(600) 보여주고, 데이터에 남아 있는
 * 화살표(→)는 메뉴 경로 표기 규칙에 맞춰 ">"로 바꿔 렌더링합니다.
 * `**단어**` 강조도 같은 굵기로 처리합니다.
 */
export default function StepText({
  text,
  strongClassName = "font-semibold text-ink-900",
}: {
  text: string;
  strongClassName?: string;
}) {
  const normalized = text.replace(/\s*→\s*/g, " > ");
  const parts = normalized.split(/(\[[^\]]+\]|\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          return (
            <strong key={index} className={strongClassName}>
              {part}
            </strong>
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
