import { companies } from "./services";

export type ProblemOption = {
  companySlug: string;
  serviceSlug: string;
  /** 목록에 곁들일 짧은 한 줄. 없으면 서비스 title만 표시. */
  note?: string;
};

export type Problem = {
  /** URL: /problem/<slug> */
  slug: string;
  /** 목록·링크에 쓰는 짧은 이름 */
  title: string;
  /** 페이지 h1 */
  heading: string;
  /** h1 아래 한 문단 */
  lead: string;
  icon: string;
  /** 업체 고르기 전에 공통으로 할 일 */
  firstAid: string[];
  /** 업체 선택 목록 위 안내 문구 */
  chooseLabel: string;
  /** 인기순으로 정렬해서 넣을 것 — 첫 번째가 강조된다 */
  options: ProblemOption[];
  /** "모르겠어요" 갈래 */
  fallback?: {
    label: string;
    note: string;
    links: { href: string; label: string }[];
  };
  faq?: { question: string; answer: string }[];
  /** 관련 허브 slug */
  related?: string[];
  lastChecked: string;
};

export const problems: Problem[] = [
  {
    slug: "charged-after-cancel",
    title: "해지했는데 또 결제됐어요",
    heading: "해지했는데 또 결제됐어요",
    lead: "해지한 곳과 실제로 돈이 빠져나간 곳이 다른 경우가 많습니다. 결제된 곳부터 확인한 뒤 그 업체에서 처리하세요.",
    icon: "💸",
    firstAid: [
      "카드·계좌 명세서에 찍힌 결제한 곳 이름을 먼저 보세요. 서비스 이름이 아니라 애플·구글·통신사 이름으로 찍혔다면, 해지도 환불도 그 결제 업체에서 해야 합니다.",
      "해지 확인 메일이나 해지 완료 화면을 찾아 해지가 실제로 끝난 날짜를 확인하세요. 해지를 누른 날과 해지가 완료된 날이 다를 수 있습니다.",
      "결제된 날짜와 금액을 메모해 두세요. 어느 업체에 문의하든 그대로 필요합니다.",
    ],
    chooseLabel: "어디에서 결제됐나요?",
    options: [
      { companySlug: "netflix", serviceSlug: "charged-after-cancel" },
      { companySlug: "youtube-premium", serviceSlug: "charged-after-cancel" },
      { companySlug: "coupang", serviceSlug: "wow-membership-refund" },
      { companySlug: "tving", serviceSlug: "charged-after-cancel" },
      { companySlug: "wavve", serviceSlug: "charged-after-cancel" },
      { companySlug: "disney-plus", serviceSlug: "charged-after-cancel" },
      { companySlug: "naver-plus", serviceSlug: "unexpected-membership-charge" },
      { companySlug: "apple-app-store", serviceSlug: "unknown-charge", note: "명세서에 APPLE.COM/BILL로 찍혔을 때" },
      { companySlug: "google-play", serviceSlug: "unknown-charge", note: "명세서에 GOOGLE로 찍혔을 때" },
    ],
    fallback: {
      label: "어디서 결제된 건지 모르겠어요",
      note: "명세서의 가맹점 이름만으로 알 수 없으면 카드사에서 결제 내역을 확인하고, 내가 한 결제가 아니면 부정사용으로 신고하세요.",
      links: [
        { href: "/company/kb-card/unrecognized-charge", label: "KB국민카드에서 확인하기" },
        { href: "/company/shinhan-card/unrecognized-charge", label: "신한카드에서 확인하기" },
        { href: "/company/samsung-card/unrecognized-charge", label: "삼성카드에서 확인하기" },
      ],
    },
    faq: [
      {
        question: "해지했는데 왜 또 결제되나요?",
        answer:
          "해지가 끝나기 전에 다음 결제일이 지났거나, 해지한 곳과 실제로 결제하는 곳이 달라서인 경우가 많아요. 아이폰 앱스토어·구글플레이·통신사를 통해 가입한 구독은 그쪽에서 해지해야 결제가 멈춥니다.",
      },
      {
        question: "이미 결제된 돈은 돌려받을 수 있나요?",
        answer:
          "업체마다 다릅니다. 아직 이용하지 않은 기간이 남아 있으면 환불 가능성이 있고, 이미 이용한 기간은 어려운 편이에요. 결제일·금액과 해지 기록을 준비해 해당 업체 고객센터에 문의하세요.",
      },
      {
        question: "일단 카드를 정지하면 결제가 멈추나요?",
        answer:
          "결제는 막힐 수 있지만 구독 자체는 살아 있어서 미납·이용정지로 이어질 수 있어요. 카드를 막기 전에 구독을 해지하는 순서가 안전합니다.",
      },
    ],
    related: ["subscription-cancel"],
    lastChecked: "2026-08-20",
  },

  {
    slug: "lost-card",
    title: "카드를 잃어버렸어요",
    heading: "카드를 잃어버렸어요",
    lead: "찾으러 다니기 전에 정지부터 하세요. 카드사를 고르면 분실신고 순서가 바로 나옵니다.",
    icon: "🔒",
    firstAid: [
      "찾는 것보다 정지가 먼저입니다. 분실신고는 대부분의 카드사가 24시간 접수합니다.",
      "카드번호를 몰라도 신고할 수 있습니다. 카드사 공식 앱이나 대표번호에서 본인인증으로 진행하세요.",
      "문자메시지에 적힌 링크는 누르지 마세요. 카드 뒷면 번호, 공식 앱, 공식 홈페이지에 적힌 번호만 이용하세요.",
      "최근 이용내역에 내가 하지 않은 결제가 있으면 재발급만 하지 말고 부정사용 신고도 함께 접수하세요.",
    ],
    chooseLabel: "어느 카드사인가요?",
    options: [
      { companySlug: "kb-card", serviceSlug: "lost-card" },
      { companySlug: "shinhan-card", serviceSlug: "lost-card" },
      { companySlug: "samsung-card", serviceSlug: "lost-card" },
    ],
    fallback: {
      label: "지갑을 통째로 잃어버렸어요",
      note: "카드사별로 따로 신고해야 합니다. 한 곳에 신고해도 다른 카드사 카드는 그대로 살아 있습니다. 위에서 한 곳씩 차례로 진행하세요.",
      links: [],
    },
    faq: [
      {
        question: "신고했다가 카드를 다시 찾으면 어떻게 하나요?",
        answer:
          "카드사에서 신고 해제를 할 수 있습니다. 다만 해제가 됐는지 확인하기 전에는 그 카드를 쓰지 마세요.",
      },
      {
        question: "분실신고하면 새 카드가 자동으로 오나요?",
        answer:
          "아니요. 이용정지와 재발급은 별개입니다. 새 카드가 필요하면 재발급을 따로 신청해야 합니다.",
      },
    ],
    related: ["card-reissue"],
    lastChecked: "2026-08-20",
  },

  {
    slug: "repair-cost",
    title: "가전 수리비가 궁금해요",
    heading: "가전 수리비, 기사 부르기 전에 확인하세요",
    lead: "수리비는 부품비·기술료·출장비를 합쳐 정해집니다. 제조사를 고르면 공식 요금 기준과 보증기간 보는 법이 나옵니다.",
    icon: "🔧",
    firstAid: [
      "제품 모델명과 구입 날짜부터 확인하세요. 이 두 가지가 무상인지 유상인지를 가릅니다.",
      "보증기간 안이어도 떨어뜨림·침수처럼 제품 자체 불량이 아니면 비용이 생길 수 있습니다.",
      "출장비는 수리를 받지 않아도 청구될 수 있습니다. 유상 안내를 듣고 취소하는 경우가 대표적이에요.",
    ],
    chooseLabel: "어느 제조사인가요?",
    options: [
      { companySlug: "samsung-electronics", serviceSlug: "repair-cost-warranty" },
      { companySlug: "lg-electronics", serviceSlug: "repair-cost-warranty" },
    ],
    fallback: {
      label: "고장인지부터 모르겠어요",
      note: "전원·차단기처럼 흔한 원인이면 출장비 없이 끝날 수 있습니다. 자가진단부터 해보세요.",
      links: [{ href: "/problem/appliance-broken", label: "가전제품이 갑자기 안 될 때" }],
    },
    faq: [
      {
        question: "보증기간 안이면 무조건 무료인가요?",
        answer:
          "아니요. 제품 자체 불량이 아닌 외부 요인(떨어뜨림·침수 등)이나 '고장이 아닌 점검'은 보증기간 안이라도 유상입니다.",
      },
      {
        question: "출장 신청만 하고 취소하면 돈이 안 드나요?",
        answer:
          "기사가 방문해 점검하고 유상 안내를 한 뒤 취소하면 출장비가 청구될 수 있습니다. 방문 전에 취소하는 것과 다릅니다.",
      },
    ],
    related: ["appliance-broken"],
    lastChecked: "2026-08-20",
  },

  {
    slug: "subscription-cancel",
    title: "구독을 해지하고 싶어요",
    heading: "구독을 해지하고 싶어요",
    lead: "앱을 지워도 해지되지 않습니다. 서비스를 고르면 마지막 확인 버튼까지 짚어드립니다.",
    icon: "▶️",
    firstAid: [
      "앱 삭제나 로그아웃은 해지가 아닙니다. 해지 화면의 마지막 확인 버튼까지 눌러야 끝납니다.",
      "해지해도 보통 이미 결제한 이용기간이 끝날 때까지는 계속 쓸 수 있습니다.",
      "아이폰 앱스토어·구글플레이·통신사를 통해 가입했다면 그 결제한 곳에서 해지해야 합니다.",
    ],
    chooseLabel: "어느 서비스인가요?",
    options: [
      { companySlug: "coupang", serviceSlug: "wow-membership-cancel" },
      { companySlug: "netflix", serviceSlug: "membership-cancel" },
      { companySlug: "youtube-premium", serviceSlug: "membership-cancel" },
      { companySlug: "tving", serviceSlug: "membership-cancel" },
      { companySlug: "wavve", serviceSlug: "membership-cancel" },
      { companySlug: "disney-plus", serviceSlug: "membership-cancel" },
      { companySlug: "naver-plus", serviceSlug: "recurring-payment-cancel" },
      { companySlug: "apple-app-store", serviceSlug: "membership-cancel", note: "아이폰에서 결제하는 구독 전체" },
      { companySlug: "google-play", serviceSlug: "membership-cancel", note: "안드로이드에서 결제하는 구독 전체" },
    ],
    fallback: {
      label: "해지했는데도 계속 결제돼요",
      note: "해지가 끝나지 않았거나 결제하는 곳이 다른 경우입니다.",
      links: [{ href: "/problem/charged-after-cancel", label: "해지했는데 또 결제됐어요" }],
    },
    faq: [
      {
        question: "해지하면 바로 못 보게 되나요?",
        answer:
          "대부분 이미 결제한 기간이 끝날 때까지는 그대로 이용할 수 있고, 그 이후부터 중단됩니다. 서비스에 따라 즉시 종료를 선택할 수 있는 곳도 있습니다.",
      },
      {
        question: "무료체험 중에 해지하면 돈이 나가나요?",
        answer:
          "체험 종료일 전에 해지를 끝내면 결제되지 않습니다. 종료일을 넘기면 자동결제가 시작되니 날짜를 확인하세요.",
      },
    ],
    related: ["charged-after-cancel"],
    lastChecked: "2026-08-20",
  },

  {
    slug: "lost-phone",
    title: "휴대폰을 잃어버렸어요",
    heading: "휴대폰을 잃어버렸어요",
    lead: "통신사에 분실 정지를 걸어야 소액결제와 요금이 멈춥니다. 통신사를 고르세요.",
    icon: "📱",
    firstAid: [
      "먼저 통신사에 분실 정지를 거세요. 정지 전까지는 소액결제나 데이터 요금이 계속 발생할 수 있습니다.",
      "정지하기 전에 아이폰은 '나의 찾기', 안드로이드는 '내 기기 찾기'로 위치를 한 번 확인해 보세요.",
      "누군가 주워서 맡겼을 수 있으니 경찰청 유실물 조회(lost112)도 함께 확인해 보세요.",
    ],
    chooseLabel: "어느 통신사인가요?",
    options: [
      { companySlug: "skt", serviceSlug: "lost-phone" },
      { companySlug: "kt", serviceSlug: "lost-phone" },
      { companySlug: "lguplus", serviceSlug: "lost-phone" },
    ],
    faq: [
      {
        question: "정지하면 위치찾기도 안 되나요?",
        answer:
          "통신망을 통한 기능은 제한될 수 있지만, 기기가 와이파이에 연결되면 위치가 잡히는 경우가 있습니다. 그래서 정지 전에 한 번 확인해 보라고 안내합니다.",
      },
      {
        question: "찾으면 정지를 풀 수 있나요?",
        answer: "네. 통신사 앱이나 고객센터에서 분실 정지를 해제할 수 있습니다.",
      },
    ],
    lastChecked: "2026-08-20",
  },

  {
    slug: "delivery-tracking",
    title: "택배가 어디 있는지 모르겠어요",
    heading: "택배가 어디 있는지 모르겠어요",
    lead: "운송장 번호만 있으면 조회됩니다. 택배사를 고르면 조회 화면과 멈췄을 때 대응까지 나옵니다.",
    icon: "📦",
    firstAid: [
      "운송장 번호는 주문한 쇼핑몰의 주문내역이나 배송 안내 문자에서 확인할 수 있습니다.",
      "며칠째 같은 자리에 멈춰 있으면 기사님보다 해당 지점(대리점)에 먼저 확인하는 편이 빠릅니다.",
      "'배송완료'인데 물건이 없는 경우는 조회가 아니라 별도 절차입니다. 아래 갈래로 가세요.",
    ],
    chooseLabel: "어느 택배사인가요?",
    options: [
      { companySlug: "cj-logistics", serviceSlug: "delivery-tracking" },
      { companySlug: "hanjin", serviceSlug: "delivery-tracking" },
      { companySlug: "lotte-delivery", serviceSlug: "delivery-tracking" },
    ],
    fallback: {
      label: "배송완료라는데 물건이 없어요",
      note: "배송기사 확인과 분실 접수가 필요한 별도 절차입니다.",
      links: [
        { href: "/company/cj-logistics/parcel-not-received", label: "CJ대한통운" },
        { href: "/company/hanjin/parcel-not-received", label: "한진택배" },
        { href: "/company/lotte-delivery/parcel-not-received", label: "롯데택배" },
      ],
    },
    lastChecked: "2026-08-20",
  },

  {
    slug: "return-refund",
    title: "반품·환불하고 싶어요",
    heading: "반품·환불하고 싶어요",
    lead: "쇼핑몰마다 신청 화면과 회수 방식이 다릅니다. 어디서 샀는지 고르세요.",
    icon: "🛒",
    firstAid: [
      "단순 변심은 상품을 받은 날부터 7일 이내가 기본 기준입니다. 신선식품이나 주문제작 상품은 예외가 있습니다.",
      "포장을 뜯었더라도 상품 가치가 크게 줄지 않았다면 반품이 되는 경우가 많습니다. 상자와 구성품은 버리지 마세요.",
      "반품 배송비는 사유에 따라 다릅니다. 상품 불량이나 오배송처럼 판매자 잘못이면 판매자가 부담합니다.",
    ],
    chooseLabel: "어디에서 샀나요?",
    options: [
      { companySlug: "coupang", serviceSlug: "return-refund" },
      { companySlug: "naver-smartstore", serviceSlug: "return-refund" },
      { companySlug: "gmarket", serviceSlug: "return-refund" },
      { companySlug: "11st", serviceSlug: "return-refund" },
    ],
    fallback: {
      label: "반품 신청은 했는데 회수를 안 가요",
      note: "회수 예정일과 수거지를 먼저 확인해야 합니다.",
      links: [
        { href: "/company/coupang/return-pickup-delay", label: "쿠팡" },
        { href: "/company/naver-smartstore/return-pickup-delay", label: "네이버 스마트스토어" },
        { href: "/company/gmarket/return-pickup-delay", label: "G마켓" },
        { href: "/company/11st/return-pickup-delay", label: "11번가" },
      ],
    },
    lastChecked: "2026-08-20",
  },

  {
    slug: "termination-fee",
    title: "인터넷 해지하면 돈이 얼마나 나오나요",
    heading: "인터넷 해지하면 돈이 얼마나 나오나요",
    lead: "위약금만 보면 실제 금액과 달라집니다. 통신사를 고르면 무엇을 합쳐야 하는지 나옵니다.",
    icon: "🌐",
    firstAid: [
      "위약금만이 아니라 그동안 받은 약정 할인반환금, 장비 미반납·철거 비용까지 합쳐야 실제 청구액입니다.",
      "휴대폰·인터넷·TV가 결합돼 있으면 하나만 해지해도 나머지 할인이 사라질 수 있습니다.",
      "약정 만료일을 먼저 확인하세요. 며칠 차이로 금액이 크게 달라집니다.",
    ],
    chooseLabel: "어느 통신사인가요?",
    options: [
      { companySlug: "skt", serviceSlug: "termination-fee" },
      { companySlug: "kt", serviceSlug: "termination-fee" },
      { companySlug: "lguplus", serviceSlug: "termination-fee" },
    ],
    fallback: {
      label: "금액을 확인했고 이제 해지하려고요",
      note: "장비 반납까지 끝나야 해지가 마무리됩니다.",
      links: [
        { href: "/company/skt/internet-cancel", label: "SKT" },
        { href: "/company/kt/internet-cancel", label: "KT" },
        { href: "/company/lguplus/internet-cancel", label: "LG U+" },
      ],
    },
    lastChecked: "2026-08-20",
  },

  {
    slug: "card-reissue",
    title: "카드를 다시 받아야 해요",
    heading: "카드를 다시 받아야 해요",
    lead: "정지와 재발급은 별개입니다. 카드사를 고르면 신청 순서와 받는 방법이 나옵니다.",
    icon: "💳",
    firstAid: [
      "잃어버린 카드라면 재발급보다 이용정지가 먼저입니다. 아직 정지하지 않았다면 아래 갈래로 가세요.",
      "재발급하면 보통 카드번호가 바뀝니다. 자동이체나 정기결제에 등록해 둔 카드가 있으면 새 번호로 바꿔야 합니다.",
      "받을 주소가 예전 주소로 남아 있는 경우가 많으니 신청 전에 배송지를 확인하세요.",
    ],
    chooseLabel: "어느 카드사인가요?",
    options: [
      { companySlug: "kb-card", serviceSlug: "card-reissue" },
      { companySlug: "shinhan-card", serviceSlug: "card-reissue" },
      { companySlug: "samsung-card", serviceSlug: "card-reissue" },
    ],
    fallback: {
      label: "아직 분실신고를 안 했어요",
      note: "먼저 정지부터 하세요.",
      links: [{ href: "/problem/lost-card", label: "카드를 잃어버렸어요" }],
    },
    related: ["lost-card"],
    lastChecked: "2026-08-20",
  },

  {
    slug: "appliance-broken",
    title: "가전제품이 갑자기 안 돼요",
    heading: "가전제품이 갑자기 안 돼요",
    lead: "기사를 부르기 전에 확인하면 출장비를 아낄 수 있습니다. 제조사를 고르세요.",
    icon: "⚡",
    firstAid: [
      "화면에 뜬 오류 코드(글자·숫자)를 사진으로 남기세요. 상담이나 접수에서 가장 빠른 단서입니다.",
      "전원 코드, 차단기, 문 잠금처럼 흔한 원인부터 확인하면 출장 없이 끝나는 경우가 있습니다.",
      "출장 예약 전에 수리비와 보증기간을 먼저 보면 견적을 예상할 수 있습니다.",
    ],
    chooseLabel: "어느 제조사인가요?",
    options: [
      { companySlug: "samsung-electronics", serviceSlug: "self-check" },
      { companySlug: "lg-electronics", serviceSlug: "self-check" },
    ],
    fallback: {
      label: "수리비가 얼마나 나올지 먼저 알고 싶어요",
      note: "출장비와 보증기간 기준부터 확인하세요.",
      links: [{ href: "/problem/repair-cost", label: "가전 수리비가 궁금해요" }],
    },
    related: ["repair-cost"],
    lastChecked: "2026-08-20",
  },
];

export function getProblem(slug: string) {
  return problems.find((problem) => problem.slug === slug);
}

/**
 * 빌드 때 한 번 돈다. 존재하지 않는 업체·업무를 가리키면 빌드를 깨뜨려서
 * 링크가 조용히 썩는 걸 막는다.
 */
(function assertProblemOptions() {
  const seen = new Set<string>();
  for (const problem of problems) {
    if (seen.has(problem.slug)) {
      throw new Error(`[problems] 중복 slug: ${problem.slug}`);
    }
    seen.add(problem.slug);

    if (problem.options.length < 2) {
      throw new Error(
        `[problems] ${problem.slug}: 고를 게 하나뿐이면 허브가 아니라 그냥 링크여야 합니다.`
      );
    }

    for (const option of problem.options) {
      const company = companies.find((c) => c.slug === option.companySlug);
      const service = company?.services.find((s) => s.slug === option.serviceSlug);
      if (!service) {
        throw new Error(
          `[problems] ${problem.slug}: 존재하지 않는 업무 ${option.companySlug}/${option.serviceSlug}`
        );
      }
    }
  }

  // fallback·related의 내부 링크도 같은 이유로 함께 검사한다.
  const problemSlugs = new Set(problems.map((problem) => problem.slug));
  for (const problem of problems) {
    for (const link of problem.fallback?.links ?? []) {
      const companyMatch = link.href.match(/^\/company\/([^/]+)\/([^/]+)$/);
      if (companyMatch) {
        const company = companies.find((c) => c.slug === companyMatch[1]);
        if (!company?.services.some((s) => s.slug === companyMatch[2])) {
          throw new Error(
            `[problems] ${problem.slug}: 존재하지 않는 fallback 링크 ${link.href}`
          );
        }
        continue;
      }

      const problemMatch = link.href.match(/^\/problem\/([^/]+)$/);
      if (problemMatch && !problemSlugs.has(problemMatch[1])) {
        throw new Error(
          `[problems] ${problem.slug}: 존재하지 않는 허브 링크 ${link.href}`
        );
      }
    }

    for (const relatedSlug of problem.related ?? []) {
      if (!problemSlugs.has(relatedSlug)) {
        throw new Error(
          `[problems] ${problem.slug}: 존재하지 않는 related 허브 ${relatedSlug}`
        );
      }
    }
  }
})();
