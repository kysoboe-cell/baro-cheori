import type { Company } from "../types";

export const googlePlay: Company = {
  slug: "google-play",
  name: "Google Play",
  categoryId: "subscription",
  aliases: [
    "구글 플레이",
    "Google Play",
    "구글",
    "Google",
    "플레이스토어",
    "Play 스토어",
    "구글 결제",
    "GOOGLE 결제",
    "구글 아시아",
  ],
  services: [
    {
      slug: "membership-cancel",
      title: "안드로이드 구독 확인·해지",
      keywords: [
        "구글 플레이 구독 해지",
        "플레이스토어 자동결제 해지",
        "안드로이드 구독 취소",
        "구글 다음달 결제 막기",
        "구글 무료체험 해지",
      ],
      quickSummary: [
        "Play 스토어 → 프로필 사진 → [결제 및 정기 결제] → [정기 결제]에서 앱을 골라 취소하세요.",
        "앱을 삭제해도 구독은 취소되지 않습니다. 목록이 비었다면 다른 구글 계정도 확인하세요.",
      ],
      steps: [
        "안드로이드에서 [Play 스토어]를 엽니다.",
        "오른쪽 위 프로필 사진을 누릅니다.",
        "[결제 및 정기 결제] → [정기 결제]를 누릅니다.",
        "돈이 나가는 앱을 고르고 [정기 결제 취소]를 누릅니다.",
        "종료 날짜가 표시되는지 확인합니다.",
      ],
      tips: [
        "구독이 안 보이면 프로필 사진을 눌러 다른 구글 계정으로 바꾼 뒤 다시 확인하세요.",
        "취소해도 이미 결제한 기간이 끝날 때까지는 앱을 사용할 수 있어요.",
      ],
      officialUrl: "https://play.google.com/store/account/subscriptions",
      officialActionLabel: "Google Play 정기 결제 열기",
      lastChecked: "2026-08-19",
    },
    {
      slug: "refund-request",
      title: "앱·구독 결제 환불 요청",
      keywords: [
        "구글 플레이 환불",
        "플레이스토어 결제 취소",
        "안드로이드 구독 환불",
        "구글 무료체험 결제 환불",
        "google 결제 돈 돌려받기",
      ],
      quickSummary: [
        "정기 결제 취소는 다음 결제만 막습니다. 이미 빠진 돈은 Google Play 환불 화면에서 따로 요청하세요.",
        "환불할 주문이 안 보이면 결제에 사용한 다른 구글 계정으로 바꿔 보세요.",
      ],
      steps: [
        "아래 [Google Play 환불 요청 열기]를 누릅니다.",
        "결제한 구글 계정으로 로그인합니다.",
        "환불할 주문을 고르고 문제에 맞는 이유를 선택합니다.",
        "환불을 원하는 내용을 짧게 적고 [제출]을 누릅니다.",
        "이메일로 오는 결과를 확인합니다.",
      ],
      tips: [
        "환불 가능 여부는 상품, 결제 시기, 사용 상태에 따라 달라요. 결제를 발견하면 미루지 말고 바로 요청하세요.",
        "Google Play는 보통 하루 안에 결과를 보내지만 최대 4일이 걸릴 수 있다고 안내해요.",
      ],
      officialUrl: "https://support.google.com/googleplay/answer/15574897?hl=ko",
      officialActionLabel: "Google Play 환불 요청 열기",
      faq: [
        {
          question: "구매 후 몇 시간 안에는 자동 환불되나요?",
          answer:
            "Google Play는 구매 직후 짧은 시간 안에는 간편 취소가 되는 경우가 있어요. 시간이 지나면 개별 신청이 필요해요.",
        },
        {
          question: "게임 인앱결제도 같은 방식인가요?",
          answer:
            "네. 구독뿐 아니라 앱 내 구매도 같은 환불 신청 화면에서 처리해요.",
        },
      ],
      lastChecked: "2026-08-20",
    },
    {
      slug: "unknown-charge",
      title: "GOOGLE 모르는 결제 찾기·신고",
      keywords: [
        "google 모르는 결제",
        "구글 결제 뭐야",
        "구글 플레이 돈나감",
        "google 앱 결제 신고",
        "구글 아시아 결제",
        "플레이스토어 결제내역 확인",
      ],
      quickSummary: [
        "카드 명세가 GOOGLE*앱 이름으로 시작한다면 Google Play 주문내역에서 같은 금액을 찾아보세요.",
        "가족도 결제하지 않았다면 단순 환불이 아니라 [승인되지 않은 거래]로 신고해야 합니다.",
      ],
      steps: [
        "카드 명세서에서 GOOGLE 뒤의 앱 이름, 날짜, 금액을 적어둡니다.",
        "Google Play의 [예산 및 주문 내역]에서 같은 결제를 찾습니다.",
        "구글 계정이 여러 개라면 계정을 바꿔가며 주문내역을 확인합니다.",
        "가족이 실수로 결제했다면 일반 환불을 요청합니다.",
        "누구도 결제하지 않았다면 아래 공식 화면에서 [승인되지 않은 거래]로 신고합니다.",
        "구글 계정 암호를 바꾸고 저장된 결제수단도 확인합니다.",
      ],
      tips: [
        "Google Play 결제는 카드 명세에 GOOGLE*앱 이름 또는 GOOGLE*콘텐츠 종류처럼 표시돼요.",
        "공식 정책은 본인이나 아는 사람이 결제하지 않은 거래를 거래일로부터 120일 안에 신고하도록 안내합니다.",
      ],
      officialUrl: "https://payments.google.com/payments/u/0/unauthorizedtransactions",
      officialActionLabel: "Google 승인되지 않은 거래 신고",
      lastChecked: "2026-08-19",
    },
  ],
};
