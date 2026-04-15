import PhotoUploader from "@/components/form/PhotoUploader";
import { X } from "lucide-react";
import { useAccommodationImg } from "../services/useAccommodation";
import type { Props } from "../types";

const AccommodationPhotoes = ({AccommodationId}: Props) => {

  const { getImgs, postImg, deleteImg } = useAccommodationImg(AccommodationId)

  const onPick = (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    handleUpload(fd);
  };

  const handleUpload = async (file: FormData) => {
    
    await postImg.mutateAsync(file);

  };

  const handleDelete = async (id: number) => {
      await deleteImg.mutateAsync({ id });

  };

  const images = getImgs.data?.results || [];
  const mainImage = images.find((img) => img.main);
  const sideImages = images.filter((img) => !img.main).slice(0, 4);

  return (
    <main className="w-full flex flex-col lg:flex-row gap-4 justify-center">
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
          <PhotoUploader size={330} onPick={onPick} />
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
                <PhotoUploader size={160} onPick={onPick} />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default AccommodationPhotoes;
