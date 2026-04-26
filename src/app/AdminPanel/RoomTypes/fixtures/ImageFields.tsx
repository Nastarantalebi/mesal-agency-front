import type { Items } from "@/components/form/FormInputTypes";
import type { TCRoomTypeImage } from "../types";

export const ImageFields: Items<TCRoomTypeImage>[] = [
  {
    name: "image",
    fieldType: "image",
    className: "col-span-2",
  },
  {
    name: "main",
    label: "عکس اصلی؟",
    isRequired: false,
    fieldType: "checkBox",
    className: "my-2",
  },
];
