import AccommodationList from '@/app/AdminPanel/Accommodation/components/AccommodationList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accommodations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><AccommodationList/></div>
}
