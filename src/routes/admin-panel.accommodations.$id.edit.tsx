import AccommodationForm from '@/app/AdminPanel/Accommodation/components/AccommodationForm';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(`/admin-panel/accommodations/$id/edit`)({
  component: EditAccommodation,
})

function EditAccommodation() {
    const { id } = Route.useParams();
  return <div className="p-4">
    <AccommodationForm id={id}/>
  </div>;
}
