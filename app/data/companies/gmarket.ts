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
        "나의 G마켓 주문내역에서 [취소신청]이 보이면 바로 눌러 처리하세요.",
        "이미 발송된 상품은 취소보다 반품 신청으로 진행하는 편이 빠릅니다.",
      ],

      steps: [
        "나의 G마켓 → 주문내역에서 취소할 상품을 누릅니다.",
        "[취소신청]을 누르고 취소 사유를 선택합니다.",
        "주문내역에서 취소 완료 여부를 확인합니다.",
        "취소 버튼이 없고 이미 발송됐다면 반품 신청으로 넘어갑니다.",
      ],

      tips: [
        "배송준비중에는 판매자가 이미 발송했을 수 있어 취소가 바로 완료되지 않을 수 있어요.",
        "취소 완료 후 계좌 환불은 영업일 기준 시간이 더 걸릴 수 있어요.",
      ],

      officialUrl:
        "https://help.gmarket.co.kr/Tcs/Faq/FaqCategorizationType?code=C105",

      officialActionLabel: "G마켓 취소 도움말 열기",

      lastChecked: "2026-08-18",
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
        "나의 G마켓 주문내역에서 [반품신청]부터 누르세요.",
        "방문수거라면 상품을 다시 포장해 평소 받았던 주소의 문 앞에 두면 돼요.",
      ],

      steps: makeShoppingReturnSteps(
        "나의 G마켓 주문내역"
      ),

      tips: shoppingReturnCommonTips,

      officialUrl:
        "https://help.gmarket.co.kr/Tcs/Faq/FaqCategorizationType?code=C105",

      officialActionLabel: "G마켓 반품 도움말 열기",

      lastChecked: "2026-08-18",
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
        "나의 G마켓 → 주문내역에서 주문상태와 택배 위치를 같이 확인할 수 있어요.",
      ],

      steps: [
        "G마켓에 로그인하고 나의 G마켓 → 주문내역을 누릅니다.",
        "확인할 상품을 선택합니다.",
        "배송조회 버튼을 누르거나 판매자 문의를 바로 이용합니다.",
      ],

      tips: [
        "송장만 등록되고 움직임이 없다면 주문 상세의 판매자 문의가 가장 빠릅니다.",
      ],

      officialUrl:
        "https://help.gmarket.co.kr/",

      officialActionLabel: "G마켓 주문·배송 도움말 열기",

      lastChecked: "2026-08-18",
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
        "주문·배송은 ARS 1번, 반품·교환은 ARS 2번으로 바로 들어가세요.",
        "전화 전에 주문번호와 상품명을 준비하면 상담이 훨씬 빨라집니다.",
      ],

      phone: {
        number: "1566-5701",
        feeNote: "유료전화",
      },

      hours: "평일 09:00~18:00",

      steps: [
        "나의 G마켓 주문내역에서 주문번호와 상품명을 확인합니다.",
        "판매자가 해결할 문제라면 주문 상세의 판매자 문의를 먼저 이용합니다.",
        "G마켓 처리가 필요한 문제면 1566-5701로 전화해 주문·배송 1번, 반품·교환 2번을 누릅니다.",
      ],

      tips: [
        "일반회원·비회원 상담은 평일 09:00~18:00에 운영돼요.",
        "G마켓 멤버십 전용 상담 번호는 1522-5700이며 365일 09:00~18:00 운영됩니다.",
      ],

      officialUrl:
        "https://help.gmarket.co.kr/",

      lastChecked: "2026-08-18",
    },
  ],
};
