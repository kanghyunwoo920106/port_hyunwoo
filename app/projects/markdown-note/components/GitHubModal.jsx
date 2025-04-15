"use client";
import { useState } from "react";
import Modal from "./Modal";
import { uploadToGitHub } from "../utils/github";

export default function GitHubModal({ isOpen, onClose, markdown }) {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [path, setPath] = useState("notes/note.md");
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState({ status: null, message: "" });

  const handleUpload = async () => {
    if (!token || !username || !repo || !path) {
      setResult({
        status: "error",
        message: "모든 필드를 입력해주세요."
      });
      return;
    }

    setIsUploading(true);
    setResult({ status: null, message: "" });

    try {
      const response = await uploadToGitHub(markdown, token, username, repo, path);
      setResult({
        status: "success",
        message: "GitHub에 성공적으로 업로드되었습니다!"
      });
    } catch (error) {
      setResult({
        status: "error",
        message: `업로드 실패: ${error.message}`
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setToken("");
    setUsername("");
    setRepo("");
    setPath("notes/note.md");
    setResult({ status: null, message: "" });
  };

  // 모달이 닫힐 때 폼 초기화
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="GitHub에 저장"
      confirmText="업로드"
      onConfirm={handleUpload}
      showConfirm={!result.status && !isUploading}
    >
      {result.status ? (
        <div className={`p-4 mb-4 rounded-lg ${result.status === "success" ? "bg-green-900/30 text-green-400 border border-green-700" : "bg-red-900/30 text-red-400 border border-red-700"}`}>
          <p className="font-medium">{result.message}</p>
          {result.status === "success" && (
            <a 
              href={`https://github.com/${username}/${repo}/blob/main/${path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-400 hover:text-blue-300 underline"
            >
              GitHub에서 보기
            </a>
          )}
          <button 
            onClick={resetForm}
            className="mt-3 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded text-sm transition-colors"
          >
            다시 업로드하기
          </button>
        </div>
      ) : (
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Personal Access Token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2.5 border rounded bg-gray-800 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-100"
              placeholder="ghp_xxxxxxxxxxxx"
              disabled={isUploading}
            />
            <p className="mt-1.5 text-xs text-gray-400">
              <a 
                href="https://github.com/settings/tokens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                GitHub 토큰 생성하기
              </a>
              {' '}(repo 권한 필요)
            </p>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">사용자명</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 border rounded bg-gray-800 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-100"
              placeholder="github 사용자명"
              disabled={isUploading}
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">저장소 이름</label>
            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="w-full p-2.5 border rounded bg-gray-800 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-100"
              placeholder="repository 이름"
              disabled={isUploading}
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">파일 경로</label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full p-2.5 border rounded bg-gray-800 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-100"
              placeholder="notes/note.md"
              disabled={isUploading}
            />
          </div>
          
          {isUploading && (
            <div className="flex justify-center items-center p-4 mt-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mr-3"></div>
              <span className="text-gray-200">업로드 중...</span>
            </div>
          )}
        </form>
      )}
    </Modal>
  );
} 