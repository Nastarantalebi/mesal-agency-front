import AccommodationTabs from "@/app/AdminPanel/Accommodation/components/AccommodationTabs";
import CustomButton from "@/components/form/CustomButton";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MoveLeft } from "lucide-react";

export const Route = createFileRoute("/accommodation/$id")({
  component: RouteComponent,
});

function RouteComponent({}) {
  const { id } = Route.useParams();

  return (
    <div className="flex flex-row items-start gap-4 px-10 mt-20">
      <div className="flex-1 min-w-0">
        <AccommodationTabs accommodationId={id} />
      </div>
    </div>
  );
}
