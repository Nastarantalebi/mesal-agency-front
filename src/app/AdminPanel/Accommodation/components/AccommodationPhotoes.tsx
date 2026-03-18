import type { TPaginatedResponse } from "@/types";
import type { TAccommodationImageResponse } from "../types";
import useGetData from "@/services/useGetData";
import { toast } from "sonner";
import useDeleteData from "@/services/useDeleteData";
import usePostData from "@/services/usePostData";
import PhotoUploader from "@/components/form/PhotoUploader";
import { X } from "lucide-react";
import { accommodation_url } from "@/data/querykeys";

const AccommodationPhotoes = ({
  accommodationId,
}: {
  accommodationId: number;
}) => {

  const key = ["accommodation-image", String(accommodationId)];
  const url = `${accommodation_url}${accommodationId}/images/`;

  const { mutate: uploadImage } = usePostData<FormData, any>({
    key,
    url,
  });

  const { mutateAsync: deleteImage } = useDeleteData({
    key,
    url,
  });

  const { data: imageList } = useGetData<
    TPaginatedResponse<TAccommodationImageResponse>
  >({
    key,
    url,
  });


  const onPick = (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    handleUpload(fd);
  };



  const handleUpload = async (file: FormData) => {
    try {
      await uploadImage(file);
      toast.success("تصویر با موفقیت ثبت شد");
    } catch (error) {
      toast.error("خطا در بارگزاری تصویر");
    }
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

  return (
    <main className="w-full flex flex-row gap-4 justify-center">
      <div className="relative">
        {mainImage ? (
          <>
            <img
              src={mainImage.image}
              alt="main"
              className="w-132.5 h-132.5 object-cover rounded-2xl"
            />
            <button
              onClick={() => handleDelete(mainImage.id)}
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
                    className="w-65 h-65 object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => handleDelete(image.id)}
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
