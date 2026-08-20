import type { Company } from "../types";

export const youtubePremium: Company = {
  slug: "youtube-premium",
  name: "유튜브 프리미엄",
  categoryId: "subscription",
  aliases: ["유튜브 프리미엄", "유튜브", "youtube premium", "youtube"],
  services: [
    {
      slug: "membership-cancel",
      title: "멤버십 해지·다음 결제 막기",
      keywords: [
        "유튜브 프리미엄 해지",
        "유튜브 구독 취소",
        "유튜브 자동결제 해지",
        "유튜브 프리미엄 다음달 결제 막기",
      ],
      quickSummary: [
        "유튜브 [구매 항목 및 멤버십]에서 [멤버십 관리] → [비활성화]를 눌러야 다음 결제가 멈춰요.",
        "아이폰에서 애플로 결제했다면 아이폰 [설정]의 구독 메뉴에서 해지해야 합니다.",
      ],
      steps: [
        "유튜브의 [구매 항목 및 멤버십]을 엽니다.",
        "Premium 아래의 [멤버십 관리]를 누릅니다.",
        "[비활성화]를 누르고 [그대로 취소]를 선택합니다.",
        "해지 이유를 고른 뒤 [Premium 취소]를 누릅니다.",
        "멤버십 화면에 혜택 종료 날짜가 보이는지 확인합니다.",
      ],
      tips: [
        "애플 결제라면 아이폰 [설정] → 내 이름 → [구독] → YouTube → [구독 취소]로 들어가세요.",
        "구글플레이 결제라면 Play 스토어의 [정기 결제]에서도 해지할 수 있어요.",
      ],
      officialUrl: "https://www.youtube.com/paid_memberships",
      officialActionLabel: "유튜브 멤버십 관리 열기",
      faq: [
        {
          question: "해지 버튼이 안 보여요",
          answer:
            "가입 경로(웹·Apple·Google Play)에 따라 해지 메뉴 위치가 달라요. Apple로 가입했다면 유튜브 앱이 아니라 아이폰 설정의 구독 관리에서 해지해야 해요.",
        },
        {
          question: "가족 요금제 관리자가 해지하면 전체가 끊기나요?",
          answer:
            "네, 관리자가 해지하면 가족 구성원 전체의 프리미엄 혜택이 함께 종료돼요.",
        },
      ],
      lastChecked: "2026-08-20",
    },
    {
      slug: "refund-request",
      title: "이미 결제된 금액 환불 요청",
      keywords: [
        "유튜브 프리미엄 환불",
        "유튜브 결제 취소",
        "유튜브 프리미엄 돈 돌려받기",
        "유튜브 무료체험 결제 환불",
      ],
      quickSummary: [
        "해지만 누르면 다음 결제만 멈추고, 이미 결제된 돈이 자동 환불되지는 않아요.",
        "결제내역에 Apple이 보이면 애플에, Google·YouTube가 보이면 유튜브 환불 화면에 요청하세요.",
      ],
      steps: [
        "카드·계좌 결제내역에서 결제처가 Apple인지 Google·YouTube인지 봅니다.",
        "Google·YouTube 결제라면 아래 공식 환불 안내를 엽니다.",
        "로그인하고 환불할 Premium 결제를 선택해 요청을 보냅니다.",
        "Apple 결제라면 애플의 [문제 신고] 사이트에서 해당 결제를 골라 환불을 요청합니다.",
        "이메일로 온 접수 결과를 보관합니다.",
      ],
      tips: [
        "환불 가능 여부는 결제한 곳과 사용 상태에 따라 달라요. 신청 화면에서 결과를 확인해야 합니다.",
        "환불을 요청해도 다음 결제를 막으려면 멤버십 해지를 따로 끝내세요.",
      ],
      officialUrl: "https://support.google.com/youtube/answer/12014038?hl=ko",
      officialActionLabel: "유튜브 환불 안내 열기",
      faq: [
        {
          question: "Apple 결제와 Google 결제 환불이 왜 다른가요?",
          answer:
            "앱스토어를 통해 가입했으면 Apple이 결제를 처리해서, 환불도 Apple 쪽에서 진행돼요.",
        },
        {
          question: "가족 요금제도 환불 대상인가요?",
          answer:
            "가능하지만 요금제 유형에 따라 결제 단위가 달라서, 환불 화면에서 개별로 확인해야 해요.",
        },
      ],
      lastChecked: "2026-08-20",
    },
    {
      slug: "charged-after-cancel",
      title: "해지했는데 결제됨",
      keywords: [
        "유튜브 해지했는데 결제",
        "유튜브 프리미엄 취소했는데 돈나감",
        "유튜브 모르는 결제",
        "유튜브 자동결제 됨",
      ],
      quickSummary: [
        "[구매 항목 및 멤버십]에서 해지한 계정과 지금 로그인한 계정이 같은지 먼저 보세요.",
        "가족 계정·다른 구글 계정이나 애플 구독에 남아 있으면 결제가 계속될 수 있어요.",
      ],
      steps: [
        "유튜브 [구매 항목 및 멤버십]에서 현재 멤버십 상태를 봅니다.",
        "구글 계정이 여러 개라면 오른쪽 위 프로필을 눌러 다른 계정도 확인합니다.",
        "아이폰 [설정] → 내 이름 → [구독]에도 YouTube가 남아 있는지 봅니다.",
        "살아 있는 멤버십을 먼저 해지합니다.",
        "결제한 곳을 확인한 뒤 유튜브 또는 애플에 환불을 요청합니다.",
      ],
      tips: [
        "해지 후에도 결제기간 끝까지 Premium이 보이는 것은 정상이에요. 다음 결제 날짜가 사라졌는지를 보세요.",
        "카드 명세의 결제처가 Apple이면 유튜브가 아니라 애플에서 결제와 환불을 처리해요.",
      ],
      officialUrl: "https://www.youtube.com/paid_memberships",
      officialActionLabel: "유튜브 결제·멤버십 확인하기",
      lastChecked: "2026-08-19",
    },
  ],
};
