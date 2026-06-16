import { YES_NO_OPTIONS } from "../../Accommodation/types";
import type { TCRoomTypeImage } from "../types";
import type { TFormData } from "@/types";

export const ImageFields: TFormData<TCRoomTypeImage>[] = [
  {
    name: "image",
    type: "image",
    className: "col-span-full",
  },
  {
    name: "main",
    label: "عکس اصلی؟",
    required: false,
    type: "select",
    option: YES_NO_OPTIONS,
    className: "col-start-1 col-span-full",
  },
];
