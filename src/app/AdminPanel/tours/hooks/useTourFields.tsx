import type { Items } from "@/components/form/FormInputTypes";
import type { TCreateTour } from "../fixtures/validation";

const useTourFields = () => {
  const fields: Items<TCreateTour>[] = [
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
      name: "original_price",
      label: "قیمت قبل از تخفیف",
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "price",
      label: "قیمت اصلی",
      isRequired: true,
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "duration_days",
      label: "تعداد روزها",
      isRequired: true,
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "duration_nights",
      label: "تعداد شب‌ها",
      isRequired: true,
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "start",
      label: "تاریخ شروع",
      isRequired: true,
      fieldType: "DatePicker",
    },
    {
      name: "end",
      label: "تاریخ پایان",
      isRequired: true,
      fieldType: "DatePicker",
    },
    {
      name: "country",
      label: "کشور مقصد",
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "destination",
      label: "مقصد",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "meeting_point",
      label: "محل تجمع",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "max_participants",
      label: "حداکثر تعداد شرکت‌کنندگان",
      isRequired: true,
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "min_participants",
      label: "حداقل تعداد شرکت‌کنندگان",
      fieldType: "input",
      inputType: "number",
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
      name: "status",
      label: "وضعیت تور",
      fieldType: "dropdown",
      items: [
        { label: "پیش نویس", value: "draft" },
        { label: "فعال", value: "active" },
        { label: "بایگانی شده", value: "archived" },
      ],
    },
    {
      name: "age_requirement",
      label: "حداقل سن مجاز",
      fieldType: "input",
      inputType: "number",
    },
    {
      name: "included",
      label: "موارد شامل تور",
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "excluded",
      label: "موارد خارج از تور",
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "highlights",
      label: "ویژگی‌ها و نقاط برجسته",
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "transportation_included",
      label: "حمل و نقل شامل می‌شود؟",
      fieldType: "yesNoInput",
    },
    {
      name: "is_featured",
      label: "نمایش در تورهای ویژه",
      fieldType: "yesNoInput",
    },
    {
      name: "featured_image",
      label: "تصویر برجسته",
      isRequired: true,
      fieldType: "image",
    },
  ];

  return { fields };
};

export default useTourFields;
