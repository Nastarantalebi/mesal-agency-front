import type { Items } from "@/components/form/formInputTypes";
import type { TCreateRoomType } from "../types";

export const RoomTypeFields: Items<TCreateRoomType>[] = [
  {
    name: "name",
    label: "نام نوع اتاق",
    isRequired: true,
    fieldType: "input",
    inputType: "text",
  },
  {
    name: "capacity",
    label: "ظرفیت",
    isRequired: false,
    fieldType: "input",
    inputType: "number",
  },
  {
    name: "extraPerson",
    label: "ظرفیت نفر اضافه",
    isRequired: false,
    fieldType: "input",
    inputType: "number",
  },
  {
    name: "description",
    label: "توضیحات",
    isRequired: false,
    fieldType: "input",
    inputType: "text",
  },
  {
    name: "breakfast",
    label: "صبحانه",
    isRequired: false,
    fieldType: "checkBox",
  },
  {
    name: "lunch",
    label: "ناهار",
    isRequired: false,
    fieldType: "checkBox",
  },
  {
    name: "dinner",
    label: "شام",
    isRequired: false,
    fieldType: "checkBox",
  },
];
