// Cloudflare Workers 진입점 — OpenNext가 만든 워커를 감싸서 응답 헤더만 손봅니다.
//
// 왜 필요한가: OpenNext(@opennextjs/aws)의 캐시 인터셉션 로직이 SSG(정적 생성) 페이지에
// `Cache-Control: s-maxage=31536000(1년), stale-while-revalidate=2592000(30일)`을
// 무조건 박아서 내보냅니다. Vercel처럼 "배포마다 CDN 캐시를 자동으로 비워주는" 플랫폼을
// 전제로 한 값이라, 그런 자동 비움이 없는 Cloudflare에서는 재배포 후에도 어딘가의 캐시가
// 옛 HTML을 몇 시간씩 계속 들고 있을 위험이 있습니다.
//
// 이 파일은 순수 .js입니다(.ts가 아님) — tsconfig.json의 include 패턴(`**/*.ts`)에 안
// 걸리게 하기 위해서입니다. `.open-next/worker.js`는 opennextjs-cloudflare가 빌드
// 중간에 새로 만드는 산출물이라, `next build`(타입체크 포함)가 도는 시점에는 아직 없을
// 수 있습니다 — 이 파일이 .ts였다면 그 시점에 import 대상이 없어서 타입체크가 깨집니다.
// wrangler는 tsconfig와 무관하게 이 파일을 자체 번들러로 처리하므로 .js로도 문제없습니다.
//
// `_next/static/*`, 이미지, 폰트 같은 진짜 정적 파일은 Cloudflare Workers 정적 자산
// 바인딩이 이 워커 코드를 거치지 않고 직접 서빙합니다(요청 경로가 자산 목록에 있으면
// 워커 실행 자체를 건너뜀 — wrangler.jsonc에 run_worker_first를 켜지 않았으므로 기본
// 동작). 그래서 이 파일을 지나가는 응답은 전부 "배포마다 바뀌는" 동적 콘텐츠(HTML
// 페이지·RSC 페이로드·리다이렉트 등)뿐이고, 전부 항상 최신으로 나가야 맞습니다.
import openNextHandler from "./.open-next/worker.js";

// 캐시에 저장은 허용하되(완전 차단 아님) 매번 원본에 다시 확인하도록 강제합니다.
// no-store보다 가볍고, 나중에 ETag 기반 조건부 요청을 붙이면 자동으로 더 효율적입니다.
const FRESH_HTML_CACHE_CONTROL = "public, max-age=0, must-revalidate";

export default {
  async fetch(request, env, ctx) {
    const response = await openNextHandler.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", FRESH_HTML_CACHE_CONTROL);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

// 큐(백그라운드 재검증) Durable Object 등 워커 스크립트의 다른 export도 그대로
// 이어받아야 wrangler.jsonc의 durable_objects 바인딩이 계속 동작합니다.
export * from "./.open-next/worker.js";
