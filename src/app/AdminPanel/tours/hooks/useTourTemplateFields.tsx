import type { TCreateTourTemplate } from "../fixtures/validation";
import type { TCtourImage } from "../../RoomTypes/types";
import type { TFormData } from "@/types";
import { YES_NO_OPTIONS } from "../../Accommodation/types";
import type { UseFormReturn } from "react-hook-form";

const useTourFields = (form?: UseFormReturn<TCreateTourTemplate>) => {
  const vehicle = form?.watch("transportation_included");

  const fields: (TFormData<TCreateTourTemplate> | undefined)[] = [
    {
      name: "title",
      label: "نام تور",
      required: true,
      inputType: "text",
    },
    {
      name: "category",
      label: "نوع تور",
      required: true,
      type: "select",
      option: [
        { label: "تور داخلی", value: "incountry" },
        { label: "تور خارجی", value: "foreign" },
      ],
    },
    {
      name: "short_description",
      label: "توضیح کوتاه",
      required: true,
      inputType: "text",
    },
    {
      name: "description",
      label: "توضیحات",
      required: true,
      type: "textArea",
      inputType: "text",
      className: "col-span-full",
    },
    {
      name: "destination",
      label: "مقصد",
      required: true,
      inputType: "text",
    },
    {
      name: "country",
      label: "کشور",
      inputType: "text",
    },
    {
      name: "difficulty",
      label: "سطح سختی",
      required: true,
      type: "select",
      option: [
        { label: "آسان", value: "easy" },
        { label: "متوسط", value: "moderate" },
        { label: "سخت", value: "challenging" },
        { label: "خیلی سخت", value: "difficult" },
      ],
    },
    {
      name: "age_requirement",
      label: "حداقل سن مجاز",
      inputType: "number",
    },
    {
      name: "highlights",
      label: "ویژگی‌ها و نقاط برجسته",
      inputType: "text",
    },
    {
      name: "is_featured",
      label: "نمایش در تورهای ویژه",
      type: "select",
      option: YES_NO_OPTIONS,
    },
    {
      name: "transportation_included",
      label: "حمل و نقل شامل می‌شود؟",
      type: "select",
      option: YES_NO_OPTIONS,
    },
    vehicle
      ? {
          name: "vehicle_type",
          label: "نوع وسیله نقلیه",
          type: "select",
          option: [
            { label: "اتوبوس", value: "bus" },
            { label: "مینی‌بوس", value: "minibus" },
            { label: "ون", value: "van" },
            { label: "قطار", value: "train" },
            { label: "هواپیما", value: "flight" },
            { label: "پیاده‌روی", value: "walking" },
            { label: "خودرو", value: "car" },
            { label: "قایق", value: "boat" },
            { label: "دوچرخه", value: "bicycle" },
            { label: "ترکیبی", value: "mixed" },
          ],
        }
      : undefined,
    vehicle
      ? {
          name: "vehicle_details",
          label: "جزئیات وسیله نقلیه",
          required: true,
          inputType: "text",
          className: "col-span-4",
        }
      : undefined,
    {
      name: "meta_title",
      label: "عنوان متا",
      inputType: "text",
      className: "col-start-1",
    },
    {
      name: "meta_description",
      label: "توضیحات متا",
      type: "textArea",
      className: "col-span-3",
    },
  ];

  const ImageFields: TFormData<TCtourImage>[] = [
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

  return { fields, ImageFields };
};

export default useTourFields;
