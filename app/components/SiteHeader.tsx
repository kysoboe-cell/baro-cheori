import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-black tracking-tight sm:text-2xl">
          바로처리
        </Link>
        <nav aria-label="주요 메뉴" className="flex items-center gap-4 text-sm font-semibold sm:gap-7">
          <Link href="/#services" className="hover:text-blue-700">
            업체 찾기
          </Link>
          <Link href="/#how-to" className="hidden hover:text-blue-700 sm:inline">
            이용방법
          </Link>
          <Link href="/information-policy" className="hover:text-blue-700">
            정보 원칙
          </Link>
        </nav>
      </div>
    </header>
  );
}
