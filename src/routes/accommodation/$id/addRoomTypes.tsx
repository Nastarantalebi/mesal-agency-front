import RoomTypeForm from '@/app/AdminPanel/RoomTypes/components/RoomTypeForm';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/accommodation/$id/addRoomTypes')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <div className="w-1/2">
      <RoomTypeForm AccommodationId={id} buttonTitle="ثبت" asModal={false}/>
    </div>
  );
}