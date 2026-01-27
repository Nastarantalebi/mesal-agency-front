import { AppSidebar } from "@/app/AdminPanel/Accommodation/components/AdminSidebar";
import Header from "@/app/AdminPanel/Accommodation/components/AdminHeader";
import CustomInput from "@/components/form/CustomCombobox";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/admin-panel")({
  component: AdminPanel,
});

function AdminPanel() {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <div className="pt-14">
          <Outlet />
        </div>
      </SidebarProvider>
      {/* <CustoCombobox></CustoCombobox> */}
    </>
  );
}

export default AdminPanel;
