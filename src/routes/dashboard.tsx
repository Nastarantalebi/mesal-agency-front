import Header from "@/app/AdminPanel/AdminHeader";
import { AppSidebar } from "@/app/AdminPanel/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BedSingle, Home, Star } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: "لیست اقامتگاه‌ها",
      url: "/dashboard/accommodation-list" as const,
      icon: <Home />,
    },
    {
      title: "ثبت ویژگی",
      url: "/dashboard/accommodation-features" as const,
      icon: <Star />,
    },
    {
      title: "ثبت نوع تخت",
      url: "/dashboard/accommodation-beds" as const,
      icon: <BedSingle />,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar sidebaritems={items} />

        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
