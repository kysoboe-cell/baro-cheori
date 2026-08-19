# CLAUDE.md — 바로처리 (barocheori.com)

Claude Code가 이 프로젝트에서 작업할 때 자동으로 읽는 지침 파일.
프로젝트 루트(baro-cheori 폴더 맨 위)에 둔다. 최종 갱신: 2026-08-19

---

## 0. 최우선 규칙 (다른 무엇보다 먼저)

- **배포는 오직 `npm run deploy`** (프로젝트 폴더에서 실행).
  - `git push`는 배포가 아니다. Cloudflare Git 자동 빌드는 현재 고장 상태("Latest build failed").
  - Netlify/Vercel CLI로 배포 금지. baro-cheori.netlify.app은 삭제 예정인 옛 사본이다.
- 운영자(유석 님)는 **코딩을 전혀 모른다**. 모든 안내는 복사-붙여넣기 가능한 명령/문장 + 클릭 단위 설명으로, 한 번에 한 단계씩, 전문용어는 쉬운 비유로.
- 코드 수정은 Claude가 직접 하고 완성본을 만든다. 운영자에게 코드를 고치게 하지 않는다.
- **돈이 드는 결정**(결제, 유료 플랜, API 구매)은 금액·이유·무료 대안을 먼저 제시하고 승인을 받는다. 자금 사정이 빠듯하다.
- 카드번호·비밀번호 입력은 절대 대행하지 않는다. 그 순간만 운영자에게 넘긴다.
- 파괴적 작업(대량 삭제, DNS 변경, 도메인/계정 설정 변경)은 실행 전 반드시 설명하고 승인받는다.

## 1. 프로젝트 개요

- 바로처리: 카드 분실, 배송 문제, 구독 해지, 통신 위약금, 가전 고장 같은 생활 문제를 "전화·ARS 이전에 직접 해결하는 공식 메뉴와 순서"로 안내하는 독립 서비스. 23개 업체 × 109개 업무 = 136페이지.
- 포지셔닝: 미국 GetHuman의 한국판 + "셀프 처리 우선, 전화는 마지막".
- 타겟: 검색 유입은 "급한 문제가 생긴 사람". 4050 부모 세대는 자녀가 카톡으로 공유하는 링크로 도달시킨다. 4050은 네이버 사용자 → 네이버 서치어드바이저가 구글 SEO만큼 중요.
- 수익: 단기 월 40만 원(애드센스+제휴), 장기 월 200만 원. "해지" 페이지 ↔ "갈아타기(인터넷 가입 CPA 등)" 수요 궁합이 숨은 수익 포인트.

## 2. 기술 스택 & 인프라

- Next.js 16.3.1 (App Router, TypeScript, Tailwind 4) + @opennextjs/cloudflare 1.20
- 호스팅: Cloudflare Workers 무료 플랜 · Worker 이름 `baro-cheori` · 계정 ID `75b97a57a6b5a30ef089c425bf955d7b`
- 도메인: barocheori.com (Cloudflare Registrar, 자동갱신 ON, 만료 2027-08-19)
- 저장소: GitHub `kysoboe-cell/baro-cheori`
- 사이트 주소는 `app/lib/site.ts`의 `SITE_URL` 한 곳에서 관리 (canonical/sitemap/robots 전체 제어). 환경변수 `NEXT_PUBLIC_SITE_URL`로 재정의 가능.
- **`open-next.config.ts`의 캐시 설정은 절대 비우지 말 것.** `staticAssetsIncrementalCache` + `enableCacheInterception`이 있어야 141개 프리렌더 페이지가 정적 자산으로 서빙된다. 비우면 기본값 `"dummy"`(아무 일도 안 하는 가짜 캐시)로 돌아가 요청마다 서버가 페이지를 처음부터 다시 그리고, Workers 무료 플랜의 요청당 CPU 한도(10ms)를 넘겨 503 + 링크 먹통이 재발한다.
- 네이버 소유확인: `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 환경변수가 layout.tsx에 연결됨 → `.env.production`에 값 추가 + 재배포로 반영.
- 분석: GA4 `G-L1B6W4F68T` (layout.tsx 하드코딩), 구글 서치콘솔 verification 메타 포함.

## 3. 운영자 로컬 환경

- Windows (명령 안내는 PowerShell 기준으로)
- C드라이브 용량 부족 → 새로 설치하는 것은 가능하면 D드라이브로
- 브라우저: 네이버 웨일 (Claude 확장 연결됨) · 에디터: VS Code + Claude Code 확장 · 플랜: Claude Max
- 프로젝트 폴더: `D:\Projects\baro-cheori` (D드라이브 이전 완료)

## 4. 자주 쓰는 명령

- 개발 서버: `npm run dev`
- 빌드 확인: `npm run build`
- 배포: `npm run deploy`  ← 유일한 배포 방법. 이후 모든 재배포도 항상 이 명령.

## 5. 현재 상태 (2026-08-19 기준)

- 완료: Workers 이전, 136페이지 라우팅 정상, 구글 서치콘솔(workers.dev 속성) 소유확인·sitemap 제출, GA4 실시간 수집, 도메인 구매 + Worker 커스텀 도메인 연결, 도메인 전환 코드 패치 제작·검증 완료.
- 완료(2026-08-19): **도메인 전환 배포.** ① `app/lib/site.ts` 기본 주소 → barocheori.com ② `next.config.ts`에 workers.dev → barocheori.com 영구 리디렉트(308) ③ `.env.production` 신설. 확인 3가지 전부 통과 — barocheori.com 정상 / workers.dev 접속 시 308 자동 이동 / sitemap.xml 주소가 새 도메인.
- 완료(2026-08-19): **503 링크 먹통 응급수리.** 원인 = ① `open-next.config.ts` 캐시 미설정으로 요청마다 페이지 재렌더링 ② next/link 프리페치가 한 번에 수십 개 발생 → 요청당 CPU 10ms 초과. 조치 = ① 정적자산 캐시 + 캐시 인터셉션 ② Link 25곳에 `prefetch={false}`. 검증 = 실제 브라우저로 링크 3개 클릭 정상·콘솔 오류 0 / 동시요청 40개 전부 200(503 0건) / 응답헤더 `x-nextjs-prerender: 1`.
- **다음 = "청소의 날"** (한 세션에): ① 서치콘솔에 barocheori.com 도메인 속성 신규 등록(DNS TXT) + sitemap 제출 ② 네이버 서치어드바이저 등록 + 옛 netlify 항목 삭제 ③ 다음(Daum) 검색등록 ④ 넷리파이 사이트 삭제 ⑤ GA4 스트림 URL 갱신 + 새 서치콘솔 속성 연동.
- 이후 성장: 검색량 큰 20~30페이지(해지 위약금·반품·분실 계열) 콘텐츠 보강(실제 캡처·소요시간·실패 케이스·FAQ) → 애드센스 신청 → 쿠팡파트너스/인터넷 가입 CPA → "부모님께 카톡으로 보내기" 공유 버튼, FAQ/HowTo 구조화 데이터.

## 6. 알려진 문제

- 구글 검색 노출 없음: 신규 사이트 + 백링크 0 + 넷리파이 중복 + 얇은 템플릿 반복 → 정상 범위. 도메인 통합 + 콘텐츠 보강으로 2~6개월에 걸쳐 개선 예상. 확인은 구글에 `site:barocheori.com` 검색.
- 넷리파이 사본(baro-cheori.netlify.app)이 살아있고 자기 자신을 canonical로 선언 중 → 구글 신호 분산의 주범. 크레딧 문제로 배포 불가 → 리디렉트를 넣을 수 없음 → 대시보드에서 사이트 삭제가 유일한 정리법.
- Cloudflare Git 자동 빌드 실패: 로컬 `npm run deploy`가 정상이라 급하지 않음. 나중에 Workers Builds 빌드 명령어 점검. 무료 한도는 월 3,000빌드분(현재 9분 사용)이라 여유 막대함.

## 7. 작업 원칙

우선순위: **정확성 > 검증 > 최소 변경 > 명확성 > 유지보수성**

- 파일·API·스키마가 존재한다고 가정하지 말고 먼저 읽어서 확인한다.
- 수정 전에 관련 파일을 읽고, 수정 후에는 빌드·실행으로 검증한다. 검증 없이 "성공했다"고 말하지 않는다.
- 요청된 작업에만 변경을 국한하고, 관련 없는 리팩토링은 하지 않는다.
- 가장 단순한 해결책을 선호하고, 불필요한 의존성·추상화를 추가하지 않는다.
- 기존 프로젝트의 관례와 스타일을 따른다.
- 막히면 멈추고: 무엇이 막혔는지, 무엇이 검증됐는지 명확히 보고한다.

## 8. 참조 주소

- 정본: https://barocheori.com
- Workers 주소(→ 정본으로 308 리디렉트 작동 확인, 2026-08-19): https://baro-cheori.kysoboe.workers.dev
- 넷리파이 옛 주소(삭제 예정): https://baro-cheori.netlify.app
- 도메인 갱신: 2027-08-19, $10.46 자동결제 (등록 카드) — 내년에 잊지 말 것
- Cloudflare 무료 한도 체감: 요청 884/일 (한도 10만) — 여유 막대함

@AGENTS.md
