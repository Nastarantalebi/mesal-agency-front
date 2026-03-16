import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/app/AdminPanel/AdminHeader";
import { AppSidebar } from "@/app/AdminPanel/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  SquarePen,
  Star,
  Image,
  DoorClosed,
  List,
  CopyPlus,
  LayoutDashboard,
  Calendar,
} from "lucide-react";


export const Route = createFileRoute("/accommodation/$id")({
  component: RouteComponent,
});
const sidebarItems = (id: string) => [
  {
    title: "داشبورد",
    url: `/dashboard`,
    icon: <LayoutDashboard />,
  },
  {
    title: "اطلاعات اولیه",
    url: `/accommodation/${id}/info`,
    icon: <SquarePen />,
  },
  {
    title: "ویژگی های اقامتگاه",
    url: `/accommodation/${id}/features`,
    icon: <Star />,
  },
  {
    title: "تصاویر اقامتگاه",
    url: `/accommodation/${id}/images`,
    icon: <Image />,
  },
  {
    title: "لیست نوع اتاق ها",
    url: `/accommodation/${id}/listRoomTypes`,
    icon: <List />,
    // children: [
    //   {
    //     title: "ثبت نوع اتاق",
    //     url: `/accommodation/${id}/addRoomTypes`,
    //     icon: <CopyPlus />,
    //   },
    //   {
    //     title: "لیست نوع اتاق ها",
    //     url: `/accommodation/${id}/listRoomTypes`,
    //     icon: <List />,
    //   },
    // ],
  },
  {
    title: "تاریخ های پیک",
    url: `/accommodation/${id}/peakDates`,
    icon: <Calendar/>
  },
];

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar sidebaritems={sidebarItems(id)} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
