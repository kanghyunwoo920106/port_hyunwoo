"use client";
import { useEffect, useState } from "react";
import AlertModal from "./AlertModal";

export default function Editor({ markdown, setMarkdown }) {
  const [history, setHistory] = useState([markdown]);
  const [index, setIndex] = useState(0);
  const [alertModal, setAlertModal] = useState({ show: false, message: "", type: "info" });

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("markdown", markdown);
    }, 2000); // 자동 저장 간격: 2초
    return () => clearInterval(interval);
  }, [markdown]);

  useEffect(() => {
    const handleSaveShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        localStorage.setItem("markdown", markdown);
        showAlert("저장 완료", "문서가 성공적으로 저장되었습니다.", "success");
      }
    };
    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [markdown]);

  const showAlert = (title, message, type = "info") => {
    setAlertModal({
      show: true,
      title,
      message,
      type
    });
    
    // 3초 후 자동으로 알림창 닫기
    setTimeout(() => {
      setAlertModal(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const newHistory = history.slice(0, index + 1);
    setHistory([...newHistory, value]);
    setIndex(newHistory.length);
    setMarkdown(value);
  };

  const undo = () => {
    if (index > 0) {
      setIndex(index - 1);
      setMarkdown(history[index - 1]);
    }
  };

  const redo = () => {
    if (index < history.length - 1) {
      setIndex(index + 1);
      setMarkdown(history[index + 1]);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full bg-gray-900 rounded-xl">
        <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700 rounded-t-xl">
          <div className="flex items-center">
            <button 
              className="px-2.5 py-1.5 bg-gray-700 border border-gray-600 rounded-md mr-2 hover:bg-gray-600 transition-colors disabled:opacity-40 text-gray-300"
              onClick={undo}
              disabled={index === 0}
            >
              <span className="text-sm">↩️</span>
            </button>
            <button 
              className="px-2.5 py-1.5 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600 transition-colors disabled:opacity-40 text-gray-300"
              onClick={redo}
              disabled={index === history.length - 1}
            >
              <span className="text-sm">↪️</span>
            </button>
          </div>
          <div className="text-sm text-gray-400 flex items-center">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </span>
            Markdown 에디터 <span className="text-xs opacity-70 ml-1">(Ctrl+S로 저장)</span>
          </div>
        </div>
        <textarea
          className="flex-1 w-full p-4 outline-none resize-none bg-gray-900 text-gray-200 font-mono text-sm leading-relaxed"
          value={markdown}
          onChange={handleChange}
          placeholder="마크다운을 입력하세요..."
          spellCheck="false"
          style={{ height: 'calc(100% - 52px)' }}
        />
      </div>

      <AlertModal
        isOpen={alertModal.show}
        onClose={() => setAlertModal(prev => ({ ...prev, show: false }))}
        title={alertModal.title || "알림"}
        message={alertModal.message}
        type={alertModal.type}
      />
    </>
  );
}