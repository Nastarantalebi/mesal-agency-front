import AccommodationForm from "@/app/AdminPanel/Accommodation/components/AccommodationForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/accommodation-add")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex-1 min-w-0 overflow-x-hidden pt-12">
      <AccommodationForm />
    </div>
  );
}
