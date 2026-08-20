export type JumpItem = { href: string; label: string };

/**
 * 점프 목차 한 줄 — 스펙 v6 2-1.
 * 요약 콜아웃 바로 아래 두는 앵커 링크 행(칩 아님, 밑줄 링크).
 *
 * 호출하는 쪽에서 **그 페이지에 실제로 있는 섹션만** items에 담아 넘긴다.
 * 스샷이 없는 페이지에 "화면 따라하기" 링크를 띄우는 건 금지(거짓 0% 원칙).
 * 갈 곳이 하나뿐이면 목차가 아니라 잡음이라 아예 렌더하지 않는다.
 */
export default function JumpNav({ items }: { items: JumpItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav aria-label="이 페이지 목차" className="-my-2">
      <ul className="flex flex-wrap items-center gap-x-1">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-x-1">
            {index > 0 && (
              <span aria-hidden="true" className="text-ink-500">
                ·
              </span>
            )}
            <a
              href={item.href}
              className="inline-flex min-h-12 items-center text-caption font-semibold text-ink-700 underline decoration-line decoration-1 underline-offset-4 hover:text-primary hover:decoration-primary"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
