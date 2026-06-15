import type { Items } from "@/components/form/FormInputTypes";
import type { TCFeature } from "../types";
import type { TFormData } from "@/types";
import { YES_NO_OPTIONS } from "../../Accommodation/types";

const typeOptions = [
  { label: "ویژگی اتاق", value: "roomtype" },
  { label: "ویژگی اقامتگاه", value: "accommodation" },
];

export const FeaturesFields: TFormData<TCFeature>[] = [
  {
    name: "title",
    label: "نام ویژگی",
    required: true,
    inputType: "text",
    className: "col-span-2",
  },
  {
    name: "type",
    label: "نوع ویژگی",
    required: false,
    type: "select",
    className: "col-span-2",
    option: typeOptions,
  },
  {
    name: "show_in_home_page",
    label: "نمایش در صفحه اصلی؟",
    required: false,
    type: "select",
    option: YES_NO_OPTIONS,
    className: "col-span-2",
  },
];
