export type ServiceTask = {
  slug: string;
  title: string;

  /**
   * h1 아래, "지금 이것부터 하세요" 박스 위에 들어가는 고유 도입부 1~2문단
   * (애드센스 재심사 대비 지시서 2, 2단계). 이 페이지의 실제 처리 단계·주의사항·
   * 함정에서만 뽑은 문장으로 구성 — 다른 업체·업무 페이지와 명사만 바꿔 돌려쓰지
   * 않습니다. quickSummary(행동 유도 한 줄)와는 역할이 다릅니다.
   */
  intro?: string[];

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

  /**
   * customer-center 업무는 기본적으로 공식 화면 버튼을 그리지 않습니다(전화가
   * 목적이라 홈페이지 버튼은 도움이 적다는 판단). 다만 "전화 전에 여기부터
   * 보라"고 안내하는 문장이 있는 페이지는 그 화면으로 가는 버튼이 있는 게
   * 낫습니다 — 그런 예외에만 true로 켭니다.
   */
  showOfficialButtonOnCustomerCenter?: boolean;

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
   * 많이 읽히는 페이지에만 붙이는 "이런 경우 주의하세요" 섹션입니다
   * (2026-09-02 지시서 2장). tips가 한 줄짜리 경고라면, 이쪽은 실수·예외
   * 하나를 제목과 설명으로 풀어 쓴 묶음입니다.
   *
   * heading은 페이지마다 다른 문구를 씁니다 — 같은 소제목이 여러 페이지에
   * 반복되면 템플릿으로 찍어낸 인상이 다시 생깁니다.
   */
  pitfalls?: {
    heading: string;
    items: { title: string; body: string }[];
  };

  /**
   * 이 업무와 이어지는 기둥 글(app/data/guides.ts) 한 편으로 보내는 줄입니다.
   * slug가 실제 글인지는 lib/guide-links.ts의 assert가 빌드 때 검사합니다.
   */
  guideLink?: {
    slug: string;
    text: string;
  };

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

  /**
   * 업체 허브 페이지(/company/<slug>)의 업무 목록 위에 들어가는 개요 본문
   * 2~3문단입니다(애드센스 개선 지시서 4단계). 이 업체의 실제 상세 페이지
   * 내용에서만 뽑은 사실로 구성 — 새 사실을 창작하지 않습니다.
   */
  overview?: string[];

  /** 업체 허브에도 자주 묻는 질문을 둘 수 있습니다(2026-09-02 지시서 2장). */
  faq?: {
    question: string;
    answer: string;
  }[];

  /** 업체 허브용 "이런 경우 주의하세요" — 소제목은 업체마다 다르게 씁니다. */
  pitfalls?: {
    heading: string;
    items: { title: string; body: string }[];
  };

  /** 업체 허브에서 이어지는 기둥 글 한 편. */
  guideLink?: {
    slug: string;
    text: string;
  };
};
