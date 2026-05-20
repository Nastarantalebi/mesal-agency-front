import type { Items } from "@/components/form/FormInputTypes";
import type { TsendDeparturePlan } from "../fixtures/validation";

const usePlanFields = () => {
  const plansFields: Items<TsendDeparturePlan>[] = [
    {
      name: `date`,
      label: "تاریخ",
      isRequired: false,
      fieldType: "DatePicker",
      className: "col-span-2"
    },
    {
      name: `breakfast`,
      label: "صبحانه",
      isRequired: false,
      fieldType: "checkBox",
      className: "col-start-1"
    },
    {
      name: `lunch`,
      label: "ناهار",
      isRequired: false,
      fieldType: "checkBox",
    },
    {
      name: `dinner`,
      label: "شام",
      isRequired: false,
      fieldType: "checkBox",
    },
    {
      name: `description`,
      label: "توضیحات",
      isRequired: true,
      fieldType: "input",
      inputType: "textArea",
      className: "col-start-1 col-span-full",
    },
  ];
  return plansFields;
};

export default usePlanFields;
