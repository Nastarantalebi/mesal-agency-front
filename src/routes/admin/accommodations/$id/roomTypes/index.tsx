import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accommodations/$id/roomTypes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/accommodations/$id/roomTypes/"!</div>
}
