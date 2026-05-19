import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/app/AdminPanel/AdminFeatures/AdminSidebar";
import { SidebarData } from "@/fixtures/SideBarData.";
import MobileAdminSidebar from "@/app/AdminPanel/AdminFeatures/MobileAdminSidebar";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    // <div className="flex-1 flex flex-col">
    //   <Header />
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AdminSidebar sidebaritems={SidebarData} />
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <MobileAdminSidebar/>
            <main className="flex-1 overflow-y-auto p-5">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    // </div>
  );
}
