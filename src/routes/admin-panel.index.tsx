import AccommodationList from "@/app/AdminPanel/Accommodation/components/AccommodationList";
import { AppSidebar } from "@/app/AdminPanel/AdminSidebar";
import CustomButton from "@/components/form/CustomButton";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Home, Plus, Star } from "lucide-react";

export const Route = createFileRoute("/admin-panel/")({
  component: AdminPanel,
});

const items = [
  {
    title: "لیست اقامتگاه‌ها",
    url: "/admin-panel" as const,
    icon: <Home />,
  },
  {
    title: "ثبت ویژگی",
    url: "/admin-panel/add-features" as const,
    icon: <Star />,
  },
];

function AdminPanel() {
  const navigate = useNavigate();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar sidebaritems={items} />
        <SidebarInset>
          <main className="flex-1 p-6 md:p-10">
            <div className="max-w-5xl mt-20">
              <CustomButton
                icon={<Plus className="h-5 w-5" />}
                iconPosition="right"
                onClick={() => navigate({ to: "/admin-panel/add-accommodation" })}
                className="mb-6"
              >
                ثبت اقامتگاه
              </CustomButton>
              <AccommodationList />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
