import type { Company } from "../types";
import { makeSlowInternetSteps, slowInternetTips } from "../telecomCommon";

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
      slug: "termination-fee",
      title: "해지 예상금액·위약금",

      keywords: [
        "SK 위약금",
        "SK 인터넷 위약금",
        "SK브로드밴드 해지 위약금",
        "SKB 해지 예상금액",
        "SK 인터넷 약정 확인",
        "SK 인터넷 해지 비용",
        "B tv 해지 위약금",
        "SK 인터넷 해지하면 얼마",
      ],

      quickSummary: [
        "먼저 B world에서 약정 종료일과 인터넷·B tv 결합 여부를 확인하세요.",
        "정확한 금액은 공식 온라인 문의에 ‘오늘 해지하면 내는 총금액’을 적어 확인하면 전화 대기를 줄일 수 있어요.",
      ],

      phone: {
        number: "106",
        feeNote: "온라인 문의로 해결되지 않을 때만 · 무료",
      },

      hours: "일반 상담 평일 09:00~18:00",

      steps: [
        "B world에 로그인하고 현재 이용 중인 인터넷·B tv 상품과 약정 종료일을 적습니다.",
        "휴대폰 결합이나 가족 결합이 있다면 해지 뒤 다른 회선의 요금도 달라지는지 함께 적습니다.",
        "B world [온라인 문의]에 ‘오늘 해지할 때 내는 총금액과 결합 할인 변동을 알려주세요’라고 남깁니다.",
        "답변에서 할인반환금, 장비 미반납금, 남은 요금을 나눠 확인합니다.",
        "금액을 본 뒤 해지할지, 약정 종료일까지 기다릴지 결정합니다.",
      ],

      tips: [
        "공식 요금표의 계산식은 참고용이에요. 가입일·상품·결합에 따라 내 금액은 달라질 수 있어요.",
        "인터넷만 해지해도 B tv나 휴대폰 결합 할인이 함께 달라질 수 있어요.",
        "전화가 꼭 필요하면 ‘오늘 기준 해지 총금액과 결합 할인 변동만 확인하고 싶습니다’라고 말하면 돼요.",
      ],

      officialUrl:
        "https://www.bworld.co.kr/customer/center/service.do?menu_id=C02000000",

      officialActionLabel: "B world 온라인 문의 열기",

      lastChecked: "2026-08-19",
    },

    {
      slug: "internet-cancel",
      title: "인터넷 해지·장비 반납",

      keywords: [
        "SK 인터넷 해지",
        "SK브로드밴드 인터넷 해지",
        "SKB 해지 신청",
        "B tv 해지",
        "SK 인터넷 장비 반납",
        "SK 공유기 반납",
        "다른 통신사로 인터넷 변경",
      ],

      quickSummary: [
        "다른 통신사로 옮기는 중이면 새 통신사에서 [가입과 해지 동시 신청]을 선택하세요. 기존 SK 회선을 따로 해지 접수할 필요가 없어요.",
        "그냥 해지한다면 위약금·결합 할인·반납 장비를 먼저 확인한 뒤 106에 한 번만 요청하세요.",
      ],

      phone: {
        number: "106",
        feeNote: "단순 해지의 마지막 접수 단계 · 무료",
      },

      hours: "일반 상담 평일 09:00~18:00",

      steps: [
        "새 통신사로 옮기는 경우 새 통신사 가입 화면에서 [가입과 해지 동시 신청]을 선택합니다.",
        "새 통신사 개통 뒤 기존 SK 서비스가 해지됐다는 안내를 확인합니다.",
        "통신사를 옮기지 않고 해지만 한다면 먼저 해지 예상금액과 결합 할인 변동을 확인합니다.",
        "공유기·모뎀·B tv 셋톱박스와 전원선을 한곳에 모아 사진을 찍어 둡니다.",
        "106에 ‘금액을 확인했고 오늘 해지 접수와 임대장비 회수 예약을 같이 해주세요’라고 요청합니다.",
        "장비를 넘긴 뒤에는 회수 문자나 인수증을 보관합니다.",
      ],

      tips: [
        "원스톱 전환서비스를 써도 기존 통신사의 해지 확인 전화는 한 번 받을 수 있어요.",
        "새 인터넷 설치 전에 기존 회선을 먼저 끊으면 인터넷을 못 쓰는 기간이 생길 수 있어요.",
        "임대 장비를 버리거나 새 통신사 기사님께 주지 마세요. SK 회수 안내에 따라 반납해야 해요.",
      ],

      officialUrl:
        "https://www.bworld.co.kr/customer/center/service.do?menu_id=C02000000",

      officialActionLabel: "B world 해지 전 확인 열기",

      lastChecked: "2026-08-19",
    },

    {
      slug: "account-transfer",
      title: "인터넷 명의변경",

      keywords: [
        "SK 명의변경",
        "SK 인터넷 명의변경",
        "SK브로드밴드 명의변경",
        "SKB 인터넷 명의 이전",
        "B tv 명의변경",
        "가족에게 SK 인터넷 명의변경",
        "SK 인터넷 양도",
      ],

      quickSummary: [
        "B world의 [명의변경 신청]을 이용하면 상담사 통화 없이 시작할 수 있어요.",
        "기존 명의자가 신청을 끝내면 새 명의자에게 본인확인 링크가 전송돼요.",
      ],

      phone: {
        number: "106",
        feeNote: "온라인 신청이 막힐 때만 · 무료",
      },

      hours: "일반 상담 평일 09:00~18:00",

      steps: [
        "B world [명의변경 신청]을 열고 기존 명의자로 본인인증합니다.",
        "명의를 바꿀 인터넷·B tv 서비스를 선택합니다.",
        "새 명의자의 이름과 휴대폰 번호를 정확히 입력해 신청합니다.",
        "새 명의자는 문자로 받은 링크를 열어 본인인증과 동의를 끝냅니다.",
        "B world의 [명의변경 신청내역]에서 완료 여부를 확인합니다.",
      ],

      tips: [
        "새 명의자에게 문자가 오지 않으면 신청내역에서 번호를 확인하고 문자를 다시 보내세요.",
        "요금 미납이나 명의변경 제한 상품이 있으면 온라인 신청이 멈출 수 있어요.",
        "온라인 신청이 불가능한 경우에만 가입자 명의변경 신청서와 신분증 등 안내받은 서류를 준비하세요.",
      ],

      officialUrl:
        "https://www.bworld.co.kr/customer/center/service.do?menu_id=C02000000",

      officialActionLabel: "B world 명의변경 신청 열기",

      lastChecked: "2026-08-19",
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
      slug: "internet-trouble",
      title: "인터넷 연결 안 됨",

      keywords: [
        "SK 인터넷 안됨",
        "SKT 인터넷 안돼요",
        "SK브로드밴드 인터넷 끊김",
        "SKB 와이파이 안됨",
        "B tv 인터넷 장애",
        "SK 인터넷 고장신고",
        "SK 와이파이 연결 안됨",
      ],

      quickSummary: [
        "한 기기만 안 되면 그 기기의 Wi-Fi를 껐다 켜고 다시 연결하세요.",
        "집 안 모든 기기가 안 되면 공유기·모뎀 전원을 다시 연결한 뒤 B world AS 간편진단을 실행하세요.",
      ],

      phone: {
        number: "106",
        feeNote: "SK브로드밴드 고객센터 무료",
      },

      hours: "고장문의 365일 · 24시간",

      steps: [
        "다른 휴대폰이나 PC도 같은 Wi-Fi에 연결되지 않는지 확인합니다.",
        "모든 기기가 안 되면 공유기·모뎀의 전원선과 인터넷 선이 빠지지 않았는지 확인합니다.",
        "공유기·모뎀 전원선을 뺐다가 다시 연결하고 장비가 켜질 때까지 몇 분 기다립니다.",
        "그래도 안 되면 B world의 [AS 간편진단/조치]에서 가입 상품을 선택해 진단합니다.",
        "진단으로 해결되지 않으면 106 → 고장문의로 접수합니다.",
      ],

      tips: [
        "공유기의 작은 RESET 구멍은 누르지 마세요. Wi-Fi 이름과 비밀번호 설정이 지워질 수 있어요.",
        "한 기기만 안 된다면 통신망보다 그 기기의 Wi-Fi 설정 문제일 가능성이 커요.",
        "지역 장애라면 장비를 여러 번 재부팅해도 해결되지 않으니 106에서 장애 여부를 확인하세요.",
      ],

      officialUrl:
        "https://www.bworld.co.kr/customer/center/service.do?menu_id=C02000000",

      officialActionLabel: "B world 고장 간편진단 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "slow-internet",
      title: "인터넷 느림·자주 끊김",

      keywords: [
        "SK 인터넷 느림",
        "SK브로드밴드 인터넷 느려요",
        "SK 인터넷 자주 끊김",
        "SKB 와이파이 느림",
        "B tv 인터넷 속도 느림",
        "SK 인터넷 핑 튐",
      ],

      quickSummary: [
        "공유기 가까이에서도 느린지 먼저 확인하고, 가능하면 인터넷 선으로 연결한 PC와 비교하세요.",
        "유선도 느리거나 반복해서 끊기면 B world 고장 간편진단 후 106으로 접수하세요.",
      ],

      phone: {
        number: "106",
        feeNote: "SK브로드밴드 고객센터 무료",
      },

      hours: "고장문의 365일 · 24시간",

      steps: makeSlowInternetSteps(
        "B world [AS 간편진단/조치]",
        "106 → 고장문의"
      ),

      tips: slowInternetTips,

      officialUrl:
        "https://www.bworld.co.kr/customer/center/service.do?menu_id=C02000000",

      officialActionLabel: "B world 고장 간편진단 열기",

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
