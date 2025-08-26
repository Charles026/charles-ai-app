'use client'

import dynamic from 'next/dynamic'
import type { Message } from '@/src/lib/types'

const Chat = dynamic(() => import('@/components/ui/chat').then(m => m.Chat), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-sm text-neutral-400">正在加载...</div>
    </div>
  )
})

export function ClientChatShell({ id, initialMessages = [], hideInput = false }: { id: string; initialMessages?: Message[]; hideInput?: boolean }) {
  return <Chat id={id} initialMessages={initialMessages} hideInput={hideInput} />
}


