import { AppSidebar } from "@/app/AdminPanel/Accommodation/components/AdminSidebar";
import Header from "@/app/AdminPanel/Accommodation/components/AdminHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/admin-panel")({
  component: AdminPanel,
});

function AdminPanel() {
  return (
    <div className="min-h-screen w-screen! overflow-x-hidden">
      <Header />
      <SidebarProvider>
        <div className="flex">
          <AppSidebar />
          <SidebarInset>
            <main className="pt-30">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default AdminPanel;
