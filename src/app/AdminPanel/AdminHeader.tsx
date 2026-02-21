import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex h-12 justify-between items-center border-b px-4 bg-primary-60">
      <div className="flex items-center gap-5 mr-5 text-white">
          <span>آژانس</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-background">نسترن طالبی</span>
        <Avatar className="h-9 w-9">
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
