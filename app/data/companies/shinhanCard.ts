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
const arsUrl = "https://www.shinhancard.com/pconts/html/bridge/2012734_40832.html";

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
      officialActionLabel: "신한카드 상담 안내 열기",
      faq: [
        {
          question: "분실신고 후 바로 재발급 신청까지 해야 하나요?",
          answer:
            "재발급은 급하지 않다면 나중에 해도 돼요. 다만 이용정지(분실신고)는 발견 즉시 하는 게 중요해요.",
        },
        {
          question: "카드를 다시 찾으면 신고 취소가 되나요?",
          answer:
            "대부분 카드사에서 분실신고 해제가 가능해요. 다만 이미 재발급이 진행됐다면 기존 카드는 사용 못하는 경우가 많아요.",
        },
        {
          question: "모바일 카드(삼성페이 등)도 같이 정지되나요?",
          answer:
            "카드 실물 분실신고 시 연동된 모바일 카드도 함께 정지되는 경우가 일반적이에요. 다만 앱에서 별도로 확인하는 걸 추천해요.",
        },
        {
          question: "신한카드 분실신고 전화번호가 여러 개던데요?",
          answer:
            "카드 종류(개인·법인)에 따라 안내 번호가 다를 수 있어요. 카드 뒷면 번호를 확인하는 게 가장 정확해요.",
        },
      ],
      lastChecked: "2026-08-21",
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
      faq: [
        {
          question: "재발급 카드는 며칠 걸리나요?",
          answer:
            "신청 후 통상 며칠~1주 내외로 배송되는 경우가 많아요. 카드사·배송지역에 따라 달라요.",
        },
        {
          question: "재발급하면 카드번호가 바뀌나요?",
          answer:
            "분실로 인한 재발급은 보안상 카드번호가 바뀌는 경우가 일반적이에요. 이 경우 자동이체·정기결제를 다시 등록해야 해요.",
        },
        {
          question: "급하게 필요하면 즉시발급도 되나요?",
          answer:
            "일부 카드사는 영업점 즉시발급(실물 카드 바로 수령)을 지원해요. 급한 경우 앱·홈페이지에서 즉시발급 가능 여부를 확인하세요.",
        },
      ],
      lastChecked: "2026-08-20",
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
      faq: [
        {
          question: "신고하면 카드가 바로 정지되나요?",
          answer:
            "부정사용 신고와 별개로, 확실하지 않은 결제라면 먼저 카드 이용정지부터 하는 걸 권장해요(추가 피해 방지).",
        },
        {
          question: "조사 결과가 나올 때까지 얼마나 걸리나요?",
          answer:
            "카드사·사안에 따라 다르지만 통상 1~2주 내외 걸릴 수 있어요.",
        },
        {
          question: "확정된 부정사용이면 결제금액을 안 내도 되나요?",
          answer:
            "카드사 조사에서 부정사용으로 확정되면 해당 금액은 보통 취소·보상 처리돼요. 다만 본인 비밀번호·인증정보 유출 정황이 있으면 책임 비율이 달라질 수 있어요.",
        },
        {
          question: "신한 SOL페이 결제도 같은 방식으로 신고하나요?",
          answer:
            "앱 결제도 카드 실물 결제와 동일하게 카드사 부정사용 신고 절차를 따라요.",
        },
      ],
      lastChecked: "2026-08-20",
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
      officialActionLabel: "신한카드 상담 안내 열기",
      lastChecked: "2026-08-21",
    },
  ],
};
