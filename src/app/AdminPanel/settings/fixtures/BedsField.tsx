import type { TCreateBed } from "../types";
import type { TFormData } from "@/types";

export const BedFields: TFormData<TCreateBed>[] = [
  {
    name: "name",
    label: "نام تخت",
    required: true,
    inputType: "text",
    className: "col-span-full"
  },
];
