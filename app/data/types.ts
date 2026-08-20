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

  /**
   * "화면 그대로 따라하기" 스크린샷 가이드입니다. 실제 캡처 화면 + 마커로
   * 처리 순서를 보여줍니다. 이미지는 public/images/guides/<folder>/ 에 있어야
   * 합니다. 재사용 가능한 구조 — 다른 서비스에도 같은 필드로 붙일 수 있습니다.
   */
  screenshotGuide?: {
    /** 예: "쿠팡 안드로이드 앱 화면 기준" — 신선도 표시에 쓰입니다. */
    platform: string;
    /** public/images/guides/ 아래 하위 폴더 이름입니다. */
    folder: string;
    steps: {
      /** 폴더 안 파일명 (예: "step1-home.webp"). */
      image: string;
      /** 원본 이미지 가로/세로 픽셀입니다. next/image 레이아웃 시프트 방지용. */
      width: number;
      height: number;
      /** 스크린리더용 대체 텍스트, 단계별로 서술형으로 씁니다. */
      alt: string;
      /** 캡션 텍스트. `**단어**`로 감싸면 굵게 렌더링됩니다. */
      caption: string;
      /** 이 단계를 특별히 강조해야 할 때(예: 실수하기 쉬운 지점) true로. */
      emphasize?: boolean;
      /** 이 단계 이미지 바로 아래에 노란 주의 박스를 추가합니다. */
      warningAfter?: string;
    }[];
  };

  /**
   * screenshotGuide 등 화면 캡처 기반 콘텐츠를 마지막으로 확인한 날짜입니다.
   * "정보 확인일"(lastChecked)과 별개로, 가이드 섹션 안에서 "이 화면 기준"
   * 신선도 표시에 씁니다.
   */
  guideCheckedAt?: string;

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
