import React from 'react';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  className?: string;
  title?: string;
  onClose?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ className = "", title, onClose }) => {
  return (
    <div className={`top-0 z-20 px-4 py-3 mb-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-foreground">{title || "AI 临时对话"}</h1>
        </div>
        <button
          onClick={onClose}
          className="rounded-full w-8 h-8 inline-flex items-center justify-center bg-neutral-700/50 hover:bg-neutral-600/50 transition-colors"
        >
          <X className="w-5 h-5 text-neutral-200" />
          <span className="sr-only">关闭对话</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader; 