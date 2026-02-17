import type { Items } from "@/components/form/formInputTypes";
import type { TCPriceRange, TCRoomTypesRoom } from "../types";
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
// export const PriceFields: Items<TCPriceRange>[] = [
//   {
//     name: "normalPrice",
//     label: "قیمت نرمال",
//     isRequired: true,
//     fieldType: "input",
//     inputType: "number",
//   },
//   {
//     name:"peakPrice",
//     label: "قیمت پیک",
//     isRequired: false,
//     fieldType: "input",
//     inputType: "number"
//   },
// ];
