'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type CapsuleButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  ariaLabel?: string
  className?: string
  disabled?: boolean
}

export function CapsuleButton({
  children,
  onClick,
  href,
  ariaLabel,
  className,
  disabled,
}: CapsuleButtonProps) {
  const classes = cn(
    'h-9 px-4 rounded-full border border-neutral-700/80 bg-muted hover:bg-neutral-800/70 text-neutral-200 text-sm flex items-center gap-2 transition-colors cursor-pointer',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default CapsuleButton


