import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "@tanstack/react-router";
import { ChevronDown, MenuIcon } from "lucide-react";

interface Items {
  title: string;
  url?: string;
  icon: React.ReactNode;
  children?: Items[];
}

interface Props {
  sidebaritems: Items[];
}

export function AppSidebar({ sidebaritems }: Props) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-primary-60 shadow-2xl transition-[width] duration-100"
    >
      <SidebarHeader>
        <MenuIcon
          onClick={toggleSidebar}
          className="h-7 w-7 mr-2 text-primary cursor-pointer"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="pt-5">
              {sidebaritems.map((item) =>
                item.children ? (
                  <Collapsible key={item.title} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="hover:bg-primary/10 hover:text-primary">
                          {item.icon}
                          <span>{item.title}</span>
                          <ChevronDown className="mr-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  to={child.url}
                                  className="hover:bg-primary/10 hover:text-primary"
                                  activeProps={{
                                    className: "bg-primary/20 text-primary",
                                  }}
                                >
                                  {child.icon}
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="hover:bg-primary/10 hover:text-primary hover:[&_svg]:text-primary">
                      <Link
                        to={item.url}
                        className="transition-colors"
                        activeProps={{
                          className: "bg-primary/20 text-primary [&_svg]:text-primary",
                        }}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}