import AccommodationTabs from "@/app/AdminPanel/Accommodation/components/AccommodationTabs";
import CustomButton from "@/components/form/CustomButton";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MoveLeft } from "lucide-react";

export const Route = createFileRoute("/accommodation/$id")({
  component: RouteComponent,
});

function RouteComponent({}) {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-start gap-4 px-10 mt-20">
      <div className="flex-1 min-w-0">
        <AccommodationTabs accommodationId={id} />
      </div>
      <CustomButton
        className="bg-primary-50/70 hover:bg-primary/80 shrink-0 "
        onClick={() => navigate({ to: "/dashboard/accommodation-list" })}
      >
        <MoveLeft />
      </CustomButton>
    </div>
  );
}
