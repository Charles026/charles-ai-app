'use client'

import React from 'react'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-2 flex justify-between items-center z-10 bg-background">
      <div>
        <Link href="/">
          <HomeIcon size={16} />
        </Link>
      </div>
    </header>
  )
}
export default Header