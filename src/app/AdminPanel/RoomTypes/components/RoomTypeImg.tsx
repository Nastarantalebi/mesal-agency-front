import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PhotoUploader from "@/components/form/PhotoUploader";
import usePostData from "@/services/usePostData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  accommodationPk: string;
  RoomId: string | null;
}

const roomTypeImg = ({
  open,
  onOpenChange,
  title,
  accommodationPk,
  RoomId,
}: Props) => {
  const { mutate: uploadImage } = usePostData<FormData, any>({
    key: ["RoomType-image-upload", RoomId],
    url: `admin/accommodations/${accommodationPk}/room_types/${RoomId}/images/`,
  });

  const onPick = (file: File) => {
    const fd = new FormData();
    fd.append("image", file); // if backend expects "file", change key
    uploadImage(fd);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <PhotoUploader size={260} onPick={onPick} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default roomTypeImg;
