import type { TPaginatedResponse } from "@/types";
import type { TAccommodationImageResponse } from "../types";
import useGetData from "@/services/useGetData";
import { toast } from "sonner";
import useDeleteData from "@/services/useDeleteData";
import usePostData from "@/services/usePostData";
import PhotoUploader from "@/components/form/PhotoUploader";
import { X } from "lucide-react";
import { useState } from "react";

const AccommodationPhotoes = ({
  accommodationId,
}: {
  accommodationId: string;
}) => {
  const { mutate: uploadImage } = usePostData<FormData, any>({
    key: ["accommodation-image", accommodationId],
    url: `admin/accommodations/${accommodationId}/images/`,
  });

  const { mutateAsync: deleteImage } = useDeleteData({
    key: ["accommodation-image", accommodationId],
    url: `admin/accommodations/${accommodationId}/images/`,
  });

  const { data: imageList } = useGetData<
    TPaginatedResponse<TAccommodationImageResponse>
  >({
    key: ["accommodation-image", accommodationId],
    url: `admin/accommodations/${accommodationId}/images/`,
  });

  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const onPick = async (file: File) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("image", file);
    try {
      await handleUpload(fd);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: FormData) => {
    try {
      const response = await uploadImage(file);

      // Extract the image URL from the response
      const imageUrl = uploadImage.u // Adjust this based on your API's response format

      // Update the state with the new image URL, triggering a re-render
      setUploadedImageUrl(imageUrl);

      toast.success("تصویر با موفقیت ثبت شد");
    } catch (error) {
      toast.error("خطا در بارگزاری تصویر");
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteImage({ id });

      // Refresh the image list after deletion to ensure UI updates
      // This might involve re-fetching the data from the API
      // For example:
      // invalidate: ["accommodation-image", accommodationId];  // Using React Query invalidation
      // or
      // setimageList(prevList => prevList.filter(img => img.id !== id)); // If managing the list directly.

      setUploadedImageUrl(null); // Clear the uploadedImageUrl state
      toast.success("تصویر با موفقیت حذف شد");
    } catch (error) {
      toast.error("خطا در حذف تصویر");
    } finally {
      setLoading(false);
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
