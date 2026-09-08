/**
 * 외부 공식 링크 자동 점검 — 보완지시서 2026-09-08 작업 3.
 *
 * 사이트맵의 모든 페이지에서 외부 링크(http로 시작, barocheori.com 제외)를 모아
 * 한 번씩 열어보고, 아래에 해당하면 표에 담습니다.
 *   - 4xx · 5xx 응답
 *   - 네트워크 오류 · 타임아웃(15초)
 *   - 최종 주소가 그 사이트의 홈으로 튕긴 경우(깊은 링크가 죽었다는 신호)
 * 로그인 화면으로 넘어가는 것은 정상으로 봅니다(마이페이지류는 원래 그렇습니다).
 *
 * 사용법:
 *   npm run check-links                      실사이트(https://barocheori.com) 기준
 *   npm run check-links -- http://localhost:3000   개발 서버 기준
 *   npm run check-links -- <기준주소> <저장경로>
 */

const BASE = (process.argv[2] ?? "https://barocheori.com").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);
const OUT =
  process.argv[3] ?? `C:/Downloads/바로처리/링크점검_${today}.md`;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
const TIMEOUT_MS = 15000;

/** 로그인 화면으로 넘어간 것인지 — 마이페이지류는 원래 이렇게 동작합니다. */
function looksLikeLogin(url) {
  return /(login|signin|sign-in|auth|nid\.naver|accounts\.google|idp|sso|member\/login)/i.test(
    url
  );
}

/** 최종 주소가 그 사이트의 홈(경로가 사실상 비어 있음)인지 */
function isSiteRoot(url) {
  try {
    const u = new URL(url);
    return u.pathname === "/" || u.pathname === "";
  } catch {
    return false;
  }
}

async function collectLinks() {
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname
  );

  /** @type {Map<string, string[]>} 외부주소 → 그 링크가 있는 페이지들 */
  const links = new Map();

  for (const path of paths) {
    const res = await fetch(BASE + path, {
      headers: { "Cache-Control": "no-store" },
    });
    if (!res.ok) continue;
    const html = await res.text();
    for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      const href = m[1].replace(/&amp;/g, "&");
      if (href.includes("barocheori.com")) continue;
      links.set(href, [...(links.get(href) ?? []), path]);
    }
  }

  return { paths, links };
}

async function check(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": UA,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "ko-KR,ko;q=0.9",
      },
    });
    const finalUrl = res.url || url;
    const movedToLogin = looksLikeLogin(finalUrl) && !looksLikeLogin(url);
    const bouncedHome = !isSiteRoot(url) && isSiteRoot(finalUrl) && !movedToLogin;

    // 로그인 화면 판정이 응답 코드보다 먼저입니다. 쿠팡 주문목록처럼 로그인
    // 페이지로 넘기면서 403을 주는 곳이 있는데, 이건 마이페이지류의 정상
    // 동작이지 죽은 링크가 아닙니다.
    if (movedToLogin) {
      return { status: res.status, finalUrl, verdict: "정상(로그인 필요)", ok: true };
    }
    if (res.status >= 400) {
      return { status: res.status, finalUrl, verdict: `${res.status} 오류` };
    }
    if (bouncedHome) {
      return { status: res.status, finalUrl, verdict: "홈으로 튕김" };
    }
    return { status: res.status, finalUrl, verdict: "정상", ok: true };
  } catch (error) {
    const reason =
      error?.name === "AbortError"
        ? `타임아웃(${TIMEOUT_MS / 1000}초)`
        : `네트워크 오류: ${error?.cause?.code ?? error?.message ?? "알 수 없음"}`;
    return { status: "-", finalUrl: url, verdict: reason };
  } finally {
    clearTimeout(timer);
  }
}

const { paths, links } = await collectLinks();
console.log(
  `기준 ${BASE} · 페이지 ${paths.length}개 · 외부 링크 ${links.size}개(중복 제거) 점검 시작`
);

const rows = [];
let okCount = 0;
let loginCount = 0;
let index = 0;

for (const [url, pages] of links) {
  index += 1;
  const result = await check(url);
  if (result.ok) {
    okCount += 1;
    if (result.verdict === "정상(로그인 필요)") loginCount += 1;
  } else {
    rows.push({ url, pages, ...result });
  }
  console.log(
    `[${String(index).padStart(3)}/${links.size}] ${result.verdict.padEnd(18)} ${url}`
  );
}

const esc = (t) => String(t).replace(/\|/g, "\\|");
const lines = [];
lines.push(`# 외부 공식 링크 점검 — ${today}`);
lines.push("");
lines.push(
  `기준 주소 \`${BASE}\` · 페이지 ${paths.length}개에서 모은 외부 링크 **${links.size}개**(중복 제거) 점검.`
);
lines.push("");
lines.push(
  `- 정상 **${okCount}개** (그중 로그인 화면으로 넘어가는 정상 링크 ${loginCount}개)`
);
lines.push(`- 문제 있음 **${rows.length}개**`);
lines.push("");
lines.push(
  "판정 기준: 4xx·5xx 응답 / 네트워크 오류·타임아웃(15초) / 최종 주소가 그 사이트 홈으로 튕긴 경우. 로그인 화면으로 넘어가는 것은 마이페이지류의 정상 동작으로 봅니다."
);
lines.push("");

if (rows.length === 0) {
  lines.push("## 문제 있는 링크");
  lines.push("");
  lines.push("문제 있는 링크가 없습니다.");
} else {
  lines.push("## 문제 있는 링크");
  lines.push("");
  lines.push("| 링크 | 응답 | 판정 | 최종 주소 | 쓰이는 페이지 |");
  lines.push("|---|---|---|---|---|");
  for (const r of rows) {
    lines.push(
      `| ${esc(r.url)} | ${esc(r.status)} | ${esc(r.verdict)} | ${esc(r.finalUrl)} | ${r.pages
        .map((p) => `\`${p}\``)
        .join("<br>")} |`
    );
  }
}
lines.push("");

const { writeFileSync } = await import("node:fs");
writeFileSync(OUT, lines.join("\n"), "utf-8");
console.log(
  `\n외부 링크 ${links.size}개 · 정상 ${okCount}개(로그인 필요 ${loginCount}개) · 문제 ${rows.length}개 → ${OUT}`
);
