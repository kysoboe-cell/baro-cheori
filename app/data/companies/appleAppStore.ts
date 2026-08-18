import type { Company } from "../types";

export const appleAppStore: Company = {
  slug: "apple-app-store",
  name: "Apple 앱스토어",
  categoryId: "subscription",
  aliases: [
    "애플 앱스토어",
    "Apple 앱스토어",
    "앱스토어",
    "App Store",
    "Apple.com/bill",
    "애플 결제",
    "아이폰 구독",
  ],
  services: [
    {
      slug: "membership-cancel",
      title: "아이폰 구독 확인·해지",
      keywords: [
        "아이폰 구독 해지",
        "애플 자동결제 해지",
        "앱스토어 구독 취소",
        "아이폰 다음달 결제 막기",
        "애플 무료체험 해지",
      ],
      quickSummary: [
        "아이폰 [설정] → 내 이름 → [구독]에서 앱을 골라 [구독 취소]를 눌러야 다음 결제가 멈춰요.",
        "앱만 지워서는 해지되지 않습니다. 취소 버튼이 없고 만료 날짜가 보이면 이미 해지된 상태예요.",
      ],
      steps: [
        "아이폰에서 [설정]을 엽니다.",
        "화면 위의 내 이름을 누른 뒤 [구독]을 누릅니다.",
        "돈이 나가는 앱을 누릅니다.",
        "아래로 내려 [구독 취소]를 누르고 취소를 끝냅니다.",
        "앱 이름 아래에 만료 날짜가 보이는지 확인합니다.",
      ],
      tips: [
        "찾는 앱이 없다면 다른 Apple 계정으로 결제했거나 앱 회사에서 직접 결제했을 수 있어요. 이메일에서 'Apple 영수증'을 검색하세요.",
        "무료체험을 끝내려면 종료 직전까지 미루지 말고 미리 구독 취소를 끝내세요.",
      ],
      officialUrl: "https://support.apple.com/ko-kr/118428",
      officialActionLabel: "Apple 구독 취소 안내 열기",
      lastChecked: "2026-08-19",
    },
    {
      slug: "refund-request",
      title: "앱·구독 결제 환불 요청",
      keywords: [
        "애플 결제 환불",
        "앱스토어 환불",
        "아이폰 구독 환불",
        "apple com bill 환불",
        "아이폰 무료체험 결제 환불",
      ],
      quickSummary: [
        "구독 취소는 다음 결제만 막습니다. 이미 결제된 돈은 Apple [문제 신고]에서 환불을 따로 요청해야 해요.",
        "환불할 앱이 안 보이면 결제에 쓴 다른 Apple 계정이나 가족 구입 항목을 먼저 확인하세요.",
      ],
      steps: [
        "아래 [Apple 환불 요청 열기]를 누르고 결제한 Apple 계정으로 로그인합니다.",
        "[문제 선택]에서 [환불 요청]을 고릅니다.",
        "환불을 원하는 이유를 고르고 [다음]을 누릅니다.",
        "환불할 앱이나 구독을 선택하고 [제출]을 누릅니다.",
        "나중에 같은 화면의 [요청 상태 확인]에서 결과를 봅니다.",
      ],
      tips: [
        "환불 가능 여부는 구입 내용과 사용 상태에 따라 달라서 신청한다고 무조건 승인되지는 않아요.",
        "Apple은 보통 요청 결과를 24~48시간 안에 알려주지만, 승인 뒤 카드에 돈이 표시되기까지는 더 걸릴 수 있어요.",
      ],
      officialUrl: "https://reportaproblem.apple.com/",
      officialActionLabel: "Apple 환불 요청 열기",
      lastChecked: "2026-08-19",
    },
    {
      slug: "unknown-charge",
      title: "APPLE.COM/BILL 모르는 결제 찾기",
      keywords: [
        "apple com bill 모르는 결제",
        "apple.com/bill 돈나감",
        "애플 알 수 없는 결제",
        "아이폰 결제 내역 확인",
        "앱스토어 결제 뭐야",
      ],
      quickSummary: [
        "카드에 APPLE.COM/BILL이 찍혔다면 Apple 결제내역에서 같은 금액을 검색하면 어떤 앱인지 찾을 수 있어요.",
        "내역이 없으면 다른 Apple 계정이나 가족이 결제했는지 확인한 뒤, 정말 모르는 결제만 환불·보안 조치를 진행하세요.",
      ],
      steps: [
        "카드 명세서에서 결제 날짜와 금액을 적어둡니다.",
        "아래 [Apple 결제내역 확인]을 누르고 Apple 계정으로 로그인합니다.",
        "검색창에 카드에서 빠진 금액을 입력합니다.",
        "가족 공유 중이면 계정 메뉴에서 가족 구성원의 구입 항목도 확인합니다.",
        "찾은 결제가 실수라면 [환불 요청]을 선택합니다.",
        "누구도 결제하지 않았다면 Apple 계정 암호를 바꾸고 카드사에도 모르는 결제로 신고합니다.",
      ],
      tips: [
        "여러 앱 결제가 한 금액으로 묶여 표시될 수 있으니 날짜와 합계도 같이 보세요.",
        "이메일에서 'Apple 영수증' 또는 'Apple 송장'을 검색하면 결제한 Apple 계정을 찾기 쉬워요.",
      ],
      officialUrl: "https://reportaproblem.apple.com/",
      officialActionLabel: "Apple 결제내역 확인",
      lastChecked: "2026-08-19",
    },
  ],
};
