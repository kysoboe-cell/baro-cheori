import type { Company } from "../types";

export const kt: Company = {
  slug: "kt",
  name: "KT",
  categoryId: "telecom",

  aliases: [
    "KT",
    "케이티",
  ],

  services: [
    {
      slug: "lost-phone",
      title: "휴대폰 분실·정지",

      keywords: [
        "KT 휴대폰 분실",
        "KT 폰 잃어버림",
        "KT 분실신고",
        "KT 휴대폰 정지",
        "KT 폰 정지",
        "케이티 분실신고",
        "휴대폰 잃어버렸어 KT",
      ],

      quickSummary: [
        "KT 분실신고 페이지에서 분실한 회선을 선택해 바로 신고하세요.",
        "로그인이 안 되면 다른 전화로 1588-0010, KT 휴대폰으로 114에 연락하세요.",
      ],

      phone: {
        number: "1588-0010",
        feeNote: "다른 전화에서 이용 가능 · 유료",
      },

      hours: "분실접수·일시정지 관련 상담 24시간",

      steps: [
        "KT 분실신고 페이지에서 로그인 또는 본인인증을 합니다.",
        "분실한 회선을 골라 분실신고와 필요한 일시정지를 진행합니다.",
        "휴대폰을 찾으면 같은 페이지에서 분실신고를 해제합니다.",
      ],

      tips: [
        "사용할 수 있는 다른 KT 휴대폰이 있다면 국번 없이 114로 고객센터에 연락할 수도 있어요.",
        "휴대폰 안에 카드·인증서·결제수단이 있었다면 해당 서비스도 함께 확인하는 것이 좋아요.",
      ],

      officialUrl:
        "https://help.kt.com/lostphone/LostReportOrCancel.do",

      lastChecked: "2026-08-18",
    },

    {
      slug: "internet-moving",
      title: "인터넷 이전설치",

      keywords: [
        "KT 인터넷 이전설치",
        "KT 인터넷 이전",
        "KT 이사 인터넷",
        "KT 인터넷 이사",
        "KT 설치장소 변경",
        "케이티 인터넷 이전",
        "이사하는데 KT 인터넷 옮기기",
      ],

      quickSummary: [
        "기존 인터넷을 해지하지 말고 KT닷컴에서 설치장소 변경을 신청하세요.",
        "새 주소와 설치·철거 희망일을 정한 뒤 예상 비용을 확인하면 돼요.",
      ],

      phone: {
        number: "100",
        feeNote: "KT 인터넷·TV·전화 고객센터",
      },

      steps: [
        "KT 설치장소 변경 안내에서 신청 메뉴를 엽니다.",
        "새 주소와 기존 장소 철거일, 새 장소 설치 희망일을 입력합니다.",
        "예상 이전 비용을 확인하고 신청한 뒤 방문 일정을 확인합니다.",
      ],

      tips: [
        "새 주소에서 KT 인터넷 설치가 가능한지 신청 과정에서 확인하세요.",
        "기사 출동이나 이전설치에 비용이 발생할 수 있으므로 신청 화면에서 비용을 확인하세요.",
      ],

      officialUrl:
        "https://help.kt.com/servicetip/ServiceTipInfo.do?idx=1003",

      officialActionLabel: "KT 이전설치 신청 방법 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "billing",
      title: "요금 조회·납부",

      keywords: [
        "KT 요금 조회",
        "KT 요금 납부",
        "KT 이번달 요금",
        "KT 통신비",
        "KT 미납요금",
        "KT 요금 확인",
        "마이케이티 요금",
        "마이케이티 납부",
      ],

      quickSummary: [
        "마이케이티 → 마이 → 요금/서비스에서 이번 달 요금을 확인하세요.",
        "미납금은 요금납부 → 즉시납부에서 바로 결제할 수 있어요.",
      ],

      steps: [
        "마이케이티 → 마이 → 요금/서비스를 엽니다.",
        "요금조회에서 이번 달 요금이나 명세서를 확인합니다.",
        "납부할 금액이 있으면 즉시납부에서 본인인증 후 결제합니다.",
      ],

      tips: [
        "실시간 계좌이체는 이용 가능한 시간이 정해져 있을 수 있어요.",
        "자동납부를 사용 중이라면 직접 납부하기 전에 이미 출금됐는지 확인하세요.",
        "최근 요금 명세서도 마이케이티 앱에서 확인할 수 있어요.",
      ],

      officialUrl:
        "https://help.kt.com/servicetip/ServiceTipInfo.do?idx=1024",

      officialActionLabel: "마이케이티 요금 처리 방법 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "customer-center",
      title: "고객센터",

      keywords: [
        "KT 고객센터",
        "KT 고객센터 전화번호",
        "KT 전화번호",
        "케이티 고객센터",
        "KT 상담원",
        "KT 문의",
        "KT 인터넷 고객센터",
        "KT TV 고객센터",
        "KT 인터넷 전화번호",
      ],

      quickSummary: [
        "휴대폰 문의는 KT 휴대폰에서 국번 없이 114를 이용하면 무료예요.",
        "인터넷·TV·전화 문의는 국번 없이 100을 이용하세요.",
      ],

      phone: {
        number: "114",
        feeNote: "KT 휴대폰에서 무료",
      },

      hours: "일반 상담 평일 09:00~18:00",

      steps: [
        "휴대폰 문의는 KT 휴대폰에서 114로 전화합니다.",
        "다른 전화에서 휴대폰 문의는 1588-0010을 이용합니다.",
        "인터넷·TV·전화 문의는 국번 없이 100으로 전화합니다.",
      ],

      tips: [
        "다른 통신사 휴대폰이나 일반전화에서 모바일 고객센터를 이용하려면 1588-0010을 이용할 수 있어요.",
        "인터넷·TV·전화 문의와 휴대폰 문의는 고객센터 번호가 다르니 주의하세요.",
        "일반 상담은 평일 09:00~18:00이며 점심시간 12:00~13:00에는 긴급 상담 위주예요.",
      ],

      officialUrl:
        "https://help.kt.com/store/KtCustCenter.do",

      lastChecked: "2026-08-18",
    },
  ],
};
