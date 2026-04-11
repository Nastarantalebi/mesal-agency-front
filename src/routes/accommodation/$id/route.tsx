import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/app/AdminPanel/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { sidebarItems } from "@/fixtures/sideBarData";
import MobileAdminSidebar from "@/app/AdminPanel/mobileAdminSidebar";

export const Route = createFileRoute("/accommodation/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar sidebaritems={sidebarItems(id)} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <MobileAdminSidebar id={id}/>
          <main className="flex-1 overflow-y-auto p-5">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
