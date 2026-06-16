import { X } from "lucide-react";
import { useRoomTypeImg } from "../../services/useRoomType";
import type { Props, TCRoomTypeImage } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomTypeImgValidation } from "../../fixtures/Validation";
import { ImageFields } from "../../fixtures/ImageFields";
import FormComponent from "@/_components/Form/Form";

const roomTypeImg = ({ AccommodationId, RoomTypeId }: Props) => {
  const { getImgs, postImg, deleteImg } = useRoomTypeImg(
    AccommodationId,
    RoomTypeId!,
  );

  const form = useForm({
    resolver: zodResolver(roomTypeImgValidation),
    defaultValues: { image: undefined, main: false },
  });

  // const onPick = (file: File) => {
  //   const fd = new FormData();
  //   fd.append("image", file); // if backend expects "file", change key
  //   postImg.mutate(fd);
  // };

  const handleDelete = async (id: number) => {
    await deleteImg.mutateAsync({ id });
  };

  const handleSubmit = async (values: TCRoomTypeImage) => {
    const formData = new FormData();

    if (values.image) {
      formData.append("image", values.image);
    }

    formData.append("main", String(values.main ?? false));

    await postImg.mutateAsync(formData);
    form.reset({
      image: undefined,
      main: false,
    });
  };

  return (
    <>
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <FormComponent<TCRoomTypeImage>
            form={form}
            onSubmit={handleSubmit}
            formFields={ImageFields}
            isSubmitting={postImg.isPending}
          />
        </div>

        <div className="flex flex-row gap-5 mt-3">
          {getImgs.data?.results?.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.image}
                alt="room type"
                className="w-50 h-50 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-1 right-1 bg-primary/50 text-white rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default roomTypeImg;
