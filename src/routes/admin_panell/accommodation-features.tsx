import AddFeaturesForm from "@/app/AdminPanel/AccommodationFeatures/components/AddFeaturesForm";
import FeaturesList from "@/app/AdminPanel/AccommodationFeatures/components/FeaturesList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin_panell/accommodation-features")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-5xl mt-20 flex flex-col gap-20">
      <AddFeaturesForm /> <FeaturesList />
    </div>
  );
}
