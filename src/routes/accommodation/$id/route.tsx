import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/app/AdminPanel/AdminHeader";
import { AppSidebar } from "@/app/AdminPanel/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { sidebarItems } from "@/fixtures/sideBarData";
import { useAccommodation } from "@/app/AdminPanel/Accommodation/services/useAccommodation";


export const Route = createFileRoute("/accommodation/$id")({
  component: RouteComponent,
});



function RouteComponent() {
  const { id } = Route.useParams();
  const { getAccommodation } = useAccommodation(+id)
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar sidebaritems={sidebarItems(id)} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Header AccommodationData={getAccommodation.data!}/>
          <main className="flex-1 overflow-y-auto p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
