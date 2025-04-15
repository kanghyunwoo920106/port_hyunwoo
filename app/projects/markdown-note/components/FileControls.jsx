"use client";
import { useState } from "react";
import { downloadFile } from "../utils/download";
import { uploadFile } from "../utils/upload";
import GitHubModal from "./GitHubModal";
import TemplateModal from "./TemplateModal";
import AlertModal from "./AlertModal";

export default function FileControls({ markdown, setMarkdown }) {
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "info", title: "" });

  const handleUpload = async (e) => {
    const content = await uploadFile(e);
    if (content) {
      setMarkdown(content);
      showAlert("파일 업로드 성공", "파일이 성공적으로 업로드되었습니다.", "success");
    }
  };

  const handleDownload = () => {
    downloadFile(markdown);
    showAlert("파일 다운로드", "파일이 다운로드되었습니다.", "success");
  };

  const showAlert = (title, message, type = "info") => {
    setAlert({
      show: true,
      title,
      message,
      type
    });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center shadow-lg shadow-blue-500/20"
          onClick={handleDownload}
        >
          <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          다운로드
        </button>
        
        <label className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md cursor-pointer transition-colors flex items-center shadow-lg shadow-purple-500/20">
          <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          업로드
          <input
            type="file"
            accept=".md,.txt"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
        
        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors flex items-center shadow-lg shadow-indigo-500/20"
          onClick={() => setShowGitHubModal(true)}
        >
          <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          GitHub
        </button>
        
        <button 
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors flex items-center shadow-lg shadow-amber-500/20"
          onClick={() => setShowTemplateModal(true)}
        >
          <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          템플릿
        </button>
      </div>

      {/* GitHub 모달 */}
      <GitHubModal 
        isOpen={showGitHubModal}
        onClose={() => setShowGitHubModal(false)}
        markdown={markdown}
      />
      
      {/* 템플릿 모달 */}
      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        setMarkdown={setMarkdown}
      />
      
      {/* 알림 모달 */}
      <AlertModal
        isOpen={alert.show}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </>
  );
}