"use client";

import { ChatInput } from "@/components/chat-input";
import { Message } from "@/src/lib/types";
import { generateUUID } from "@/lib/utils";
import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { streamChat, stopStreamChat } from "@/lib/clients/streamChatClient";
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { trackPageEvent } from "@/lib/analytics";

// ChatHeader 作为固定资源，非懒加载
import ChatHeader from "@/components/chat-header";

// 懒加载 ChatMessage 组件
const ChatMessage = dynamic(() => import("@/components/chat-message"), {
  loading: () => (
    <div className="flex justify-center items-center py-8">
      <Spinner />
    </div>
  )
});

import { MessageCirclePlus } from 'lucide-react';
import CapsuleButton from '@/components/ui/capsule-button'

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

export function Chat({ id, initialMessages = [], hideInput = false }: { id: string; initialMessages?: Message[]; hideInput?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const initialInput = "";
  const [inputContent, setInputContent] = useState<string>(initialInput);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [hasGeneratedChatId, setHasGeneratedChatId] = useState<boolean>(false);
  const [isContentLoading, setIsContentLoading] = useState<boolean>(true);

  

  // 页面访问埋点
  useEffect(() => {
    if (pathname === '/') {
      trackPageEvent('chat_home_view', 'main')
    } else if (pathname.startsWith('/chat/')) {
      trackPageEvent('chat_session_view', id)
    }
  }, [pathname, id])

  // 模拟内容加载延迟
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentLoading(false);
    }, 800); // 800ms 延迟模拟懒加载
    
    return () => clearTimeout(timer);
  }, [pathname]);

  

  const append = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const update = useCallback((id: string, content: string, isStreaming = false) => {
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

  // 路由变化时重置所有状态（新话题）
  useEffect(() => {
    if (pathname === "/") {
      setInputContent(initialInput);
      setIsLoading(false);
      setMessages([]);
      setHasGeneratedChatId(false);
      setIsContentLoading(false); // 首页不需要加载状态
    } else if (pathname.startsWith("/chat/")) {
      setIsContentLoading(true);
      const initial = sessionStorage.getItem("initialMessage");
      if (initial) {
        const msg = JSON.parse(initial);
        setMessages([msg]);
        sessionStorage.removeItem("initialMessage");
        // 自动触发 AI 回复
        streamChat({
          setIsLoading,
          append,
          update,
          messages: [msg],
        });
      }
    } else {
      // 对于 history 页面，显示加载状态
      setIsContentLoading(true);
    }
  }, [pathname, append, update, setIsLoading]);

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
      
      // 只在根路径且第一次发消息时才生成新的 chatId 并跳转
      if (pathname === "/" && messages.length === 0 && !hasGeneratedChatId) {
        // redirecting
        const newId = generateUUID();
        setHasGeneratedChatId(true);
        // 保存初始消息到 sessionStorage
        sessionStorage.setItem("initialMessage", JSON.stringify(newMessage));
        router.replace(`/chat/${newId}`);
        return; // 跳转后不再继续
      }

      // 先添加消息到状态
      append(newMessage);
      setInputContent("");
      // 发送到 AI
      await streamChat({ setIsLoading, append, update, messages: [...messages, newMessage] });
    },
    [inputContent, setInputContent, setIsLoading, append, update, messages, hasGeneratedChatId, router, pathname]
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

      if (pathname === '/' && messages.length === 0 && !hasGeneratedChatId) {
        const newId = generateUUID();
        setHasGeneratedChatId(true);
        sessionStorage.setItem('initialMessage', JSON.stringify(newMessage));
        router.replace(`/chat/${newId}`);
        return;
      }

      append(newMessage);
      await streamChat({ setIsLoading, append, update, messages: [...messages, newMessage] });
    },
    [pathname, messages, hasGeneratedChatId, append, update, setIsLoading, router]
  );

  return (
    <div className="flex flex-col h-[100dvh] ">
      
      {/* ChatHeader 始终显示，作为固定资源 */}
      {pathname !== "/" && <ChatHeader title={getTitleFromChatId(id)} />}
      
      {/* 有消息时的布局 */}
      {messages.length > 0 && (
        <>
          <div className="flex-1 overflow-hidden w-full flex justify-center px-5">
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
          {!hideInput && (
            <motion.div
              key={messages.length > 0 ? 'has-messages' : 'no-messages'}
              layout
              initial={{ y: -12, opacity: 0.9  }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.6 }}
              className="flex-shrink-0 w-full flex justify-center px-5"
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
          )}
          {hideInput && (
            <div className="w-full flex justify-center py-4 border-t border-neutral-800 px-5">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 flex items-center gap-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 cursor-pointer"
              >
                <MessageCirclePlus className="w-4 h-4" />
                开启新对话
              </button>
            </div>
          )}
        </>
      )}
      
      {/* 没有消息时的布局 */}
      {messages.length === 0 && pathname === "/" && (
        <div className="flex flex-col justify-center items-center h-full px-5">
          <div className="w-full" style={{ maxWidth: 700 }}>
            {/* 问候语 */}
            <div className="text-center" style={{ marginBottom: '32px' }}>
              <h1 className="text-3xl font-medium text-white">Hi，祝你今天愉快</h1>
            </div>
            {/* 输入框 */}
            {!hideInput && (
              <div className="w-full flex justify-center">
              <motion.div
                className="w-full"
                style={{ maxWidth: 700 }}
              >
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
              </div>
            )}
            {hideInput && (
              <div className="w-full flex justify-center py-4">
                <button
                  onClick={() => router.push('/')}
                  className="px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 cursor-pointer"
                >
                  开启新对话
                </button>
              </div>
            )}

            {/* 胶囊按钮模块 */}
            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <CapsuleButton onClick={() => handlePresetPrompt('陈传林是谁')} ariaLabel="ask-who-is-chen-chuanlin">
                  <span>陈传林是谁</span>
                </CapsuleButton>
                <CapsuleButton href="/wps-lingxi" ariaLabel="goto-wps-lingxi">
                  <span>WPS 灵犀</span>
                </CapsuleButton>
                <CapsuleButton href="/kingsoft-design-system" ariaLabel="goto-kingsoft-design-system">
                  <span>Design System</span>
                </CapsuleButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History 页面的加载状态 */}
      {messages.length === 0 && pathname !== "/" && isContentLoading && (
        <div className="flex-1 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}