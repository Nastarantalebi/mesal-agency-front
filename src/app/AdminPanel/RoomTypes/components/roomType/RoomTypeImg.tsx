import { X } from "lucide-react";
import { useRoomTypeImg } from "../../services/useRoomType";
import type { Props, TCRoomTypeImage } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomTypeImgValidation } from "../../fixtures/Validation";
import { Form } from "@/components/ui/form";
import { ImageFields } from "../../fixtures/ImageFields";
import formTypes from "@/components/form/FormInputTypes";
import CustomButton from "@/components/form/CustomButton";

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8  items-start gap-7"
        >
          {ImageFields.map((item) => (
            <div
              key={String(item.name)}
              className={item.className || "col-span-1"}
            >
              {formTypes<TCRoomTypeImage>(item, form.control)}
            </div>
          ))}
          <div className="my-1">
            <CustomButton type="submit">ارسال</CustomButton>
          </div>
        </form>
      </Form>

      <div className="flex flex-row gap-5 mt-10">
        {getImgs.data?.results?.map((image) => (
          <div key={image.id} className="relative">
            <img
              src={image.image}
              alt="room type"
              className="w-40 h-40 object-cover rounded-lg"
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
    </>
  );
};

export default roomTypeImg;
