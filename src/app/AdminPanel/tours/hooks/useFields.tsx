import type { Items } from "@/components/form/FormInputTypes";
import type { TCreateAdditionalTour } from "../fixtures/validation";

const useFields = () => {
  const fields: Items<TCreateAdditionalTour>[] = [
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
  return fields;
};

export default useFields;
