import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/app/AdminPanel/AdminFeatures/AdminSidebar";
import { SidebarData } from "@/fixtures/SideBarData.";
import MobileAdminSidebar from "@/app/AdminPanel/AdminFeatures/MobileAdminSidebar";
// import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  // const router = useRouter();
  return (
    // <div className="flex-1 flex flex-col">
    //   <Header />
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AdminSidebar sidebaritems={SidebarData} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <MobileAdminSidebar />
          <main className="flex-1 flex-col overflow-y-auto px-5">
            {/* <div className="flex justify-end">
              <Button variant={"outline"} className="border-2 border-primary" onClick={() => router.history.back()}>
                صفحه قبلی
              </Button>
            </div> */}
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
    // </div>
  );
}
