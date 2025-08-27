import type { Message } from "@/lib/types";
import { generateUUID } from "@/lib/utils";

// 全局停止控制器
let globalAbortController: AbortController | null = null;
let globalStopFlag = false;

// Typing speed control (delay between visible updates)
let STREAM_DELAY_MS = 80; // slower by default
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export function setTypingSpeedMs(ms: number) {
  if (Number.isFinite(ms) && ms >= 0) STREAM_DELAY_MS = ms;
}

export const stopStreamChat = () => {
  // console.log('🛑 Stopping stream chat...');
  globalStopFlag = true;
  if (globalAbortController) {
    globalAbortController.abort();
  }
};

export const streamChat = async ({
  setIsLoading,
  append,
  update,
  messages,
}: {
  setIsLoading: (isLoading: boolean) => void;
  append: (message: Message) => void;
  update: (id: string, content: string, isStreaming: boolean) => void;
  messages: Message[];
}) => {
  // 重置停止标志
  globalStopFlag = false;
  
  try {
    console.log('🚀 Starting stream chat with messages:', messages);
    setIsLoading(true);
    
    // 创建新的 AbortController
    globalAbortController = new AbortController();
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }), // 传递历史消息数组
      signal: globalAbortController.signal,
    });

    console.log('📡 API Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      // console.error('❌ API Error:', response.status, response.statusText, errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    if (!response.body) {
      // console.error('❌ Response body is empty');
      throw new Error("Response body is empty");
    }

    const assistantId = generateUUID();
    console.log('🤖 Creating assistant message with ID:', assistantId);
    append({ id: assistantId, role: 'assistant', content: '' });

    // Manually read the stream
    const cloneForText = response.clone();
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';
    // const displayContent = '';
    let accumulatedText = '';

    console.log('📖 Starting to read stream...');

    try {
      while (true) {
        // 检查停止标志
        if (globalStopFlag) {
          console.log('🛑 Stream stopped by user');
          break;
        }

        const { done, value } = await reader.read();
        if (done) {
          console.log('✅ Stream reading completed');
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        console.log('📦 Raw chunk received:', JSON.stringify(chunk));
        accumulatedText += chunk;
        
        // Process lines while preserving newlines
        const lines = accumulatedText.split('\n');
        accumulatedText = lines.pop() || '';
        console.log('📋 Lines to process:', lines);

        for (const line of lines) {
          console.log('📄 Processing line:', JSON.stringify(line));
          if (line.trim()) {
            // Handle different stream formats
            if (line.startsWith('0:')) {
              try {
                const textPart = JSON.parse(line.substring(2));
                if (typeof textPart === 'string') {
                  fullContent += textPart;
                  console.log('📝 Received text chunk:', textPart, 'Full so far:', fullContent);
                  // Update display in real-time for smoother streaming
                  update(assistantId, fullContent.trim(), true);
                  if (STREAM_DELAY_MS > 0) await sleep(STREAM_DELAY_MS);
                }
              } catch {
                // console.warn('⚠️ Failed to parse stream chunk:', line);
              }
            } else if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.substring(6));
                if (data.choices?.[0]?.delta?.content) {
                  fullContent += data.choices[0].delta.content;
                  update(assistantId, fullContent.trim(), true);
                  if (STREAM_DELAY_MS > 0) await sleep(STREAM_DELAY_MS);
                }
              } catch {
                // console.warn('⚠️ Failed to parse data chunk:', line);
              }
            }
          }
        }
      }
      // Process leftover (no trailing new line case)
      if (accumulatedText && accumulatedText.trim()) {
        const line = accumulatedText.trim();
        try {
          if (line.startsWith('0:')) {
            const textPart = JSON.parse(line.substring(2));
            if (typeof textPart === 'string') {
              fullContent += textPart;
              update(assistantId, fullContent.trim(), true);
              if (STREAM_DELAY_MS > 0) await sleep(STREAM_DELAY_MS);
            }
          } else if (line.startsWith('data: ')) {
            const data = JSON.parse(line.substring(6));
            const delta = data?.choices?.[0]?.delta?.content;
            if (delta) {
              fullContent += delta;
              update(assistantId, fullContent.trim(), true);
              if (STREAM_DELAY_MS > 0) await sleep(STREAM_DELAY_MS);
            } else {
              fullContent += line.replace(/^data:\s*/, '');
              update(assistantId, fullContent.trim(), true);
              if (STREAM_DELAY_MS > 0) await sleep(STREAM_DELAY_MS);
            }
          } else {
            fullContent += line;
            update(assistantId, fullContent.trim(), true);
            if (STREAM_DELAY_MS > 0) await sleep(STREAM_DELAY_MS);
          }
        } catch {
          fullContent += line;
          update(assistantId, fullContent.trim(), true);
          if (STREAM_DELAY_MS > 0) await sleep(STREAM_DELAY_MS);
        }
      }
    } finally {
      reader.releaseLock();
    }

    // 如果被停止，直接返回当前内容
    if (globalStopFlag) {
      fullContent = fullContent.trim();
      update(assistantId, fullContent, false);
      return;
    }

    // Final update without streaming indicator; if empty, try text() fallback
    fullContent = fullContent.trim();
    if (!fullContent) {
      try {
        const fallbackText = (await cloneForText.text()).trim();
        if (fallbackText) {
          fullContent = fallbackText;
        }
      } catch {}
    }
    update(assistantId, fullContent, false);
    
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      // console.log('🛑 Stream aborted by user');
      return;
    }
    
    // console.error('❌ Stream chat error:', error);
    const errorMessage: Message = {
      id: generateUUID(),
      role: "assistant",
      content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
    append(errorMessage);
  } finally {
    setIsLoading(false);
    globalAbortController = null;
    // console.log('🏁 Stream chat process finished');
  }
};