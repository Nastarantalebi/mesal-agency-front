import { AppSidebar } from "@/components/app-sidebar";
import  Header from "@/components/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin-panel")({
  component: AdminPanel,
});

function AdminPanel() {
  return (
    <>
      <Header />
      <AppSidebar />
      <Outlet />
    </>
  );
}

export default AdminPanel;
