import type { Metadata } from "next";
import type { ReactNode } from "react";
import CoffeeSupport from "./components/CoffeeSupport";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./lib/site";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "바로처리 | 카드분실·자동결제·반품·택배 해결 순서",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "카드 분실·모르는 결제, 구독 해지·환불, 쇼핑몰 배송·반품, 휴대폰 분실·인터넷, 택배 문제를 해결할 공식 메뉴와 순서를 확인하세요.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    url: "/",
    title: "바로처리 | 카드분실·자동결제·반품·택배 해결 순서",
    description:
      "헷갈리는 생활 문제를 지금 누를 공식 메뉴, 짧은 해결 순서, 안 될 때 연락처로 정리합니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(naverVerification
      ? { other: { "naver-site-verification": naverVerification } }
      : {}),
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-gray-950 antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <CoffeeSupport />
      </body>
    </html>
  );
}
