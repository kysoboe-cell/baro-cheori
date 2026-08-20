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
   * "화면 그대로 따라하기" 스크린샷 가이드 v2 — 격자 + 라이트박스(스펙 v3 5절).
   * 격자에는 thumb(4:5 크롭)만 로드하고, 탭하면 라이트박스에서 img 전체를
   * 보여줍니다. thumb가 없으면 격자에서 img를 4:5로 잘라(상단 기준) 표시합니다.
   */
  screenshotGuide?: {
    /** 화면을 마지막으로 확인한 날짜. 예: "2026-08-20" */
    checkedAt: string;
    /** 예: "넷플릭스 안드로이드 앱 화면 기준" — 신선도 표시에 쓰입니다. */
    basis: string;
    steps: {
      /** 장면 번호(이미지에 박힌 코랄 배지 번호와 동일). */
      n: number;
      /** 전체 화면 720px WebP 절대 경로: /images/guides/<slug>/step1.webp */
      img: string;
      /** 4:5 크롭 480×600 WebP 절대 경로. 없으면 img를 4:5로 잘라 표시. */
      thumb?: string;
      /** 격자 아래 짧은 라벨(2~6자). 예: "나의 넷플릭스" */
      label: string;
      /** 라이트박스용 한 문장(45자 이내). `**단어**` 굵게. */
      caption: string;
      /** 스크린리더용 대체 텍스트 — 화면 상태를 서술합니다. */
      alt: string;
      /** 텍스트 단계 리스트의 몇 번(1부터)과 연결되는지 — "화면 보기" 버튼용. */
      linkedStep?: number;
      /** HowTo JSON-LD에 이 장면 이미지를 연결하려면 true. */
      howToImage?: boolean;
      /** 라이트박스 캡션 아래에 붙는 주의 문구. */
      warning?: string;
    }[];
  };

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
