# 바로처리

카드 분실·모르는 결제, 앱스토어 결제 확인, 구독 해지·환불, 쇼핑몰 배송·반품, 통신사 휴대폰 분실·인터넷, 택배 문제를 지금 누를 공식 메뉴부터 안 될 때 연락처까지 한 화면에 정리하는 Next.js 서비스입니다.

- 공개 주소: https://baro-cheori.netlify.app
- 기술: Next.js 16.3.1, TypeScript, Tailwind CSS 4
- 현재 범위: 쇼핑몰 4곳, 통신사 3곳, 택배사 3곳, 카드사 3곳, 구독·앱결제 5곳, 주요 업무 83개
- 콘텐츠 원칙: 온라인 해결 우선, 긴급 상황 외 ARS는 마지막, 초등학생도 이해할 짧은 문장
- UX·사업 벤치마크: [PRODUCT_HUNT_BENCHMARK_20260818.md](./PRODUCT_HUNT_BENCHMARK_20260818.md)

## 로컬 실행

```powershell
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 배포 전 확인

```powershell
npm run lint
npm run build
```

두 명령이 모두 성공하면 GitHub에 올립니다.

```powershell
git add .
git commit -m "SEO foundation and service pages"
git push
```

Netlify가 GitHub 저장소와 연결돼 있다면 새 커밋을 감지해 자동 배포합니다.

## 주요 주소 구조

- `/` 홈과 업무 검색
- `/company/[slug]` 업체별 업무 목록
- `/company/[slug]/[serviceSlug]` 검색엔진에 노출할 고유 업무 안내
- `/search?q=반품` 여러 업체의 관련 업무 검색 결과 (`noindex`)
- `/sitemap.xml` 검색엔진 제출용 사이트맵
- `/robots.txt` 검색로봇 접근 규칙

## 데이터 수정

업체 데이터는 `app/data/companies/`에 있습니다. 한 업무의 기본 구조는 다음과 같습니다.

```ts
{
  slug: "return-refund",
  title: "반품·환불",
  keywords: ["업체명 반품", "업체명 환불"],
  quickSummary: ["가장 먼저 확인할 내용"],
  steps: ["첫 단계", "다음 단계"],
  tips: ["주의할 내용"],
  officialUrl: "https://공식주소",
  officialActionLabel: "공식 신청 화면 열기",
  lastChecked: "YYYY-MM-DD",
}
```

같은 업체 안에서 `slug`는 중복되면 안 됩니다. 추가 기준은 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)를 따릅니다.

## 검색엔진 등록

배포 후 [SEO_REGISTRATION_GUIDE.md](./SEO_REGISTRATION_GUIDE.md)를 위에서부터 진행합니다. 소유확인 코드는 Netlify 환경변수로 넣을 수 있습니다.

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`
- `NEXT_PUBLIC_SITE_URL` (별도 도메인 연결 시 설정)

## 운영 원칙

바로처리는 각 업체의 공식 서비스가 아닌 독립 안내 서비스입니다. 업체를 대신해 개인정보를 받거나 신청하지 않으며, 비용과 최종 조건은 공식 화면에서 확인하도록 안내합니다.
