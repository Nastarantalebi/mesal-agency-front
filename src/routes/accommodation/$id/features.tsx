import AccommodationFeatures from '@/app/AdminPanel/Accommodation/components/AccommodationFeatures'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/accommodation/$id/features')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();
  return <AccommodationFeatures AccommodationId={+id} />;
}
