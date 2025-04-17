import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "강현우의 포트폴리오",
  description: "개발자 강현우의 프로젝트 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* 마크다운 노트 관련 스크립트 제거 - 클라이언트 컴포넌트에서 처리하도록 수정 */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script src="/spa-redirect.js" strategy="afterInteractive" />
        <Script src="/theme-manager.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
