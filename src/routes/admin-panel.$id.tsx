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

export const Route = createFileRoute("/admin-panel/$id")({
  component: AccommodationDetails,
});

function AccommodationDetails() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  return (
    <div className="flex items-center justify-between px-10 mt-20">
      <AccommodationTabs accommodationId={id} />
      {/* <CustomButton
        icon={<MoveLeft />}
        onClick={() => navigate({ to: "/admin-panel" })}
      /> */}
    </div>
  );
}
