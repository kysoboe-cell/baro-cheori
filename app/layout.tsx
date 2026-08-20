import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./lib/site";

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  "Vh0-I2bKItBclgLNrtQ0tC2USRugKCEG5y-D-gNRkiA";
const naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "바로처리 | 카드분실·배송·구독·가전고장 해결 순서",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "카드 분실·모르는 결제, 구독 해지·환불, 쇼핑몰 배송·반품, 휴대폰·인터넷·택배·가전 고장을 해결할 공식 메뉴와 순서를 확인하세요.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    url: "/",
    title: "바로처리 | 카드분실·배송·구독·가전고장 해결 순서",
    description:
      "헷갈리는 생활 문제와 가전 고장을 지금 누를 공식 메뉴, 짧은 해결 순서, 안 될 때 연락처로 정리합니다.",
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
      <head>
        {/* Pretendard Variable dynamic subset — 한글 웹폰트, SIL OFL 라이선스(상업 무료) */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-950 antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
      <GoogleAnalytics gaId="G-L1B6W4F68T" />
    </html>
  );
}
