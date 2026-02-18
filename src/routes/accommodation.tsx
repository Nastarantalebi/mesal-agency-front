import Header from "@/app/AdminPanel/AdminHeader";
import { AppSidebar } from "@/app/AdminPanel/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BedSingle, CalendarDays, Home, List, Star } from "lucide-react";

export const Route = createFileRoute("/accommodation")({
  component: RouteComponent,
});

// const items = [
//   {
//     title: "لیست اقامتگاه‌ها",
//     url: "/dashboard/accommodation-list" as const,
//     icon: <List />,
//   },
//   {
//     title: "ثبت اقامتگاه",
//     url: "/dashboard/accommodation-add" as const,
//     icon: <Home />,
//   },
//   {
//     title: "ثبت ویژگی",
//     url: "/dashboard/accommodation-features" as const,
//     icon: <Star />,
//   },
//   {
//     title: "ثبت نوع تخت",
//     url: "/dashboard/accommodation-beds" as const,
//     icon: <BedSingle />,
//   },
//   {
//     title: "انتخاب روز های پیک",
//     url: "/dashboard/peakDate" as const,
//     icon: <CalendarDays />,
//   },
// ];

function RouteComponent() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-y-auto">
      <Header />
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
