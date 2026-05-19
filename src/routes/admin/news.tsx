import NewsList from '@/app/AdminPanel/settings/components/news/NewsList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/news')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><NewsList/></div>
}
