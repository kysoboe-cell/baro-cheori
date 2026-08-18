import type { Company } from "../types";
import {
  makeParcelNotReceivedSteps,
  makeParcelTrackingSteps,
  parcelNotReceivedTips,
  parcelReturnTips,
  parcelTrackingTips,
} from "../parcelCommon";

const trackingUrl =
  "https://www.hanjin.com/kor/CMS/DeliveryMgr/WaybillSch.do?mCode=MN038";
const returnUrl =
  "https://www.hanjin.com/kor/CMS/DeliveryMgr/Reserve4.do?mCode=MN026";
const supportUrl =
  "https://www.hanjin.com/kor/CMS/Contents/Contents.do?mCode=MN062";

export const hanjin: Company = {
  slug: "hanjin",
  name: "한진택배",
  categoryId: "delivery",
  aliases: ["한진택배", "한진", "한진 배송", "Hanjin"],
  services: [
    {
      slug: "delivery-tracking",
      title: "배송조회",
      keywords: [
        "한진택배 배송조회",
        "한진 운송장 조회",
        "한진택배 위치",
        "한진택배 언제 와요",
        "한진 배송상태",
      ],
      quickSummary: [
        "운송장 번호를 공식 배송조회에 입력해 최근 처리 시간과 현재 위치를 확인하세요.",
        "조회가 안 되거나 집하 전이라면 판매자·구매처에 상품을 실제로 넘겼는지 먼저 물어보세요.",
      ],
      steps: makeParcelTrackingSteps("한진택배 공식 배송조회"),
      tips: parcelTrackingTips,
      officialUrl: trackingUrl,
      officialActionLabel: "한진택배 배송조회 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "parcel-not-received",
      title: "배송완료인데 상품 없음",
      keywords: [
        "한진택배 배송완료 상품 없음",
        "한진택배 배송완료인데 안옴",
        "한진 택배 못 받음",
        "한진택배 분실",
        "한진 오배송",
      ],
      quickSummary: [
        "배송완료 시간·위치와 배송 문자부터 확인하고 문 앞·경비실·무인택배함을 찾아보세요.",
        "찾지 못하면 기사님에게 실제 놓은 장소를 확인한 뒤 구매처에 '배송완료 미수령'으로 바로 접수하세요.",
      ],
      steps: makeParcelNotReceivedSteps(
        "한진택배 공식 배송조회",
        "한진택배 고객센터"
      ),
      tips: parcelNotReceivedTips,
      officialUrl: trackingUrl,
      officialActionLabel: "배송완료 위치 확인하기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "return-reservation",
      title: "반품수거 예약",
      keywords: [
        "한진택배 반품예약",
        "한진 반품수거",
        "한진택배 반품 접수",
        "한진 반품 기사 예약",
        "한진택배 회수 신청",
      ],
      quickSummary: [
        "먼저 구매처에서 반품을 승인받고, 직접 택배사에 예약하라는 안내를 받은 경우에만 접수하세요.",
        "공식 반품예약에서 운송장 번호와 받는 분 이름으로 조회할 수 있고, 배송완료 후 30일 이내 이용할 수 있어요.",
      ],
      steps: [
        "구매처 주문내역에서 반품을 먼저 신청하고 수거 방법을 확인합니다.",
        "구매처가 택배사 직접 예약을 안내한 경우에만 한진 반품예약을 엽니다.",
        "처음 상품을 받은 운송장 번호와 받는 분 이름을 입력합니다.",
        "수거지와 상품 정보를 확인하고 예약을 완료합니다.",
        "상품을 다시 포장해 안내된 장소에 두고 예약 내역에서 수거 상태를 확인합니다.",
      ],
      tips: [
        ...parcelReturnTips,
        "받는 분 이름이 별표 등으로 가려져 조회되지 않으면 구매처에 반품 접수를 요청하세요.",
        "배송완료 후 30일이 지났다면 온라인 반품예약 대신 구매처나 고객센터에 문의하세요.",
      ],
      officialUrl: returnUrl,
      officialActionLabel: "한진택배 반품예약 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "customer-center",
      title: "고객센터",
      keywords: [
        "한진택배 고객센터",
        "한진택배 전화번호",
        "한진 상담원",
        "한진택배 문의",
        "한진 기사 연락처",
      ],
      quickSummary: [
        "운송장 번호와 최근 배송 상태를 열어둔 뒤 1588-0011로 문의하세요.",
        "평일 09:00~18:00에 운영하며 공휴일·대체공휴일은 쉬어요.",
      ],
      phone: { number: "1588-0011", feeNote: "유료전화" },
      hours: "월~금 09:00~18:00 · 공휴일·대체공휴일 휴무",
      steps: [
        "공식 배송조회에서 운송장 번호와 최근 배송 상태를 확인합니다.",
        "1588-0011로 전화해 운송장 번호를 먼저 말합니다.",
        "배송 지연, 배송완료 미수령, 반품수거 지연 중 해당 문제와 원하는 확인 내용을 짧게 말합니다.",
      ],
      tips: [
        "판매자가 아직 택배사에 상품을 넘기지 않았다면 구매처에 실제 발송 여부를 먼저 확인하세요.",
        "상담 연결 전 운송장 번호를 메모해두면 자동 안내와 상담이 빨라져요.",
      ],
      officialUrl: supportUrl,
      officialActionLabel: "한진택배 고객센터 안내 열기",
      lastChecked: "2026-08-18",
    },
  ],
};
