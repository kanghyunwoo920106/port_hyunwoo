"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import FileControls from "./components/FileControls";

export default function MarkdownNote() {
  const [markdown, setMarkdown] = useState("# Hello Markdown\n\n이건 *마크다운 메모장*입니다!");

  useEffect(() => {
    // 로컬 스토리지에서 이전 작성 내용 불러오기
    const saved = localStorage.getItem("markdown");
    if (saved) setMarkdown(saved);
  }, []);

  // 마크다운 변경시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("markdown", markdown);
  }, [markdown]);

  return (
    <main className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-6xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          📝 마크다운 메모장
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm">
            ← 홈으로 돌아가기
          </Link>
          <FileControls markdown={markdown} setMarkdown={setMarkdown} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl h-[calc(100vh-140px)]">
        <div className="rounded-xl overflow-hidden shadow-lg shadow-black/20">
          <Editor markdown={markdown} setMarkdown={setMarkdown} />
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg shadow-black/20 bg-gray-800">
          <Preview markdown={markdown} />
        </div>
      </div>
    </main>
  );
}