import Link from "next/link";
import PhoneActions from "../components/PhoneActions";
import { findBestService } from "../lib/search";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};



export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const rawQuery = Array.isArray(params.q)
    ? params.q[0]
    : params.q ?? "";

  const query = rawQuery.trim();
  const matchedResult =
    findBestService(query);

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      {/* 상단 */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10 xl:px-12">
          <Link href="/" className="text-2xl font-bold">
            바로처리
          </Link>

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black"
          >
            ← 다시 검색
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {matchedResult ? (
          <>
            {/* 제목 */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-400">
                  {matchedResult.company.name}
                </p>

                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                  {matchedResult.service.title}
                </h1>
              </div>

              {matchedResult.service.lastChecked && (
                <p className="pb-1 text-sm text-gray-400">
                  마지막 정보 확인 {matchedResult.service.lastChecked}
                </p>
              )}
            </div>

            {/* 위쪽: 왼쪽 처리방법 / 오른쪽 주의사항 */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
              {/* 왼쪽 */}
              <div className="space-y-5">
                {/* 빠른 판단 */}
                {matchedResult.service.quickSummary &&
                  matchedResult.service.quickSummary.length > 0 && (
                    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                      <p className="text-sm font-bold text-blue-700">
                        먼저 이것부터 확인하세요
                      </p>

                      <div className="mt-3 space-y-2">
                        {matchedResult.service.quickSummary.map(
                          (item) => (
                            <p
                              key={item}
                              className="text-base font-semibold leading-7 text-gray-900"
                            >
                              ✓ {item}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* 처리 순서 */}
                {matchedResult.service.steps &&
                  matchedResult.service.steps.length > 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                      <p className="text-sm font-semibold text-gray-400">
                        처리 순서
                      </p>

                      <h2 className="mt-1 text-2xl font-bold">
                        이렇게 하면 돼요
                      </h2>

                      <div className="mt-5 space-y-4">
                        {matchedResult.service.steps.map(
                          (step, index) => (
                            <div
                              key={step}
                              className="flex items-start gap-4"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black font-bold text-white">
                                {index + 1}
                              </div>

                              <p className="pt-1 text-base font-medium leading-7 text-gray-800">
                                {step}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* 오른쪽: 헷갈리기 쉬운 부분 */}
              <aside className="lg:sticky lg:top-6 lg:self-start">
                {matchedResult.service.tips &&
                  matchedResult.service.tips.length > 0 ? (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                    <p className="text-lg font-bold">
                      💡 헷갈리기 쉬운 부분
                    </p>

                    <div className="mt-4 space-y-4">
                      {matchedResult.service.tips.map((tip) => (
                        <p
                          key={tip}
                          className="leading-7 text-gray-700"
                        >
                          • {tip}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-400">
                    별도의 주의사항이 없습니다.
                  </div>
                )}
              </aside>
            </div>

            {/* 아래 전체폭: 직접 해결이 어려울 때 */}
            {(matchedResult.service.phone ||
              matchedResult.service.hours ||
              matchedResult.service.officialUrl) && (
                <div className="mt-5 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    {/* 제목 */}
                    <div className="min-w-48">
                      <h2 className="text-lg font-bold">
                        직접 해결이 어렵다면
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        고객센터 또는 공식 안내를 이용하세요.
                      </p>
                    </div>

                    {/* 정보 영역 */}
                    <div className="grid flex-1 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-3 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                      {/* 고객센터 */}
                      {matchedResult.service.phone && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400">
                            고객센터
                          </p>

                          <p className="mt-1 text-xl font-bold">
                            {matchedResult.service.phone.number}
                          </p>

                          <div className="mt-2">
                            <PhoneActions
                              phone={matchedResult.service.phone.number}
                            />
                          </div>
                        </div>
                      )}

                      {/* 상담시간 */}
                      {matchedResult.service.hours && (
                        <div className="sm:border-l sm:border-gray-100 sm:pl-4">
                          <p className="text-sm font-semibold text-gray-400">
                            상담 가능 시간
                          </p>

                          <p className="mt-1 text-lg font-bold">
                            {matchedResult.service.hours}
                          </p>
                        </div>
                      )}

                      {/* 공식 안내 */}
                      {matchedResult.service.officialUrl && (
                        <div className="sm:border-l sm:border-gray-100 sm:pl-4">
                          <p className="font-bold">
                            공식 안내
                          </p>

                          <a
                            href={matchedResult.service.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                          >
                            공식 페이지 ↗
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-xl font-bold">
              아직 등록되지 않은 업무예요.
            </p>

            <p className="mt-3 text-gray-500">
              다른 검색어를 입력하거나 카테고리에서
              업체를 찾아보세요.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white"
            >
              다시 검색하기
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}