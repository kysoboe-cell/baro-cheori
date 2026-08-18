import type { Company } from "../types";
import {
  cardReissueTips,
  lostCardTips,
  makeCardReissueSteps,
  makeLostCardSteps,
  makeUnrecognizedChargeSteps,
  unrecognizedChargeTips,
} from "../cardCommon";

export const samsungCard: Company = {
  slug: "samsung-card",
  name: "삼성카드",
  categoryId: "card",
  aliases: ["삼성카드", "삼성 카드", "삼성카드 앱", "Samsung Card"],
  services: [
    {
      slug: "lost-card",
      title: "카드 분실·즉시 정지",
      keywords: [
        "삼성카드 분실신고",
        "삼성카드 잃어버림",
        "삼성카드 정지",
        "삼성카드 도난",
        "삼성카드 분실 전화번호",
      ],
      quickSummary: [
        "카드가 보이지 않으면 삼성카드 앱 또는 분실신고 1588-8900으로 즉시 정지하세요.",
        "최근 이용내역에 모르는 결제가 있으면 카드 재발급만 하지 말고 금융사고·부정사용도 함께 접수하세요.",
      ],
      phone: { number: "1588-8900", feeNote: "분실신고·한도승인 · 유료" },
      phoneGuide: [
        "1588-8900으로 전화해 1번(분실신고·분실해제)을 누르세요.",
        "카드를 고른 뒤 이용정지 완료 안내가 나올 때까지 진행하세요.",
      ],
      steps: makeLostCardSteps("삼성카드", "1588-8900"),
      tips: lostCardTips,
      lastChecked: "2026-08-19",
    },
    {
      slug: "card-reissue",
      title: "카드 재발급",
      keywords: [
        "삼성카드 재발급",
        "삼성카드 분실 재발급",
        "삼성카드 훼손 재발급",
        "삼성카드 다시 발급",
        "삼성카드 재발급 전화번호",
      ],
      quickSummary: [
        "분실했다면 먼저 삼성카드 앱 또는 1588-8900에서 이용정지를 완료하세요.",
        "삼성카드 앱에서 재발급 메뉴를 찾고, 메뉴가 없거나 가족·특수 카드라면 1588-8700에 문의하세요.",
      ],
      phone: { number: "1588-8700", feeNote: "삼성카드 대표전화 · 유료" },
      phoneGuide: [
        "분실했다면 먼저 1588-8900 → 1번으로 이용정지를 끝내세요.",
        "1588-8700에 전화해 '분실신고는 했고 재발급하려고 합니다'라고 말하세요.",
      ],
      hours: "전화상담 평일 09:00~18:00",
      steps: makeCardReissueSteps("삼성카드 앱", "1588-8700"),
      tips: cardReissueTips,
      lastChecked: "2026-08-19",
    },
    {
      slug: "unrecognized-charge",
      title: "모르는 결제·부정사용 신고",
      keywords: [
        "삼성카드 모르는 결제",
        "삼성카드 부정사용",
        "삼성카드 결제한적 없음",
        "삼성카드 해외결제 모름",
        "삼성카드 이용대금 이의신청",
      ],
      quickSummary: [
        "삼성카드 앱 이용내역에서 금액·시간·가맹점 이름을 저장하고 본인 결제인지 빠르게 확인하세요.",
        "모르는 결제거나 추가 승인이 걱정되면 1588-8900으로 카드부터 정지하고 1588-8700에 부정사용을 접수하세요.",
      ],
      phone: { number: "1588-8700", feeNote: "삼성카드 대표전화 · 유료" },
      phoneGuide: [
        "추가 결제가 걱정되면 1588-8900 → 1번으로 카드부터 정지하세요.",
        "1588-8700에 전화해 '제가 하지 않은 결제라 이의신청을 접수하려고 합니다'라고 말하세요.",
      ],
      hours: "전화상담 평일 09:00~18:00",
      steps: makeUnrecognizedChargeSteps(
        "삼성카드 앱",
        "1588-8700",
        "1588-8900"
      ),
      tips: unrecognizedChargeTips,
      lastChecked: "2026-08-19",
    },
    {
      slug: "customer-center",
      title: "고객센터",
      keywords: [
        "삼성카드 고객센터",
        "삼성카드 전화번호",
        "삼성카드 상담원",
        "삼성카드 문의",
        "삼성카드 분실신고 번호",
      ],
      quickSummary: [
        "일반 문의는 1588-8700, 카드 분실·한도승인은 1588-8900을 이용하세요.",
        "분실 상황에서는 일반 상담을 기다리지 말고 분실신고 번호로 먼저 정지하세요.",
      ],
      phone: { number: "1588-8700", feeNote: "유료전화" },
      phoneGuide: [
        "카드 분실·도난이면 1588-8900 → 1번을 누르세요.",
        "보이스피싱 등 금융사고 신고는 1588-8900 → 9번을 누르세요.",
        "그 밖의 일반 문의만 1588-8700을 이용하세요.",
      ],
      hours: "전화상담 평일 09:00~18:00",
      steps: [
        "분실·도난 또는 모르는 승인이라면 1588-8900으로 먼저 신고합니다.",
        "재발급·결제내역·회원정보 같은 일반 문의는 1588-8700을 이용합니다.",
        "본인인증 전 카드 비밀번호 전체나 CVC를 누구에게도 말하지 않습니다.",
      ],
      tips: [
        "전화 전에 문제가 있는 카드와 결제 금액·시간을 확인해두세요.",
        "해외 분실·부정사용은 공식 ARS 페이지의 해외 전용번호를 확인하세요.",
      ],
      lastChecked: "2026-08-19",
    },
  ],
};
