import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { shamsiToMiladi } from "@/components/form/DateConverter";

const TourForm = ({
  tourId,
  buttonText = tourId ? "ویرایش" : "افزودن",
}: {
  tourId?: number;
  buttonText?: string;
}) => {
  const isEdit = !!tourId;
  //   const { getAccommodation, postAccommodation, putAccommodation } =
  //     useAccommodation(AccommodationId!);
  //   const { accommodationValidation, accommodationInitialValues } =
  //     useValidation();

  //   const { postTours, getTourById } = useTour({});

  const { postTours, getTourById, putTour } = useTour({ tourId });

  const form = useForm<TCreateTour>({
    resolver: zodResolver(tourValidation),
    defaultValues: tourInitialValues,
  });

  console.log("form:", form.watch());

  const { fields } = useTourFields();
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = (values: TCreateTour) => {
    const data = {
      ...tourInitialValues,
      ...values,
      start: shamsiToMiladi(values.start),
      end: shamsiToMiladi(values.end),
    };

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "included" || key === "excluded" || key === "highlights") {
        formData.append(key, JSON.stringify(value || []));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    if (isEdit) {
      putTour.mutateAsync(
        { data: formData, id: tourId },
        {
          onError: () => setErrorOpen(true),
        },
      );
    } else {
      postTours.mutateAsync(formData, {
        onSuccess: () => {
          form.reset(tourInitialValues);
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
