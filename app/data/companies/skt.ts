import type { Company } from "../types";

export const skt: Company = {
  slug: "skt",
  name: "SKT",
  categoryId: "telecom",

  aliases: [
    "SKT",
    "에스케이티",
    "SK텔레콤",
    "SK브로드밴드",
    "SKB",
  ],

  services: [
    {
      slug: "lost-phone",
      title: "휴대폰 분실·정지",

      keywords: [
        "SKT 휴대폰 분실",
        "SKT 폰 잃어버림",
        "SKT 분실신고",
        "SKT 휴대폰 정지",
        "SKT 폰 정지",
        "SK텔레콤 분실신고",
        "휴대폰 잃어버렸어 SKT",
      ],

      quickSummary: [
        "T world의 분실/정지/해제 메뉴에서 분실신고와 이용정지를 바로 진행하세요.",
        "로그인이 안 되면 다른 전화로 1599-0011, SKT 휴대폰으로 114에 연락하세요.",
      ],

      phone: {
        number: "1599-0011",
        feeNote: "다른 전화에서 이용 가능 · 유료",
      },

      hours: "분실 관련 상담 365일 · 24시간",

      steps: [
        "T world → MY → 분실/정지/해제를 엽니다.",
        "분실한 회선을 선택해 분실신고와 이용정지를 진행합니다.",
        "휴대폰을 찾으면 같은 메뉴에서 분실신고·정지를 해제합니다.",
      ],

      tips: [
        "분실신고만 하고 정지하지 않으면 월정액이나 일부 서비스 요금이 계속 발생할 수 있어요.",
        "휴대폰에 신용카드·학생증·공동인증서 등이 있었다면 해당 기관에도 별도로 신고하세요.",
        "다른 SKT 휴대폰을 사용할 수 있다면 국번 없이 114로도 문의할 수 있어요.",
      ],

      officialUrl:
        "https://m.tworld.co.kr/customer/faq/do-like-this?id=B00038",

      officialActionLabel: "T world 분실 처리 방법 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "internet-moving",
      title: "인터넷 이전설치",

      keywords: [
        "SK 인터넷 이전설치",
        "SKT 인터넷 이전설치",
        "SK브로드밴드 이전설치",
        "SK 인터넷 이전",
        "SK 인터넷 이사",
        "SKB 이전설치",
        "B tv 이전설치",
        "이사하는데 SK 인터넷 옮기기",
      ],

      quickSummary: [
        "기존 인터넷을 해지하지 말고 B world에서 이전설치를 신청하세요.",
        "새 주소와 설치 희망일을 넣은 뒤 확정된 기사 방문일만 확인하면 돼요.",
      ],

      phone: {
        number: "106",
        feeNote: "SK브로드밴드 고객센터 무료",
      },

      steps: [
        "B world 셀프서비스에서 이전설치를 선택합니다.",
        "본인인증 후 새 주소와 설치 희망일을 입력합니다.",
        "신청을 끝내고 확정된 기사 방문 일정을 확인합니다.",
      ],

      tips: [
        "새 주소에서 기존 인터넷·B tv 상품을 설치할 수 있는지 먼저 확인하세요.",
        "집전화 설치장소 변경은 온라인 이전설치가 아니라 106 고객센터 문의가 필요할 수 있어요.",
        "이전설치 비용이 발생할 수 있으므로 신청 과정에서 확인하세요.",
      ],

      officialUrl:
        "https://www.bworld.co.kr/myb/self24/main.do",

      officialActionLabel: "B world 이전설치 신청 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "billing",
      title: "요금 조회·납부",

      keywords: [
        "SKT 요금 조회",
        "SKT 요금 납부",
        "SKT 이번달 요금",
        "SKT 통신비",
        "SKT 미납요금",
        "SK텔레콤 요금 확인",
        "T world 요금 조회",
        "T world 요금 납부",
      ],

      quickSummary: [
        "T world → MY → 나의 요금에서 이번 달 청구요금을 확인하세요.",
        "미납금은 요금 납부 → 즉시 납부에서 바로 결제할 수 있어요.",
      ],

      steps: [
        "T world → MY → 나의 요금을 엽니다.",
        "청구요금이나 실시간 사용요금을 선택해 금액을 확인합니다.",
        "납부할 금액이 있으면 즉시 납부에서 결제수단을 골라 완료합니다.",
      ],

      tips: [
        "실시간 사용요금과 실제 청구요금은 서로 다를 수 있어요.",
        "자동납부 중이라면 직접 납부하기 전에 이미 결제됐는지 확인하세요.",
        "ARS로 납부하려면 국번 없이 1554를 이용하는 방법도 있어요.",
      ],

      officialUrl:
        "https://m.tworld.co.kr/customer/faq/category?id=1300000&type=03",

      officialActionLabel: "T world 요금 처리 방법 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "customer-center",
      title: "고객센터",

      keywords: [
        "SKT 고객센터",
        "SK텔레콤 고객센터",
        "SKT 전화번호",
        "SKT 상담원",
        "SK 인터넷 고객센터",
        "SK브로드밴드 고객센터",
        "B tv 고객센터",
        "SKB 고객센터",
      ],

      quickSummary: [
        "휴대폰 문의는 SKT 휴대폰에서 국번 없이 114를 이용하면 무료예요.",
        "SK브로드밴드 인터넷·B tv 문의는 106을 이용하세요.",
      ],

      phone: {
        number: "114",
        feeNote: "SKT 휴대폰에서 무료",
      },

      hours: "SKT 일반 상담 평일 09:00~18:00",

      steps: [
        "휴대폰 문의는 SKT 휴대폰에서 114로 전화합니다.",
        "다른 전화에서는 080-011-6000(무료) 또는 1599-0011(유료)을 이용합니다.",
        "인터넷·B tv 문의는 SK브로드밴드 106으로 전화합니다.",
      ],

      tips: [
        "다른 전화에서 SKT 휴대폰 고객센터는 1599-0011을 이용할 수 있어요.",
        "분실·습득·통화품질·로밍 관련 상담은 365일 24시간 운영됩니다.",
        "점심시간 12:00~13:00에는 분실·통화품질 등 긴급 상담 위주로 운영돼요.",
      ],

      officialUrl:
        "https://www.tworld.co.kr/poc/html/center/CS3.1.6.1T.html",

      lastChecked: "2026-08-18",
    },
  ],
};
