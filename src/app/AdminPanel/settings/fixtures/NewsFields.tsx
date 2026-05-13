import type { Items } from "@/components/form/FormInputTypes";
import React from "react";
import type { TNews } from "./validation";

const newsFields = () => {
  const newsFields: Items<TNews>[] = [
    {
      name: "title",
      label: "نام خبر",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
    },
    {
      name: "type",
      label: "نوع",
      isRequired: true,
      fieldType: "dropdown",
      items: [
        { label: "خبر", value: "news" },
        { label: "اطلاعیه", value: "announcement" },
      ],
    },
    {
      name: "priority",
      label: "اولویت",
      isRequired: true,
      fieldType: "dropdown",
      items: [
        { label: "معمولی", value: "normal" },
        { label: "مهم", value: "high" },
        { label: "خیلی مهم", value: "urgent" },
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
      label: "توضیح",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
      className: "col-span-full"
    },
    {
       name: "published_date",
       label: "تاریخ انتشار",
       isRequired: true,
       fieldType: "DatePicker",
     },
    {
      name: "status",
      label: "وضعیت",
      isRequired: true,
      fieldType: "radio",
      items: [
        { label: "پیش نویس", value: "draft" },
        { label: "فعال", value: "active" },
        { label: "بایگانی شده", value: "archived" },
      ],
    },
        {
       name: "image",
       label: "عکس",
       isRequired: true,
       fieldType: "image",
     },

  ];
  return newsFields;
};

export default newsFields;
