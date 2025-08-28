"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "./markdown-renderer";
import { Message } from "@/lib/types";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { trackUserEvent } from "@/lib/analytics";

interface ChatMessageProps {
  messages: Message[] | undefined;
  isLoading: boolean;
}

export default function ChatMessage({ messages, isLoading }: ChatMessageProps) {
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const handleScroll = () => {
    // 尝试使用父级滚动容器
    const el = containerRef.current ?? document.getElementById('chat-scroll');
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollToBottom(!isNearBottom);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages === undefined || messages.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <div
        ref={(node) => {
          containerRef.current = node;
        }}
        className="w-full overflow-x-hidden"
        onScroll={handleScroll}
      >
        <div className="w-full flex flex-col min-h-full justify-start  ">
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col gap-2 py-4",
                  message.role === "user" ? "items-end" : "items-start"
                )}
              >
                <div className="flex gap-3 items-center">
                  {message.role === "user" && (
                    <div className="flex items-end w-full gap-3">
                      <div className="bg-accent px-5 py-3 rounded-3xl w-full max-w-[600px] overflow-x-auto">
                        {/* 只显示纯文本，不渲染markdown */}
                        <span className="text-md">{message.content}</span>
                      </div>
                    </div>
                  )}

                  {message.role === "assistant" && (
                    <div className="flex flex-col gap-2">
                      <div className="p-3 rounded-md overflow-x-auto relative">
                        <MarkdownRenderer 
                          content={message.content || ""}
                          className="text-md"
                        />
                      </div>
                      {message.card && (
                        <>
                          {(message.card.duration || message.card.sources || message.card.searches) && (
                            <div className="text-[12px] text-[#AAAAAA] mb-2 px-3">
                              {`研究耗时 ${message.card.duration ?? '-'} · ${message.card.sources ?? 0} 个来源 · ${message.card.searches ?? 0} 次搜索`}
                            </div>
                          )}
                          <div className="px-3">
                            <a
                              href={message.card.href ?? '#'}
                              {...(message.card.href ? { 'data-clickable': true } : { 'aria-disabled': true })}
                              className={`block ${message.card.href ? 'cursor-pointer' : 'cursor-default'}`}
                              onClick={() => {
                                if (message.card?.href) {
                                  // 从href中提取页面名称进行埋点追踪
                                  const pageName = message.card.href.split('/').pop() || 'unknown'
                                  trackUserEvent('report_card_clicked', pageName)
                                }
                              }}
                            >
                              <div className="bg-[#1d1d1d] rounded-[20px] p-4 sm:p-5 flex flex-col w-full max-w-[480px] min-h-[100px] overflow-hidden relative sm:w-full hover:bg-[#292929] transition-colors">
                                <div className="flex-1">
                                  <div className="text-[16px] sm:text-[18px] text-white leading-tight max-sm:max-w-[340px]  max-sm:truncate  sm:text-nowrap ">
                                    {message.card.title}
                                    </div>
                                </div>
                                {message.card.description && (
                                  <div className="text-[12px] sm:text-[14px] text-[#CCCCCC] mt-2 leading-relaxed ">{message.card.description}</div>
                                )}
                                {(message.card.imageSrc || message.card.image) && (
                                  <div className="mt-3 relative w-full aspect-[2/1] rounded-[12px] overflow-hidden hover:cursor-pointer">
                                    <Image src={(message.card.imageSrc || message.card.image) as string} alt={message.card.imageAlt || 'card-illustration'} fill className="object-cover hover:scale-105 transition-all duration-300" />
                                  </div>
                                )}
                                
                              </div>
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex pl-4 pb-4 gap-2 items-center">
              <div className="bg-accent p-3 rounded-md max-w-xs sm:max-w-2xl overflow-x-auto">
                <div className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-slate-300"></span>
                  <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_0.5s_ease-in-out_infinite] dark:bg-slate-300"></span>
                  <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-slate-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="anchor" ref={bottomRef} className="my-4"></div>
      </div>

      {/* 回到底部按钮 */}
      <AnimatePresence>
        {showScrollToBottom && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.3 
            }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
          >
            <Button
              onClick={scrollToBottom}
              className="rounded-full w-10 h-10 bg-neutral-700 hover:bg-neutral-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              size="icon"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}