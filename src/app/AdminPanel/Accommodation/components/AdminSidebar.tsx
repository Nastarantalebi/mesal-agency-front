import { FilePen, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

// Menu items.
const items = [
  {
    title: "لیست اقامتگاه ها",
    url: "/admin-panel/accommodation-lists",
    icon: Home,
  },
  {
    title: "ثبت اقامتگاه",
    url: "/admin-panel/add-accommodation",
    icon: FilePen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-52">
      <SidebarContent>
        <SidebarHeader>
          <SidebarGroupLabel className="bg-red">
            فهرست اقامتگاه ها
          </SidebarGroupLabel>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
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
