import Link from "next/link";

/**
 * 업체 페이지의 업무 카드 — 스펙 v7 2-2.
 *
 * 목록 렌더 분기가 모바일 압축 그리드 / 전체 목록 둘로 나뉘어 있는데,
 * 예전에는 분기마다 카드 마크업을 따로 써서 한 화면에 두 스타일(그림자 있는
 * 구형 카드 + 없는 신형 카드)이 섞였습니다. 껍데기를 여기 한 곳에만 두어
 * 다음에 또 갈라지지 않게 합니다.
 *
 * variant는 밀도만 바꿉니다(줄 수·CTA 한 줄 유무). 테두리·모서리·배경·hover·
 * 타이포 토큰은 두 variant가 완전히 같습니다.
 * v3 방향에 맞춰 shadow, hover:-translate-y, hover:shadow-md는 쓰지 않습니다.
 */
export default function ServiceCard({
  href,
  title,
  summary,
  variant = "full",
}: {
  href: string;
  title: string;
  summary: string;
  variant?: "compact" | "full";
}) {
  const isCompact = variant === "compact";

  return (
    <Link
      prefetch={false}
      href={href}
      className={`flex min-h-12 flex-col rounded-xl border border-line bg-white transition hover:border-primary/40 hover:bg-primary-soft/20 active:border-primary/40 active:bg-primary-soft/20 ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <p
        className={`break-keep text-h3 text-ink-900 ${
          isCompact ? "line-clamp-2 leading-tight" : "md:text-h3-md"
        }`}
      >
        {title}
      </p>
      <p
        className={`mt-1 break-keep text-body-sm text-ink-600 ${
          isCompact ? "line-clamp-1" : "line-clamp-2"
        }`}
      >
        {summary}
      </p>
      {!isCompact && (
        <p className="mt-4 text-body-sm font-semibold text-ink-900">
          순서대로 확인하기 →
        </p>
      )}
    </Link>
  );
}
