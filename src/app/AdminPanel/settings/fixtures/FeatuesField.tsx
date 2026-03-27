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
  },
  {
    name: "type",
    label: "نوع ویژگی",
    isRequired: false,
    fieldType: "dropdown",
    options:typeOptions
  },

];
