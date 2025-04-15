// src/components/JsonInput.tsx
"use client"; // 클라이언트 컴포넌트

import { useState } from "react";

interface JsonInputProps {
  onJsonChange: (json: object) => void;
}

export default function JsonInput({ onJsonChange }: JsonInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (!value.trim()) {
      setError(null);
      onJsonChange({});
      return;
    }

    try {
      const parsedJson = JSON.parse(value);
      onJsonChange(parsedJson);
      setError(null);
    } catch (err) {
      setError("유효하지 않은 JSON 형식입니다");
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        className={`w-full p-4 border rounded-lg font-mono text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   min-h-[200px] bg-gray-50 transition-all duration-200
                   ${error ? 'border-red-300' : 'border-gray-200'}
                   ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
        value={input}
        onChange={handleChange}
        placeholder="여기에 JSON 데이터를 입력하세요..."
      />
      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
