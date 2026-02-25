import AccommodationPhotoes from "@/app/AdminPanel/Accommodation/components/AccommodationPhotoes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accommodation/$id/images")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <AccommodationPhotoes accommodationId={id} />;
}
