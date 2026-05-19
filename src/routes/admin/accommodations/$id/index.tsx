import CustomTab from "@/components/tabs/CustomTab";
import { AccommodationTabsData } from "@/fixtures/AccommodatioTabsData";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/accommodations/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div>
      <CustomTab tabItems={AccommodationTabsData(+id)} orientation="vertical"/>
    </div>
  );
}
