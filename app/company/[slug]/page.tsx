import Link from "next/link";
import { notFound } from "next/navigation";
import { companies } from "../../data/services";
const servicePriority: Record<string, number> = {
  // 쇼핑몰
  cancel: 1,
  "return-refund": 2,
  exchange: 3,

  // 통신사
  "lost-phone": 1,
  "internet-moving": 2,
  billing: 3,

  // 고객센터는 항상 뒤쪽
  "home-customer-center": 90,
  "mobile-customer-center": 91,
  "customer-center": 99,
};

type CompanyPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function CompanyPage({
    params,
}: CompanyPageProps) {
    const { slug } = await params;

    const company = companies.find(
        (item) => item.slug === slug
    );

    if (!company) {
        notFound();
    }
    const orderedServices = [...company.services].sort(
        (a, b) =>
            (servicePriority[a.slug] ?? 99) -
            (servicePriority[b.slug] ?? 99)
    );

    return (
        <main className="min-h-screen bg-gray-50 text-black">
            {/* 상단 */}
            <header className="border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between px-4 py-5 sm:px-6 lg:px-10 xl:px-12">
                    <Link href="/" className="text-2xl font-bold">
                        바로처리
                    </Link>

                    <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-black"
                    >
                        ← 메인으로
                    </Link>
                </div>
            </header>

            {/* 업체 */}
            <section className="mx-auto max-w-4xl px-6 py-16">
                <p className="text-sm font-semibold text-gray-400">
                    업체
                </p>

                <h1 className="mt-2 text-4xl font-bold">
                    {company.name}
                </h1>

                <p className="mt-4 text-gray-500">
                    처리하려는 업무를 선택해주세요.
                </p>

                {/* 업무 목록 */}
                {orderedServices.length > 0 ? (
                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        {orderedServices.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/search?q=${encodeURIComponent(
                                    `${company.name} ${service.title}`
                                )}`}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md"
                            >
                                <p className="text-xl font-bold">
                                    {service.title}
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    처리 방법과 필요한 정보를 확인하세요.
                                </p>

                                <p className="mt-6 text-sm font-semibold">
                                    바로 확인하기 →
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                        <p className="text-xl font-bold">
                            아직 등록된 업무가 없어요.
                        </p>

                        <p className="mt-3 text-gray-500">
                            필요한 정보를 준비하고 있습니다.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}