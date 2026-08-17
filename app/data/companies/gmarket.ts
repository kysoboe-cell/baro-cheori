import type { Company } from "../types";

import {
  makeShoppingReturnSteps,
  shoppingReturnCommonTips,
} from "../shoppingCommon";

export const gmarket: Company = {
  slug: "gmarket",
  name: "G마켓",
  categoryId: "shopping",

  aliases: [
    "G마켓",
    "지마켓",
    "gmarket",
  ],

  services: [
    {
      slug: "cancel",
      title: "주문취소",

      keywords: [
        "G마켓 주문취소",
        "지마켓 주문취소",
        "G마켓 취소",
        "지마켓 취소",
        "G마켓 주문 취소하고 싶어",
      ],

      quickSummary: [
        "결제완료 상태라면 주문취소를 먼저 시도하세요.",
        "이미 상품이 발송됐다면 주문취소 대신 반품으로 진행해야 할 수 있어요.",
      ],

      steps: [
        "G마켓에 로그인합니다.",
        "나의 G마켓에서 주문내역으로 들어갑니다.",
        "취소하려는 상품을 선택합니다.",
        "주문취소를 누릅니다.",
        "취소 사유를 선택하고 신청을 완료합니다.",
      ],

      tips: [
        "배송준비중이라면 판매자가 이미 상품을 발송했는지 확인하세요.",
        "이미 발송됐다면 반품·환불 메뉴를 이용하세요.",
      ],

      officialUrl:
        "https://help.gmarket.co.kr/",

      lastChecked: "2026-08-17",
    },

    {
      slug: "return-refund",
      title: "반품·환불",

      keywords: [
        "G마켓 반품",
        "지마켓 반품",
        "G마켓 환불",
        "지마켓 환불",
        "G마켓 물건 돌려보내기",
        "지마켓 물건 돌려보내기",
        "G마켓 환불하고 싶어",
      ],

      quickSummary: [
        "주문내역에서 반품 신청을 먼저 진행하세요.",
        "방문수거로 신청했다면 상품을 다시 포장해 평소 상품을 받았던 주소의 문 앞에 두면 돼요.",
      ],

      steps: makeShoppingReturnSteps(
        "나의 G마켓 주문내역"
      ),

      tips: shoppingReturnCommonTips,

      officialUrl:
        "https://help.gmarket.co.kr/",

      lastChecked: "2026-08-17",
    },

    {
      slug: "order-check",
      title: "주문내역 확인",

      keywords: [
        "G마켓 주문내역",
        "지마켓 주문내역",
        "G마켓 배송조회",
        "지마켓 배송조회",
        "G마켓 주문 확인",
        "G마켓 배송 언제 와",
      ],

      quickSummary: [
        "주문상태와 배송정보는 나의 G마켓 주문내역에서 확인하는 것이 가장 빨라요.",
      ],

      steps: [
        "G마켓에 로그인합니다.",
        "나의 G마켓으로 들어갑니다.",
        "주문내역을 선택합니다.",
        "확인하려는 상품을 선택합니다.",
        "주문상태와 배송정보를 확인합니다.",
      ],

      tips: [
        "배송정보가 오랫동안 바뀌지 않는다면 판매자 문의도 확인하세요.",
      ],

      officialUrl:
        "https://help.gmarket.co.kr/",

      lastChecked: "2026-08-17",
    },

    {
      slug: "customer-center",
      title: "고객센터",

      keywords: [
        "G마켓 고객센터",
        "지마켓 고객센터",
        "G마켓 전화번호",
        "지마켓 전화번호",
        "G마켓 상담원",
      ],

      quickSummary: [
        "먼저 주문내역에서 직접 처리할 수 있는지 확인하세요.",
        "그래도 해결되지 않을 때 고객센터를 이용하세요.",
      ],

      phone: {
        number: "1566-5701",
        feeNote: "유료전화",
      },

      hours: "평일 09:00~18:00",

      steps: [
        "나의 G마켓에서 문제가 있는 주문을 먼저 확인합니다.",
        "상품·배송 문제라면 판매자 문의도 확인합니다.",
        "그래도 해결되지 않으면 1566-5701로 전화합니다.",
      ],

      tips: [
        "전화하기 전에 주문번호와 상품명을 확인해두면 상담이 편해요.",
      ],

      officialUrl:
        "https://help.gmarket.co.kr/",

      lastChecked: "2026-08-17",
    },
  ],
};