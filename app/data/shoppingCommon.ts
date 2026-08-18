export function makeShoppingReturnSteps(orderMenuName: string) {
  return [
    `${orderMenuName}에서 반품할 상품을 열고 [반품 신청]을 누릅니다.`,
    "반품 사유를 고르고 방문수거가 가능하면 선택합니다.",
    "상품을 박스·비닐에 다시 담고 테이프로 막습니다.",
    "포장 겉면에 '반품'이라고 크게 적습니다.",
    "방문수거라면 평소 상품을 받았던 주소의 문 앞에 내놓습니다.",
    "회수 뒤 주문내역에서 환불 상태를 확인합니다.",
  ];
}

export const shoppingReturnCommonTips = [
  "직접발송이나 편의점 반품을 선택했다면 문 앞에 두지 말고 신청 화면에 나온 방법대로 보내세요.",
  "단순변심 반품은 구매자가 반품 배송비를 부담할 수 있어요.",
  "상품 불량·파손·오배송처럼 판매자 책임인 경우에는 반품 배송비 부담 기준이 달라집니다.",
];

export function makeShoppingDeliveryNotReceivedSteps(
  orderMenuName: string,
  inquiryName: string
) {
  return [
    `${orderMenuName}에서 상품을 열고 배송조회와 최근 택배 위치를 확인합니다.`,
    `배송중인데 예정일이 지났거나 위치가 멈췄다면 ${inquiryName}로 실제 발송 여부와 도착 예정일을 묻습니다.`,
    "배송완료인데 상품이 없다면 문 앞·경비실·무인택배함·가족 수령 여부와 배송 문자·사진을 확인합니다.",
    `그래도 찾을 수 없다면 구매확정을 누르지 말고 ${inquiryName}에 '배송완료 미수령'이라고 접수합니다.`,
  ];
}

export const shoppingDeliveryNotReceivedTips = [
  "상품을 직접 받기 전에는 구매확정을 누르지 마세요.",
  "공개 상품문의에는 주문번호·주소·전화번호를 적지 말고 주문 상세의 문의 기능을 이용하세요.",
  "배송완료 문자·사진과 판매자에게 문의한 기록은 상품을 찾을 때까지 남겨두세요.",
];

export function makeShoppingReturnPickupDelaySteps(
  orderMenuName: string,
  pickupStatusName: string,
  inquiryName: string
) {
  return [
    `${orderMenuName}에서 반품한 상품을 열고 ${pickupStatusName}를 확인합니다.`,
    "방문수거로 신청했는지, 직접발송·편의점 반품으로 신청했는지 먼저 구분합니다.",
    "방문수거라면 상품을 신청한 수거지에 두고, 포장 겉면에 반품이라고 적습니다.",
    `안내된 수거일이 지났는데도 방문하지 않았다면 ${inquiryName}에서 '반품 회수 지연'이라고 남깁니다.`,
    "새로 받은 회수 안내나 택배사 연락을 확인하고, 임의로 다른 택배를 보내지는 않습니다.",
  ];
}

export const shoppingReturnPickupDelayTips = [
  "직접발송·편의점 반품을 선택했다면 기사 방문을 기다리지 말고 신청 화면에 나온 방법으로 보내세요.",
  "접수한 수거지와 실제로 상품을 내놓은 주소가 같은지 확인하세요.",
  "임의로 택배를 보내면 반품 주소나 배송비 처리가 달라질 수 있으니 새 안내를 받은 뒤 보내세요.",
];
