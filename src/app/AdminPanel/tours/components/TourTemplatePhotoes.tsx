import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tourImgValidation } from "../fixtures/validation";
import type { TCtourImage } from "../../RoomTypes/types";
import useTourTemplate from "../services/useTourTemplate";
import useTourTemplateFields from "../hooks/useTourTemplateFields";
import { X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import FormComponent from "@/_components/Form/Form";

const TourTemplatePhotoes = ({
  tourId,
}: {
  tourId: number;
  setOpenImg?: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<TCtourImage>({
    resolver: zodResolver(tourImgValidation),
    defaultValues: { image: undefined, main: false },
  });

  const { ImageFields } = useTourTemplateFields();
  const { postTourImg, deleteTourImg, getTourImg } = useTourTemplate({
    tourId,
  });

  const handleDelete = async (id: number) => {
    await deleteTourImg.mutateAsync({ id });
  };

  const handleSubmit = async (values: TCtourImage) => {
    const formData = new FormData();

    if (values.image) {
      formData.append("image", values.image);
    }

    formData.append("main", String(values.main ?? false));
    // formData.append("caption", "dd");
    // formData.append("order", "1");

    await postTourImg.mutateAsync(formData);

    form.reset({
      image: undefined,
      main: false,
    });
  };

  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 w-80">
          <FormComponent
            form={form}
            onSubmit={handleSubmit}
            formFields={ImageFields}
          />
        </div>
        <div className="col-span-5">
          <div className="flex flex-row gap-5 mt-3">
            {getTourImg.data?.results?.map((image) => (
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
        </div>
      </div>
    </>
  );
};

export default TourTemplatePhotoes;
