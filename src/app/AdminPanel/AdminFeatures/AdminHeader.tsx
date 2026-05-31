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
import useBreadCrumbTitles from "./stores/useBreadCrumbTitles";

interface Props {
  menuBtn?: ReactNode;
}

const normalizePath = (path: string) => path.replace(/\/+$/, "");

const isNumeric = (seg: string) => /^\d+$/.test(seg);

// مقایسه url منو با مسیر تجمعی؛ سگمنت عددی یا داینامیک به‌عنوان wildcard
const segmentsMatch = (menuUrl: string, accPath: string) => {
  const menuSegs = normalizePath(menuUrl).split("/").filter(Boolean);
  const pathSegs = normalizePath(accPath).split("/").filter(Boolean);
  if (menuSegs.length !== pathSegs.length) return false;
  return menuSegs.every((seg, i) => {
    const dynamic =
      seg.startsWith(":") || (seg.startsWith("[") && seg.endsWith("]"));
    return dynamic || isNumeric(pathSegs[i]) || seg === pathSegs[i];
  });
};

const findMenuItem = (items: any[], accPath: string): any | undefined => {
  for (const item of items) {
    if (item.url && segmentsMatch(item.url, accPath)) return item;
    if (item.children) {
      const found = findMenuItem(item.children, accPath);
      if (found) return found;
    }
  }
  return undefined;
};

const buildBreadcrumbs = (
  pathname: string,
  items: any[],
  breadCrumbTitle: string[]
) => {
  const segments = normalizePath(pathname).split("/").filter(Boolean);
  const crumbs: { title: string; url: string }[] = [];
  let acc = "";
  let dynamicIndex = 0;

  for (const segment of segments) {
    acc += "/" + segment;
    if (isNumeric(segment)) {
      const title = breadCrumbTitle[dynamicIndex] ?? segment;
      dynamicIndex++;
      crumbs.push({ title, url: acc });
    } else {
      const item = findMenuItem(items, acc);
      if (item?.title) crumbs.push({ title: item.title, url: acc });
    }
  }
  return crumbs;
};


const Header = ({ menuBtn }: Props) => {
  const { mutateAsync } = useLogout();
  const { data } = useMe();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const breadCrumbTitle = useBreadCrumbTitles((state) => state.breadCrumbTitle)
  console.log(breadCrumbTitle)
  console.log("location", location)
  const breadcrumbs = buildBreadcrumbs(location.pathname, SidebarData, breadCrumbTitle);
  console.log("breadcrumbs", breadcrumbs)

  return (
    <div className="w-full">
      <div className="top-0 left-0 right-0 backdrop-blur-sm z-9 pointer-events-none " />
      <header className=" mx-5 my-2 rounded-xl top-0  right-0 z-10 flex h-14 justify-between items-center border px-4 bg-primary-10">
        <div className="flex items-center gap-5 text-primary">
          {menuBtn}
          <img src="/logo.webp" alt="agencyLogo" onClick={() => navigate({to: "/"})} className="w-10 h-10"/>
          {/* <span onClick={() => navigate({to: "/"})} className="cursor-pointer">آژانس</span> */}
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
