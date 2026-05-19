import UsersList from '@/app/AdminPanel/settings/components/users/UsersList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><UsersList/></div>
}
