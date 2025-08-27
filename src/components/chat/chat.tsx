"use client";

import { ChatInput } from "./chat-input";
import { Message } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { streamChat, stopStreamChat, setTypingSpeedMs } from "@/lib/clients/streamChatClient";
import { Spinner } from "./spinner";
import { trackPageEvent } from "@/lib/analytics";

// ChatHeader 作为固定资源，非懒加载
import ChatHeader from "./chat-header";

// 懒加载 ChatMessage 组件
const ChatMessage = dynamic(() => import("./chat-message"), {
  loading: () => (
    <div className="flex justify-center items-center py-8">
      <Spinner />
    </div>
  )
});

import { MessageCirclePlus } from 'lucide-react';
import CapsuleButton from './capsule-button'

// 在其他 import 后添加辅助函数
function getTitleFromChatId(id: string): string | undefined {
  // 允许英文、中文、连字符和空格，且不含数字
  const valid = /^[a-zA-Z\u4e00-\u9fa5\s-]+$/.test(id) && !/\d/.test(id);
  if (!valid) return undefined;
  // 将连字符替换为空格并首字母大写（简单处理）
  return id
    .replace(/-/g, " ")
    .replace(/\b([a-z])/g, (match) => match.toUpperCase());
}

export function Chat({ id, initialMessages = [], hideInput = false, onClose }: { id: string; initialMessages?: Message[]; hideInput?: boolean; onClose?: () => void }) {
  const initialInput = "";
  const [inputContent, setInputContent] = useState<string>(initialInput);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isContentLoading] = useState<boolean>(false);

  // Set slower typing speed on mount
  useEffect(() => {
    setTypingSpeedMs(80); // 80ms per update for faster reading
  }, []);

  // 页面访问埋点
  useEffect(() => {
    trackPageEvent('chat_modal_view', id)
  }, [id])

  const append = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const update = useCallback((id: string, content: string, isStreaming: boolean = false) => {
    setMessages(prev => prev.map(msg =>
      msg.id === id
        ? { 
            ...msg, 
            content: isStreaming ? content + '▊' : content,
            parts: [{ type: 'text', text: isStreaming ? content + '▊' : content }] 
          }
        : msg
    ));
  }, []);

  // 组件挂载时从 sessionStorage 中加载历史消息
  useEffect(() => {
    const savedMessages = sessionStorage.getItem(`chat-${id}`);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Failed to parse saved messages:', error);
      }
    }
  }, [id]);

  // 当消息列表变化时，自动保存到 sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(`chat-${id}`, JSON.stringify(messages));
    }
  }, [messages, id]);

  const appendAndTrigger = useCallback(
    async (message: Message) => {
      append(message);
      return await streamChat({ setIsLoading, append, update, messages: [...messages, message] });
    },
    [setIsLoading, append, update, messages]
  );

  const handleSubmit = useCallback(
    async (event?: { preventDefault?: () => void }) => {
      event?.preventDefault?.();
      if (!inputContent) return;

      const newMessage: Message = {
        id: generateUUID(),
        content: inputContent,
        role: "user",
      };
      
      // 先添加消息到状态
      append(newMessage);
      setInputContent("");
      // 发送到 AI
      await streamChat({ setIsLoading, append, update, messages: [...messages, newMessage] });
    },
    [inputContent, setInputContent, setIsLoading, append, update, messages]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  // 预设问题触发器：用于一键提问“陈传林是谁”
  const handlePresetPrompt = useCallback(
    async (text: string) => {
      const newMessage: Message = {
        id: generateUUID(),
        content: text,
        role: 'user',
      };

      append(newMessage);
      await streamChat({ setIsLoading, append, update, messages: [...messages, newMessage] });
    },
    [messages, append, update, setIsLoading]
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {/* ChatHeader 固定在顶部 */}
      <div className="flex-shrink-0">
        <ChatHeader 
          title={getTitleFromChatId(id)}
          onClose={onClose}
        />
      </div>
      
      {/* 有消息时的布局 */}
      {messages.length > 0 && (
        <>
          {/* 消息滚动区域（性能优化：GPU 合成 + 惯性滚动 + 稳定滚动条） */}
          <div
            id="chat-scroll"
            className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain transform-gpu"
            style={{ WebkitOverflowScrolling: 'touch', backfaceVisibility: 'hidden', willChange: 'transform', scrollbarGutter: 'stable', touchAction: 'pan-y' }}
          >
            <div className="w-full flex justify-center px-5">
              <div className="w-full" style={{ maxWidth: 700 }}>
                {isContentLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Spinner />
                  </div>
                ) : (
                  <ChatMessage isLoading={isLoading} messages={messages} />
                )}
              </div>
            </div>
            {hideInput && (
              <div className="w-full flex justify-center py-4 border-t border-neutral-800 px-5">
                <button
                  onClick={() => {
                    setMessages([]);
                    sessionStorage.removeItem(`chat-${id}`);
                  }}
                  className="px-4 py-2 flex items-center gap-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 cursor-pointer"
                >
                  <MessageCirclePlus className="w-4 h-4" />
                  开启新对话
                </button>
              </div>
            )}
          </div>
          
          {/* 输入框固定在底部 */}
          {!hideInput && (
            <div className="flex-shrink-0">
              <motion.div
                key={messages.length > 0 ? 'has-messages' : 'no-messages'}
                layout
                initial={{ y: -12, opacity: 0.9  }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.6 }}
                className="w-full flex justify-center px-5 py-4"
              >
                <motion.div layout className="w-full" style={{ maxWidth: 700 }}>
                  <ChatInput
                    chatId={id}
                    userInput={inputContent}
                    handleInputChange={handleInputChange}
                    handleSubmit={onSubmit}
                    isLoading={isLoading}
                    messages={messages}
                    appendAndTrigger={appendAndTrigger}
                    onStop={stopStreamChat}
                  />
                </motion.div>
              </motion.div>
            </div>
          )}
        </>
      )}
      
      {/* 没有消息时的布局 */}
      {messages.length === 0 && (
        <>
          {/* 主要内容区域 */}
          <div className="flex-1 flex flex-col justify-center items-center px-5">
            <div className="w-full" style={{ maxWidth: 700 }}>
              {/* 问候语 */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-medium text-white">Hi，祝你今天愉快</h1>
              </div>
            </div>
          </div>

          {/* 胶囊按钮模块 - 紧贴输入框 */}
          <div className="flex-shrink-0 w-full flex justify-center px-5 pb-2">
            <div className="w-full flex flex-row gap-3 justify-center" style={{ maxWidth: 600 }}>
              <CapsuleButton onClick={() => handlePresetPrompt('传林是谁')} ariaLabel="ask-who-is-chen-chuanlin">
                <span>传林是谁</span>
              </CapsuleButton>
              <CapsuleButton onClick={() => handlePresetPrompt('传林做了什么')} ariaLabel="ask-what-chen-chuanlin-did">
                <span>传林做了什么</span>
              </CapsuleButton>
            </div>
          </div>

          {hideInput && (
            <div className="w-full flex justify-center py-4 mt-8">
              <button
                onClick={() => {
                  setMessages([]);
                  sessionStorage.removeItem(`chat-${id}`);
                }}
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 cursor-pointer"
              >
                开启新对话
              </button>
            </div>
          )}

          {/* 输入框固定在底部 */}
          {!hideInput && (
            <div className="flex-shrink-0 ">
              <motion.div
                className="w-full flex justify-center px-5 py-4"
              >
                <motion.div className="w-full" style={{ maxWidth: 600 }}>
                  <ChatInput
                    chatId={id}
                    userInput={inputContent}
                    handleInputChange={handleInputChange}
                    handleSubmit={onSubmit}
                    isLoading={isLoading}
                    messages={messages}
                    appendAndTrigger={appendAndTrigger}
                    onStop={stopStreamChat}
                  />
                </motion.div>
              </motion.div>
            </div>
          )}
        </>
      )}

      {/* 加载状态 */}
      {messages.length === 0 && isContentLoading && (
        <div className="flex-1 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}