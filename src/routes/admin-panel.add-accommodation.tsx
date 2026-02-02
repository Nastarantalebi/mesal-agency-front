import AccommodationForm from "@/app/AdminPanel/Accommodation/components/AccommodationForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin-panel/add-accommodation")({
  component: AddAccommodation,
});

function AddAccommodation() {
  return (
    <main className="flex-1 min-w-0 overflow-x-hidden p-6">
      <AccommodationForm />
    </main>
  );
}

export default AddAccommodation;
