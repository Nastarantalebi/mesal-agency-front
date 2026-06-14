import type { TCRoomTypesRoom } from "../types";
import type { TFormData } from "@/types";

export const RoomFields: TFormData<TCRoomTypesRoom>[] = [
  {
    name: "name",
    label: "نام اتاق",
    required: true,
    inputType: "text",
  },
  {
    name: "floor",
    label: "طبقه",
    required: false,
    inputType: "number",
  },
  {
    name: "description",
    label: "توضیحات",
    required: false,
    type: "textArea",
    // className: "col-span-full",
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
