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
        ...searchTerms.map((term) => similarity(query, term))
      );

      if (mentionedCompanies.includes(company)) score += 10;
      if (score >= 55) results.push({ company, service, score });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function findBestService(query: string) {
  return findServiceMatches(query, 1)[0] ?? null;
}

export function rankSuggestions(
  query: string,
  suggestions: string[],
  limit = 8
) {
  if (!query.trim()) return [];

  return suggestions
    .map((item) => ({ item, score: similarity(query, item) }))
    .filter((result) => result.score >= 35)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.item);
}
