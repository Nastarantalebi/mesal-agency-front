import type { TPaginatedResponse } from "@/types";
import React from "react";
import type { TAccommodationImageResponse } from "../types";
import useGetData from "@/services/useGetData";
import { toast } from "sonner";
import useDeleteData from "@/services/useDeleteData";
import usePostData from "@/services/usePostData";
import PhotoUploader from "@/components/form/PhotoUploader";
import { X } from "lucide-react";

const AccommodationPhotoes = ({
  accommodationId,
}: {
  accommodationId: string;
}) => {
  const { mutate: uploadImage } = usePostData<FormData, any>({
    key: ["accommodation-image-upload", accommodationId],
    url: `admin/accommodations/${accommodationId}/images/`,
  });

  const { mutateAsync: deleteImage } = useDeleteData({
    key: ["accommodation-image-delete", accommodationId],
    url: `admin/accommodations/${accommodationId}/images/`,
  });

  const {
    data: imageList,
    isLoading,
    error,
  } = useGetData<TPaginatedResponse<TAccommodationImageResponse>>({
    key: ["accommodation-image-list", accommodationId],
    url: `admin/accommodations/${accommodationId}/images/`,
  });

  const onPick = (file: File) => {
    const fd = new FormData();
    fd.append("image", file); // if backend expects "file", change key
    uploadImage(fd);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteImage({ id });
      toast.success("تصویر با موفقیت حذف شد");
    } catch (error) {
      toast.error("خطا در حذف تصویر");
    }
  };

  const images = imageList?.results || [];
  const mainImage = images.find((img) => img.main);
  const sideImages = images.filter((img) => !img.main).slice(0, 4);

  // console.log(images)
  // console.log(mainImage)
  // console.log(sideImages)

  return (
    <main className="w-full flex flex-row gap-4 justify-center">
      <div className="relative">
        {mainImage ? (
          <>
            <img
              src={mainImage.image}
              alt="main"
              className="w-[530px] h-[530px] object-cover rounded-2xl"
            />
            <button
              onClick={() => deleteImage({ id: mainImage.id })}
              className="absolute top-2 right-2 bg-primary/10 text-white rounded-full p-2 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <PhotoUploader size={530} onPick={onPick} />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((index) => {
          const image = sideImages[index];
          return (
            <div key={index} className="relative">
              {image ? (
                <>
                  <img
                    src={image.image}
                    alt={`side-${index}`}
                    className="w-[260px] h-[260px] object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => deleteImage({ id: image.id })}
                    className="absolute top-2 right-2 bg-primary/50 text-white rounded-full p-2 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <PhotoUploader size={260} onPick={onPick} />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default AccommodationPhotoes;
