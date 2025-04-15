"use client";

import { useEffect } from "react";
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

// 클라이언트 컴포넌트에서는 metadata를 export할 수 없음
// 대신 <title> 태그를 직접 사용하거나 별도의 서버 컴포넌트에서 metadata를 export해야 함

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

  // 문서 제목 설정을 위한 useEffect 추가
  useEffect(() => {
    // 문서 제목 변경
    document.title = "마크다운 메모장";
  }, []);

  return (
    <div className="dark">
      {children}
    </div>
  );
}
