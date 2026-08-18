import type { ServiceTask } from "../data/services";

const preparationsBySlug: Record<string, string[]> = {
  cancel: ["로그인 정보", "취소할 상품의 주문번호", "현재 배송 상태"],
  "return-refund": [
    "로그인 정보",
    "반품할 상품과 주문번호",
    "상품을 다시 담을 포장재",
  ],
  exchange: ["로그인 정보", "교환할 상품과 주문번호", "상품을 다시 담을 포장재"],
  "order-check": ["로그인 정보", "주문한 날짜 또는 상품명"],
  "lost-phone": ["본인인증 수단", "분실한 휴대폰 번호", "분실한 때와 장소"],
  "internet-moving": ["이사할 새 주소", "희망 설치 날짜", "가입자 본인인증 수단"],
  billing: ["로그인 또는 본인인증 수단", "납부할 결제수단"],
  "customer-center": [
    "가입자 또는 주문자 정보",
    "주문번호나 휴대폰 번호",
    "문의할 내용을 한 문장으로 정리한 메모",
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
