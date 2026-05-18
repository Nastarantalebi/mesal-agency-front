import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
  additionalTourInfoInitialValues,
  additionaTourInfoValidation,
  type TCreateTourDeparture,
  type TResponseTourDeparture,
} from "../fixtures/validation";
import useTour from "../services/useTour";
import useFields from "../hooks/useFields";
import FormComponent from "@/components/form/FormComponent";

const TourDepartureForm = ({
  departureId,
  buttonText = departureId ? "ویرایش" : "افزودن",
  tourTemplateId,
  setDepartureData,
}: {
  departureId?: number;
  buttonText?: string;
  tourTemplateId: number | null;
  setDepartureData: Dispatch<SetStateAction<TResponseTourDeparture | undefined>>;
}) => {
  const isEdit = !!departureId;

  const { postTourDeparture, putTourDeparture, getTourDepartureById } = useTour(
    { tourTemplateId },
  );
  const [errorOpen, setErrorOpen] = useState(false);
  const {fields} = useFields();

  const form = useForm<TCreateTourDeparture>({
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

  const handleSubmit = (value: TCreateTourDeparture) => {
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
      postTourDeparture(transformedData, {
        onSuccess: (data) => {
          setDepartureData(data);
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
