import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Menu, User} from "lucide-react";
import type { TAccommodationResponse } from "./Accommodation/types";
import { useSidebar } from "@/components/ui/sidebar";

interface Props {
  AccommodationData?: TAccommodationResponse;
  
}

const Header = ({
  AccommodationData,
}: Props) => {
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar()
  return (
    <div className="w-full">
      <div className="top-0 left-0 right-0 backdrop-blur-sm z-9 pointer-events-none " />
      <header className=" mx-5 my-2 rounded-xl top-0  right-0 z-10 flex h-14 justify-between items-center border px-4 bg-primary-10">
        <div className="flex items-center gap-5 text-primary">
          <button className="md:hidden" onClick={() => setOpenMobile(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <span>آژانس</span>
          <span>
            {AccommodationData?.type.name} {AccommodationData?.name}
          </span>
        </div>
        <div className="flex items-center justify-center cursor-pointer gap-4 mx-2">
          {/* <span className="text-sm font-medium text-background">نسترن طالبی</span> */}
          <Bell className="text-primary w-4.5 h-4.5" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarFallback>
                  <User className="text-primary" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="items-end">
              <div dir="rtl">
                <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-primary/10">
                  <User className="w-4 h-4" />
                  نسترن طالبی
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer gap-2 focus:bg-primary/10"
                  onClick={() => navigate({ to: "/" })}
                >
                  <LogOut className="w-4 h-4" />
                  خروج
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Header;
