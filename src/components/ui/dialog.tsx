"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

// Hook to handle mobile keyboard visibility
function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      // 检测是否为移动设备
      const isMobile = window.innerWidth < 768
      if (!isMobile) return

      // 计算键盘高度 (视口高度变化)
      const initialViewportHeight = window.visualViewport?.height || window.innerHeight
      const currentViewportHeight = window.visualViewport?.height || window.innerHeight
      const screenHeight = window.screen.height
      
      // 如果视口高度明显小于屏幕高度，说明键盘弹出了
      const keyboardVisible = screenHeight - currentViewportHeight > 150
      setKeyboardHeight(keyboardVisible ? screenHeight - currentViewportHeight : 0)
    }

    // 监听视口变化
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
      return () => window.visualViewport?.removeEventListener('resize', handleResize)
    } else {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return keyboardHeight
}

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}


function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/20 backdrop-blur-2xl",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  const keyboardHeight = useKeyboardHeight()
  
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-neutral-800/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 flex flex-col w-[calc(100%-1rem)] h-[calc(100svh-2rem)] max-h-[calc(100svh-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-2xl border-0 shadow-lg duration-200 sm:w-[calc(100%-4rem)] sm:max-w-[680px] md:h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4rem)] overflow-hidden backdrop-blur-lg transition-all",
          className
        )}
        style={{
          // 当键盘弹出时，动态调整弹窗位置和高度
          ...(keyboardHeight > 0 && {
            transform: `translate(-50%, calc(-50% - ${keyboardHeight / 4}px))`,
            height: `calc(100svh - 2rem - ${keyboardHeight}px)`,
            maxHeight: `calc(100svh - 2rem - ${keyboardHeight}px)`,
          })
        }}
        {...props}
      >
        {/* 隐藏的可访问标题，满足 Radix 的无障碍要求 */}
        <DialogPrimitive.Title className="sr-only">AI 对话</DialogPrimitive.Title>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden ">
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
}
