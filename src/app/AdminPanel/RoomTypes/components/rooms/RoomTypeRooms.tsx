import { Card, CardContent, CardTitle } from "@/components/ui/card";
import RoomTypeRoomForm from "./RoomTypeRoomForm";
import RoomTypeRoomList from "./RoomTypeRoomList";
import type { Props } from "../../types";

const RoomTypeRooms = ({
  AccommodationId,
  RoomTypeId,
}: Props) => {
  return (
    <div className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl  h-screen">
      <RoomTypeRoomForm
        AccommodationId={AccommodationId}
        RoomTypeId={RoomTypeId}
      />

      <div className="m-5">
        <Card className="shadow-lg shadow-primary/50 ">
          <CardTitle className="text-start pr-7 text-primary">
            لیست اتاق های تعریف شده
          </CardTitle>
          <CardContent className="flex flex-wrap gap-2">
            <RoomTypeRoomList
              AccommodationId={AccommodationId}
              RoomTypeId={RoomTypeId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoomTypeRooms;
