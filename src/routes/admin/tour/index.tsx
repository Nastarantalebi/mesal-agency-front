import DeparturesList from '@/app/AdminPanel/tours/components/DeparturesList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/tour/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><DeparturesList/></div>
}
