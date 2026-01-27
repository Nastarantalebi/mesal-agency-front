import AccommodationForm from '@/app/AdminPanel/Accommodation/components/AccommodationForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute("/admin-panel/add-accommodation")({
  component: AddAccommodation,
});

function AddAccommodation() {
  return (
    <div>
      <AccommodationForm/>
    </div>
  )
}

export default AddAccommodation
