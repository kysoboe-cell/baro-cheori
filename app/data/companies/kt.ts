import type { Company } from "../types";
import { makeSlowInternetSteps, slowInternetTips } from "../telecomCommon";

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
      slug: "internet-trouble",
      title: "인터넷 연결 안 됨",

      keywords: [
        "KT 인터넷 안됨",
        "케이티 인터넷 안돼요",
        "KT 인터넷 끊김",
        "KT 와이파이 안됨",
        "KT 인터넷 장애",
        "KT 인터넷 고장신고",
        "KT 와이파이 연결 안됨",
      ],

      quickSummary: [
        "한 기기만 안 되면 그 기기의 Wi-Fi를 껐다 켜고 다시 연결하세요.",
        "집 안 모든 기기가 안 되면 공유기·모뎀 전원을 다시 연결한 뒤 KT 인터넷/TV 고장진단을 실행하세요.",
      ],

      phone: {
        number: "100",
        feeNote: "KT 인터넷·TV·전화 고객센터",
      },

      hours: "고장신고·통화품질 상담 365일 · 24시간",

      steps: [
        "다른 휴대폰이나 PC도 같은 Wi-Fi에 연결되지 않는지 확인합니다.",
        "모든 기기가 안 되면 공유기·모뎀의 전원선과 인터넷 선이 빠지지 않았는지 확인합니다.",
        "공유기·모뎀 전원선을 뺐다가 다시 연결하고 장비가 켜질 때까지 몇 분 기다립니다.",
        "그래도 안 되면 KT [인터넷/TV 고장진단]에서 가입 상품을 선택해 진단합니다.",
        "진단으로 해결되지 않으면 국번 없이 100으로 고장 접수합니다.",
      ],

      tips: [
        "공유기의 작은 RESET 구멍은 누르지 마세요. Wi-Fi 이름과 비밀번호 설정이 지워질 수 있어요.",
        "한 기기만 안 된다면 통신망보다 그 기기의 Wi-Fi 설정 문제일 가능성이 커요.",
        "온라인 고장진단은 KT 로그인이 필요할 수 있고, 기사 방문은 접수 시간에 따라 다음 업무시간에 진행될 수 있어요.",
      ],

      officialUrl: "https://kt.com/selfcare",

      officialActionLabel: "KT 인터넷/TV 고장진단 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "slow-internet",
      title: "인터넷 느림·자주 끊김",

      keywords: [
        "KT 인터넷 느림",
        "케이티 인터넷 느려요",
        "KT 인터넷 자주 끊김",
        "KT 와이파이 느림",
        "KT 인터넷 속도 느림",
        "KT 인터넷 핑 튐",
      ],

      quickSummary: [
        "공유기 가까이에서도 느린지 먼저 확인하고, 가능하면 인터넷 선으로 연결한 PC와 비교하세요.",
        "유선도 느리거나 반복해서 끊기면 KT 인터넷/TV 고장진단 후 100으로 접수하세요.",
      ],

      phone: {
        number: "100",
        feeNote: "KT 인터넷·TV·전화 고객센터",
      },

      hours: "고장신고·통화품질 상담 365일 · 24시간",

      steps: makeSlowInternetSteps(
        "KT [인터넷/TV 고장진단]",
        "국번 없이 100"
      ),

      tips: slowInternetTips,

      officialUrl: "https://kt.com/selfcare",

      officialActionLabel: "KT 인터넷/TV 고장진단 열기",

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
