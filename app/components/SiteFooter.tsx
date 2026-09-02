import Link from "next/link";
import AppIcon from "./AppIcon";
import { categories, getCompaniesByCategory } from "../data/services";
import { companyPath } from "../lib/site";
import SupportFooterLink from "./SupportFooterLink";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-h3 text-white">바로처리</p>
            <p className="mt-2 max-w-xl text-body-sm text-gray-300">
              전화와 ARS를 돌기 전에 공식 화면에서 직접 해결할 순서를 쉽게 정리하는 독립 안내 서비스입니다.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <nav aria-label="하단 메뉴" className="flex flex-wrap gap-x-3 text-body-sm">
              <Link prefetch={false} href="/guide" className="inline-flex min-h-12 items-center hover:text-white">알아두면 좋은 글</Link>
              <Link prefetch={false} href="/about" className="inline-flex min-h-12 items-center hover:text-white">서비스 소개</Link>
              <Link prefetch={false} href="/information-policy" className="inline-flex min-h-12 items-center hover:text-white">정보 원칙</Link>
              <Link prefetch={false} href="/privacy" className="inline-flex min-h-12 items-center hover:text-white">개인정보 안내</Link>
              <SupportFooterLink />
            </nav>
            <p className="text-body-sm text-gray-300">
              문의:{" "}
              <a
                href="mailto:contact@barocheori.com"
                className="inline-flex min-h-12 items-center underline underline-offset-4 hover:text-white"
              >
                contact@barocheori.com
              </a>
            </p>
          </div>
        </div>

        {/*
          업체 링크 — 검수 개선 1차(A3). 카테고리 제목 아래 항목이 세로로 딱 붙는
          다단 구조입니다(모바일 2열 · 태블릿 3열 · PC 6열). 열 높이가 제각각이어도
          항목은 자기 카테고리 아래에만 있습니다.
        */}
        <nav
          aria-label="전체 업체"
          className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-gray-800 pt-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {categories.map((category) => (
            <div key={category.id}>
              <p className="flex items-center gap-1.5 text-body-sm font-bold text-white">
                <AppIcon name={category.icon} size={16} />
                {category.name}
              </p>
              <ul className="mt-1">
                {getCompaniesByCategory(category.id).map((company) => (
                  <li key={company.slug}>
                    <Link
                      prefetch={false}
                      href={companyPath(company.slug)}
                      className="inline-flex min-h-11 items-center text-body-sm text-gray-300 hover:text-white"
                    >
                      {company.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <p className="mt-8 border-t border-gray-800 pt-6 text-caption text-gray-300">
          바로처리는 각 업체의 공식 서비스가 아니며 제휴·대행 관계가 없습니다. 실제 신청 조건과 비용은 연결된 공식 페이지에서 마지막으로 확인하세요.
        </p>
      </div>
    </footer>
  );
}
