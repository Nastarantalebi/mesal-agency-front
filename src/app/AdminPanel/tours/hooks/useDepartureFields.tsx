import type { Items } from "@/components/form/FormInputTypes";
import type {
  TCreateDeparturePlan,
  TCreateTourDeparture,
} from "../fixtures/validation";

const useFields = () => {
  const fields: Items<TCreateTourDeparture>[] = [
    {
      name: "start",
      label: "تاریخ شروع",
      isRequired: true,
      fieldType: "DatePicker",
    },
    {
      name: "end",
      label: "تاریخ پایان",
      isRequired: true,
      fieldType: "DatePicker",
    },
    {
      name: "duration_days",
      label: "تعداد روزها",
      isRequired: true,
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "duration_nights",
      label: "تعداد شب‌ها",
      isRequired: true,
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "original_price",
      label: "قیمت قبل از تخفیف",
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "price",
      label: "قیمت اصلی",
      isRequired: true,
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "max_participants",
      label: "حداکثر تعداد شرکت‌کنندگان",
      isRequired: true,
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "min_participants",
      label: "حداقل تعداد شرکت‌کنندگان",
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "meeting_point",
      label: "محل تجمع",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "status",
      label: "وضعیت تور",
      fieldType: "dropdown",
      items: [
        { label: "پیش نویس", value: "draft" },
        { label: "فعال", value: "active" },
        { label: "بایگانی شده", value: "archived" },
      ],
    },
    {
      name: "available_seats",
      label: "ظرفیت",
      isRequired: true,
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "is_featured",
      label: "ویژه",
      isRequired: true,
      fieldType: "yesNoInput",
    },
  ];

  const getPlansFields = (index: number): Items<TCreateDeparturePlan>[] => [
    // {
    //   name: `${index}.date`, // اشاره به فیلد صبحانه در آرایه
    //   label: "تاریخ",
    //   isRequired: true,
    //   fieldType: "input",
    //   className: "col-span-2"
    // },
    {
      name: `plans.${index}.breakfast`, 
      label: "صبحانه",
      isRequired: true,
      fieldType: "checkBox",

    },
    {
      name: `plans.${index}.lunch`,
      label: "ناهار",
      isRequired: true,
      fieldType: "checkBox",
    },
    {
      name: `plans.${index}.dinner`,
      label: "شام",
      isRequired: true,
      fieldType: "checkBox",
    },
    {
      name: `plans.${index}.description`,
      label: "توضیحات",
      isRequired: true,
      fieldType: "input",
      inputType: "textArea",
      className: "col-start-1 col-span-full"
    },
  ];

  return { fields, getPlansFields };
};

export default useFields;
