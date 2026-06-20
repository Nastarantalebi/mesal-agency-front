import { useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import useMe from "@/app/login/services/useMe";
import { useState } from "react";
import { useLogout } from "@/app/login/services/useLogout";

const UserHeader = () => {
  const navigate = useNavigate();
  const { data } = useMe();
  const { mutateAsync } = useLogout();

  return (
    <div className="w-full">
      <header className=" mx-5 my-2 flex h-14 items-center px-4 border-b justify-between">
        <div className="flex items-center text-primary justify-between ">
          <span
            onClick={() => navigate({ to: "/" })}
            className="cursor-pointer"
          >
            <div className="w-15 h-15 flex justify-center items-center">
              <img src="./logo.webp" alt="logo" className="w-fit h-fit " />
            </div>
          </span>
        </div>{" "}
        <div className="flex items-center justify-center cursor-pointer gap-4 mx-2">
          {/* <span className="text-sm font-medium text-background">نسترن طالبی</span> */}

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
                <DropdownMenuItem className="gap-2 focus:bg-transparent">
                  <User className="w-4 h-4" />
                  {data?.mobile}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer gap-2 focus:bg-primary/10"
                  onClick={() => mutateAsync()}
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

export default UserHeader;
