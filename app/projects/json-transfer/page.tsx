"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// react-json-view 동적 임포트
const ReactJson = dynamic(() => import("react-json-view"), { 
  ssr: false,
  loading: () => <p className="text-gray-500">JSON 뷰어 로딩 중...</p>
});

export default function JsonTransfer() {
  const [input, setInput] = useState("");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트 사이드에서만 실행되도록 마운트 상태 관리
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    try {
      if (e.target.value.trim()) {
        const parsed = JSON.parse(e.target.value);
        setParsedJson(parsed);
        setError(null);
      } else {
        setParsedJson(null);
        setError(null);
      }
    } catch (err) {
      setParsedJson(null);
      setError("유효하지 않은 JSON 형식입니다.");
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">JSON 변환기</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-700">← 홈으로 돌아가기</Link>
        </div>
        <p className="text-gray-600 mt-2">개발자 친화적인 JSON 뷰어 & 변환기</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">JSON 입력</h2>
          <textarea
            className="w-full h-[500px] p-4 border rounded-lg font-mono text-sm"
            value={input}
            onChange={handleInputChange}
            placeholder='여기에 JSON을 입력하세요. 예: {"name": "홍길동", "age": 30}'
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">결과</h2>
          <div className="w-full h-[500px] p-4 border rounded-lg overflow-auto bg-gray-50 dark:bg-gray-800">
            {/* 클라이언트 사이드에서만 ReactJson을 렌더링 */}
            {isMounted ? (
              parsedJson ? (
                <ReactJson src={parsedJson} theme="monokai" displayDataTypes={false} />
              ) : (
                <p className="text-gray-500">유효한 JSON을 입력하면 여기에 결과가 표시됩니다.</p>
              )
            ) : (
              <p className="text-gray-500">JSON 뷰어 준비 중...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
