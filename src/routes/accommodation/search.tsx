import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/accommodation/search')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/accommodation/search"!</div>
}
