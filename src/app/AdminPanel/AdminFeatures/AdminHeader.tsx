import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, User } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useLogout } from "../../login/services/useLogout";
import useMe from "../../login/services/useMe";
import UserProfile from "./hooks/UserProfile";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarData } from "@/fixtures/SideBarData.";

interface Props {
  menuBtn?: ReactNode;
}

const findBreadcrumb = (items: any[], pathname: string): any[] => {
  console.log("items", items)
  for (const item of items) {
    if (item.url === pathname) return [item];
    if (item.children) {
      const childMatch = findBreadcrumb(item.children, pathname);
      if (childMatch.length > 0) return [item, ...childMatch];
    }
  }
  return [];
};

const Header = ({ menuBtn }: Props) => {
  const { mutateAsync } = useLogout();
  const { data } = useMe();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location)
  const breadcrumbs = findBreadcrumb(SidebarData, location.pathname);
  console.log("breadcrumbs", breadcrumbs)

  return (
    <div className="w-full">
      <div className="top-0 left-0 right-0 backdrop-blur-sm z-9 pointer-events-none " />
      <header className=" mx-5 my-2 rounded-xl top-0  right-0 z-10 flex h-14 justify-between items-center border px-4 bg-primary-10">
        <div className="flex items-center gap-5 text-primary">
          {menuBtn}
          <span onClick={() => navigate({to: "/"})} className="cursor-pointer">آژانس</span>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">خانه</BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((item, index) => (
                <div key={item.url} className="flex items-center gap-2">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
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
                <DropdownMenuItem
                  className="cursor-pointer gap-2 focus:bg-primary/10"
                  onClick={() => setOpen(true)}
                >
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
      <UserProfile
        title="پروفایل کاربری"
        open={open}
        onOpenChange={() => setOpen(false)}
      />
    </div>
  );
};

export default Header;
