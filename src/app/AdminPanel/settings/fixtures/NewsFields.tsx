import type { TNews } from "./validation";
import type { TFormData } from "@/types";

const NewsFields = (imageUrl?: string) => {
  const newsFields: TFormData<TNews>[] = [
    {
      name: "title",
      label: "نام خبر",
      required: true,
      inputType: "text",
    },
    {
      name: "type",
      label: "نوع",
      required: true,
      type: "select",
      option: [
        { label: "خبر", value: "news" },
        { label: "اطلاعیه", value: "announcement" },
      ],
    },
    {
      name: "priority",
      label: "اولویت",
      required: true,
      type: "select",
      option: [
        { label: "معمولی", value: "normal" },
        { label: "مهم", value: "high" },
        { label: "خیلی مهم", value: "urgent" },
      ],
    },
    {
      name: "short_description",
      label: "توضیح کوتاه",
      required: true,
      inputType: "text",
    },
    {
      name: "published_date",
      label: "تاریخ انتشار",
      required: true,
      type: "date",
    },
    {
      name: "status",
      label: "وضعیت",
      required: true,
      type: "select",
      option: [
        { label: "پیش نویس", value: "draft" },
        { label: "فعال", value: "active" },
        { label: "بایگانی شده", value: "archived" },
      ],
    },
    {
      name: "description",
      label: "توضیح",
      required: true,
      type: "textArea",
      // className: "col-span-full"
    },
    {
      name: "image",
      label: "عکس",
      required: true,
      type: "image",
      medium_url: imageUrl,
      className: ""
    },

  ];
  return newsFields;
};

export default NewsFields;
