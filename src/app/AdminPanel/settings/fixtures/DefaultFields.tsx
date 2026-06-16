import type { TCreateDefaults } from "../types";
import type { TFormData } from "@/types";

export const DefaultFields: TFormData<TCreateDefaults>[] = [
  {
    name: "min_child_age",
    label: "حداقل سن کودک",
    required: true,
    // dir: "ltr",
    inputType: "number",
  },
  {
    name: "max_child_age",
    label: "حداکثر سن کودک",
    required: true,
    // dir: "ltr",
    inputType: "number",
  },
  {
    name: "check_in_time",
    label: "ساعت ورود",
    required: true,
    type: "time",
  },
  {
    name: "check_out_time",
    label: "ساعت خروج",
    required: true,
    type: "time",
  },
];
