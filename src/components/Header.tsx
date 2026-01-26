import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

const Header = () => {
  return (
    <header className="flex h-14 items-center border-b px-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        <span className="text-sm font-medium">User</span>
      </div>
    </header>
  )
}

export default Header
