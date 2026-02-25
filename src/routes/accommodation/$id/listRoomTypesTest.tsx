import RoomTypeList from "@/app/AdminPanel/RoomTypes/components/RoomTypeList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accommodation/$id/listRoomTypesTest")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <div className="">
      <RoomTypeList AccommodationId={id} />
    </div>
  );
}
