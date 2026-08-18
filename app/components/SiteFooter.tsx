import Link from "next/link";
import { categories, companies } from "../data/services";
import { companyPath } from "../lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold text-white">바로처리</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
              흩어진 고객센터 정보와 처리 순서를 한 화면에서 이해하기 쉽게 정리하는 독립 안내 서비스입니다.
            </p>
          </div>
          <nav aria-label="하단 메뉴" className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <Link href="/about" className="hover:text-white">서비스 소개</Link>
            <Link href="/information-policy" className="hover:text-white">정보 원칙</Link>
            <Link href="/privacy" className="hover:text-white">개인정보 안내</Link>
          </nav>
        </div>
        <nav
          aria-label="전체 업체"
          className="mt-7 grid gap-4 border-t border-gray-800 pt-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category) => (
            <div key={category.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <p className="font-bold text-white">
                {category.icon} {category.name}
              </p>
              {companies
                .filter((company) => company.categoryId === category.id)
                .map((company) => (
                  <Link
                    key={company.slug}
                    href={companyPath(company.slug)}
                    className="text-gray-400 hover:text-white"
                  >
                    {company.name}
                  </Link>
                ))}
            </div>
          ))}
        </nav>
        <p className="mt-8 border-t border-gray-800 pt-6 text-xs leading-5 text-gray-500">
          바로처리는 각 업체의 공식 서비스가 아니며 제휴·대행 관계가 없습니다. 실제 신청 조건과 비용은 연결된 공식 페이지에서 마지막으로 확인하세요.
        </p>
      </div>
    </footer>
  );
}
