import TourSteps from '@/app/AdminPanel/tours/components/TourSteps'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/tour/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><TourSteps/></div>
}
