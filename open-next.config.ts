// @opennextjs/cloudflare 설정
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
	// 빌드 때 미리 만든 141개 페이지를 Workers 정적 자산에서 그대로 읽어온다.
	// (읽기 전용 캐시 — 재검증 없이 프리렌더 결과만 서빙하는 사이트용)
	incrementalCache: staticAssetsIncrementalCache,
	// 라우팅 단계에서 캐시된 응답을 바로 돌려주고 Next.js 서버 렌더링을 건너뛴다.
	// 요청당 CPU 사용을 줄여 Workers 무료 플랜의 10ms 한도 초과(503)를 막는다.
	enableCacheInterception: true,
});
