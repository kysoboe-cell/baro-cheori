# Google·Naver 검색 등록 순서

업데이트가 Netlify에 배포된 다음 진행합니다.

## 0. 먼저 공개 주소 확인

아래 주소가 모두 정상으로 열리는지 확인합니다.

- https://baro-cheori.netlify.app
- https://baro-cheori.netlify.app/robots.txt
- https://baro-cheori.netlify.app/sitemap.xml

## 1. Google Search Console

1. https://search.google.com/search-console 에 Google 계정으로 로그인합니다.
2. `속성 추가`에서 `URL 접두어`를 선택합니다.
3. `https://baro-cheori.netlify.app`을 정확히 입력합니다.
4. 소유권 확인 방법에서 `HTML 태그`를 선택합니다.
5. 받은 태그의 `content="여기"` 안쪽 값만 복사합니다.
6. Netlify의 해당 사이트에서 `Site configuration → Environment variables`로 이동합니다.
7. `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 이름으로 복사한 값을 저장합니다.
8. Netlify에서 새 배포를 실행한 뒤 Search Console로 돌아와 `확인`을 누릅니다.
9. 왼쪽 `Sitemaps`에서 `sitemap.xml`을 제출합니다.
10. `URL 검사`에서 홈과 대표 업무 페이지 2~3개를 검사하고 색인 생성을 요청합니다.

## 2. Naver Search Advisor

1. https://searchadvisor.naver.com 에 로그인하고 `웹마스터 도구`를 엽니다.
2. 사이트에 `https://baro-cheori.netlify.app`을 등록합니다.
3. 소유확인에서 `HTML 태그` 방식을 선택합니다.
4. 받은 태그의 `content="여기"` 안쪽 값만 복사합니다.
5. Netlify 환경변수에 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 이름으로 저장합니다.
6. Netlify에서 새 배포를 실행한 뒤 Naver에서 소유확인을 완료합니다.
7. `요청 → 사이트맵 제출`에서 `sitemap.xml`을 제출합니다.
8. 사이트 진단에서 robots.txt, 사이트맵, 제목과 설명에 오류가 없는지 확인합니다.

## 3. 등록 후 8~12주 운영

매주 새 업체를 무작정 늘리기보다 실제 검색 노출을 먼저 봅니다.

- 노출은 있는데 클릭이 적음: 페이지 제목과 설명을 더 구체적으로 수정
- 클릭은 있는데 머무름이 짧음: 첫 화면의 요약과 준비물을 보강
- 특정 검색어가 반복됨: 그 업무 콘텐츠를 더 자세히 확장
- 검색되지만 해당 결과가 없음: 다음 콘텐츠 후보로 기록

처음 확인할 핵심 지표는 검색 노출수, 클릭수, 클릭률, 상위 검색어, 많이 본 업무 페이지입니다.

## 4. 도메인을 나중에 바꿀 때

자체 도메인을 연결하면 `NEXT_PUBLIC_SITE_URL`을 새 `https://도메인`으로 바꾸고 다시 배포합니다. 그 뒤 새 주소로 Google과 Naver 소유확인 및 사이트맵 제출을 다시 진행합니다.

공식 도움말:

- Google 속성 추가: https://support.google.com/webmasters/answer/34592
- Google 소유권 확인: https://support.google.com/webmasters/answer/9008080
- Google 사이트맵 제출: https://support.google.com/webmasters/answer/7451001
- Naver 사이트맵 안내: https://searchadvisor.naver.com/guide/request-feed
