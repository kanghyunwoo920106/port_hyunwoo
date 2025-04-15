// src/app/page.tsx
"use client"; // 클라이언트 컴포넌트

import { useState } from "react";
import JsonTree from "./_components/JsonTree";
import JsonInput from "./_components/JsonInput";
import { formatters, type FormatType } from "./_utils/converters";

const fileExtensions: Record<FormatType, string> = {
  json: 'json',
  csv: 'csv',
  xml: 'xml',
};

export default function Home() {
  const [jsonData, setJsonData] = useState<object>({});
  const [selectedFormat, setSelectedFormat] = useState<FormatType>('json');

  const handleDownload = () => {
    const formatter = formatters[selectedFormat];
    const content = formatter(jsonData);
    const extension = fileExtensions[selectedFormat];
    
    const blob = new Blob([content], { 
      type: selectedFormat === 'json' 
        ? 'application/json' 
        : selectedFormat === 'xml'
          ? 'application/xml'
          : 'text/csv'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            JSON 트리 뷰어
          </span>
        </h1>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">JSON 입력</h2>
            <JsonInput onJsonChange={setJsonData} />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">JSON 트리 구조</h2>
            <div className="overflow-auto">
              <JsonTree jsonData={jsonData} />
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-4">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as FormatType)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="xml">XML</option>
            </select>
            
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg
                       font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                       transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-opacity-50"
            >
              {selectedFormat.toUpperCase()}로 다운로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
