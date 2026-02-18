import AccommodationList from "@/app/AdminPanel/Accommodation/components/AccommodationList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-5xl mt-10">
      <AccommodationList />
    </div>
  );
}
