import PhotoUploader from "@/components/form/PhotoUploader";
import { X } from "lucide-react";
import { useRoomTypeImg } from "../../services/useRoomType";
import type { Props } from "../../types";

const roomTypeImg = ({
  AccommodationId,
  RoomTypeId,
}: Props) => {
  const { getImgs, postImg, deleteImg } = useRoomTypeImg(
    AccommodationId,
    RoomTypeId!,
  );

  const onPick = (file: File) => {
    const fd = new FormData();
    fd.append("image", file); // if backend expects "file", change key
    postImg.mutate(fd);
  };

  const handleDelete = async (id: number) => {
    await deleteImg.mutateAsync({ id });
  };

  return (
    <>
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
    </>
  );
};

export default roomTypeImg;
