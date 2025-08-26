"use client";

import { cn } from "@/lib/utils";
// icons moved into SendStopButton
import { useRef, useState, useEffect } from "react";
import Textarea from "react-textarea-autosize";
// Button is used inside SendStopButton
import SendStopButton from '@/components/ui/send-stop-button'
import { Message } from "@/src/lib/types";
import { trackChatEvent, trackUserQuery } from "@/lib/analytics";
// import { SuggestedActions } from "@/components/suggested-actions";

interface ChatInputProps {
  chatId: string;
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  messages: Message[] | undefined;
  appendAndTrigger: (message: Message) => Promise<void>;
  onStop: () => void;
}

export function ChatInput({
  // chatId,
  userInput,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
  // appendAndTrigger,
  onStop,
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false); // Composition state
  const [isMultiline, setIsMultiline] = useState(false);

  const handleCompositionStart = () => setIsComposing(true);

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  // 自动聚焦
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 基于 DOM 尺寸检测是否为多行：当视觉行数 >= 2 时即判定
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    const updateMultiline = () => {
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight || '0') || 20;
      const paddingTop = parseFloat(style.paddingTop || '0') || 0;
      const paddingBottom = parseFloat(style.paddingBottom || '0') || 0;
      const contentHeight = el.scrollHeight - paddingTop - paddingBottom;
      const approxLines = Math.max(1, Math.ceil(contentHeight / lineHeight));
      const isMulti = approxLines >= 2;
      if (isMulti !== isMultiline) {
        setIsMultiline(isMulti);
      }
    };

    // 初始与输入变化后下一帧测量
    const raf = requestAnimationFrame(updateMultiline);

    // 当元素尺寸变化（包括换行导致高度变化）时更新
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateMultiline) : null;
    ro?.observe(el);

    // 视口尺寸变化时也更新（影响换行）
    window.addEventListener('resize', updateMultiline);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener('resize', updateMultiline);
    };
  // 注意：有意不把 isMultiline 放入依赖，避免临界抖动；
  // 通过内部比较确保仅在实际变化时 setState。
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);

  return (
    <div>
              <form
        onSubmit={(e) => {
          // 追踪发送消息事件
          if (userInput.trim().length > 0) {
            // 追踪基础聊天事件
            trackChatEvent('message_sent', {
              messageLength: userInput.length,
              messageCount: messages?.length || 0,
              query: userInput.trim()
            });
            
            // 专门追踪用户 query
            trackUserQuery(userInput.trim(), 'chat_input');
          }
          handleSubmit(e);
        }}
        className={cn(
          "max-w-3xl w-full mx-auto",
          messages !== undefined && messages.length > 0 ? "px-0 py-4" : "px-0"
        )}
      >
        {/* {messages === undefined ||
          (messages.length === 0 && (
            <div className="mb-6">
              <SuggestedActions appendAndTrigger={appendAndTrigger} chatId={chatId} />
            </div>
          ))} */}
        <div className={cn(
          "group relative flex w-full gap-2 rounded-[28px] pr-3 pl-4 py-2 min-h-14 bg-muted backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/15 focus-within:ring-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-colors",
          isMultiline ? "flex-col items-stretch" : "flex-row items-center"
        )}>
          <Textarea
            ref={inputRef}
            name="input"
            minRows={1}
            maxRows={8}
            tabIndex={0}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder="试试问关于传林的问题..."
            spellCheck={false}
            value={userInput}
            className="resize-none w-full min-h-0 max-h-[160px] overflow-y-auto bg-transparent border-0 px-0 py-2 text-[15px] leading-6 text-foreground placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              handleInputChange(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.altKey) {
                  // Alt+Enter: 换行
                  return; // 让默认行为处理换行
                } else {
                  // Enter: 发送消息
                  if (isComposing) {
                    return; // 输入法组合状态下不处理
                  }
                  if (userInput.trim().length === 0) {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault();
                  const textarea = e.target as HTMLTextAreaElement;
                  textarea.form?.requestSubmit();
                }
              }
            }}
          />

          {isMultiline ? (
            <div className="flex justify-end pt-1 w-full">
              <SendStopButton
                isLoading={isLoading}
                canSend={userInput.length > 0 && !isLoading}
                onStop={() => {
                  trackChatEvent('generation_stopped', {
                    messageCount: messages?.length || 0
                  });
                  onStop();
                }}
              />
            </div>
          ) : (
            <SendStopButton
              isLoading={isLoading}
              canSend={userInput.length > 0 && !isLoading}
              onStop={() => {
                trackChatEvent('generation_stopped', {
                  messageCount: messages?.length || 0
                });
                onStop();
              }}
              className="ml-auto"
            />
          )}
        </div>
      </form>
    </div>
  );
}