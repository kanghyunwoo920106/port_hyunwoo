"use client";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";

// 앱 요소 지정 (접근성을 위해 필요)
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body');
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  confirmText = "확인", 
  cancelText = "취소",
  onConfirm = null,
  showCancel = true,
  showConfirm = true,
}) {
  // 모달이 열릴 때 ESC 키로 닫을 수 있도록 설정
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 모달이 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      closeTimeoutMS={200}
    >
      <div className="bg-white h-full">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6 max-h-[60vh] overflow-y-auto text-gray-700">
          {children}
        </div>
        
        {(showCancel || showConfirm) && (
          <div className="flex justify-end gap-2">
            {showCancel && (
              <button 
                onClick={onClose} 
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition-colors"
              >
                {cancelText}
              </button>
            )}
            
            {showConfirm && onConfirm && (
              <button 
                onClick={() => {
                  onConfirm();
                  onClose();
                }} 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 !text-white rounded transition-colors"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </ReactModal>
  );
} 