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
        "Npay 결제내역에서 [취소요청]을 누르세요. 결제대기중·결제완료라면 바로 취소돼요.",
        "상품준비중이면 판매자 승인이 필요하고, 이미 발송됐다면 반품으로 바뀔 수 있어요.",
      ],

      steps: [
        "Npay → 결제내역에서 취소할 주문을 누릅니다.",
        "[취소요청]을 누르고 취소 사유를 선택합니다.",
        "결제대기중·결제완료라면 취소 완료 표시를 확인합니다.",
        "상품준비중이면 주문 상세의 판매자 문의로 실제 발송 여부를 물어봅니다.",
      ],

      tips: [
        "판매자가 이미 발송했다면 취소 요청을 거부할 수 있어요. 이때는 받은 뒤 반품하세요.",
        "취소는 완료돼도 카드·계좌 환불에는 별도 시간이 걸릴 수 있어요.",
      ],

      officialUrl:
        "https://help.pay.naver.com/faq/content.help?faqId=11753",

      lastChecked: "2026-08-18",
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
        "Npay 결제내역에서 주문을 열고 [반품요청]부터 누르세요.",
        "방문수거를 선택했다면 다시 포장해 평소 상품을 받았던 주소의 문 앞에 두면 돼요.",
      ],

      steps: makeShoppingReturnSteps(
        "Npay 결제내역"
      ),

      tips: shoppingReturnCommonTips,

      officialUrl:
        "https://help.pay.naver.com/faq/content.help?faqId=11724",

      lastChecked: "2026-08-18",
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
        "네이버에서 Npay → 결제내역만 열면 주문상태와 택배 위치를 같이 볼 수 있어요.",
      ],

      steps: [
        "네이버에서 Npay → 결제내역으로 들어갑니다.",
        "확인할 쇼핑 주문을 누릅니다.",
        "주문 상세에서 배송조회나 판매자 문의를 바로 이용합니다.",
      ],

      officialUrl:
        "https://help.pay.naver.com/",

      lastChecked: "2026-08-18",
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
        "상품·배송 문제는 주문 상세의 [판매자 문의]가 가장 빠릅니다.",
        "결제·환불 처리나 판매자 연락 불가 문제는 네이버페이 고객센터 1588-3819를 이용하세요.",
      ],

      phone: {
        number: "1588-3819",
        feeNote: "유료전화",
      },

      hours: "전화·채팅 상담 평일 09:00~18:00 · 챗봇 24시간",

      steps: [
        "Npay 결제내역에서 문제가 있는 주문을 열어 주문번호를 확인합니다.",
        "상품·배송 문제면 주문 상세의 판매자 문의를 먼저 누릅니다.",
        "결제·환불 문제거나 판매자와 연락되지 않으면 1588-3819로 문의합니다.",
      ],

      officialUrl:
        "https://help.pay.naver.com/",

      lastChecked: "2026-08-18",
    },
  ],
};
