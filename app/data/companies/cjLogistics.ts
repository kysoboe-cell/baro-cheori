import type { Company } from "../types";
import {
  makeParcelNotReceivedSteps,
  makeParcelTrackingSteps,
  parcelNotReceivedTips,
  parcelReturnTips,
  parcelTrackingTips,
} from "../parcelCommon";

const trackingUrl = "https://www.cjlogistics.com/ko/tool/parcel/tracking";
const returnUrl =
  "https://www.cjlogistics.com/ko/tool/parcel/reservation-return";
const supportUrl = "https://www.cjlogistics.com/ko/support/guide/parcel";

export const cjLogistics: Company = {
  slug: "cj-logistics",
  name: "CJ대한통운",
  categoryId: "delivery",
  aliases: ["CJ대한통운", "대한통운", "CJ택배", "씨제이대한통운", "CJ Logistics"],
  services: [
    {
      slug: "delivery-tracking",
      title: "배송조회",
      keywords: [
        "CJ대한통운 배송조회",
        "대한통운 택배조회",
        "CJ택배 위치",
        "CJ 운송장 조회",
        "대한통운 언제 와요",
      ],
      quickSummary: [
        "운송장 번호가 있으면 공식 배송조회에 숫자만 입력해 현재 위치를 확인하세요.",
        "운송장이 없거나 상품인수 전이라면 택배사보다 판매자·구매처에 실제 발송 여부를 먼저 물어보세요.",
      ],
      steps: makeParcelTrackingSteps("CJ대한통운 공식 배송조회"),
      tips: parcelTrackingTips,
      officialUrl: trackingUrl,
      officialActionLabel: "CJ대한통운 배송조회 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "parcel-not-received",
      title: "배송완료인데 상품 없음",
      keywords: [
        "CJ대한통운 배송완료 상품 없음",
        "CJ택배 배송완료인데 안옴",
        "대한통운 택배 못 받음",
        "CJ 택배 분실",
        "대한통운 오배송",
      ],
      quickSummary: [
        "배송완료 시간·위치와 배송 문자부터 확인하고 문 앞·경비실·무인택배함을 찾아보세요.",
        "그래도 없다면 기사님에게 실제 놓은 장소를 확인한 뒤 구매처에 '배송완료 미수령'으로 접수하세요.",
      ],
      steps: makeParcelNotReceivedSteps(
        "CJ대한통운 공식 배송조회",
        "CJ대한통운 고객센터"
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
        "CJ대한통운 반품예약",
        "CJ택배 반품수거",
        "대한통운 반품 접수",
        "CJ 반품 기사 예약",
        "대한통운 택배 회수 신청",
      ],
      quickSummary: [
        "먼저 구매처에서 반품을 승인받고, 직접 택배사에 예약하라는 안내를 받은 경우에만 접수하세요.",
        "공식 반품예약에서 처음 받은 운송장 번호와 받는 분 전화번호로 조회한 뒤 방문수거를 예약할 수 있어요.",
      ],
      steps: [
        "구매처 주문내역에서 반품을 먼저 신청하고 수거 방법을 확인합니다.",
        "구매처가 택배사 직접 예약을 안내한 경우에만 CJ대한통운 반품예약을 엽니다.",
        "처음 상품을 받은 운송장 번호와 받는 분 전화번호를 입력합니다.",
        "수거지와 상품 정보를 확인하고 예약을 완료합니다.",
        "상품을 다시 포장해 안내된 장소에 두고 예약 내역에서 수거 상태를 확인합니다.",
      ],
      tips: [
        ...parcelReturnTips,
        "방문일은 물량과 지역에 따라 달라질 수 있고 정확한 방문 시간을 지정하기는 어려워요.",
      ],
      officialUrl: returnUrl,
      officialActionLabel: "CJ대한통운 반품예약 열기",
      lastChecked: "2026-08-18",
    },
    {
      slug: "customer-center",
      title: "고객센터",
      keywords: [
        "CJ대한통운 고객센터",
        "대한통운 전화번호",
        "CJ택배 상담원",
        "CJ대한통운 문의",
        "대한통운 택배 기사 연락처",
      ],
      quickSummary: [
        "운송장 번호와 최근 배송 상태를 열어둔 뒤 1588-1255로 문의하세요.",
        "'운송장 번호, 현재 상태, 원하는 확인 내용' 순서로 말하면 상담이 빨라져요.",
      ],
      phone: { number: "1588-1255", feeNote: "유료전화" },
      hours:
        "평일 09:00~18:00(12:00~13:00 점심) · 토요일·공휴일 09:00~13:00 · 일요일 채팅상담 09:00~13:00",
      steps: [
        "공식 배송조회에서 운송장 번호와 최근 배송 상태를 확인합니다.",
        "1588-1255로 전화해 운송장 번호를 먼저 말합니다.",
        "배송 지연, 배송완료 미수령, 반품수거 지연 중 해당 문제와 원하는 확인 내용을 짧게 말합니다.",
      ],
      tips: [
        "판매자가 아직 상품을 넘기지 않았다면 CJ대한통운이 확인하기 어려우므로 구매처에 먼저 문의하세요.",
        "기사 방문이 2~3일 이상 늦어졌다면 담당 영업소나 고객센터에 운송장 번호로 확인하세요.",
      ],
      officialUrl: supportUrl,
      officialActionLabel: "CJ대한통운 고객지원 열기",
      lastChecked: "2026-08-18",
    },
  ],
};
