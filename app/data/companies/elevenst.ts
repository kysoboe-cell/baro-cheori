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
        "상품이 아직 발송되지 않았다면 주문취소를 먼저 시도하세요.",
        "이미 상품이 발송됐다면 주문취소 대신 반품으로 진행해야 할 수 있어요.",
      ],

      steps: [
        "11번가에 로그인합니다.",
        "나의 11번가에서 주문내역으로 들어갑니다.",
        "취소하려는 상품을 선택합니다.",
        "주문취소를 누릅니다.",
        "취소 사유를 선택하고 신청을 완료합니다.",
      ],

      tips: [
        "배송준비중이라도 이미 실제 발송됐다면 반품 절차가 필요할 수 있어요.",
        "이미 발송됐다면 반품·환불 메뉴를 이용하세요.",
      ],

      officialUrl:
        "https://cs.11st.co.kr/",

      lastChecked: "2026-08-17",
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
        "주문내역에서 반품 신청을 먼저 진행하세요.",
        "방문수거로 신청했다면 상품을 다시 포장해 평소 상품을 받았던 주소의 문 앞에 두면 돼요.",
      ],

      steps: makeShoppingReturnSteps(
        "나의 11번가 주문내역"
      ),

      tips: shoppingReturnCommonTips,

      officialUrl:
        "https://cs.11st.co.kr/",

      lastChecked: "2026-08-17",
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
        "주문상태와 배송정보는 나의 11번가 주문내역에서 확인하는 것이 가장 빨라요.",
      ],

      steps: [
        "11번가에 로그인합니다.",
        "나의 11번가로 들어갑니다.",
        "주문내역을 선택합니다.",
        "확인하려는 상품을 선택합니다.",
        "주문상태와 배송정보를 확인합니다.",
      ],

      tips: [
        "배송정보가 오랫동안 바뀌지 않는다면 판매자 문의도 확인하세요.",
      ],

      officialUrl:
        "https://cs.11st.co.kr/",

      lastChecked: "2026-08-17",
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
        "먼저 주문내역에서 직접 처리할 수 있는지 확인하세요.",
        "그래도 해결되지 않을 때 고객센터를 이용하세요.",
      ],

      phone: {
        number: "1599-0110",
        feeNote: "유료전화",
      },

      hours: "평일 09:00~18:00",

      steps: [
        "나의 11번가에서 문제가 있는 주문을 먼저 확인합니다.",
        "주문 상세에서 직접 취소·반품 가능한지 확인합니다.",
        "그래도 해결되지 않으면 1599-0110으로 전화합니다.",
      ],

      tips: [
        "전화하기 전에 주문번호와 상품명을 확인해두면 상담이 편해요.",
      ],

      officialUrl:
        "https://cs.11st.co.kr/",

      lastChecked: "2026-08-17",
    },
  ],
};