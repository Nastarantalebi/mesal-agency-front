import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/accommodation/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/accommodation/"!</div>
}
