import Link from "next/link";
import CoffeeSupport from "./CoffeeSupport";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          prefetch={false}
          href="/"
          className="flex min-h-12 items-center gap-2 text-lg font-bold tracking-tight text-ink-900"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white"
          >
            ✓
          </span>
          <span>바로처리</span>
        </Link>
        <nav
          aria-label="주요 메뉴"
          className="flex items-center gap-1 text-body-sm font-semibold text-ink-700 sm:gap-2"
        >
          <Link
            prefetch={false}
            href="/#quick-start"
            className="flex min-h-12 items-center px-2 hover:text-primary"
          >
            빠른 해결
          </Link>
          <Link
            prefetch={false}
            href="/#services"
            className="hidden min-h-12 items-center px-2 hover:text-primary sm:flex"
          >
            업체 찾기
          </Link>
          <Link
            prefetch={false}
            href="/information-policy"
            className="flex min-h-12 items-center px-2 hover:text-primary"
          >
            정보 원칙
          </Link>
          <CoffeeSupport />
        </nav>
      </div>
    </header>
  );
}
