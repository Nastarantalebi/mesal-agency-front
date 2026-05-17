import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  additionalTourInfoInitialValues,
  additionaTourInfoValidation,
  type TCreateAdditionalTour,
} from "../fixtures/validation";
import useTour from "../services/useTour";
import useFields from "../hooks/useFields";
import FormComponent from "@/components/form/FormComponent";

const TourDepartureForm = ({
  departureId,
  buttonText = departureId ? "ویرایش" : "افزودن",
  tourTemplateId,
}: {
  departureId?: number;
  buttonText?: string;
  tourTemplateId: number;
}) => {
  const isEdit = !!departureId;

  const { postTourDeparture, putTourDeparture, getTourDepartureById } = useTour(
    { tourTemplateId },
  );
  const [errorOpen, setErrorOpen] = useState(false);
  const fields = useFields();

  const form = useForm<TCreateAdditionalTour>({
    resolver: zodResolver(additionaTourInfoValidation),
    defaultValues: additionalTourInfoInitialValues,
  });

  useEffect(() => {
    if (isEdit) {
      const transformedData = {
        ...getTourDepartureById.data,
        start: miladiToShamsi(getTourDepartureById.data?.start!),
        end: miladiToShamsi(getTourDepartureById.data?.end!),
      };
      form.reset(transformedData);
    }
  }, [getTourDepartureById.data]);

  const handleSubmit = (value: TCreateAdditionalTour) => {
    const transformedData = {
      ...additionalTourInfoInitialValues,
      ...value,
      start: shamsiToMiladi(value.start),
      end: shamsiToMiladi(value.end),
    };

    if (isEdit) {
      putTourDeparture.mutateAsync(
        { data: transformedData, id: departureId },
        {
          onError: () => setErrorOpen(true),
        },
      );
    } else {
      postTourDeparture.mutateAsync(transformedData, {
        onSuccess: () => {
          form.reset(additionalTourInfoInitialValues);
        },
        onError: () => setErrorOpen(true),
      });
    }
  };

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

export default TourDepartureForm;
