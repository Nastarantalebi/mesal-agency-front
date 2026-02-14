import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/accommodation/$roomid')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/accommodation/$roomid"!</div>
}
