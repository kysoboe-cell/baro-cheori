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
};

// 사용자가 실제로 입력하는 생활 말투를 사이트 안의 업무 이름으로 연결합니다.
// 업체별 키워드에 같은 표현을 반복해서 넣지 않도록 검색 단계에서 한 번만 관리합니다.
const intentAliases: IntentAlias[] = [
  {
    phrases: ["잃어버렸", "잃어버림", "잃어버린", "카드없어", "카드없음"],
    searchAs: ["분실", "분실신고"],
  },
  {
    phrases: ["내가안한결제", "모르는결제", "이상한결제", "결제한적없"],
    searchAs: ["모르는 결제", "부정사용", "이의신청"],
  },
  {
    phrases: [
      "applecombill",
      "애플결제뭐",
      "아이폰결제",
      "앱스토어결제",
      "애플돈나감",
    ],
    searchAs: [
      "Apple APPLE.COM/BILL 모르는 결제",
      "Apple 구입 내역",
    ],
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
  },
  {
    phrases: ["택배안와", "택배안옴", "배송안와", "배송안옴", "배송늦"],
    searchAs: ["배송조회", "택배 위치", "배송 지연"],
  },
  {
    phrases: ["택배멈", "배송멈", "위치안바뀜", "며칠째그대로"],
    searchAs: ["배송조회", "배송 상태 멈춤"],
  },
  {
    phrases: ["반품안가져", "회수안와", "수거안와", "기사안와"],
    searchAs: ["반품 회수 지연", "반품 수거 안 옴"],
  },
  {
    phrases: ["돈안들어옴", "환불안됨", "환불안돼", "환불늦"],
    searchAs: ["반품 환불", "환불 지연"],
  },
  {
    phrases: ["인터넷옮", "인터넷이사", "와이파이옮"],
    searchAs: ["인터넷 이전설치", "이사 인터넷"],
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
  },
  {
    phrases: ["인터넷안돼", "인터넷안됨", "와이파이안돼", "와이파이끊"],
    searchAs: ["인터넷 고장", "인터넷 연결 안 됨"],
  },
  {
    phrases: ["인터넷느려", "와이파이느려", "속도느림"],
    searchAs: ["인터넷 속도 느림", "느린 인터넷"],
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
  },
  {
    phrases: [
      "해지했는데결제",
      "취소했는데결제",
      "해지했는데돈",
      "취소했는데돈",
    ],
    searchAs: ["해지했는데 결제됨", "자동결제 됨"],
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

function getSearchQueries(query: string) {
  const normalizedQuery = normalizeSearchText(query);
  const variants = new Set([query]);

  for (const alias of intentAliases) {
    const hasMatchingPhrase = alias.phrases.some((phrase) =>
      normalizedQuery.includes(normalizeSearchText(phrase))
    );

    if (hasMatchingPhrase) {
      alias.searchAs.forEach((item) => variants.add(item));
    }
  }

  return [...variants];
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

  return companies.filter((company) =>
    [company.name, ...company.aliases].some((name) =>
      normalizedQuery.includes(normalizeSearchText(name))
    )
  );
}

export function findServiceMatches(query: string, limit = 12) {
  const mentionedCompanies = findMentionedCompanies(query);
  const companiesToSearch =
    mentionedCompanies.length > 0 ? mentionedCompanies : companies;
  const searchQueries = getSearchQueries(query);
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
