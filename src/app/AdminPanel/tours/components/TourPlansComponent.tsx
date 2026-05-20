import FormComponent from "@/components/form/FormComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  departurePlanInitialValues,
  departurePlanValidation,
  type TsendDeparturePlan,
} from "../fixtures/validation";
import usePlanFields from "../hooks/usePlanFields";
import usePlans from "../services/usePlans";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
  miladiToShamsi,
  shamsiToMiladi,
} from "@/components/form/DateConverter";

interface Props {
  tourTemplateId: number;
  departureId: number;
  planId?: number;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;

}

const TourPlansComponent = ({ tourTemplateId, departureId, planId, setOpenModal }: Props) => {
  const isEdit = !!planId;

  const form = useForm<TsendDeparturePlan>({
    resolver: zodResolver(departurePlanValidation),
    defaultValues: departurePlanInitialValues,
  });

  const { getPlanById, putPlan, postPlan } = usePlans({
    tourTemplateId,
    departureId,
    planId,
  });

  const plansFields = usePlanFields();

  useEffect(() => {
    if (isEdit && getPlanById.data) {
      const payload = {
        ...getPlanById.data,
        date: miladiToShamsi(getPlanById.data.date),
      };
      form.reset(payload);
    }
  }, [getPlanById.data, isEdit]);

  const handleSubmit = (values: TsendDeparturePlan) => {
    const payload = {
      ...values,
      date: shamsiToMiladi(values.date),
    };
    isEdit
      ? putPlan.mutateAsync({ data: payload, id: planId! }, {onSuccess: ()=> setOpenModal?.(false)})
      : postPlan.mutateAsync([payload], {
          onSuccess: () => {form.reset(departurePlanInitialValues);
            setOpenModal?.(false)
          },
        });
  };

  return (
    <div>
      <FormComponent
        form={form}
        handleSubmit={handleSubmit}
        fields={plansFields}
        buttonText={isEdit ? "ویرایش": "ثبت"}
      />
    </div>
  );
};

export default TourPlansComponent;
