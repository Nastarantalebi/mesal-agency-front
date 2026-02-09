import AddFeaturesForm from "@/app/AdminPanel/AccommodationFeatures/components/AddFeaturesForm";
import FeaturesList from "@/app/AdminPanel/AccommodationFeatures/components/FeaturesList";
import AddBedForm from "@/app/AdminPanel/Beds/component/AddBedForm";
import BedsList from "@/app/AdminPanel/Beds/component/BedsList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/accommodation-beds")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-5xl mt-20 flex flex-col gap-20">
      <AddBedForm/> <BedsList />
    </div>
  );
}
