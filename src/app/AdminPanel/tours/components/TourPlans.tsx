import {
  departurePlansValidation,
  type TCreateDeparturePlan,
  type TResponseTourDeparture,
} from "../fixtures/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "@/components/form/FormComponent";
import useFields from "../hooks/useFields";
import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";
import FormBody from "@/components/form/FormBody";
import { useEffect, useMemo, useState } from "react";
import useTour from "../services/useTour";

interface Props {
  departureData?: TResponseTourDeparture;
  tourTemplateId?: number | null;
  planId?: number;
}

function getDateRange(start: string, end: string) {
  const dateArray = [];
  let currentDate = new Date(start);
  const stopDate = new Date(end);

  while (currentDate <= stopDate) {
    // Format to YYYY-MM-DD and add to array
    dateArray.push(miladiToShamsi(currentDate.toISOString().split("T")[0]));

    // Increment by 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}

const TourPlans = ({ departureData, planId, tourTemplateId }: Props) => {
  const isEdit = !!planId;
  const departureId = departureData?.id

  const { getPlansFields } = useFields();
  const { postDeparturePlans, putDeparturePlan } = useTour({departureId, tourTemplateId});
  const [errorOpen, setErrorOpen] = useState(false);
  // const days = departureData?.duration_days || 0;
  const dates = useMemo(() => {
    if (!departureData?.start || !departureData?.end) return [];
    return getDateRange(departureData.start, departureData.end);
  }, [departureData?.start, departureData?.end]);

  console.log("dates:", dates);

  const form = useForm<TCreateDeparturePlan>({
    resolver: zodResolver(departurePlansValidation),
    defaultValues: { plans: [] },
  });

  const handleSubmit = (values: TCreateDeparturePlan) => {
    const payload = {
      plans: values.plans.map((plan) => ({
        ...plan,
        date: shamsiToMiladi(plan.date),
      })),
    };
    isEdit
      ? putDeparturePlan.mutateAsync({ data: payload.plans, id: planId })
      : postDeparturePlans.mutateAsync(payload.plans, {
          onError: () => setErrorOpen(true),
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

  console.log(form.watch());

  return (
    dates.length && (
      <FormComponent
        form={form}
        handleSubmit={handleSubmit}
        errorOpen={errorOpen}
        setErrorOpen={setErrorOpen}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 col-span-full">
          {dates.map((item, index) => (
            <div
              key={index}
              className=" border rounded-xl p-4 shadow-sm bg-white"
            >
              <h1 className="mb-5 text-blue-500">تاریخ: {item}</h1>
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
};

export default TourPlans;
