import Header from "@/app/AdminPanel/AdminHeader";
import { AppSidebar } from "@/app/AdminPanel/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BedSingle, CalendarDays, Home, List, Star } from "lucide-react";

export const Route = createFileRoute("/accommodation")({
  component: RouteComponent,
});


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
