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
    default: "바로처리 | 고객센터·반품·분실 업무를 한눈에",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "쇼핑몰 반품·환불부터 통신사 휴대폰 분실·인터넷 이전설치까지, 전화번호와 처리 순서를 한 화면에서 확인하세요.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    url: "/",
    title: "바로처리 | 고객센터·반품·분실 업무를 한눈에",
    description:
      "헷갈리는 생활 업무의 준비물, 처리 순서, 고객센터와 공식 링크를 한 화면에서 확인하세요.",
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
