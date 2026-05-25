import type { Items } from "@/components/form/FormInputTypes";
import type { TCreateTourTemplate } from "../fixtures/validation";
import type { TCtourImage } from "../../RoomTypes/types";

const useTourFields = () => {
  const fields: Items<TCreateTourTemplate>[] = [
    {
      name: "title",
      label: "نام تور",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "category",
      label: "نوع تور",
      isRequired: true,
      fieldType: "dropdown",
      items: [
        { label: "تور داخلی", value: "incountry" },
        { label: "تور خارجی", value: "foreign" },
      ],
    },
    {
      name: "short_description",
      label: "توضیح کوتاه",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "description",
      label: "توضیحات",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
      className: "col-span-full",
    },
    {
      name: "transportation_included",
      label: "حمل و نقل شامل می‌شود؟",
      fieldType: "yesNoInput",
    },
    {
      name: "vehicle_type",
      label: "نوع وسیله نقلیه",
      fieldType: "dropdown",
      items: [
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
    },
    {
      name: "vehicle_details",
      label: "جزئیات وسیله نقلیه",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
      className: "col-span-full",
    },
    {
      name: "destination",
      label: "مقصد",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "country",
      label: "کشور",
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "difficulty",
      label: "سطح سختی",
      isRequired: true,
      fieldType: "dropdown",
      items: [
        { label: "آسان", value: "easy" },
        { label: "متوسط", value: "moderate" },
        { label: "سخت", value: "challenging" },
        { label: "خیلی سخت", value: "difficult" },
      ],
    },
    {
      name: "age_requirement",
      label: "حداقل سن مجاز",
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "highlights",
      label: "ویژگی‌ها و نقاط برجسته",
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "is_featured",
      label: "نمایش در تورهای ویژه",
      fieldType: "yesNoInput",
    },
    {
      name: "meta_title",
      label: "عنوان متا",
      fieldType: "input",
      inputType: "text",
      className: "col-start-1",
    },
    {
      name: "meta_description",
      label: "توضیحات متا",
      fieldType: "input",
      inputType: "text",
      className: "col-span-3",
    },
  ];

  const ImageFields: Items<TCtourImage>[] = [
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
  

  return { fields, ImageFields };
};

export default useTourFields;
