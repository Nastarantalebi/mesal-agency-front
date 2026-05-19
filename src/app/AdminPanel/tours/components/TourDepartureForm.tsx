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
  type TResponseTourDeparture,
} from "../fixtures/validation";
import useTour from "../services/useTour";
import useFields from "../hooks/useDepartureFields";
import FormComponent from "@/components/form/FormComponent";

interface TourDepartureFormProps {
  departureId?: number;
  buttonText?: string;
  tourTemplateId: number | null;
  setDepartureData: Dispatch<
    SetStateAction<TResponseTourDeparture | undefined>
  >;
  onSubmitSuccess?: () => void;
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
    },
    ref,
  ) => {
    const isEdit = !!departureId;

    const { postTourDeparture, putTourDeparture, getTourDepartureById } =
      useTour({ tourTemplateId });
    const [errorOpen, setErrorOpen] = useState(false);
    const { fields } = useFields();

    const form = useForm<TCreateTourDeparture>({
      resolver: zodResolver(tourDepartureValidation),
      defaultValues: tourDepartureInitialValues,
    });

    console.log(form.watch());

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
        postTourDeparture(transformedData, {
          onSuccess: (data) => {
            setDepartureData(data);
            onSubmitSuccess?.();
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
        showButton={false}
        fields={fields}
      />
    );
  },
);

TourDepartureForm.displayName = "TourDepartureForm";

export default TourDepartureForm;
