import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  // 控制背景滚动
  useEffect(() => {
    if (isOpen) {
      // 禁用背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复背景滚动
      document.body.style.overflow = 'unset';
    }

    // 清理函数：组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) { // Ensure click is on backdrop, not content
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center tc-color-fill-base bg-opacity-90 backdrop-blur-md p-4"
      onClick={handleBackdropClick} // Add click handler to backdrop
    >
      <div 
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md dark:border dark:border-gray-700 relative transform" // Added relative for X button positioning
        onClick={(e) => e.stopPropagation()} // Prevent content click from closing modal
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {title && (
          <div className="mb-4 pt-2 pr-8"> 
          </div>
        )}
        {children}
        {/* Optional: Add a close button if needed, or rely on actions within children to call onClose */}
        {/* Example close button:
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Close
        </button>
        */}
      </div>
    </div>
  );
} 