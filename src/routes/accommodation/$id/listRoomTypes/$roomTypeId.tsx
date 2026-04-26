import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/accommodation/$id/listRoomTypes/$roomTypeId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id, roomTypeId } = Route.useParams();

  // اینجا هر چیزی که قرار است در outlet نمایش داده شود:
  // مثلا جزییات نوع اتاق، فرم، تب‌ها و ...
  return (
    <div className="p-4">
      <h2 className="font-bold text-lg">اطلاعات نوع اتاق</h2>
      <p>AccommodationId: {id}</p>
      <p>RoomTypeId: {roomTypeId}</p>

      {/* می‌تونی اینجا کامپوننت واقعی‌ات رو رندر کنی */}
      {/* <RoomTypeDetails accommodationId={id} roomTypeId={roomTypeId} /> */}
    </div>
  );
}
