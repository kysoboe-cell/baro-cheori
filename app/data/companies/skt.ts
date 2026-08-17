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
        "전화하지 않아도 T world에서 휴대폰 분실신고와 정지를 직접 신청할 수 있어요.",
        "분실신고만 하지 말고 분실정지도 함께 확인하는 것이 안전해요.",
      ],

      phone: {
        number: "1599-0011",
        feeNote: "다른 전화에서 이용 가능 · 유료",
      },

      hours: "분실 관련 상담 365일 · 24시간",

      steps: [
        "T world에 로그인합니다.",
        "MY → 분실/정지/해제로 들어갑니다.",
        "휴대폰 분실/정지/해제를 선택합니다.",
        "휴대폰 분실신고와 필요한 정지를 진행합니다.",
        "휴대폰을 다시 찾았다면 같은 메뉴에서 분실신고·정지를 해제합니다.",
      ],

      tips: [
        "분실신고만 하고 정지하지 않으면 월정액이나 일부 서비스 요금이 계속 발생할 수 있어요.",
        "휴대폰에 신용카드·학생증·공동인증서 등이 있었다면 해당 기관에도 별도로 신고하세요.",
        "다른 SKT 휴대폰을 사용할 수 있다면 국번 없이 114로도 문의할 수 있어요.",
      ],

      officialUrl:
        "https://m.tworld.co.kr/customer/faq/do-like-this?id=B00038",

      lastChecked: "2026-08-17",
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
        "이사한다고 기존 인터넷을 먼저 해지하지 마세요.",
        "B world에서 새 주소와 원하는 날짜를 입력해 이전설치를 직접 신청할 수 있어요.",
      ],

      phone: {
        number: "106",
        feeNote: "SK브로드밴드 고객센터 무료",
      },

      steps: [
        "새로 이사할 주소와 원하는 설치 날짜를 준비합니다.",
        "B world 이전설치 신청 페이지로 들어갑니다.",
        "본인인증을 진행합니다.",
        "설치할 새 주소와 원하는 날짜를 입력합니다.",
        "신청을 완료하고 확정된 방문 일정을 확인합니다.",
      ],

      tips: [
        "새 주소에서 기존 인터넷·B tv 상품을 설치할 수 있는지 먼저 확인하세요.",
        "집전화 설치장소 변경은 온라인 이전설치가 아니라 106 고객센터 문의가 필요할 수 있어요.",
        "이전설치 비용이 발생할 수 있으므로 신청 과정에서 확인하세요.",
      ],

      officialUrl:
        "https://www.bworld.co.kr/myb/self24/main.do",

      lastChecked: "2026-08-17",
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
        "고객센터에 전화하지 않아도 T world에서 사용요금과 청구요금을 확인할 수 있어요.",
        "T world 앱에서 원하는 결제수단으로 요금을 바로 납부할 수도 있어요.",
      ],

      steps: [
        "T world 앱 또는 홈페이지에 로그인합니다.",
        "MY → 나의 요금으로 들어갑니다.",
        "확인하려는 청구요금이나 사용요금을 확인합니다.",
        "납부가 필요하면 요금 납부 → 즉시 납부를 선택합니다.",
        "원하는 결제수단을 선택해 납부를 완료합니다.",
      ],

      tips: [
        "실시간 사용요금과 실제 청구요금은 서로 다를 수 있어요.",
        "자동납부 중이라면 직접 납부하기 전에 이미 결제됐는지 확인하세요.",
        "ARS로 납부하려면 국번 없이 1554를 이용하는 방법도 있어요.",
      ],

      officialUrl:
        "https://m.tworld.co.kr/customer/faq/category?id=1300000&type=03",

      lastChecked: "2026-08-17",
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
        "먼저 휴대폰 문의인지 인터넷·B tv 문의인지 확인합니다.",
        "SKT 휴대폰 문의라면 국번 없이 114로 전화합니다.",
        "인터넷·B tv 문의라면 SK브로드밴드 106으로 전화합니다.",
        "ARS에서 필요한 업무를 선택합니다.",
      ],

      tips: [
        "다른 전화에서 SKT 휴대폰 고객센터는 1599-0011을 이용할 수 있어요.",
        "분실·습득·통화품질·로밍 관련 상담은 365일 24시간 운영됩니다.",
        "전화하기 전에 분실신고·요금납부·이전설치처럼 온라인에서 직접 가능한 업무인지 먼저 확인하세요.",
      ],

      officialUrl:
        "https://www.tworld.co.kr/poc/html/center/CS3.1.6.1T.html",

      lastChecked: "2026-08-17",
    },
  ],
};