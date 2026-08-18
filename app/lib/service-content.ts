import type { ServiceTask } from "../data/services";

const preparationsBySlug: Record<string, string[]> = {
  cancel: ["취소할 상품의 주문번호", "현재 배송 상태"],
  "return-refund": ["반품할 상품과 주문번호", "상품을 다시 담을 포장재"],
  exchange: ["교환할 상품과 주문번호", "상품을 다시 담을 포장재"],
  "order-check": ["주문한 날짜", "상품명 또는 주문번호"],
  "delivery-not-received": [
    "주문번호",
    "배송완료 문자·사진",
    "받기로 한 주소",
  ],
  "return-pickup-delay": [
    "반품할 상품과 주문번호",
    "반품 접수 화면의 수거방법",
    "처음 안내받은 회수 예정일",
  ],
  "delivery-tracking": ["운송장 번호", "택배사 이름"],
  "parcel-not-received": [
    "운송장 번호",
    "배송완료 문자",
    "받기로 한 주소",
  ],
  "return-reservation": [
    "처음 받은 운송장 번호",
    "구매처의 반품 승인 내용",
    "상품을 안전하게 담을 박스",
  ],
  "lost-card": [
    "본인인증이 가능한 휴대폰",
    "분실한 카드의 종류",
    "마지막으로 카드를 사용한 때와 장소",
  ],
  "card-reissue": [
    "본인인증이 가능한 휴대폰",
    "새 카드를 받을 주소",
    "분실한 경우 분실신고 완료 여부",
  ],
  "unrecognized-charge": [
    "모르는 결제의 금액과 시간",
    "결제 문자·앱 이용내역 화면",
    "본인인증이 가능한 휴대폰",
  ],
  "lost-phone": ["본인인증 수단", "분실한 휴대폰 번호", "분실한 때와 장소"],
  "internet-moving": ["이사할 새 주소", "설치 희망일", "공유기·셋톱박스 등 기존 장비"],
  "termination-fee": [
    "현재 이용 중인 인터넷·TV 상품",
    "약정 종료일",
    "휴대폰·가족 결합 여부",
  ],
  "internet-cancel": [
    "해지 예상금액 확인 결과",
    "공유기·모뎀·셋톱박스와 전원선",
    "장비 회수 연락을 받을 휴대폰",
  ],
  "account-transfer": [
    "기존 명의자와 새 명의자의 본인인증 수단",
    "명의를 바꿀 인터넷·TV 상품",
    "새 명의자의 요금 납부 정보",
  ],
  "internet-trouble": [
    "공유기·모뎀 전원 상태",
    "장비 앞면의 불빛 상태",
    "가입자 본인인증 수단",
  ],
  "slow-internet": [
    "느려지는 시간대 메모",
    "유선·Wi-Fi 중 느린 연결",
    "가입자 본인인증 수단",
  ],
  "membership-cancel": [
    "구독에 사용한 이메일·계정",
    "다음 결제 예정일",
  ],
  "charged-after-cancel": [
    "결제된 날짜와 금액",
    "해지 확인 메일·화면",
    "구독에 사용한 이메일·계정",
  ],
  "payment-method": ["구독에 사용한 이메일·계정", "새 결제수단"],
  "refund-request": [
    "결제된 날짜와 금액",
    "카드·계좌에 찍힌 결제처 이름",
    "구독에 사용한 이메일·계정",
  ],
  "unknown-charge": [
    "결제된 날짜와 금액",
    "카드 명세서에 찍힌 결제 이름",
    "사용 중인 Apple·Google 계정",
  ],
  "recurring-payment-cancel": [
    "결제한 네이버 계정",
    "다음 결제 예정일",
  ],
  "immediate-cancel-refund": [
    "결제한 네이버 계정",
    "이번 달 혜택 사용 여부",
  ],
  "unexpected-membership-charge": [
    "결제된 날짜와 금액",
    "결제한 네이버 계정",
  ],
  "wow-membership-cancel": ["결제한 쿠팡 계정", "무료체험·다음 결제 날짜"],
  "wow-membership-refund": [
    "결제한 쿠팡 계정",
    "이번 달 와우 혜택 사용 여부",
  ],
  billing: ["본인인증 수단", "납부할 결제수단"],
  "customer-center": [
    "카드·주문번호 또는 가입한 휴대폰 번호",
    "문제 상황을 한 문장으로 정리한 메모",
  ],
};

export function getPreparations(service: ServiceTask) {
  return preparationsBySlug[service.slug] ?? [
    "로그인 또는 본인인증 수단",
    "관련 주문번호나 가입 정보",
  ];
}

export function getCustomerCenterFallback(services: ServiceTask[]) {
  return services.find((service) => service.slug === "customer-center");
}

const actionLabelBySlug: Record<string, string> = {
  cancel: "주문취소 안내 열기",
  "return-refund": "반품·환불 안내 열기",
  exchange: "교환 안내 열기",
  "order-check": "주문내역 확인 방법 열기",
  "delivery-not-received": "주문·배송내역 열기",
  "return-pickup-delay": "반품 진행내역 열기",
  "delivery-tracking": "공식 배송조회 열기",
  "parcel-not-received": "공식 배송조회 열기",
  "return-reservation": "공식 반품예약 열기",
  "lost-card": "공식 분실신고 안내 열기",
  "card-reissue": "공식 재발급 안내 열기",
  "unrecognized-charge": "공식 부정사용 신고 안내 열기",
  "lost-phone": "분실신고 바로가기",
  "internet-moving": "이전설치 신청 방법 열기",
  "termination-fee": "해지 예상금액 확인하기",
  "internet-cancel": "인터넷 해지 신청 열기",
  "account-transfer": "인터넷 명의변경 열기",
  "internet-trouble": "인터넷 고장진단 열기",
  "slow-internet": "인터넷 고장진단 열기",
  "membership-cancel": "멤버십 해지 화면 열기",
  "charged-after-cancel": "결제·멤버십 확인하기",
  "payment-method": "결제수단 관리 열기",
  "refund-request": "공식 환불 안내 열기",
  "unknown-charge": "공식 결제내역 확인·신고",
  "recurring-payment-cancel": "정기결제 해지 안내 열기",
  "immediate-cancel-refund": "즉시 종료·환불 안내 열기",
  "unexpected-membership-charge": "결제금액 확인 안내 열기",
  "wow-membership-cancel": "와우 멤버십 열기",
  "wow-membership-refund": "와우 해지·환불 안내 열기",
  billing: "요금 조회·납부 방법 열기",
  "customer-center": "공식 고객센터 열기",
};

export function getOfficialActionLabel(service: ServiceTask) {
  return (
    service.officialActionLabel ??
    actionLabelBySlug[service.slug] ??
    "공식 처리 방법 열기"
  );
}
