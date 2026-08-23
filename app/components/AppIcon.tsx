import {
  Coffee,
  CreditCard,
  Lock,
  MonitorPlay,
  Package,
  ReceiptText,
  ShoppingCart,
  Smartphone,
  Wifi,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * 사이트 공통 아이콘 — v12 규칙을 이 한 곳에서 강제합니다.
 *
 * - 크기 3단계만: 16(문장 안) · 20(버튼·링크) · 24(섹션 헤딩·페이지 제목)
 * - 선 굵기 stroke 2 통일
 * - 색 두 가지만: primary(틸 #0f766e — 헤딩·제목) · muted(회색 #8b95a1 — 문장 안·장식)
 *   코랄은 아이콘에 쓰지 않습니다("화면당 코랄 1회" 규칙과 충돌).
 * - 아이콘은 항상 글자와 함께 쓰고(단독 버튼 금지), 장식이므로 aria-hidden.
 *
 * 데이터 파일(services.ts·problems.ts)은 lucide 컴포넌트 대신 아래 IconName
 * 문자열만 들고 있고, 화면에서 이 컴포넌트가 SVG로 바꿔 그립니다.
 */
export type IconName =
  | "shopping-cart"
  | "smartphone"
  | "package"
  | "credit-card"
  | "monitor-play"
  | "wrench"
  | "receipt-text"
  | "lock"
  | "coffee"
  | "wifi"
  | "zap";

const icons: Record<IconName, LucideIcon> = {
  "shopping-cart": ShoppingCart,
  smartphone: Smartphone,
  package: Package,
  "credit-card": CreditCard,
  "monitor-play": MonitorPlay,
  wrench: Wrench,
  "receipt-text": ReceiptText,
  lock: Lock,
  coffee: Coffee,
  wifi: Wifi,
  zap: Zap,
};

type AppIconProps = {
  name: IconName;
  /** 16 문장 안 · 20 버튼·링크 · 24 헤딩·제목 */
  size?: 16 | 20 | 24;
  /** primary 틸(헤딩·제목) · muted 회색(문장 안·장식) */
  tone?: "primary" | "muted";
  className?: string;
};

export default function AppIcon({
  name,
  size = 20,
  tone = "muted",
  className = "",
}: AppIconProps) {
  const Icon = icons[name];

  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      size={size}
      strokeWidth={2}
      className={`shrink-0 ${
        tone === "primary" ? "text-primary" : "text-ink-500"
      } ${className}`}
    />
  );
}
