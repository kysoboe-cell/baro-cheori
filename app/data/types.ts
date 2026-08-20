export type ServiceTask = {
  slug: string;
  title: string;
  keywords: string[];

  quickSummary?: string[];

  phone?: {
    number: string;
    feeNote?: string;
  };

  hours?: string;

  steps?: string[];

  /**
   * 처리 순서에서 사용자가 놓치면 안 되는 단계의 0부터 시작하는 번호입니다.
   * 지정하지 않으면 업무 종류별 검수 규칙을 사용합니다.
   */
  keyStepIndexes?: number[];

  tips?: string[];

  officialUrl?: string;

  officialActionLabel?: string;

  /** 공식 링크가 실제 처리 화면인지, 로그인 화면인지, 설명 페이지인지 알려줍니다. */
  officialLinkType?: "direct" | "login" | "guide";

  /** 링크를 연 뒤 사용자가 해야 할 다음 행동입니다. */
  officialNextStep?: string;

  /** 전화가 꼭 필요할 때 들을 메뉴나 상담원에게 말할 문장입니다. */
  phoneGuide?: string[];

  /**
   * 품목·업체별 대략 참고표입니다(수리비, 환불 소요기간 등). 정확한 공식
   * 수치가 아니라 대략적인 참고 범위이므로, 표 위에 안내 문구(priceTableNote)와
   * 함께 노출합니다. visitFee는 값이 있는 행이 하나도 없으면 열 자체가 표에서
   * 빠집니다.
   */
  priceTable?: {
    item: string;
    issue: string;
    visitFee?: string;
    priceRange: string;
  }[];

  /** priceTable 위에 표시할 안내 문구입니다. 지정하지 않으면 기본 문구를 씁니다. */
  priceTableNote?: string;

  /**
   * priceTable의 섹션 제목·열 이름을 바꿉니다. 지정하지 않으면 "수리비 참고 ·
   * 품목별 대략 수리비 참고표" 기본값(가전 수리비 표 기준)을 씁니다.
   */
  priceTableHeading?: {
    label?: string;
    title?: string;
    columns?: {
      item?: string;
      issue?: string;
      visitFee?: string;
      priceRange?: string;
    };
  };

  /** 자주 묻는 질문입니다. FAQPage 구조화 데이터로도 함께 노출됩니다. */
  faq?: {
    question: string;
    answer: string;
  }[];

  lastChecked?: string;
};

export type CategoryId =
  | "shopping"
  | "telecom"
  | "delivery"
  | "card"
  | "subscription"
  | "electronics";

export type Company = {
  slug: string;
  name: string;
  categoryId: CategoryId;
  aliases: string[];
  services: ServiceTask[];
};
