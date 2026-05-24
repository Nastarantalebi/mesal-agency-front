import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import {
  tourDepartureInitialValues,
  tourDepartureValidation,
  type TCreateTourDeparture,
} from "../fixtures/validation";
import useFields from "../hooks/useDepartureFields";
import FormComponent from "@/components/form/FormComponent";
import type { TdepartureResponse } from "../types";
import useDeparture from "../services/useDeparture";

interface TourDepartureFormProps {
  departureId?: number;
  buttonText?: string;
  tourTemplateId: number | null;
  setDepartureData?: Dispatch<SetStateAction<TdepartureResponse | undefined>>;
  onSubmitSuccess?: () => void;
  setIsPending?: Dispatch<SetStateAction<boolean>>;
}

export interface TourDepartureFormRef {
  submitForm: () => void;
}

const TourDepartureForm = forwardRef<
  TourDepartureFormRef,
  TourDepartureFormProps
>(
  (
    {
      departureId,
      buttonText = departureId ? "ویرایش" : "افزودن",
      tourTemplateId,
      setDepartureData,
      onSubmitSuccess,
      setIsPending,
    },
    ref,
  ) => {
    const isEdit = !!departureId;

    const { postTourDeparture, putTourDeparture, getTourDepartureById } =
      useDeparture({ tourTemplateId, departureId });
    const [errorOpen, setErrorOpen] = useState(false);
    const { fields } = useFields();

    const form = useForm<TCreateTourDeparture>({
      resolver: zodResolver(tourDepartureValidation),
      defaultValues: tourDepartureInitialValues,
    });
    useEffect(() => {
      if (isEdit && getTourDepartureById.data) {
        const transformedData = {
          ...getTourDepartureById.data,
          start: miladiToShamsi(getTourDepartureById.data?.start!),
          end: miladiToShamsi(getTourDepartureById.data?.end!),
        };
        form.reset(transformedData);
      }
    }, [getTourDepartureById.data, isEdit]);

    {
      postTourDeparture.isPending && setIsPending?.(true);
    }
    const handleSubmit = (value: TCreateTourDeparture) => {
      const transformedData = {
        ...tourDepartureInitialValues,
        ...value,
        start: shamsiToMiladi(value.start),
        end: shamsiToMiladi(value.end),
      };

      if (isEdit) {
        putTourDeparture.mutateAsync(
          { data: transformedData, id: departureId },
          {
            onSuccess: () => {
              onSubmitSuccess?.();
            },
            onError: () => setErrorOpen(true),
          },
        );
      } else {
        postTourDeparture.mutateAsync(transformedData, {
          onSuccess: (data) => {
            setDepartureData?.(data);
            onSubmitSuccess?.();
            setIsPending?.(false);
          },
          onError: () => setErrorOpen(true),
        });
      }
    };

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        form.handleSubmit(handleSubmit)();
      },
    }));

    return (
      <FormComponent
        form={form}
        handleSubmit={handleSubmit}
        errorOpen={errorOpen}
        setErrorOpen={setErrorOpen}
        buttonText={buttonText}
        showButton={departureId ? true : false}
        fields={fields}
      />
    );
  },
);

TourDepartureForm.displayName = "TourDepartureForm";

export default TourDepartureForm;
