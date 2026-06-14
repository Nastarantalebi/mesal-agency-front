import AddBedForm from "@/app/AdminPanel/settings/components/bed/AddBedForm";
import BedsList from "@/app/AdminPanel/settings/components/bed/BedsList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/setting/BedTypes")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-10">
      <AddBedForm /> <BedsList />
    </div>
  );
}
