import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
  tourInitialValues,
  tourValidation,
  type TCreateTour,
} from "../fixtures/validation";
import FormComponent from "@/components/form/FormComponent";
import useTour from "../services/useTour";
import useTourFields from "../hooks/useTourFields";
import CustomLoader from "@/components/loading/CustomLoader";

const TourForm = ({
  tourId,
  buttonText = tourId ? "ویرایش" : "افزودن",
  setOpenModal,
}: {
  tourId?: number;
  buttonText?: string;
    setOpenModal?: Dispatch<SetStateAction<boolean>>
}) => {
  const isEdit = !!tourId;
  const { postTours, getTourById, putTour } = useTour({ tourId });

  const form = useForm<TCreateTour>({
    resolver: zodResolver(tourValidation),
    defaultValues: tourInitialValues,
  });

  console.log("form:", form.watch());

  const { fields } = useTourFields();
  const [errorOpen, setErrorOpen] = useState(false);

  // useEffect(() => {
  //   isEdit && form.reset(getTourById.data);
  // }, [getTourById.data]);

  const handleSubmit = (values: TCreateTour) => {
    if (isEdit) {
      putTour.mutateAsync(
        { data: values, id: tourId },
        {
          onError: () => setErrorOpen(true),
        },
      );
    } else {
      postTours.mutateAsync(values, {
        onSuccess: () => {
          form.reset(tourInitialValues);
          setOpenModal?.(false)
        },
        onError: () => setErrorOpen(true),
      });
    }
  };

  if (getTourById.isFetching)
    return (
      <div className="p-4">
        <CustomLoader />
      </div>
    );

  return (
    <FormComponent
      form={form}
      handleSubmit={handleSubmit}
      errorOpen={errorOpen}
      setErrorOpen={setErrorOpen}
      buttonText={buttonText}
      fields={fields}
    />
  );
};

export default TourForm;
