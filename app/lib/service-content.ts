import type { CategoryId, ServiceTask } from "../data/services";

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
  "self-check": [
    "제품 모델명이 보이는 스티커 사진",
    "오류 글자나 고장 화면 사진",
    "언제부터 무엇이 안 됐는지 짧은 메모",
  ],
  "home-service": [
    "제품 모델명이 보이는 스티커 사진",
    "오류 글자나 고장 화면 사진",
    "기사님이 방문할 주소와 가능한 날짜",
  ],
  "service-center": [
    "수리할 제품과 필요한 충전기·부속품",
    "제품 모델명과 고장 증상",
    "휴대폰·PC라면 중요한 자료 백업",
  ],
  "repair-cost-warranty": [
    "제품 모델명",
    "구입 날짜가 보이는 영수증·주문내역",
    "고장 부분과 오류 화면 사진",
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

/**
 * 같은 색을 무조건 1번에 칠하지 않고, 업무별로 실제 결과를 좌우하는
 * 단계를 고릅니다. 개별 업무에 keyStepIndexes가 있으면 그 검수 결과가
 * 항상 우선합니다.
 */
const keyStepIndexesBySlug: Record<string, number[]> = {
  cancel: [1, 3],
  "return-refund": [0, 3],
  exchange: [0, 2, 3],
  "order-check": [0, 2],
  "delivery-not-received": [0, 2, 4],
  "return-pickup-delay": [1, 3, 4],
  "delivery-tracking": [0, 1],
  "parcel-not-received": [0, 2, 4],
  "return-reservation": [0, 2, 4],
  "lost-card": [0, 1, 3],
  "card-reissue": [0, 2, 4],
  "unrecognized-charge": [0, 2, 3],
  "lost-phone": [0, 1],
  "internet-moving": [0, 2],
  "termination-fee": [0, 3],
  "internet-cancel": [0, 3, 5],
  "account-transfer": [0, 2, 3],
  billing: [0, 2],
  "internet-trouble": [0, 2, 3],
  "slow-internet": [0, 2, 3],
  "self-check": [0, 3, 5],
  "home-service": [0, 1, 3],
  "service-center": [0, 1, 4],
  "repair-cost-warranty": [0, 2, 4],
  "membership-cancel": [0, 2, 3],
  "charged-after-cancel": [0, 2, 3],
  "payment-method": [0, 2],
  "refund-request": [0, 2, 3],
  "unknown-charge": [0, 2, 3],
  "recurring-payment-cancel": [0, 2, 3],
  "immediate-cancel-refund": [0, 2, 3],
  "unexpected-membership-charge": [0, 2, 3],
  "wow-membership-cancel": [0, 2, 4],
  "wow-membership-refund": [0, 2, 3],
  "customer-center": [0, 1],
};

export function getKeyStepIndexes(service: ServiceTask) {
  const candidateIndexes =
    service.keyStepIndexes ?? keyStepIndexesBySlug[service.slug] ?? [];
  const stepCount = service.steps?.length ?? 0;

  return candidateIndexes.filter(
    (index, position) =>
      index >= 0 &&
      index < stepCount &&
      candidateIndexes.indexOf(index) === position
  );
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
  "self-check": "제품 자가진단 열기",
  "home-service": "출장수리 예약 열기",
  "service-center": "서비스센터 방문예약 열기",
  "repair-cost-warranty": "수리비·보증기간 안내 열기",
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

const blockedOfficialUrls = new Set([
  "https://www.samsungcard.com/",
  "https://www.shinhancard.com/",
  "https://m.kt.com/",
  "https://lotteglogis.com/",
  "https://help.pay.naver.com/",
  "https://help.gmarket.co.kr/",
]);

/**
 * 홈페이지 첫 화면, ARS 설명처럼 바로처리의 설명보다 도움이 적은 링크는
 * 버튼으로 노출하지 않습니다. 고객센터 페이지도 일반 홈페이지 버튼을
 * 만들지 않습니다.
 */
export function getUsefulOfficialUrl(service: ServiceTask) {
  if (!service.officialUrl || service.slug === "customer-center") return null;

  const normalizedUrl = service.officialUrl.trim();
  const lowerUrl = normalizedUrl.toLowerCase();

  if (
    blockedOfficialUrls.has(normalizedUrl) ||
    lowerUrl.includes("ars")
  ) {
    return null;
  }

  return normalizedUrl;
}

export function getOfficialLinkHeading(service: ServiceTask) {
  switch (service.officialLinkType) {
    case "direct":
      return "온라인에서 이어서 처리";
    case "login":
      return "로그인 후 이어서 처리";
    default:
      return "공식 화면을 열기 전에 확인";
  }
}

const officialNextStepByCategory: Record<CategoryId, string> = {
  shopping: "새 창에서 로그인한 뒤 문제가 생긴 주문을 고르세요.",
  telecom: "새 창에서 본인인증한 뒤 이용 중인 휴대폰·인터넷 상품을 고르세요.",
  delivery: "새 창에서 운송장 번호를 입력하거나 반품예약 메뉴를 여세요.",
  card: "새 창에서 본인인증한 뒤 문제가 생긴 카드나 결제내역을 고르세요.",
  subscription: "새 창에서 실제로 결제한 계정으로 로그인하세요. 다른 계정으로 들어가면 구독이나 결제가 보이지 않을 수 있어요.",
  electronics: "새 창에서 제품 종류와 모델명을 고른 뒤 증상 확인이나 예약을 시작하세요.",
};

export function getOfficialNextStep(categoryId: CategoryId) {
  return officialNextStepByCategory[categoryId];
}
