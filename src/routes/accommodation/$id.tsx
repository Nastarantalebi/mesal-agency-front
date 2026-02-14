import AccommodationTabs from '@/app/AdminPanel/Accommodation/components/AccommodationTabs';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/accommodation/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();
  
  return (
    <div className="flex items-center justify-between px-10 mt-20">
      <AccommodationTabs accommodationId={id} />
    </div>
  );
}

