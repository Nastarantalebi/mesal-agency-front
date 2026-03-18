import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PhotoUploader from "@/components/form/PhotoUploader";
import usePostData from "@/services/usePostData";
import useGetData from "@/services/useGetData";
import type { TRoomTypeImageResponse } from "../types";
import { accommodation_url } from "@/data/querykeys";
import useDeleteData from "@/services/useDeleteData";
import { X } from "lucide-react";
import type { TPaginatedResponse } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  accommodationPk: number;
  RoomId?: number | null;
  RoomName?: string | null;
}

const roomTypeImg = ({
  open,
  onOpenChange,
  title,
  accommodationPk,
  RoomId,
  RoomName,
}: Props) => {
  const key = ["RoomType-image", String(RoomId) || ""];
  const url = `${accommodation_url}${accommodationPk}/room_types/${RoomId}/images/`;

  const { mutate: uploadImage } = usePostData<FormData, any>({
    key,
    url,
  });

  const { data: imageList } = useGetData<
    TPaginatedResponse<TRoomTypeImageResponse>
  >({
    key,
    url,
    enabled: !!RoomId,
  });

  const { mutateAsync: deleteImage } = useDeleteData({
    key,
    url,
  });

  const onPick = (file: File) => {
    const fd = new FormData();
    fd.append("image", file); // if backend expects "file", change key
    uploadImage(fd);
  };
  const handleDelete = async (id: number) => {
    await deleteImage({ id });
  };

  const images = imageList?.results;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <div className="bg-primary/20 p-2 rounded mb-3 text-center">{`نوع اتاق ${RoomName}`}</div>
        <div className="flex items-center justify-center">
          <PhotoUploader size={260} onPick={onPick} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {images?.map((image) => (
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
