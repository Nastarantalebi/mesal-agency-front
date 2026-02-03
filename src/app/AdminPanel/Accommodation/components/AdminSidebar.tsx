import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { FilePen, HomeIcon, MenuIcon } from "lucide-react";

// Menu items.
const items = [
  {
    title: "لیست اقامتگاه ها",
    url: "/admin-panel/accommodation-lists",
    icon: <HomeIcon />,
  },
  {
    title: "ثبت اقامتگاه",
    url: "/admin-panel/add-accommodation",
    icon: <FilePen />,
  },
];


export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Sidebar collapsible="icon" className="border-primary-60 shadow-2xl transition-[width] duration-100">
      <SidebarHeader className="bg-primary-60 h-11.75 gap-7">
          <MenuIcon onClick={toggleSidebar} className="h-5 w-5 text-white" />
          {open && <span className="text-background">آژانس</span>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="pt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="
                      transition-colors
                      hover:bg-primary-80/10 hover:!text-primary-80
                      hover:[&_svg]:!text-primary-80
                    "
                  >
                    <Link
                      to={item.url}
                      className="
                        transition-colors
                        hover:bg-primary-60 hover:text-white
                        hover:[&_svg]:text-white"
                      activeProps={{
                        className:
                          "bg-primary-60 text-white [&_svg]:text-white",
                      }}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
