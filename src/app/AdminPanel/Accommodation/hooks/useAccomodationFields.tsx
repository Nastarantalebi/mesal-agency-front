import type { Items } from "@/components/form/formInputTypes";
import useGetData from "@/services/useGetData";
import {
  YES_NO_OPTIONS,
  type Item,
  type TCreateAccomodation,
} from "@/app/AdminPanel/Accommodation/types/index";
import {
  accommodation_cities_key,
  accommodation_cities_url,
  accommodation_proviences_key,
  accommodation_proviences_url,
  accommodation_types_key,
  accommodation_types_url,
} from "@/data/querykeys";


function useAccomodationFields(province_id?: number) {
  
  const { data: accommodationTypes } = useGetData<Item[]>({
    key: [accommodation_types_key],
    url: accommodation_types_url,
  });

  const { data: provinces } = useGetData<Item[]>({
    key: [accommodation_proviences_key],
    url: accommodation_proviences_url,
  });

  const { data: cities } = useGetData<Item[]>({
    key: [accommodation_cities_key, String(province_id) ?? ""],
    url: `${accommodation_cities_url}?province_id=${province_id}`,
    enabled: !!province_id,
  });


  const accommodationFields: Items<TCreateAccomodation>[] = [
    {
      name: "type",
      label: "نوع اقامتگاه",
      isRequired: true,
      fieldType: "dropdown",
      options: accommodationTypes,
      page: 1,
    },
    {
      name: "name",
      label: "نام اقامتگاه",
      isRequired: true,
      fieldType: "input",
      inputType: "text",
      page: 1,
    },
    {
      name: "provience",
      label: "استان",
      isRequired: false,
      fieldType: "dropdown",
      options: provinces,
      page: 1,
    },
    {
      name: "city",
      label: "شهر",
      isRequired: false,
      fieldType: "dropdown",
      options: cities,
      page: 1,
    },
    {
      name: "address",
      label: "آدرس",
      isRequired: false,
      fieldType: "input",
      inputType: "text",
      className: "col-span-full",
      page: 1,
    },
    {
      name: "description",
      label: "توضیحات",
      isRequired: false,
      fieldType: "input",
      inputType: "text",
      className: "col-span-full",
      page: 1,
    },
    {
      name: "manufacture_date",
      label: "سال تاسیس",
      isRequired: false,
      fieldType: "DatePicker",
      page: 2,
    },
    {
      name: "floors",
      label: "تعداد طبقات",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      page: 2,
    },
    {
      name: "total_rooms",
      label: "تعداد کل اتاق ها",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      page: 2,
    },
    {
      name: "max_guests",
      label: "ماکزیمم تعداد مهمانان",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      page: 2,
    },
    {
      name: "check_in_time",
      label: "ساعت ورود",
      isRequired: false,
      fieldType: "input",
      inputType: "text",
      page: 2,
    },
    {
      name: "check_out_time",
      label: "ساعت خروج",
      isRequired: false,
      fieldType: "input",
      inputType: "text",
      page: 2,
    },
    {
      name: "latitude",
      label: "عرض جغرافیایی",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      page: 2,
    },
    {
      name: "longitude",
      label: "طول جغرافیایی",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      page: 2,
    },
    {
      name: "area_sqm",
      label: "مساحت",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      page: 2,
    },
    {
      name: "stars",
      label: "چند ستاره",
      isRequired: false,
      fieldType: "input",
      inputType: "number",
      page: 2,
    },
    {
      name: "has_reception_24h",
      label: "پذیرش ۲۴ ساعته ",
      isRequired: false,
      fieldType: "yesNoInput",
      options: YES_NO_OPTIONS,
      className: "col-start-1 md:col-start-1 lg:col-start-1",
      page: 2,
    },
    {
      name: "has_elevator",
      label: "آسانسور",
      isRequired: false,
      fieldType: "yesNoInput",
      className: "col-span-1 md:col-span-1 lg:col-span-1",
      options: YES_NO_OPTIONS,
      page: 2,
    },
    {
      name: "built_with_local_materials",
      label: "ساخته شده با مصالح محلی",
      isRequired: false,
      fieldType: "yesNoInput",
      className: "col-span-1 md:col-span-1 lg:col-span-1",
      options: YES_NO_OPTIONS,
      page: 2,
    },
    {
      name: "allows_local_food_experience",
      label: "اجازه تجربه غذای محلی",
      isRequired: false,
      fieldType: "yesNoInput",
      className: "col-start-1 md:col-start-1 lg:col-start-1",
      options: YES_NO_OPTIONS,
      page: 2,
    },
    {
      name: "is_active",
      label: "فعال",
      isRequired: false,
      fieldType: "yesNoInput",
      className: "col-span-1 md:col-span-1 lg:col-span-1",
      options: YES_NO_OPTIONS,
      page: 2,
    },
  ];
  return accommodationFields;
}

export default useAccomodationFields;
