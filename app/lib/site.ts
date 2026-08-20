export const SITE_NAME = "바로처리";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://barocheori.com"
).replace(/\/$/, "");

export function companyPath(companySlug: string) {
  return `/company/${companySlug}`;
}

export function servicePath(companySlug: string, serviceSlug: string) {
  return `${companyPath(companySlug)}/${serviceSlug}`;
}

export function problemPath(problemSlug: string) {
  return `/problem/${problemSlug}`;
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
