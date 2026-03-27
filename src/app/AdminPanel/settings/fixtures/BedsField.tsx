import type { Items } from "@/components/form/FormInputTypes";
import type { TCreateBed } from "../types";

export const BedFields: Items<TCreateBed>[] = [
  {
    name: "name",
    label: "نام تخت",
    isRequired: true,
    fieldType: "input",
    inputType: "text",
  },
];
