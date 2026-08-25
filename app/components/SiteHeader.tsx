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
          {/*
            v14: 이 3개는 데스크톱 전용입니다(768px 미만에서 숨김). v13에서
            "업체 찾기"까지 모바일에 노출했다가, 텍스트 3개 + 커피 버튼을
            390px 폭에 욱여넣으면서 단어마다 줄바꿈되고 헤더가 3배로 늘어나는
            버그가 났습니다. 이 3개는 홈 화면에 대응 섹션이 이미 있어
            (빠른 해결→"다들 이것부터 찾아요", 업체 찾기→"업체로 바로 찾기")
            모바일에서 없어도 괜찮습니다. 모바일 헤더엔 로고 + 커피 버튼만.
          */}
          <Link
            prefetch={false}
            href="/#quick-start"
            className="hidden min-h-12 items-center px-2 hover:text-primary md:flex"
          >
            빠른 해결
          </Link>
          <Link
            prefetch={false}
            href="/#services"
            className="hidden min-h-12 items-center px-2 hover:text-primary md:flex"
          >
            업체 찾기
          </Link>
          <Link
            prefetch={false}
            href="/information-policy"
            className="hidden min-h-12 items-center px-2 hover:text-primary md:flex"
          >
            정보 원칙
          </Link>
          <CoffeeSupport />
        </nav>
      </div>
    </header>
  );
}
