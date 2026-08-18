import type { Company } from "../types";
import { makeSlowInternetSteps, slowInternetTips } from "../telecomCommon";

export const lguplus: Company = {
  slug: "lguplus",
  name: "LG U+",
  categoryId: "telecom",

  aliases: [
    "LG U+",
    "LG유플러스",
    "유플러스",
    "엘지유플러스",
    "LGU+",
  ],

  services: [
    {
      slug: "lost-phone",
      title: "휴대폰 분실·정지",

      keywords: [
        "LG유플러스 휴대폰 분실",
        "유플러스 폰 잃어버림",
        "LG U+ 분실신고",
        "유플러스 분실신고",
        "유플러스 휴대폰 정지",
        "LG 폰 정지",
        "휴대폰 잃어버렸어 유플러스",
      ],

      quickSummary: [
        "U+ 분실 접수 페이지에서 [분실 등록]을 눌러 신고와 일시정지를 진행하세요.",
        "로그인이 안 되면 080-019-7000으로 연락하세요. 분실상담은 24시간 가능해요.",
      ],

      phone: {
        number: "080-019-7000",
        feeNote: "분실상담 무료",
      },

      hours: "분실상담 365일 · 24시간",

      steps: [
        "U+ 분실 접수 페이지에서 [분실 등록]을 누릅니다.",
        "본인인증 후 분실한 회선과 정보를 입력합니다.",
        "분실접수와 일시정지를 마치고 접수 상태를 확인합니다.",
      ],

      tips: [
        "분실신고가 늦어지면 월정액·부가서비스·소액결제 등이 발생할 수 있어요.",
        "휴대폰이나 유심에 T머니·신용카드 등이 있었다면 해당 기관에도 별도로 신고하세요.",
        "휴대폰을 다시 찾았다면 같은 페이지에서 분실접수 취소도 확인할 수 있어요.",
      ],

      officialUrl:
        "https://www.lguplus.com/support/lost-device",

      lastChecked: "2026-08-18",
    },

    {
      slug: "internet-moving",
      title: "인터넷 이전설치",

      keywords: [
        "LG유플러스 인터넷 이전설치",
        "LG U+ 인터넷 이전",
        "유플러스 인터넷 이사",
        "LG 인터넷 이사",
        "LG 인터넷 이전설치",
        "LGU+ 설치장소 변경",
        "이사하는데 유플러스 인터넷 옮기기",
      ],

      quickSummary: [
        "당신의 U+ 앱에서 홈 서비스 설치 변경을 신청하세요.",
        "공유기·셋톱박스는 버리지 말고 직접 챙겨 새 집으로 가져가세요.",
      ],

      phone: {
        number: "101",
        feeNote: "인터넷·IPTV·전화 고객센터 무료",
      },

      steps: [
        "당신의 U+ 앱 → 고객지원 → 방문신청 → 홈 서비스 설치 변경을 엽니다.",
        "이전할 상품을 고르고 새 주소와 설치 희망일을 입력합니다.",
        "공유기·셋톱박스를 직접 챙겨 새 집으로 옮깁니다.",
        "확정된 일정에 기사님의 이전설치를 받습니다.",
      ],

      tips: [
        "기존 공유기·셋톱박스 등 통신장비는 이사 전에 직접 챙겨야 해요.",
        "기사님이 이삿날 전에 기존 장비를 미리 수거해가는 방식이 아니에요.",
        "이전설치 비용과 새 주소의 설치 가능 여부를 신청 과정에서 확인하세요.",
      ],

      officialUrl:
        "https://www.lguplus.com/support/self-troubleshoot/request",

      officialActionLabel: "U+ 설치변경 신청 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "billing",
      title: "요금 조회·납부",

      keywords: [
        "LG유플러스 요금 조회",
        "유플러스 요금 납부",
        "LG U+ 이번달 요금",
        "유플러스 통신비",
        "LG 미납요금",
        "유플러스 미납 납부",
        "LG U+ 요금 확인",
      ],

      quickSummary: [
        "당신의 U+ 앱에서 [요금 바로 납부]를 눌러 미납금과 이번 달 요금을 확인하세요.",
        "전체 또는 일부 금액을 골라 앱에서 바로 납부할 수 있어요.",
      ],

      steps: [
        "당신의 U+ 앱에서 [요금 바로 납부]를 누릅니다.",
        "전체 또는 일부 납부를 고르고 금액을 확인합니다.",
        "결제수단을 선택해 본인인증 후 납부합니다.",
      ],

      tips: [
        "자동이체 중이라면 직접 납부하기 전에 이미 출금됐는지 확인하세요.",
        "납부방법 변경도 U+ 앱의 납부요금 조회 메뉴에서 진행할 수 있어요.",
      ],

      officialUrl:
        "https://www.lguplus.com/ujam/142",

      officialActionLabel: "U+ 요금 처리 방법 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "internet-trouble",
      title: "인터넷 연결 안 됨",

      keywords: [
        "LG유플러스 인터넷 안됨",
        "LG U+ 인터넷 안돼요",
        "유플러스 인터넷 끊김",
        "LG 와이파이 안됨",
        "유플러스 인터넷 장애",
        "LG 인터넷 고장신고",
        "LG U+ 와이파이 연결 안됨",
      ],

      quickSummary: [
        "한 기기만 안 되면 그 기기의 Wi-Fi를 껐다 켜고 다시 연결하세요.",
        "집 안 모든 기기가 안 되면 공유기·모뎀 전원을 다시 연결한 뒤 U+ 인터넷/IPTV 간편진단을 실행하세요.",
      ],

      phone: {
        number: "101",
        feeNote: "인터넷·IPTV·전화 고객센터 무료",
      },

      hours: "장애상담 365일 · 24시간",

      steps: [
        "다른 휴대폰이나 PC도 같은 Wi-Fi에 연결되지 않는지 확인합니다.",
        "모든 기기가 안 되면 공유기·모뎀의 전원선과 인터넷 선이 빠지지 않았는지 확인합니다.",
        "공유기·모뎀 전원선을 뺐다가 다시 연결하고 장비가 켜질 때까지 몇 분 기다립니다.",
        "그래도 안 되면 U+ [인터넷/IPTV 간편진단]에서 가입 상품을 선택해 진단합니다.",
        "진단으로 해결되지 않으면 101로 장애를 접수하거나 화면에서 AS를 신청합니다.",
      ],

      tips: [
        "공유기의 작은 RESET 구멍은 누르지 마세요. Wi-Fi 이름과 비밀번호 설정이 지워질 수 있어요.",
        "한 기기만 안 된다면 통신망보다 그 기기의 Wi-Fi 설정 문제일 가능성이 커요.",
        "간편진단은 로그인이 필요하며, 지역 장애 여부도 고객지원의 서비스 장애 안내에서 확인할 수 있어요.",
      ],

      officialUrl:
        "https://www.lguplus.com/support/self-troubleshoot/home-device",

      officialActionLabel: "U+ 인터넷/IPTV 간편진단 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "slow-internet",
      title: "인터넷 느림·자주 끊김",

      keywords: [
        "LG유플러스 인터넷 느림",
        "LG U+ 인터넷 느려요",
        "유플러스 인터넷 자주 끊김",
        "LG 와이파이 느림",
        "유플러스 인터넷 속도 느림",
        "LG 인터넷 핑 튐",
      ],

      quickSummary: [
        "공유기 가까이에서도 느린지 먼저 확인하고, 가능하면 인터넷 선으로 연결한 PC와 비교하세요.",
        "유선도 느리거나 반복해서 끊기면 U+ 인터넷/IPTV 간편진단 후 101로 접수하세요.",
      ],

      phone: {
        number: "101",
        feeNote: "인터넷·IPTV·전화 고객센터 무료",
      },

      hours: "장애상담 365일 · 24시간",

      steps: makeSlowInternetSteps(
        "U+ [인터넷/IPTV 간편진단]",
        "101 또는 화면의 AS 신청"
      ),

      tips: slowInternetTips,

      officialUrl:
        "https://www.lguplus.com/support/self-troubleshoot/home-device",

      officialActionLabel: "U+ 인터넷/IPTV 간편진단 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "customer-center",
      title: "고객센터",

      keywords: [
        "LG유플러스 고객센터",
        "LG U+ 고객센터",
        "유플러스 고객센터",
        "유플러스 전화번호",
        "LG 인터넷 고객센터",
        "LG IPTV 고객센터",
        "LG U+ 상담원",
      ],

      quickSummary: [
        "휴대폰 문의는 LG U+ 휴대폰에서 국번 없이 114를 이용하면 무료예요.",
        "인터넷·IPTV·전화 문의는 101을 이용하세요.",
      ],

      phone: {
        number: "114",
        feeNote: "LG U+ 휴대폰에서 무료",
      },

      hours: "일반 상담 평일 09:00~18:00",

      steps: [
        "휴대폰 문의는 LG U+ 휴대폰에서 114로 전화합니다.",
        "다른 전화에서 휴대폰 문의는 1544-0010을 이용합니다.",
        "인터넷·IPTV·전화 문의는 101 또는 1644-7000을 이용합니다.",
      ],

      tips: [
        "다른 전화에서 휴대폰 고객센터는 1544-0010을 이용할 수 있어요.",
        "인터넷·IPTV·전화는 1644-7000도 이용할 수 있어요.",
        "분실상담은 080-019-7000에서 365일 24시간 이용할 수 있어요.",
      ],

      officialUrl:
        "https://www.lguplus.com/support/service/ars",

      lastChecked: "2026-08-18",
    },
  ],
};
