import type { Items } from "@/components/form/FormInputTypes";
import type { TCFeature } from "../types";

const typeOptions = [
  { label: "ویژگی اتاق", value: "roomtype" },
  { label: "ویژگی اقامتگاه", value: "accommodation" },
];

export const FeaturesFields: Items<TCFeature>[] = [
  {
    name: "title",
    label: "نام ویژگی",
    isRequired: true,
    fieldType: "input",
    inputType: "text",
    className:"col-span-2"
  },
  {
    name: "type",
    label: "نوع ویژگی",
    isRequired: false,
    fieldType: "dropdown",
    className:"col-span-2",
    options:typeOptions
  },
  {
    name: "show_in_home_page",
    label: "نمایش در صفحه اصلی؟",
    isRequired: false,
    fieldType: "checkBox",
    className: "my-2"
  },

];
