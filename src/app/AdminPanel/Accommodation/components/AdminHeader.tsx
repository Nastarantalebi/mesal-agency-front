import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = () => {
  return (
    <header className="flex h-12 justify-end items-center border-b px-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Nastaran Talebi</span>
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>

      </div>
    </header>
  )
}

export default Header
