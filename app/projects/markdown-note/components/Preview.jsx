"use client";
import { marked } from "marked";

export default function Preview({ markdown }) {
  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-xl">
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700 rounded-t-xl">
        <div className="text-sm text-gray-400 flex items-center">
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </span>
          미리보기
        </div>
      </div>
      <div
        className="prose prose-invert max-w-full p-4 overflow-y-auto h-full text-white prose-a:text-blue-400 prose-headings:text-white prose-p:text-white prose-strong:text-white prose-code:text-white prose-pre:bg-gray-800"
        style={{ height: 'calc(100% - 52px)' }}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
}