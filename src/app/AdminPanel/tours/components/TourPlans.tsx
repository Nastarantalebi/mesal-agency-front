import {
  departurePlansValidation,
  type TCreateDeparturePlan,
} from "../fixtures/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "@/components/form/FormComponent";
import useFields from "../hooks/useDepartureFields";
import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import FormBody from "@/components/form/FormBody";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { TdepartureResponse } from "../types";
import usePlans from "../services/usePlans";

interface Props {
  departureData?: TdepartureResponse;
  tourTemplateId: number | null;
  planId?: number;
  onSubmitSuccess?: () => void;
  setCurrentStep?: Dispatch<SetStateAction<number>>;
  setIsPending?: Dispatch<SetStateAction<boolean>>;
  showButton?: boolean;
  departureId?: number;
}

export interface DeparturePlanFormRef {
  submitForm: () => void;
}

function getDateRange(start: string, end: string) {
  const dateArray = [];
  let currentDate = new Date(start);
  const stopDate = new Date(end);

  while (currentDate <= stopDate) {
    dateArray.push(miladiToShamsi(currentDate.toISOString().split("T")[0]));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}

const TourPlans = forwardRef<DeparturePlanFormRef, Props>(
  (
    {
      departureData,
      tourTemplateId,
      onSubmitSuccess,
      setIsPending,
      showButton,
      departureId,
    },
    ref,
  ) => {

    const { getPlansFields } = useFields();
    const { postDeparturePlans } =
      usePlans({
        departureId: departureId,
        tourTemplateId,
      });
    const [errorOpen, setErrorOpen] = useState(false);

    const dates = useMemo(() => {
      if (!departureData?.start || !departureData?.end) return [];
      return getDateRange(departureData.start, departureData.end);
    }, [departureData?.start, departureData?.end]);

    const form = useForm<TCreateDeparturePlan>({
      resolver: zodResolver(departurePlansValidation),
      defaultValues: { plans: [] },
    });

    // Expose submitForm method to parent via ref
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        form.handleSubmit(handleSubmit)();
      },
    }));
    {
      postDeparturePlans.isPending && setIsPending?.(true);
    }
    const handleSubmit = (values: TCreateDeparturePlan) => {
      const payload = {
        plans: values.plans.map((plan) => ({
          ...plan,
          date: shamsiToMiladi(plan.date),
        })),
      };
 postDeparturePlans.mutateAsync(payload.plans, {
            onError: () => setErrorOpen(true),
            onSuccess: () => {
              onSubmitSuccess?.();
              setIsPending?.(false);
            },
          });
    };

    useEffect(() => {
      if (!dates.length) return;
      const data = dates.map((item) => ({
        date: item,
        breakfast: false,
        dinner: false,
        lunch: false,
        description: "",
      }));
      form.reset({ plans: data });
    }, [dates]);

    return (
      dates.length > 0 && (
        <FormComponent
          form={form}
          handleSubmit={handleSubmit}
          errorOpen={errorOpen}
          setErrorOpen={setErrorOpen}
          showButton={showButton}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 col-span-full">
            {dates.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow-sm bg-white"
              >
                {dates.length !== 0 ? (
                  <h1 className="mb-5 text-blue-500">تاریخ: {item}</h1>
                ) : (
                  <></>
                )}

                <div className="grid grid-cols-3">
                  <FormBody
                    fields={getPlansFields(index)}
                    control={form.control}
                  />
                </div>
              </div>
            ))}
          </div>
        </FormComponent>
      )
    );
  },
);


export default TourPlans;
