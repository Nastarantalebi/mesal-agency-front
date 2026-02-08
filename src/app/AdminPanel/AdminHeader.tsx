import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {

  return (
    <header className="fixed top-0 z-10 flex w-full h-12 justify-between items-center border-b px-4 bg-primary-60">
      <div className="flex items-center gap-5 mr-10">
          <span className="text-background">آژانس</span>

      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-background">نسترن طالبی</span>
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
