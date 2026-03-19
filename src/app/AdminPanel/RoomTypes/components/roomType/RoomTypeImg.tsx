import PhotoUploader from "@/components/form/PhotoUploader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useRoomTypeImg } from "../../services/useRoomType";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  AccommodationId: number;
  RoomTypeId?: number;
  RoomTypeName?: string | null;
}

const roomTypeImg = ({
  open,
  onOpenChange,
  title,
  AccommodationId,
  RoomTypeId,
  RoomTypeName,
}: Props) => {


  const { getImgs, postImg, deleteImg } =  useRoomTypeImg(AccommodationId, RoomTypeId!);


  const onPick = (file: File) => {
    const fd = new FormData();
    fd.append("image", file); // if backend expects "file", change key
    postImg.mutate(fd);
  };

  const handleDelete = async (id: number) => {
    await deleteImg.mutateAsync({ id });
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <div className="bg-primary/20 p-2 rounded mb-3 text-center">{`نوع اتاق ${RoomTypeName}`}</div>
        <div className="flex items-center justify-center">
          <PhotoUploader size={260} onPick={onPick} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {getImgs.data?.results?.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.image}
                alt="room type"
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-1 right-1 bg-primary/50 text-white rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default roomTypeImg;
