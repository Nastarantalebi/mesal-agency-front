import type { TFormData } from "@/types";
import { YES_NO_OPTIONS } from "../../Accommodation/types";
import type { TCreateRoomType } from "../types";

export const RoomTypeFields: TFormData<TCreateRoomType>[] = [
  {
    name: "name",
    label: "نام نوع اتاق",
    required: true,
    inputType: "text",
  },
  {
    name: "capacity",
    label: "ظرفیت",
    required: false,
    inputType: "number",
  },
  {
    name: "extraPerson",
    label: "ظرفیت نفر اضافه",
    required: false,
    inputType: "number",
  },
  {
    name: "description",
    label: "توضیحات",
    required: false,
    type: "textArea",
  },
  {
    name: "breakfast",
    label: "صبحانه",
    required: false,
    type: "select",
    option: YES_NO_OPTIONS,
  },
  {
    name: "lunch",
    label: "ناهار",
    required: false,
    type: "select",
    option: YES_NO_OPTIONS,
  },
  {
    name: "dinner",
    label: "شام",
    required: false,
    type: "select",
    option: YES_NO_OPTIONS,
  },
];
