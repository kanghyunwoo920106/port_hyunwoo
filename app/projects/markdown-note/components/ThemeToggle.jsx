"use client";
import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    // 항상 다크 모드로 설정
    document.body.classList.remove("light", "custom");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // 빈 컴포넌트 반환 (아무것도 렌더링하지 않음)
  return null;
}