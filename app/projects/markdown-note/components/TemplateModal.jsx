"use client";
import { useState } from "react";
import Modal from "./Modal";
import { getTemplates } from "../utils/templates";

export default function TemplateModal({ isOpen, onClose, setMarkdown }) {
  const templates = getTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [preview, setPreview] = useState("");

  const handleTemplateSelect = (key) => {
    setSelectedTemplate(key);
    setPreview(templates[key]);
  };

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      setMarkdown(templates[selectedTemplate]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="템플릿 선택"
      confirmText="적용하기"
      onConfirm={handleApplyTemplate}
      showConfirm={!!selectedTemplate}
      
    >
      <div className="grid grid-cols-1 gap-3 mb-4">
        {Object.keys(templates).map((key) => (
          <button
            key={key}
            className={`p-3 border rounded text-left transition-colors ${
              selectedTemplate === key 
                ? "border-blue-500 bg-blue-50 text-blue-700" 
                : "border-gray-200 hover:bg-gray-50 text-gray-700"
            }`}
            onClick={() => handleTemplateSelect(key)}
          >
            <div className="font-medium mb-1 text-gray-800">
              {key === "default" ? "기본 템플릿" : "회의록 템플릿"}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {templates[key].substring(0, 40)}...
            </div>
          </button>
        ))}
      </div>

      {preview && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2 text-gray-800">미리보기:</h3>
          <div className="bg-gray-50 p-3 rounded border border-gray-200 max-h-[200px] overflow-y-auto">
            <pre className="text-xs whitespace-pre-wrap font-mono text-gray-700">{preview}</pre>
          </div>
        </div>
      )}
    </Modal>
  );
} 