import PeakDate from '@/app/AdminPanel/settings/components/peakDates/PeakDate';
import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute('/accommodation/$id/peakDates')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();
  return <PeakDate accommodationId={id}/>
}
