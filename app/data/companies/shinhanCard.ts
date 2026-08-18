import type { Company } from "../types";
import {
  cardReissueTips,
  lostCardTips,
  makeCardReissueSteps,
  makeLostCardSteps,
  makeUnrecognizedChargeSteps,
  unrecognizedChargeTips,
} from "../cardCommon";

const homeUrl = "https://www.shinhancard.com/";
const arsUrl =
  "https://www.shinhancard.com/conts/store/customor_center/ars_gu/cardCounsel_voice.jsp";

export const shinhanCard: Company = {
  slug: "shinhan-card",
  name: "신한카드",
  categoryId: "card",
  aliases: ["신한카드", "신한 카드", "신한SOL페이", "신한 쏠페이"],
  services: [
    {
      slug: "lost-card",
      title: "카드 분실·즉시 정지",
      keywords: [
        "신한카드 분실신고",
        "신한카드 잃어버림",
        "신한카드 정지",
        "신한카드 도난",
        "신한카드 분실 전화번호",
      ],
      quickSummary: [
        "카드가 보이지 않으면 신한 SOL페이 또는 분실신고 1544-7200으로 즉시 정지하세요.",
        "최근 이용내역에 모르는 결제가 있으면 카드 재발급만 하지 말고 부정사용도 함께 접수하세요.",
      ],
      phone: { number: "1544-7200", feeNote: "승인·카드분실신고 · 유료" },
      steps: makeLostCardSteps("신한카드", "1544-7200"),
      tips: lostCardTips,
      officialUrl: arsUrl,
      officialActionLabel: "신한카드 분실신고 ARS 안내 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "card-reissue",
      title: "카드 재발급",
      keywords: [
        "신한카드 재발급",
        "신한카드 분실 재발급",
        "신한카드 훼손 재발급",
        "신한카드 다시 발급",
        "신한카드 재발급 전화번호",
      ],
      quickSummary: [
        "분실했다면 먼저 신한 SOL페이 또는 1544-7200에서 이용정지를 완료하세요.",
        "신한 SOL페이에서 재발급 메뉴를 찾고, 메뉴가 없거나 가족·특수 카드라면 1544-7000에 문의하세요.",
      ],
      phone: { number: "1544-7000", feeNote: "신한카드 고객센터 · 유료" },
      hours: "전화상담 평일 09:00~18:00",
      steps: makeCardReissueSteps("신한 SOL페이", "1544-7000"),
      tips: cardReissueTips,
      officialUrl: homeUrl,
      officialActionLabel: "신한카드 공식 홈페이지 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "unrecognized-charge",
      title: "모르는 결제·부정사용 신고",
      keywords: [
        "신한카드 모르는 결제",
        "신한카드 부정사용",
        "신한카드 결제한적 없음",
        "신한카드 해외결제 모름",
        "신한카드 이용대금 이의신청",
      ],
      quickSummary: [
        "신한 SOL페이 이용내역에서 금액·시간·가맹점 이름을 저장하고 본인 결제인지 빠르게 확인하세요.",
        "모르는 결제거나 추가 승인이 걱정되면 1544-7200으로 카드부터 정지하고 1544-7000에 부정사용을 접수하세요.",
      ],
      phone: { number: "1544-7000", feeNote: "신한카드 고객센터 · 유료" },
      hours: "전화상담 평일 09:00~18:00",
      steps: makeUnrecognizedChargeSteps(
        "신한 SOL페이",
        "1544-7000",
        "1544-7200"
      ),
      tips: unrecognizedChargeTips,
      officialUrl: homeUrl,
      officialActionLabel: "신한카드 공식 홈페이지 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "customer-center",
      title: "고객센터",
      keywords: [
        "신한카드 고객센터",
        "신한카드 전화번호",
        "신한카드 상담원",
        "신한카드 문의",
        "신한카드 분실신고 번호",
      ],
      quickSummary: [
        "일반 문의는 1544-7000, 카드 분실·승인 신고는 1544-7200을 이용하세요.",
        "분실 상황에서는 일반 상담을 기다리지 말고 분실신고 번호로 먼저 정지하세요.",
      ],
      phone: { number: "1544-7000", feeNote: "유료전화" },
      hours: "전화상담 평일 09:00~18:00",
      steps: [
        "분실·도난 또는 모르는 승인이라면 1544-7200으로 먼저 신고합니다.",
        "재발급·결제내역·회원정보 같은 일반 문의는 1544-7000을 이용합니다.",
        "본인인증 전 카드 비밀번호 전체나 CVC를 누구에게도 말하지 않습니다.",
      ],
      tips: [
        "전화 전에 문제가 있는 카드와 결제 금액·시간을 확인해두세요.",
        "해외에서 분실했다면 공식 홈페이지에서 해외 전용번호를 확인하세요.",
      ],
      officialUrl: arsUrl,
      officialActionLabel: "신한카드 ARS 안내 열기",
      lastChecked: "2026-08-18",
    },
  ],
};
