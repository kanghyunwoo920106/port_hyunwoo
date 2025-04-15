// src/components/JsonTree.tsx
"use client";

import React, { useState } from 'react';

interface JsonTreeProps {
  jsonData: any;
  level?: number;
}

// json 트리 컴포넌트
const JsonTree: React.FC<JsonTreeProps> = ({ jsonData, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // 데이터가 객체가 아니거나 null인 경우
  if (typeof jsonData !== 'object' || jsonData === null) {
    return (
      <span className={`ml-4 font-mono text-sm ${
        typeof jsonData === 'string' ? 'text-green-600' :
        typeof jsonData === 'number' ? 'text-blue-600' :
        typeof jsonData === 'boolean' ? 'text-purple-600' :
        'text-gray-600'
      }`}>
        {typeof jsonData === 'string' ? `"${jsonData}"` : String(jsonData)}
      </span>
    );
  }

  // 배열인지 확인
  const isArray = Array.isArray(jsonData);
  // 배열이면 배열 아니면 객체 엔트리 배열로 변환
  const items = isArray ? jsonData : Object.entries(jsonData);

  return (
    <div style={{ marginLeft: level > 0 ? '1.5rem' : '0' }} className="relative">
      <div className={`
        cursor-pointer inline-flex items-center space-x-1
        hover:text-blue-600 transition-colors duration-150
      `}>
        <span
          className="w-4 h-4 inline-flex items-center justify-center text-xs"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '▼' : '▶'}
        </span>
        <span className="font-mono text-sm text-gray-800">
          {isArray ? '[' : '{'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="border-l border-gray-200 ml-2">
          {(isArray ? items : items as [string, any][]).map((item, index) => {
            const key = isArray ? index : item[0];
            const value = isArray ? item : item[1];
            return (
              <div key={key} className="py-1">
                <span className="font-mono text-sm text-gray-600">
                  {!isArray && `"${key}": `}
                </span>
                <JsonTree jsonData={value} level={level + 1} />
                {index < items.length - 1 && (
                  <span className="text-gray-400">,</span>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      <div className="font-mono text-sm text-gray-800">
        {isArray ? ']' : '}'}
      </div>
    </div>
  );
};

export default JsonTree;
