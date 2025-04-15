"use client";
import Modal from "./Modal";

export default function AlertModal({ 
  isOpen, 
  onClose, 
  title = "알림", 
  message,
  type = "info" // info, success, error, warning
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200";
      case "error":
        return "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200";
      case "warning":
        return "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200";
      default:
        return "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showCancel={false}
    >
      <div className={`p-4 rounded-lg ${getTypeStyles()}`}>
        <div className="flex items-start">
          <span className="text-2xl mr-3">{getTypeIcon()}</span>
          <p>{message}</p>
        </div>
      </div>
    </Modal>
  );
} 