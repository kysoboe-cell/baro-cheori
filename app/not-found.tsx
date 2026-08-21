import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-bg-soft">
      <section className="mx-auto flex min-h-[60vh] max-w-[42.5rem] flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
        <p className="tnum text-caption font-semibold text-primary">404</p>
        <h1 className="mt-3 break-keep text-h1 text-ink-900 md:text-h1-md">페이지를 찾을 수 없어요</h1>
        <p className="mt-4 break-keep text-body text-ink-700">
          주소가 바뀌었거나 아직 등록되지 않은 업무일 수 있습니다.
        </p>
        <Link prefetch={false}
          href="/"
          className="mt-6 inline-flex min-h-12 items-center rounded-[10px] bg-primary px-6 text-button text-white hover:bg-primary-strong"
        >
          홈에서 다시 찾기
        </Link>
      </section>
    </main>
  );
}
