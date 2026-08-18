import type { Company } from "../types";
import {
  cardReissueTips,
  lostCardTips,
  makeCardReissueSteps,
  makeLostCardSteps,
  makeUnrecognizedChargeSteps,
  unrecognizedChargeTips,
} from "../cardCommon";

const supportUrl =
  "https://card.kbcard.com/SVC/DVIEW/HSEMCXCRSZZC0001";
const lostArsUrl =
  "https://card.kbcard.com/CMN/DVIEW/HSGMCXCRSCSC0030";
const reissueArsUrl =
  "https://card.kbcard.com/CMN/DVIEW/HSGMCXCRSCSC0031";

export const kbCard: Company = {
  slug: "kb-card",
  name: "KB국민카드",
  categoryId: "card",
  aliases: ["KB국민카드", "국민카드", "KB카드", "케이비국민카드"],
  services: [
    {
      slug: "lost-card",
      title: "카드 분실·즉시 정지",
      keywords: [
        "KB국민카드 분실신고",
        "국민카드 잃어버림",
        "KB카드 정지",
        "국민카드 도난",
        "국민카드 분실 전화번호",
      ],
      quickSummary: [
        "카드가 보이지 않으면 찾으러 다니기 전에 1588-1788에서 즉시 분실신고하세요.",
        "분실신고는 24시간 가능하며, 최근 이용내역에 모르는 결제가 있으면 부정사용도 함께 접수하세요.",
      ],
      phone: { number: "1588-1788", feeNote: "분실신고·가맹점승인 · 유료" },
      hours: "도난·분실신고 및 해제 24시간 · 연중무휴",
      steps: makeLostCardSteps("KB국민카드", "1588-1788"),
      tips: lostCardTips,
      officialUrl: lostArsUrl,
      officialActionLabel: "KB국민카드 분실신고 안내 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "card-reissue",
      title: "카드 재발급",
      keywords: [
        "KB국민카드 재발급",
        "국민카드 분실 재발급",
        "KB카드 훼손 재발급",
        "국민카드 다시 발급",
        "국민카드 재발급 전화번호",
      ],
      quickSummary: [
        "분실했다면 먼저 1588-1788로 이용정지를 끝낸 뒤 재발급을 신청하세요.",
        "KB Pay·홈페이지에서 재발급 메뉴가 보이지 않으면 결제·각종변경 ARS 1899-0800을 이용하세요.",
      ],
      phone: { number: "1899-0800", feeNote: "결제·각종변경(등록) · 유료" },
      hours: "카드 발급·훼손 재발급 상담 평일 09:00~18:00",
      steps: makeCardReissueSteps("KB Pay 또는 KB국민카드 홈페이지", "1899-0800"),
      tips: cardReissueTips,
      officialUrl: reissueArsUrl,
      officialActionLabel: "KB국민카드 재발급 ARS 안내 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "unrecognized-charge",
      title: "모르는 결제·부정사용 신고",
      keywords: [
        "KB국민카드 모르는 결제",
        "국민카드 부정사용",
        "KB카드 결제한적 없음",
        "국민카드 해외결제 모름",
        "국민카드 이용대금 이의신청",
      ],
      quickSummary: [
        "KB Pay 이용내역에서 금액·시간·가맹점 이름을 저장하고 본인 결제인지 빠르게 확인하세요.",
        "모르는 결제거나 추가 승인이 걱정되면 1588-1788로 카드부터 정지하고 1588-1688에 이의신청을 문의하세요.",
      ],
      phone: { number: "1588-1688", feeNote: "KB국민카드 고객센터 · 유료" },
      hours: "일반 상담 평일 09:00~18:00 · 분실·금융사고 신고 24시간",
      steps: makeUnrecognizedChargeSteps(
        "KB Pay 또는 KB국민카드 홈페이지",
        "1588-1688",
        "1588-1788"
      ),
      tips: unrecognizedChargeTips,
      officialUrl: supportUrl,
      officialActionLabel: "KB국민카드 이의신청 안내 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "customer-center",
      title: "고객센터",
      keywords: [
        "KB국민카드 고객센터",
        "국민카드 전화번호",
        "KB카드 상담원",
        "국민카드 문의",
        "국민카드 분실신고 번호",
      ],
      quickSummary: [
        "일반 문의는 1588-1688, 분실신고는 24시간 1588-1788을 이용하세요.",
        "분실 상황에서는 일반 상담을 기다리지 말고 분실신고 전용번호로 먼저 정지하세요.",
      ],
      phone: { number: "1588-1688", feeNote: "유료전화" },
      hours: "일반 상담 평일 09:00~18:00 · 분실신고 24시간",
      steps: [
        "분실·도난이면 1588-1788로 즉시 신고합니다.",
        "결제내역·재발급·회원정보 같은 일반 문의는 1588-1688을 이용합니다.",
        "본인인증 전 카드 비밀번호 전체나 CVC를 누구에게도 말하지 않습니다.",
      ],
      tips: [
        "전화 전에 문제가 있는 카드와 결제 금액·시간을 확인해두세요.",
        "해외에서 분실했다면 공식 고객센터 페이지에서 해외 전용번호를 확인하세요.",
      ],
      officialUrl: supportUrl,
      officialActionLabel: "KB국민카드 고객센터 열기",
      lastChecked: "2026-08-18",
    },
  ],
};
