import PeakDate from '@/app/AdminPanel/peakDate/components/datePicker'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/peakDate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="max-w-5xl mt-20 "><PeakDate/></div>
}
