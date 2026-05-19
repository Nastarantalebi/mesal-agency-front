import TourDepartureList from "@/app/AdminPanel/tours/components/TourDepartureList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/tourTemplates/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <div>
      <TourDepartureList tourTemplateId={+id} />
    </div>
  );
}
