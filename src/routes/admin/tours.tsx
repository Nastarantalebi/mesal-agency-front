import TourTemplateList from '@/app/AdminPanel/tours/components/TourTemplateList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/tours')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><TourTemplateList/></div>
}
