import type { Company } from "../types";
import {
  makeParcelNotReceivedSteps,
  makeParcelTrackingSteps,
  parcelNotReceivedTips,
  parcelReturnTips,
  parcelTrackingTips,
} from "../parcelCommon";

const trackingUrl =
  "https://lotteglogis.com/home/reservation/tracking/index";
const returnUrl =
  "https://www.lotteglogis.com/home/reservation/return/memberForm";
const supportUrl = "https://lotteglogis.com/";

export const lotteDelivery: Company = {
  slug: "lotte-delivery",
  name: "롯데택배",
  categoryId: "delivery",
  aliases: ["롯데택배", "롯데글로벌로지스", "롯데 배송", "롯데택배 배송"],
  services: [
    {
      slug: "delivery-tracking",
      title: "배송조회",
      keywords: [
        "롯데택배 배송조회",
        "롯데 운송장 조회",
        "롯데택배 위치",
        "롯데택배 언제 와요",
        "롯데글로벌로지스 배송조회",
      ],
      quickSummary: [
        "운송장 번호를 공식 배송조회에 입력해 최근 처리 시간과 현재 위치를 확인하세요.",
        "운송장이 없거나 집하 전이라면 판매자·구매처에 상품을 실제로 넘겼는지 먼저 물어보세요.",
      ],
      steps: makeParcelTrackingSteps("롯데택배 공식 배송조회"),
      tips: [
        ...parcelTrackingTips,
        "공식 배송조회는 최근 3개월 이내 운송장 정보를 확인할 수 있어요.",
      ],
      officialUrl: trackingUrl,
      officialActionLabel: "롯데택배 배송조회 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "parcel-not-received",
      title: "배송완료인데 상품 없음",
      keywords: [
        "롯데택배 배송완료 상품 없음",
        "롯데택배 배송완료인데 안옴",
        "롯데 택배 못 받음",
        "롯데택배 분실",
        "롯데 오배송",
      ],
      quickSummary: [
        "배송완료 시간·위치와 배송 문자부터 확인하고 문 앞·경비실·무인택배함을 찾아보세요.",
        "찾지 못하면 기사님에게 실제 놓은 장소를 확인한 뒤 구매처에 '배송완료 미수령'으로 바로 접수하세요.",
      ],
      steps: makeParcelNotReceivedSteps(
        "롯데택배 공식 배송조회",
        "롯데택배 고객센터"
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
        "롯데택배 반품예약",
        "롯데택배 반품수거",
        "롯데 반품 접수",
        "롯데 반품 기사 예약",
        "롯데택배 회수 신청",
      ],
      quickSummary: [
        "먼저 구매처에서 반품을 승인받고, 직접 택배사에 예약하라는 안내를 받은 경우에만 접수하세요.",
        "공식 반품예약은 24시간 이용할 수 있고 운송장 번호나 업체 코드를 이용해 접수할 수 있어요.",
      ],
      steps: [
        "구매처 주문내역에서 반품을 먼저 신청하고 수거 방법을 확인합니다.",
        "구매처가 택배사 직접 예약을 안내한 경우에만 롯데택배 반품예약을 엽니다.",
        "운송장 번호 또는 안내받은 업체 코드를 입력하고 보내는 분·받는 분 정보를 확인합니다.",
        "상품 정보와 배송비 결제 방법을 확인한 뒤 예약을 완료합니다.",
        "상품을 다시 포장해 안내된 장소에 두고 접수 내역에서 수거 상태를 확인합니다.",
      ],
      tips: parcelReturnTips,
      officialUrl: returnUrl,
      officialActionLabel: "롯데택배 반품예약 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "customer-center",
      title: "고객센터",
      keywords: [
        "롯데택배 고객센터",
        "롯데택배 전화번호",
        "롯데글로벌로지스 상담원",
        "롯데택배 문의",
        "롯데택배 기사 연락처",
      ],
      quickSummary: [
        "운송장 번호와 최근 배송 상태를 열어둔 뒤 1588-2121로 문의하세요.",
        "'운송장 번호, 현재 상태, 원하는 확인 내용' 순서로 말하면 상담이 빨라져요.",
      ],
      phone: { number: "1588-2121", feeNote: "유료전화" },
      steps: [
        "공식 배송조회에서 운송장 번호와 최근 배송 상태를 확인합니다.",
        "1588-2121로 전화해 운송장 번호를 먼저 말합니다.",
        "배송 지연, 배송완료 미수령, 반품수거 지연 중 해당 문제와 원하는 확인 내용을 짧게 말합니다.",
      ],
      tips: [
        "판매자가 아직 택배사에 상품을 넘기지 않았다면 구매처에 실제 발송 여부를 먼저 확인하세요.",
        "상담시간은 공식 홈페이지 안내를 확인한 뒤 이용하세요.",
      ],
      officialUrl: supportUrl,
      officialActionLabel: "롯데택배 공식 홈페이지 열기",
      lastChecked: "2026-08-18",
    },
  ],
};
