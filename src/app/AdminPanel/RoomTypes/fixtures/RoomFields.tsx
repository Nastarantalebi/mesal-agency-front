import type { Items } from "@/components/form/formInputTypes";
import type { TCRoomTypesRoom } from "../types";
import { fa } from "zod/v4/locales";

export const RoomFields: Items<TCRoomTypesRoom>[] = [
  {
    name: "name",
    label: "نام اتاق",
    isRequired: true,
    fieldType: "input",
    inputType: "text",
  },
  {
    name:"floor",
    label: "طبقه",
    isRequired: false,
    fieldType: "input",
    inputType: "number"
  },
  {
    name: "description",
    label: "توضیحات",
    isRequired: false,
    fieldType: "input",
    inputType: "text",
    className: "col-span-full",
  },
];
