import { AppSidebar } from "@/app/AdminPanel/Accommodation/components/AdminSidebar";
import Header from "@/app/AdminPanel/Accommodation/components/AdminHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/admin-panel")({
  component: AdminPanel,
});

function AdminPanel() {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full">
        <Header />
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 pt-14 pl-60">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AdminPanel;
