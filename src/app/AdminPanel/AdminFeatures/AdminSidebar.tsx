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
import { ChevronDown, MenuIcon, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Items {
  title: string;
  url?: string;
  icon?: React.ReactNode;
  children?: Items[];
}

interface Props {
  sidebaritems: Items[];
}

export function AdminSidebar({ sidebaritems }: Props) {
  const { toggleSidebar, openMobile } = useSidebar(); // ← isOpen comes from the provider
  const isMobile = useIsMobile(); // ← true when < 768 px

  const toggleIcon =
    openMobile && isMobile ? (
      <X className="h-7 w-7 text-primary cursor-pointer" />
    ) : (
      <MenuIcon className="h-7 w-7 text-primary cursor-pointer" />
    );
  // const { toggleSidebar } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="md:relative absolute border-primary-60 shadow-2xl transition-[width] duration-100 z-40 "
    >
      <SidebarHeader>
        <span onClick={toggleSidebar}>{toggleIcon}</span>
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
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-primary/10 hover:text-primary hover:[&_svg]:text-primary"
                    >
                      <Link
                        to={item.url}
                        className="transition-colors"
                        activeProps={{
                          className:
                            "bg-primary/20 text-primary [&_svg]:text-primary",
                        }}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
