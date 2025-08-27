"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ClientChatShell } from "./ClientChatShell";
import { generateUUID } from "@/lib/utils";

export default function ClientChatLauncher({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  // 使用 useRef 确保会话ID在组件生命周期内保持不变
  const chatIdRef = useRef<string>(generateUUID());

  return (
    <>
      <button
        className="flex flex-row items-center gap-2 hover:text-primary cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Open Chatbot"
      >
        {children}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <ClientChatShell id={chatIdRef.current} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
