import AccommodationTabs from "@/app/AdminPanel/Accommodation/components/AccommodationTabs";
import { AppSidebar } from "@/app/AdminPanel/AdminSidebar";
import CustomButton from "@/components/form/CustomButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import {
  FilePen,
  HomeIcon,
  ListChecks,
  Image,
  icons,
  DoorClosed,
  MoveLeft,
  BookText,
} from "lucide-react";
import { url } from "zod";

export const Route = createFileRoute("/admin-panel/$id")({
  component: AccommodationDetails,
});

function AccommodationDetails() {


  const navigate = useNavigate();
  const { id } = Route.useParams();
  return (
    <div className="mt-20 ml-20">
        <AccommodationTabs accommodationId={id}/>
      <div className="flex justify-end w-full px-10">
        <CustomButton
          icon={<MoveLeft/>}
          onClick={() => navigate({ to: "/admin-panel" })}
        >
        </CustomButton>
      </div>
      <Outlet/>
    </div>
  );
}
