import AccommodationList from "@/app/AdminPanel/Accommodation/components/AccommodationList";
import CustomButton from "@/components/form/CustomButton";
import ListPagination from "@/components/list/ListPagination";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/accommodation-list")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-5xl mt-10">
      {/* <CustomButton
        icon={<Plus className="h-5 w-5" />}
        iconPosition="right"
        // onClick={() => navigate({ to: "/admin/add-accommodation" })}
        className="mb-6"
      >
        ثبت اقامتگاه
      </CustomButton> */}
      {/* <Link
        to="/dashboard/accommodation-list"
        search={{
          page: 3,

        }}
      >click</Link> */}
      <AccommodationList />
    </div>
  );
}
