import { useEffect } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./reactmodal.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata는 클라이언트 컴포넌트에서 직접 사용할 수 없지만, 
// 레이아웃 정보로 유지합니다
export const metadata = {
  title: "마크다운 메모장",
  description: "다크 테마 마크다운 에디터와 프리뷰어",
};

export default function MarkdownNoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 컴포넌트 마운트 시 다크 모드 적용
  useEffect(() => {
    // 현재 테마 상태 저장
    const prevTheme = localStorage.getItem('theme');
    
    // 마크다운 페이지에서는 항상 다크 모드 사용
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    
    // 컴포넌트 언마운트 시 이전 테마로 복원
    return () => {
      document.documentElement.classList.remove('dark');
      
      // 이전 테마가 없었다면 제거, 있었다면 복원
      if (!prevTheme) {
        localStorage.removeItem('theme');
      } else if (prevTheme !== 'dark') {
        localStorage.setItem('theme', prevTheme);
      }
    };
  }, []);

  return (
    <div className="dark">
      {children}
    </div>
  );
}
