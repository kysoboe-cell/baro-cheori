import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-gray-50">
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-black text-blue-700">404</p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">페이지를 찾을 수 없어요</h1>
        <p className="mt-4 leading-7 text-gray-600">
          주소가 바뀌었거나 아직 등록되지 않은 업무일 수 있습니다.
        </p>
        <Link prefetch={false}
          href="/"
          className="mt-7 rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
        >
          홈에서 다시 찾기
        </Link>
      </section>
    </main>
  );
}
