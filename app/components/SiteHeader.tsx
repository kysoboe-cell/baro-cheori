import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link prefetch={false} href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight sm:text-2xl">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-700 text-base font-black text-white shadow-sm"
          >
            ✓
          </span>
          <span>바로처리</span>
        </Link>
        <nav aria-label="주요 메뉴" className="flex items-center gap-2 text-sm font-bold text-slate-700 sm:gap-5">
          <Link prefetch={false} href="/#quick-start" className="flex min-h-11 items-center px-1.5 hover:text-primary-700">
            빠른 해결
          </Link>
          <Link prefetch={false} href="/#services" className="hidden min-h-11 items-center px-1.5 hover:text-primary-700 sm:flex">
            업체 찾기
          </Link>
          <Link prefetch={false} href="/information-policy" className="flex min-h-11 items-center px-1.5 hover:text-primary-700">
            정보 원칙
          </Link>
        </nav>
      </div>
    </header>
  );
}
