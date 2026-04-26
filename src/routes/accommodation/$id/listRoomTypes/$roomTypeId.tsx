import useRoomTypeTabItems from "@/app/AdminPanel/RoomTypes/hooks/useRoomTypeTabItems";
import CustomTab from "@/components/tabs/CustomTab";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/accommodation/$id/listRoomTypes/$roomTypeId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id, roomTypeId } = Route.useParams();
const { roomTypeTabItems } = useRoomTypeTabItems({
  AccommodationId: +id,
  roomTypeId: +roomTypeId,
});

  return (
    <div className="p-4">
        <CustomTab tabItems={roomTypeTabItems}/>
    </div>
  );
}
