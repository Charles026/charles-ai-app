'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp, Square } from 'lucide-react'
import { cn } from '@/lib/utils'

type SendStopButtonProps = {
  isLoading: boolean
  canSend: boolean
  onStop: () => void
  className?: string
}

export default function SendStopButton({
  isLoading,
  canSend,
  onStop,
  className,
}: SendStopButtonProps) {
  if (isLoading) {
    return (
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className={cn(
          'ml-auto rounded-full [&_svg]:!size-5 animate-pulse bg-neutral-600 text-neutral-300 hover:!bg-neutral-600/90 border-none',
          className,
        )}
        onClick={onStop}
        aria-label="停止生成"
        title="停止"
      >
        <Square size={20} className="size-5" />
      </Button>
    )
  }

  return (
    <Button
      type="submit"
      size="icon"
      variant="ghost"
      className={cn(
        'ml-auto rounded-full [&_svg]:!size-5 border-none',
        canSend
          ? 'bg-white text-black hover:!bg-white hover:!text-black active:!bg-white active:!text-black'
          : 'bg-neutral-600 text-neutral-300',
        className,
      )}
      disabled={!canSend}
      aria-label="发送"
      title="发送"
    >
      <ArrowUp size={20} className="size-5" />
    </Button>
  )
}


