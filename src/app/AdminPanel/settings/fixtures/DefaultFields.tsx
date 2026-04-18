import type { Items } from "@/components/form/FormInputTypes";
import type { TCreateDefaults } from "../types";

export const DefaultFields: Items<TCreateDefaults>[] = [
  {
    name: "min_child_age",
    label: "حداقل سن کودک",
    isRequired: true,
    fieldType: "input",
      direction:"ltr",
    inputType: "number",
  },
  {
    name: "max_child_age",
    label: "حداکثر سن کودک",
    isRequired: true,
    fieldType: "input",
      direction:"ltr",
    inputType: "number",
  },
  {
    name: "check_in_time",
    label: "ساعت ورود",
    isRequired: true,
    className: "col-start-1",
    fieldType: "Time",
  },
  {
    name: "check_out_time",
    label: "ساعت خروج",
    isRequired: true,
    fieldType: "Time",
  },
];
