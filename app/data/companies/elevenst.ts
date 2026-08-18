import type { Company } from "../types";

import {
  makeShoppingReturnSteps,
  shoppingReturnCommonTips,
} from "../shoppingCommon";

export const elevenst: Company = {
  slug: "11st",
  name: "11번가",
  categoryId: "shopping",

  aliases: [
    "11번가",
    "십일번가",
    "11st",
  ],

  services: [
    {
      slug: "cancel",
      title: "주문취소",

      keywords: [
        "11번가 주문취소",
        "십일번가 주문취소",
        "11번가 취소",
        "11번가 주문 취소",
        "11번가 주문 취소하고 싶어",
      ],

      quickSummary: [
        "나의11번가 주문내역에서 상품을 열고 [주문취소]를 누르세요.",
        "취소 버튼이 없고 이미 발송됐다면 상품을 받은 뒤 반품으로 진행하세요.",
      ],

      steps: [
        "나의11번가 → 주문/배송조회에서 취소할 상품을 엽니다.",
        "[주문취소]를 누르고 취소 사유를 고릅니다.",
        "신청 뒤 주문 상태가 취소완료로 바뀌었는지 확인합니다.",
      ],

      tips: [
        "판매자가 발송을 시작했다면 취소가 거절되고 반품으로 바뀔 수 있어요.",
        "여러 상품을 함께 샀다면 취소할 상품만 선택했는지 확인하세요.",
      ],

      officialUrl:
        "https://www.11st.co.kr/OrderDelvInfo.page",

      officialActionLabel: "11번가 주문/배송조회 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "return-refund",
      title: "반품·환불",

      keywords: [
        "11번가 반품",
        "십일번가 반품",
        "11번가 환불",
        "십일번가 환불",
        "11번가 물건 돌려보내기",
        "11번가 환불하고 싶어",
      ],

      quickSummary: [
        "나의11번가 주문내역에서 상품을 열고 [반품신청]을 누르세요.",
        "방문수거를 골랐다면 다시 포장해 평소 상품을 받은 주소의 문 앞에 두세요.",
      ],

      steps: makeShoppingReturnSteps(
        "나의 11번가 주문내역"
      ),

      tips: shoppingReturnCommonTips,

      officialUrl:
        "https://www.11st.co.kr/OrderDelvInfo.page",

      officialActionLabel: "11번가 주문/배송조회 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "order-check",
      title: "주문내역 확인",

      keywords: [
        "11번가 주문내역",
        "십일번가 주문내역",
        "11번가 배송조회",
        "십일번가 배송조회",
        "11번가 주문 확인",
        "11번가 배송 언제 와",
      ],

      quickSummary: [
        "나의11번가 → 주문/배송조회에서 주문 상태와 운송장 번호를 바로 확인하세요.",
      ],

      steps: [
        "나의11번가 → 주문/배송조회를 엽니다.",
        "찾는 상품을 선택해 주문 상태를 확인합니다.",
        "배송중이라면 운송장 번호를 눌러 택배 위치를 확인합니다.",
      ],

      tips: [
        "배송정보가 오랫동안 바뀌지 않는다면 판매자 문의도 확인하세요.",
      ],

      officialUrl:
        "https://www.11st.co.kr/OrderDelvInfo.page",

      officialActionLabel: "11번가 주문/배송조회 열기",

      lastChecked: "2026-08-18",
    },

    {
      slug: "customer-center",
      title: "고객센터",

      keywords: [
        "11번가 고객센터",
        "십일번가 고객센터",
        "11번가 전화번호",
        "11번가 상담원",
        "11번가 문의",
      ],

      quickSummary: [
        "취소·반품은 나의11번가 주문내역에서 직접 신청하는 것이 가장 빨라요.",
        "버튼이 없거나 판매자와 해결되지 않을 때 1599-0110으로 문의하세요.",
      ],

      phone: {
        number: "1599-0110",
        feeNote: "유료전화",
      },

      hours: "평일 09:00~18:00",

      steps: [
        "나의11번가에서 문제가 있는 주문번호를 확인합니다.",
        "주문 상세의 판매자 문의나 취소·반품 버튼을 먼저 이용합니다.",
        "처리 버튼이 없거나 분쟁이 해결되지 않으면 1599-0110으로 전화합니다.",
      ],

      tips: [
        "전화하기 전에 주문번호와 상품명을 확인해두면 상담이 편해요.",
      ],

      officialUrl:
        "https://cs.11st.co.kr/",

      lastChecked: "2026-08-18",
    },
  ],
};
