import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import RoomTypeRoomForm from "./RoomTypeRoomForm";
import RoomTypeRoomList from "./RoomTypeRoomList";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  AccommodationId: string;
  RoomId?: number | null;
  RoomName?: string | null;
}

const RoomTypeRooms = ({
  open,
  onOpenChange,
  title,
  AccommodationId,
  RoomId,
  RoomName,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl  h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <div className="bg-primary/20 p-2 rounded mb-3 text-center">{`نوع اتاق ${RoomName}`}</div>
        <RoomTypeRoomForm AccommodationId={AccommodationId} RoomId={RoomId} />

        <div className="m-5">
          <Card className="shadow-lg shadow-primary/50 ">
            <CardTitle className="text-start pr-7 text-primary">
              لیست اتاق های تعریف شده
            </CardTitle>
            <CardContent className="flex flex-wrap gap-2">
              <RoomTypeRoomList
                AccommodationId={AccommodationId}
                RoomId={RoomId}
              />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomTypeRooms;
