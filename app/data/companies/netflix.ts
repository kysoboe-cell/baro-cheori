import type { Company } from "../types";

export const netflix: Company = {
  slug: "netflix",
  name: "넷플릭스",
  categoryId: "subscription",
  aliases: ["넷플릭스", "netflix", "넷플"],
  services: [
    {
      slug: "membership-cancel",
      title: "멤버십 해지·다음 결제 막기",
      keywords: [
        "넷플릭스 해지",
        "넷플릭스 구독 취소",
        "넷플릭스 자동결제 해지",
        "넷플릭스 다음달 결제 막기",
        "넷플릭스 탈퇴",
      ],
      quickSummary: [
        "넷플릭스 계정의 [멤버십 해지]를 눌러야 다음 결제가 멈춰요. 앱만 지우면 해지되지 않습니다.",
        "해지해도 이미 결제한 이용기간이 끝날 때까지는 볼 수 있어요.",
      ],
      steps: [
        "넷플릭스 앱 오른쪽 아래 [나의 넷플릭스]를 누릅니다.",
        "왼쪽 위 프로필 이름(▾)을 누릅니다.",
        "프로필 창에서 [계정]을 누릅니다.",
        "계정 화면을 맨 아래까지 내립니다.",
        "맨 아래 [멤버십 해지]를 누릅니다. 바로 아래 [계정 삭제]는 누르지 마세요.",
        "'멤버십을 직접 관리하세요' 화면에서 [해지 +]를 누릅니다.",
        "펼쳐진 검은 [해지 완료] 버튼을 누릅니다. 파란 버튼이 아니라 검은 버튼이 진짜 해지입니다.",
        "화면에 \"○월 ○일부터 효력이 발생합니다\"가 보이면 끝. 그날까지는 계속 볼 수 있어요.",
      ],
      keyStepIndexes: [0, 4, 6],
      tips: [
        "[해지] 버튼이 없다면 카드가 아니라 통신사·앱스토어 같은 결제 업체에서 해지해야 할 수 있어요. 계정 화면의 결제 정보를 먼저 보세요.",
        "프로필 삭제, 로그아웃, 앱 삭제는 멤버십 해지가 아니에요.",
      ],
      officialUrl: "https://www.netflix.com/cancelplan",
      officialActionLabel: "넷플릭스 해지 화면 열기",
      screenshotGuide: {
        checkedAt: "2026-08-20",
        basis: "넷플릭스 안드로이드 앱 화면 기준",
        steps: [
          {
            n: 1,
            img: "/images/guides/netflix-cancel/step1.webp",
            thumb: "/images/guides/netflix-cancel/step1-thumb.webp",
            label: "나의 넷플릭스",
            caption: "앱 오른쪽 아래 [나의 넷플릭스]를 누릅니다.",
            alt: "넷플릭스 앱 홈 화면. 하단 탭 오른쪽 끝 '나의 넷플릭스'에 표시",
            linkedStep: 1,
            howToImage: true,
          },
          {
            n: 2,
            img: "/images/guides/netflix-cancel/step2.webp",
            thumb: "/images/guides/netflix-cancel/step2-thumb.webp",
            label: "프로필 이름",
            caption: "왼쪽 위 프로필 이름(▾)을 누릅니다.",
            alt: "나의 넷플릭스 화면. 왼쪽 위 프로필 아바타와 이름, 아래 화살표에 표시",
            linkedStep: 2,
          },
          {
            n: 3,
            img: "/images/guides/netflix-cancel/step3.webp",
            thumb: "/images/guides/netflix-cancel/step3-thumb.webp",
            label: "계정",
            caption: "프로필 창에서 [계정]을 누릅니다.",
            alt: "프로필 창. '앱 설정' 아래 '계정' 메뉴에 표시",
            linkedStep: 3,
          },
          {
            n: 4,
            img: "/images/guides/netflix-cancel/step4.webp",
            thumb: "/images/guides/netflix-cancel/step4-thumb.webp",
            label: "아래로 스크롤",
            caption: "계정 화면을 맨 아래까지 내립니다.",
            alt: "계정 화면. 멤버십 정보와 보안 항목, 아래로 내리라는 화살표",
            linkedStep: 4,
          },
          {
            n: 5,
            img: "/images/guides/netflix-cancel/step5.webp",
            thumb: "/images/guides/netflix-cancel/step5-thumb.webp",
            label: "멤버십 해지",
            caption:
              "맨 아래 [멤버십 해지]를 누릅니다. 바로 아래 [계정 삭제]는 누르지 마세요.",
            alt: "계정 화면 맨 아래. 흰색 '멤버십 해지' 버튼에 표시, 그 아래 '계정 삭제' 버튼",
            linkedStep: 5,
            howToImage: true,
          },
          {
            n: 6,
            img: "/images/guides/netflix-cancel/step6.webp",
            thumb: "/images/guides/netflix-cancel/step6-thumb.webp",
            label: "해지 +",
            caption: "'멤버십을 직접 관리하세요' 화면에서 [해지 +]를 누릅니다.",
            alt: "멤버십 관리 화면. '멤버십 변경' 아래 '해지' 카드의 + 표시에 표시",
            linkedStep: 6,
          },
          {
            n: 7,
            img: "/images/guides/netflix-cancel/step7.webp",
            thumb: "/images/guides/netflix-cancel/step7-thumb.webp",
            label: "해지 완료",
            caption:
              "펼쳐진 검은 [해지 완료] 버튼이 진짜 해지입니다. 누르면 바로 접수돼요.",
            alt: "해지 카드가 펼쳐져 검은색 '해지 완료' 버튼이 보이는 화면",
            linkedStep: 7,
            howToImage: true,
          },
        ],
      },
      faq: [
        {
          question: "해지했는데 왜 앱이 계속 보이나요?",
          answer:
            "결제 주기가 끝나는 날까지는 이용이 유지되는 게 정상이에요. 해지했다고 즉시 접속이 끊기는 게 아니에요.",
        },
        {
          question: "해지를 취소하고 싶어요",
          answer:
            "결제일 전이라면 계정 화면에서 멤버십 재시작이 대부분 가능해요.",
        },
        {
          question: "통신사 결합으로 가입했는데 해지가 안 돼요",
          answer:
            "통신사 제휴 상품은 넷플릭스 앱이 아니라 가입한 통신사 쪽에서 해지해야 하는 경우가 있어요.",
        },
      ],
      lastChecked: "2026-08-20",
    },
    {
      slug: "charged-after-cancel",
      title: "해지했는데 결제됨",
      keywords: [
        "넷플릭스 해지했는데 결제",
        "넷플릭스 취소했는데 돈나감",
        "넷플릭스 해지 후 결제",
        "넷플릭스 모르는 결제",
        "넷플릭스 환불",
      ],
      quickSummary: [
        "먼저 넷플릭스 [계정]에서 해지 완료 여부와 결제 날짜를 확인하세요.",
        "해지가 끝나지 않았거나 누군가 계정을 다시 시작했다면 결제가 이어질 수 있어요.",
      ],
      steps: [
        "넷플릭스 [계정]에서 멤버십 상태와 다음 결제 날짜를 봅니다.",
        "[결제 상세 정보]에서 실제로 빠져나간 날짜와 금액을 확인합니다.",
        "멤버십이 아직 이용 중이면 먼저 [멤버십 해지]를 끝냅니다.",
        "내가 다시 시작하지 않았다면 비밀번호를 바꾸고 모든 기기에서 로그아웃합니다.",
        "결제 상세와 해지 기록을 준비해 넷플릭스 고객센터의 채팅으로 환불 가능 여부를 문의합니다.",
      ],
      tips: [
        "해지했다고 생각한 날짜와 실제 해지 완료 날짜가 다를 수 있어요. 해지 확인 메일도 함께 찾아보세요.",
        "카드 명세에 넷플릭스가 아닌 통신사·애플·구글로 찍혔다면 그 결제 업체에서 내역을 확인해야 해요.",
      ],
      officialUrl: "https://help.netflix.com/ko/node/41049",
      officialActionLabel: "넷플릭스 결제내역 확인하기",
      faq: [
        {
          question: "해지했는데도 또 결제된 이유는?",
          answer:
            "해지 신청과 실제 해지 완료 시점이 다르거나, 다른 사람이 계정을 재구독했을 가능성이 있어요.",
        },
        {
          question: "환불이 잘 안 되는 편인가요?",
          answer:
            "넷플릭스는 이용 기간에 따라 환불 여부가 갈리는 경우가 많아요. 채팅 상담으로 개별 확인이 필요해요.",
        },
        {
          question: "결제처가 넷플릭스가 아니라 통신사로 찍혀요",
          answer:
            "통신사 제휴 결제(이동통신 요금 합산 등)일 수 있어요. 그 통신사 고객센터에서도 확인해야 해요.",
        },
      ],
      lastChecked: "2026-08-20",
    },
    {
      slug: "payment-method",
      title: "결제수단 확인·변경",
      keywords: [
        "넷플릭스 결제수단 변경",
        "넷플릭스 카드 변경",
        "넷플릭스 결제 카드 확인",
        "넷플릭스 결제 오류",
      ],
      quickSummary: [
        "넷플릭스 [계정]의 [결제 수단 관리]에서 현재 카드와 새 결제수단을 확인하세요.",
        "통신사나 앱스토어로 결제 중이면 넷플릭스가 아니라 그 결제 업체에서 바꿔야 합니다.",
      ],
      steps: [
        "넷플릭스에 로그인하고 [계정]을 엽니다.",
        "[결제 수단 관리]를 누릅니다.",
        "[결제 수단 등록]에서 새 카드나 결제수단을 넣습니다.",
        "새 결제수단이 기본으로 표시되는지 확인합니다.",
      ],
      tips: [
        "결제 업체가 통신사·애플·구글로 표시되면 해당 업체의 결제수단을 바꿔야 해요.",
        "결제수단만 지우는 것은 멤버십 해지가 아니에요. 구독을 끝내려면 [멤버십 해지]도 따로 눌러야 합니다.",
      ],
      officialUrl: "https://www.netflix.com/account",
      officialActionLabel: "넷플릭스 계정 열기",
      lastChecked: "2026-08-19",
    },
  ],
};
