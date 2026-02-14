import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/accommodation/accommodation-details',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/accommodation-list/accommodation-details"!</div>
}
