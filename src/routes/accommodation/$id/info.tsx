import AccommodationForm from "@/app/AdminPanel/AccommodationAdd/AccommodationForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accommodation/$id/info")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <AccommodationForm buttonText="ویرایش" accommodationId={+id} />;
}
