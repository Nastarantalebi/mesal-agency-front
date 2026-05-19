import {
  departurePlansValidation,
  type TCreateDeparturePlan,
  type TResponseTourDeparture,
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
import useTour from "../services/useTour";

interface Props {
  departureData?: TResponseTourDeparture;
  tourTemplateId?: number | null;
  planId?: number;
  onSubmitSuccess?: () => void;
  setCurrentStep?: Dispatch<SetStateAction<number>>;
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
    { departureData, planId, tourTemplateId, onSubmitSuccess, setCurrentStep },
    ref,
  ) => {
    const isEdit = !!planId;
    const departureId = departureData?.id;

    const { getPlansFields } = useFields();
    const { postDeparturePlans, putDeparturePlan } = useTour({
      departureId,
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

    const handleSubmit = (values: TCreateDeparturePlan) => {
      const payload = {
        plans: values.plans.map((plan) => ({
          ...plan,
          date: shamsiToMiladi(plan.date),
        })),
      };
      isEdit
        ? putDeparturePlan.mutateAsync(
            { data: payload.plans, id: planId },
            {
              onSuccess: () => {
                onSubmitSuccess?.();
                setCurrentStep?.(0);
              },
            },
          )
        : postDeparturePlans.mutateAsync(payload.plans, {
            onError: () => setErrorOpen(true),
            onSuccess: () => onSubmitSuccess?.(),
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
          showButton={false}
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

TourPlans.displayName = "TourPlans";

export default TourPlans;
