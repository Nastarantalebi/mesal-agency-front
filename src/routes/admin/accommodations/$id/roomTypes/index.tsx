import RoomTypeList from "@/app/AdminPanel/RoomTypes/components/roomType/RoomTypeList";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/admin/accommodations/$id/roomTypes/")({
  component: RouteComponent,
  validateSearch: (search) =>
    z
      .object({
        name: z.string().optional(),
      })
      .parse(search),
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div className="">
      <RoomTypeList AccommodationId={+id} />
    </div>
  );
}
