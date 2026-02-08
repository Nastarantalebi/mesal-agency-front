import Header from "@/app/AdminPanel/AdminHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin-panel")({
  component: AdminPanel,
});




function AdminPanel() {
  return (
    <div className="min-h-screen w-screen! overflow-x-hidden">
      <Header />
      <Outlet />
    </div>
  );
}

export default AdminPanel;
