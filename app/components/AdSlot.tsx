const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS === "on";

/**
 * 애드센스 승인 후 켜는 광고 자리 — 스펙 v6 1-3.
 * `NEXT_PUBLIC_ADS=on`이 아니면 아무것도 렌더하지 않는다(빈 박스 금지).
 * 켜질 때는 CLS 방지를 위해 min-height를 CSS로 먼저 예약한다(애드센스 공식 권장).
 *
 * ── 광고 금지 구역 (여기엔 절대 AdSlot을 넣지 말 것) ──────────────────
 * 1) "지금 이것부터 하세요" 콜아웃 내부, 처리 순서 <ol> 리스트 내부
 *    → 벤치마크(NerdWallet·Bankrate·Cleveland Clinic) 전부 광고는 섹션 경계에만 둔다.
 * 2) 전화 걸기·공식 페이지 버튼과 인접한 자리
 *    → 오클릭 유도로 애드센스 정책 위반 소지(공식 answer/1282097).
 * 3) 모바일 anchor(하단 고정) 광고는 상세 페이지 금지
 *    → FixedBottomCTA(하단 고정 전화/공식 버튼)와 겹쳐 오클릭 폭탄이 된다.
 *      anchor는 하단 CTA가 없는 홈·허브에서만 검토한다.
 * 4) 홈 첫 화면
 *    → 토스·삼쩜삼 확인 결과 첫 화면은 액션만 둔다. 우리 원칙과도 같다.
 * ────────────────────────────────────────────────────────────────
 */
export default function AdSlot({
  id,
  minHeight = 280,
}: {
  id: string;
  minHeight?: number;
}) {
  if (!ADS_ENABLED) return null;

  return (
    <div className="my-6" style={{ minHeight }} data-ad-slot={id}>
      {/* 승인 후 애드센스 in-article 코드 삽입 */}
    </div>
  );
}
