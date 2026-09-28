import type { Metadata } from "next";
import SkipLink from "@/components/SkipLink";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: "뽀모 베이커리 | 천연발효종과 저온 숙성으로 만든 빵",
  description:
    "천연발효종과 저온 숙성으로 바게트, 치아바타, 소금빵을 만드는 테이크아웃 전문 베이커리입니다.",
  // 실제 도메인이 환경 변수에 설정된 경우에만 metadataBase 및 canonical 등록
  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        alternates: {
          canonical: "/",
        },
      }
    : {}),
  openGraph: {
    title: "뽀모 베이커리 | 천연발효종과 저온 숙성으로 만든 빵",
    description:
      "천연발효종과 저온 숙성으로 바게트, 치아바타, 소금빵을 만드는 테이크아웃 전문 베이커리입니다.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-cream text-wood selection:bg-orange/20 selection:text-wood">
        <SkipLink />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
