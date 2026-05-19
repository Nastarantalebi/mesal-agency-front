import CustomTab from "@/components/tabs/CustomTab";
import { RoomTypeTabsData } from "@/fixtures/RoomTypeTabsData";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/admin/accommodations/$id/roomTypes/$roomTypeId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id, roomTypeId } = Route.useParams();
  return (
    <div>
      <CustomTab
        tabItems={RoomTypeTabsData({
          AccommodationId: Number(id),
          roomTypeId: Number(roomTypeId),
        })}
      />
    </div>
  );
}
