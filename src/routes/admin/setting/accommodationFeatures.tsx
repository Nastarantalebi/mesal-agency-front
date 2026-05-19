import AddFeaturesForm from "@/app/AdminPanel/settings/components/features/AddFeaturesForm";
import FeaturesList from "@/app/AdminPanel/settings/components/features/FeaturesList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/setting/accommodationFeatures")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-10">
      <AddFeaturesForm asModal={false} buttonTitle="ثبت" /> <FeaturesList />
    </div>
  );
}
