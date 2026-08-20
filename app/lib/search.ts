import { problems, type Problem } from "../data/problems";
import {
  companies,
  type Company,
  type ServiceTask,
} from "../data/services";

export type ServiceSearchResult = {
  company: Company;
  service: ServiceTask;
  score: number;
};

type IntentAlias = {
  phrases: string[];
  searchAs: string[];
  preferredServiceSlugs?: string[];
};

// 사용자가 실제로 입력하는 생활 말투를 사이트 안의 업무 이름으로 연결합니다.
// 업체별 키워드에 같은 표현을 반복해서 넣지 않도록 검색 단계에서 한 번만 관리합니다.
const intentAliases: IntentAlias[] = [
  {
    phrases: ["잃어버렸", "잃어버림", "잃어버린", "카드없어", "카드없음"],
    searchAs: ["분실", "분실신고"],
    preferredServiceSlugs: ["lost-card", "lost-phone"],
  },
  {
    phrases: ["내가안한결제", "모르는결제", "이상한결제", "결제한적없"],
    searchAs: ["모르는 결제", "부정사용", "이의신청"],
    preferredServiceSlugs: ["unrecognized-charge", "unknown-charge"],
  },
  {
    phrases: [
      "applecombill",
      "애플닷컴빌",
      "애플컴빌",
      "애플결제뭐",
      "아이폰결제",
      "앱스토어결제",
      "애플돈나감",
    ],
    searchAs: [
      "Apple APPLE.COM/BILL 모르는 결제",
      "Apple 구입 내역",
    ],
    preferredServiceSlugs: ["unknown-charge"],
  },
  {
    phrases: [
      "google결제",
      "구글결제",
      "플레이스토어결제",
      "구글아시아",
      "google앱",
      "구글돈나감",
    ],
    searchAs: [
      "Google Play 모르는 결제",
      "Google Play 주문 내역",
    ],
    preferredServiceSlugs: ["unknown-charge"],
  },
  {
    phrases: [
      "배송완료인데안와",
      "배송완료인데안옴",
      "배송완료인데없",
      "택배못받",
      "물건못받",
    ],
    searchAs: ["배송완료 미수령", "배송 안 옴"],
    preferredServiceSlugs: ["delivery-not-received", "parcel-not-received"],
  },
  {
    phrases: ["택배안와", "택배안옴", "배송안와", "배송안옴", "배송늦"],
    searchAs: ["배송조회", "택배 위치", "배송 지연"],
    preferredServiceSlugs: ["delivery-not-received", "delivery-tracking"],
  },
  {
    phrases: ["택배멈", "배송멈", "위치안바뀜", "며칠째그대로"],
    searchAs: ["배송조회", "배송 상태 멈춤"],
    preferredServiceSlugs: ["delivery-tracking", "delivery-not-received"],
  },
  {
    phrases: ["반품안가져", "회수안와", "수거안와", "기사안와"],
    searchAs: ["반품 회수 지연", "반품 수거 안 옴"],
    preferredServiceSlugs: ["return-pickup-delay"],
  },
  {
    phrases: ["돈안들어옴", "환불안됨", "환불안돼", "환불늦"],
    searchAs: ["반품 환불", "환불 지연"],
    preferredServiceSlugs: ["return-refund", "refund-request"],
  },
  {
    phrases: ["주문어디", "주문한거어디", "주문내역", "주문조회"],
    searchAs: ["주문내역 확인", "주문 조회"],
    preferredServiceSlugs: ["order-check"],
  },
  {
    phrases: ["인터넷옮", "인터넷이사", "와이파이옮"],
    searchAs: ["인터넷 이전설치", "이사 인터넷"],
    preferredServiceSlugs: ["internet-moving"],
  },
  {
    phrases: [
      "인터넷해지",
      "인터넷끊",
      "인터넷그만",
      "와이파이해지",
      "인터넷바꾸",
      "통신사바꾸",
    ],
    searchAs: ["인터넷 해지", "인터넷 해지 장비 반납"],
    preferredServiceSlugs: ["internet-cancel"],
  },
  {
    phrases: [
      "인터넷위약금",
      "해지위약금",
      "해지하면얼마",
      "해지비용",
      "약정얼마남",
    ],
    searchAs: ["해지 예상금액 위약금", "인터넷 약정 확인"],
    preferredServiceSlugs: ["termination-fee"],
  },
  {
    phrases: [
      "인터넷명의",
      "명의바꾸",
      "명의변경",
      "명의이전",
      "가족명의",
    ],
    searchAs: ["인터넷 명의변경", "인터넷 명의 이전"],
    preferredServiceSlugs: ["account-transfer"],
  },
  {
    phrases: ["인터넷안돼", "인터넷안됨", "와이파이안돼", "와이파이끊"],
    searchAs: ["인터넷 고장", "인터넷 연결 안 됨"],
    preferredServiceSlugs: ["internet-trouble"],
  },
  {
    phrases: ["인터넷느려", "와이파이느려", "속도느림"],
    searchAs: ["인터넷 속도 느림", "느린 인터넷"],
    preferredServiceSlugs: ["slow-internet"],
  },
  {
    phrases: [
      "가전고장",
      "제품고장",
      "세탁기고장",
      "냉장고고장",
      "에어컨고장",
      "티비안켜",
      "tv안켜",
      "에러코드",
      "오류코드",
    ],
    searchAs: ["제품 고장 자가진단", "가전 오류 해결"],
    preferredServiceSlugs: ["self-check"],
  },
  {
    phrases: [
      "출장수리",
      "출장as",
      "기사방문",
      "수리기사",
      "as접수",
      "수리접수",
    ],
    searchAs: ["출장수리 예약", "가전 기사 방문 예약"],
    preferredServiceSlugs: ["home-service"],
  },
  {
    phrases: [
      "서비스센터",
      "as센터",
      "수리센터",
      "센터방문",
      "센터예약",
    ],
    searchAs: ["서비스센터 찾기 방문예약", "수리센터"],
    preferredServiceSlugs: ["service-center"],
  },
  {
    phrases: ["수리비", "as비용", "무상수리", "보증기간", "출장비"],
    searchAs: ["수리비 보증기간", "무상수리 출장비"],
    preferredServiceSlugs: ["repair-cost-warranty"],
  },
  {
    phrases: [
      "구독취소",
      "구독끊",
      "멤버십해지",
      "자동결제해지",
      "다음달결제막",
      "앱지웠는데",
      "앱삭제했는데",
    ],
    searchAs: ["멤버십 해지", "다음 결제 막기", "정기결제 해지"],
    preferredServiceSlugs: [
      "membership-cancel",
      "recurring-payment-cancel",
      "wow-membership-cancel",
    ],
  },
  {
    phrases: [
      "해지했는데결제",
      "취소했는데결제",
      "해지했는데돈",
      "취소했는데돈",
    ],
    searchAs: ["해지했는데 결제됨", "자동결제 됨"],
    preferredServiceSlugs: ["charged-after-cancel"],
  },
  {
    phrases: [
      "무료체험결제",
      "무료체험끝",
      "무료기간끝",
      "체험끝나고결제",
      "구독환불",
      "멤버십환불",
      "돈돌려받",
    ],
    searchAs: ["결제 취소 환불", "이미 결제된 금액 환불"],
    preferredServiceSlugs: [
      "refund-request",
      "immediate-cancel-refund",
      "wow-membership-refund",
    ],
  },
];

export function normalizeSearchText(text: string) {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[.,!?~·\-_/\\()[\]{}"'`]/g, "");
}

function makeBigrams(text: string) {
  const result: string[] = [];

  for (let index = 0; index < text.length - 1; index += 1) {
    result.push(text.slice(index, index + 2));
  }

  return result;
}

function similarity(query: string, target: string) {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedTarget = normalizeSearchText(target);

  if (!normalizedQuery || !normalizedTarget) return 0;
  if (normalizedQuery === normalizedTarget) return 100;
  if (normalizedQuery.includes(normalizedTarget)) return 95;
  if (normalizedTarget.includes(normalizedQuery)) return 85;
  if (normalizedQuery.length < 2 || normalizedTarget.length < 2) return 0;

  const queryBigrams = makeBigrams(normalizedQuery);
  const targetBigrams = makeBigrams(normalizedTarget);
  const remaining = [...targetBigrams];
  let matches = 0;

  for (const item of queryBigrams) {
    const index = remaining.indexOf(item);

    if (index !== -1) {
      matches += 1;
      remaining.splice(index, 1);
    }
  }

  return (2 * matches * 70) / (queryBigrams.length + targetBigrams.length);
}

function getMatchedIntentAliases(query: string) {
  const normalizedQuery = normalizeSearchText(query);
  return intentAliases.filter((alias) =>
    alias.phrases.some((phrase) =>
      normalizedQuery.includes(normalizeSearchText(phrase))
    )
  );
}

function getSearchQueries(query: string, matchedAliases: IntentAlias[]) {
  const variants = new Set([query]);

  for (const alias of matchedAliases) {
    alias.searchAs.forEach((item) => variants.add(item));
  }

  return [...variants];
}

function queryIncludesCompanyName(query: string, name: string) {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedName = normalizeSearchText(name);

  if (!normalizedName) return false;

  // KT처럼 두 글자인 이름은 SKT 안에도 들어갑니다. 짧은 이름은
  // 문장의 맨 앞이나 맨 뒤에 직접 적혔을 때만 업체명으로 봅니다.
  if (normalizedName.length <= 2) {
    return (
      normalizedQuery === normalizedName ||
      normalizedQuery.startsWith(normalizedName) ||
      normalizedQuery.endsWith(normalizedName)
    );
  }

  return normalizedQuery.includes(normalizedName);
}

export function findExactCompany(query: string) {
  const normalizedQuery = normalizeSearchText(query);

  return companies.find((company) =>
    [company.name, ...company.aliases].some(
      (name) => normalizeSearchText(name) === normalizedQuery
    )
  );
}

export function findMentionedCompanies(query: string) {
  const normalizedQuery = normalizeSearchText(query);

  const matchedCompanies = companies.filter((company) =>
    [company.name, ...company.aliases].some((name) =>
      queryIncludesCompanyName(query, name)
    )
  );

  const hasElectronicsContext = [
    "가전",
    "세탁기",
    "냉장고",
    "에어컨",
    "tv",
    "티비",
    "제품고장",
    "에러코드",
    "오류코드",
    "출장수리",
    "출장as",
    "as접수",
    "기사방문",
    "수리기사",
    "서비스센터",
    "as센터",
    "수리센터",
    "수리비",
    "무상수리",
    "보증기간",
  ].some((phrase) => normalizedQuery.includes(normalizeSearchText(phrase)));

  if (hasElectronicsContext) {
    const contextualSlugs = [
      normalizedQuery.includes("삼성") ? "samsung-electronics" : null,
      normalizedQuery.includes("lg") || normalizedQuery.includes("엘지")
        ? "lg-electronics"
        : null,
    ].filter(Boolean);

    for (const slug of contextualSlugs) {
      const company = companies.find((item) => item.slug === slug);
      if (company && !matchedCompanies.includes(company)) {
        matchedCompanies.push(company);
      }
    }
  }

  return matchedCompanies;
}

export function findServiceMatches(query: string, limit = 12) {
  const mentionedCompanies = findMentionedCompanies(query);
  const companiesToSearch =
    mentionedCompanies.length > 0 ? mentionedCompanies : companies;
  const matchedAliases = getMatchedIntentAliases(query);
  const searchQueries = getSearchQueries(query, matchedAliases);
  const preferredServiceSlugs = new Set(
    matchedAliases.flatMap((alias) => alias.preferredServiceSlugs ?? [])
  );
  const results: ServiceSearchResult[] = [];

  for (const company of companiesToSearch) {
    for (const service of company.services) {
      const searchTerms = [
        `${company.name} ${service.title}`,
        service.title,
        ...company.aliases.map((alias) => `${alias} ${service.title}`),
        ...service.keywords,
      ];
      let score = Math.max(
        ...searchQueries.flatMap((searchQuery) =>
          searchTerms.map((term) => similarity(searchQuery, term))
        )
      );

      if (mentionedCompanies.includes(company)) score += 10;
      if (preferredServiceSlugs.has(service.slug)) score += 14;
      if (score >= 52) results.push({ company, service, score });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function findBestService(query: string) {
  return findServiceMatches(query, 1)[0] ?? null;
}

const popularServiceKeys = [
  ["kb-card", "lost-card"],
  ["coupang", "delivery-not-received"],
  ["apple-app-store", "unknown-charge"],
  ["google-play", "membership-cancel"],
] as const;

export function getPopularServices() {
  return popularServiceKeys.flatMap(([companySlug, serviceSlug]) => {
    const company = companies.find((item) => item.slug === companySlug);
    const service = company?.services.find((item) => item.slug === serviceSlug);

    return company && service ? [{ company, service, score: 0 }] : [];
  });
}

/**
 * 검색 결과 맨 위에 띄울 상황 허브를 고릅니다(스펙 v5 2-6).
 * 별도 매칭 엔진을 만들지 않고, 허브 이름과 허브가 담고 있는 각 업무의
 * title·keywords를 대상으로 위 similarity()를 그대로 재사용합니다.
 */
export function findProblemMatches(query: string, limit = 2) {
  if (!query.trim()) return [];

  // 업무 검색과 같은 말투 사전(intentAliases)을 태워 "잃어버림 → 분실"까지 잡습니다.
  const searchQueries = getSearchQueries(query, getMatchedIntentAliases(query));
  const matched: { problem: Problem; score: number }[] = [];

  for (const problem of problems) {
    const searchTerms = [
      problem.title,
      ...problem.options.flatMap((option) => {
        const company = companies.find((c) => c.slug === option.companySlug);
        const service = company?.services.find(
          (s) => s.slug === option.serviceSlug
        );

        return service ? [service.title, ...service.keywords] : [];
      }),
    ];
    const score = Math.max(
      ...searchQueries.flatMap((searchQuery) =>
        searchTerms.map((term) => similarity(searchQuery, term))
      )
    );

    if (score >= 52) matched.push({ problem, score });
  }

  return matched.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** "어느 카드사인가요?" → "카드사 고르기" 처럼 목록 한 줄에 붙일 짧은 힌트. */
export function getProblemChooseHint(problem: Problem) {
  const match = problem.chooseLabel.match(/^어느\s*(.+?)인가요\?$/);
  return match ? `${match[1]} 고르기` : problem.chooseLabel;
}
