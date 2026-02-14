import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/accommodation/add-accommodation',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/accommodation-list/add-accommodation"!</div>
}
