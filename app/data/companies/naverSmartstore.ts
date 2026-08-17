import type { Company } from "../types";

import {
  makeShoppingReturnSteps,
  shoppingReturnCommonTips,
} from "../shoppingCommon";

export const naverSmartstore: Company = {
  slug: "naver-smartstore",
  name: "네이버 스마트스토어",
  categoryId: "shopping",

  aliases: [
    "스마트스토어",
    "네이버쇼핑",
    "네이버 스마트스토어",
    "Npay",
    "네이버페이",
  ],

  services: [
    {
      slug: "cancel",
      title: "주문취소",

      keywords: [
        "네이버 스마트스토어 주문취소",
        "스마트스토어 취소",
        "네이버쇼핑 주문취소",
        "네이버 주문 취소",
        "네이버페이 주문취소",
      ],

      quickSummary: [
        "결제대기중·결제완료 상태라면 주문취소를 먼저 시도하세요.",
        "이미 상품이 발송됐다면 주문취소 대신 반품으로 진행해야 할 수 있어요.",
      ],

      steps: [
        "네이버에서 Npay 결제내역으로 들어갑니다.",
        "취소하려는 주문을 선택합니다.",
        "주문취소를 누릅니다.",
        "취소 사유를 선택하고 신청을 완료합니다.",
      ],

      tips: [
        "상품준비중이라면 판매자가 이미 발송했는지 먼저 확인하는 것이 좋아요.",
        "이미 발송됐다면 반품·환불 메뉴를 이용하세요.",
      ],

      officialUrl:
        "https://help.pay.naver.com/faq/content.help?faqId=11753",

      lastChecked: "2026-08-17",
    },

    {
      slug: "return-refund",
      title: "반품·환불",

      keywords: [
        "네이버 스마트스토어 반품",
        "스마트스토어 환불",
        "네이버쇼핑 반품",
        "네이버쇼핑 환불",
        "네이버 물건 돌려보내기",
        "네이버페이 환불",
      ],

      quickSummary: [
        "주문내역에서 반품 신청을 먼저 진행하세요.",
        "방문수거로 신청했다면 상품을 다시 포장해 평소 상품을 받았던 주소의 문 앞에 두면 돼요.",
      ],

      steps: makeShoppingReturnSteps(
        "Npay 결제내역"
      ),

      tips: shoppingReturnCommonTips,

      officialUrl:
        "https://help.pay.naver.com/faq/content.help?faqId=11724",

      lastChecked: "2026-08-17",
    },

    {
      slug: "order-check",
      title: "주문내역 확인",

      keywords: [
        "네이버 주문내역",
        "스마트스토어 주문 확인",
        "네이버쇼핑 배송 확인",
        "네이버페이 결제내역",
        "Npay 주문내역",
      ],

      quickSummary: [
        "스마트스토어 주문과 배송상태는 Npay 결제내역에서 확인하는 것이 가장 빨라요.",
      ],

      steps: [
        "네이버에서 Npay로 들어갑니다.",
        "결제내역을 선택합니다.",
        "확인하려는 스마트스토어 주문을 선택합니다.",
        "주문상태와 배송정보를 확인합니다.",
      ],

      officialUrl:
        "https://help.pay.naver.com/",

      lastChecked: "2026-08-17",
    },

    {
      slug: "customer-center",
      title: "고객센터",

      keywords: [
        "네이버 쇼핑 고객센터",
        "네이버페이 고객센터",
        "스마트스토어 고객센터",
        "네이버 고객센터 전화번호",
      ],

      quickSummary: [
        "먼저 Npay 주문내역에서 직접 처리할 수 있는지 확인하세요.",
        "그래도 해결되지 않을 때 고객센터를 이용하세요.",
      ],

      phone: {
        number: "1588-3819",
        feeNote: "유료전화",
      },

      steps: [
        "Npay 결제내역에서 문제가 있는 주문을 확인합니다.",
        "상품이나 배송 문제라면 해당 주문에서 판매자 문의를 이용합니다.",
        "그래도 해결되지 않으면 네이버 쇼핑&페이 고객센터를 이용합니다.",
      ],

      officialUrl:
        "https://help.pay.naver.com/",

      lastChecked: "2026-08-17",
    },
  ],
};