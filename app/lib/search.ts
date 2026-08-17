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

export function normalizeSearchText(text: string) {
    return text
        .normalize("NFKC")
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[.,!?~·\-_/\\()[\]{}"'`]/g, "");
}

function makeBigrams(text: string) {
    const result: string[] = [];

    for (let i = 0; i < text.length - 1; i++) {
        result.push(text.slice(i, i + 2));
    }

    return result;
}

function similarity(query: string, target: string) {
    const q = normalizeSearchText(query);
    const t = normalizeSearchText(target);

    if (!q || !t) return 0;

    // 완전히 같으면 최고점
    if (q === t) return 100;

    // "쿠팡 환불하고 싶어" 안에 "쿠팡 환불"이 포함되는 경우
    if (q.includes(t)) return 95;

    // "쿠팡 환" 입력처럼 검색어가 앞부분인 경우
    if (t.includes(q)) return 85;

    // 글자가 조금 달라도 비슷한 정도 계산
    if (q.length < 2 || t.length < 2) return 0;

    const qBigrams = makeBigrams(q);
    const tBigrams = makeBigrams(t);

    let matches = 0;
    const remaining = [...tBigrams];

    for (const item of qBigrams) {
        const index = remaining.indexOf(item);

        if (index !== -1) {
            matches += 1;
            remaining.splice(index, 1);
        }
    }

    return (
        (2 * matches) /
        (qBigrams.length + tBigrams.length)
    ) * 70;
}

export function findExactCompany(query: string) {
    const normalizedQuery = normalizeSearchText(query);

    return companies.find((company) =>
        [company.name, ...company.aliases].some(
            (name) =>
                normalizeSearchText(name) === normalizedQuery
        )
    );
}

export function findBestService(
    query: string
): ServiceSearchResult | null {
    const normalizedQuery = normalizeSearchText(query);

    const mentionedCompanies = companies.filter((company) =>
        [company.name, ...company.aliases].some((name) =>
            normalizedQuery.includes(normalizeSearchText(name))
        )
    );

    const companiesToSearch =
        mentionedCompanies.length > 0
            ? mentionedCompanies
            : companies;

    let best: ServiceSearchResult | null = null;

    for (const company of companiesToSearch) {
        for (const service of company.services) {
            const searchTerms = [
                `${company.name} ${service.title}`,

                ...company.aliases.map(
                    (alias) => `${alias} ${service.title}`
                ),

                ...service.keywords,
            ];

            let score = Math.max(
                ...searchTerms.map((term) =>
                    similarity(query, term)
                )
            );

            // 회사 이름까지 제대로 들어있으면 추가점수
            const containsCompany = [
                company.name,
                ...company.aliases,
            ].some((name) =>
                normalizedQuery.includes(
                    normalizeSearchText(name)
                )
            );

            if (containsCompany) {
                score += 10;
            }

            if (!best || score > best.score) {
                best = {
                    company,
                    service,
                    score,
                };
            }
        }
    }

    // 너무 안 비슷하면 억지로 결과를 보여주지 않음
    if (!best || best.score < 55) {
        return null;
    }

    return best;
}

export function rankSuggestions(
    query: string,
    suggestions: string[],
    limit = 8
) {
    if (!query.trim()) return [];

    return suggestions
        .map((item) => ({
            item,
            score: similarity(query, item),
        }))
        .filter((result) => result.score >= 35)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((result) => result.item);
}