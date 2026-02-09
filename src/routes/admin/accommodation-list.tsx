import AccommodationList from "@/app/AdminPanel/Accommodation/components/AccommodationList";
import CustomButton from "@/components/form/CustomButton";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/accommodation-list")({
  component: RouteComponent,
});

function RouteComponent() {
  // const navigate = useNavigate();
  return (
    <div className="max-w-5xl mt-20">
      <CustomButton
        icon={<Plus className="h-5 w-5" />}
        iconPosition="right"
        // onClick={() => navigate({ to: "/admin/add-accommodation" })}
        className="mb-6"
      >
        ثبت اقامتگاه
      </CustomButton>
      <AccommodationList />
    </div>
  );
}
