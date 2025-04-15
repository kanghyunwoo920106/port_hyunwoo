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
        {/* 마크다운 노트에서 돌아왔을 때 다크 모드가 유지되는 문제 해결을 위한 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 루트 페이지에서는 기본 테마로 초기화
              (function() {
                try {
                  // URL 경로가 마크다운 노트가 아니라면 다크 모드 클래스 제거
                  if (!window.location.pathname.includes('/projects/markdown-note')) {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('테마 초기화 오류:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script src="/spa-redirect.js" strategy="beforeInteractive" />
        <Script src="/theme-manager.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
