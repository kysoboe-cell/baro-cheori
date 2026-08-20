/**
 * `**단어**`를 <strong>으로 바꿔서 렌더링하는 아주 가벼운 헬퍼입니다.
 * 데이터 파일(app/data/companies/*.ts)의 캡션 텍스트에서 특정 단어만
 * 굵게 강조하고 싶을 때 씁니다. HTML을 직접 넣지 않아 안전합니다.
 */
export default function BoldText({
  text,
  strongClassName = "font-bold text-slate-950",
}: {
  text: string;
  strongClassName?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
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
