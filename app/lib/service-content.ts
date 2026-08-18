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
  "lost-phone": ["본인인증 수단", "분실한 휴대폰 번호", "분실한 때와 장소"],
  "internet-moving": ["이사할 새 주소", "설치 희망일", "공유기·셋톱박스 등 기존 장비"],
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
  billing: ["본인인증 수단", "납부할 결제수단"],
  "customer-center": [
    "주문번호 또는 가입한 휴대폰 번호",
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
  "lost-phone": "분실신고 바로가기",
  "internet-moving": "이전설치 신청 방법 열기",
  "internet-trouble": "인터넷 고장진단 열기",
  "slow-internet": "인터넷 고장진단 열기",
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
