import React from 'react';

interface ChatHeaderProps {
  className?: string;
  title?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ className = "", title }) => {
  return (
    <div className={`sticky top-0 z-20 bg-background backdrop-blur-sm pr-4 py-3 mb-4 md:pl-4 pl-16 ${className}`}>
      <div className="flex flex-col items-start text-center">
        <h1 className="text-sm font-semibold text-foreground">{title || "临时对话"}</h1>
        <p className="text-[12px] text-muted-foreground">内容由 AI 生成</p>
      </div>
    </div>
  );
};

export default ChatHeader; 