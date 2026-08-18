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
